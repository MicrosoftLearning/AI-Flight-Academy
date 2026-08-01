// The Greenlight — live council dashboard
//
// Serves a browser dashboard that:
//  - reads council/*.json at request time and shows the seated audiences
//  - accepts a dropped document or a pasted link to "convene" on
//  - shells out to the GitHub Copilot CLI (`copilot`) to actually run the
//    Greenlight review process and return a per-audience verdict
//
// Nothing here hardcodes the council — every run re-reads council/*.json,
// so editing those files (adding/removing a seat) changes the dashboard and
// the next review without touching this server.

const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 4173;

// This dashboard ships inside the-greenlight-starter/. The seated council is
// DATA (council/*.json); the review PROCESS references live in the sibling
// the-greenlight/ skill. Everything is discovered relative to the starter so
// it works on any machine — override any path with an env var.
const STARTER_DIR = path.resolve(__dirname, '..');
const COUNCIL_DIR = process.env.GREENLIGHT_COUNCIL_DIR || path.join(STARTER_DIR, 'council');
const SKILL_DIR = process.env.GREENLIGHT_SKILL_DIR || path.resolve(STARTER_DIR, '..', 'the-greenlight');
const CONVENE_REF_PATH = path.join(SKILL_DIR, 'reference', 'convene.md');
const GREENLIGHT_REF_PATH = path.join(SKILL_DIR, 'reference', 'greenlight.md');

// The data pack (audience card detail) sits next to the starter. Purely a
// grounding aid for the plan step; everything still works if it isn't there.
const DATA_PACK_DIR = process.env.GREENLIGHT_DATA_PACK || path.resolve(STARTER_DIR, '..', 'data-pack');
const DATA_PACK_EXISTS = fs.existsSync(DATA_PACK_DIR);

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const RUNS_DIR = path.join(__dirname, 'runs');
const PLANS_DIR = path.join(__dirname, 'plans');
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
for (const dir of [UPLOADS_DIR, RUNS_DIR, PLANS_DIR, SUBMISSIONS_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// --- Config for the PR submission path (TODO) -------------------------------
// Placeholder repo by default. The submission workflow is a build path — see
// the TODO stub at POST /api/plan/:planId/submit near the bottom of this file.
const SUBMISSION_REPO = process.env.GREENLIGHT_SUBMISSION_REPO || '<your-org>/greenlight-submissions';
const SUBMISSION_BASE = process.env.GREENLIGHT_SUBMISSION_BASE || 'main';
const GH_BIN = process.env.GH_BIN || 'gh';
const GIT_BIN = process.env.GIT_BIN || 'git';

const COPILOT_BIN = process.env.COPILOT_BIN || 'copilot';
// Let the Copilot CLI pick the model by default (empty = no --model flag).
// Override with GREENLIGHT_MODEL to pin a specific model id.
const COPILOT_MODEL = process.env.GREENLIGHT_MODEL !== undefined ? process.env.GREENLIGHT_MODEL : '';
const COPILOT_TIMEOUT_MS = Number(process.env.GREENLIGHT_TIMEOUT_MS || 6 * 60 * 1000);

// The deterministic half — checks.py, run via check_content.py at the starter
// root. Node shells to Python so the board can show code-caught fails next to
// the model's verdicts.
const PYTHON_BIN = process.env.GREENLIGHT_PYTHON || 'python';
const CHECK_SCRIPT = path.join(STARTER_DIR, 'check_content.py');

/**
 * Run the deterministic checks for a piece. Resolves { status, seats } where
 * status is 'ok' (ran), 'todo' (check_content.py still a stub), or 'error'
 * (Python missing or the check crashed). Best-effort: a missing toolchain or an
 * unbuilt stub never blocks the model review — the board just shows a hint.
 */
function runDeterministicChecks(contentPath) {
  return new Promise((resolve) => {
    let child;
    try {
      child = spawn(PYTHON_BIN, [CHECK_SCRIPT, contentPath], { windowsHide: true, shell: false });
    } catch {
      return resolve({ status: 'error', seats: [] });
    }
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', () => resolve({ status: 'error', seats: [] }));
    child.on('close', (code) => {
      let parsed = null;
      try { parsed = JSON.parse(out); } catch { /* non-JSON output */ }
      if (parsed && Array.isArray(parsed.seats)) {
        return resolve({ status: 'ok', seats: parsed.seats });
      }
      // The starter ships check_content.py as a stub that prints
      // {"error": "TODO (checks path): ..."} and exits 1 — surface that as a
      // build-path hint rather than a silent blank or a scary error.
      const msg = (parsed && parsed.error) || err || '';
      if (/TODO|NotImplementedError/i.test(msg)) return resolve({ status: 'todo', seats: [] });
      if (code !== 0 || (parsed && parsed.error)) return resolve({ status: 'error', seats: [] });
      return resolve({ status: 'ok', seats: [] });
    });
  });
}

/**
 * On startup, confirm the GitHub Copilot CLI is reachable. Auth is the CLI's
 * own concern — the dashboard just runs whatever account `copilot` is signed
 * into — but a missing/unfound binary is the #1 first-run failure, so say so
 * clearly instead of letting the first review blow up with a raw spawn error.
 */
function preflightCopilot() {
  let child;
  try {
    child = spawn(COPILOT_BIN, ['--version'], { windowsHide: true, shell: false });
  } catch {
    child = null;
  }
  const warn = () => {
    console.warn(`\n[greenlight] Could not run the GitHub Copilot CLI ("${COPILOT_BIN}").`);
    console.warn('[greenlight] Install it and sign in to your GitHub account (the one with a Copilot seat),');
    console.warn('[greenlight] or set COPILOT_BIN to its full path. Reviews will fail until this works.\n');
  };
  if (!child) return warn();
  let out = '';
  child.stdout.on('data', (d) => (out += d));
  child.stderr.on('data', (d) => (out += d));
  child.on('error', warn);
  child.on('close', (code) => {
    if (code === 0) {
      console.log(`[greenlight] GitHub Copilot CLI OK: ${out.trim().split(/\r?\n/)[0] || 'found'}`);
    }
  });
}

// ---------------------------------------------------------------------------
// council/*.json loading  (the seated council is DATA — option A)
// ---------------------------------------------------------------------------

/**
 * Map one seat JSON (council/*.json) to the shape the dashboard renders and
 * the prompts build from. `*.example.json` is a template and is skipped.
 */
function seatFromJson(seat, index) {
  const label = seat.audience || seat.seat_id || `Seat ${index + 1}`;
  const emojiMatch = label.match(/^(\p{Extended_Pictographic}\uFE0F?)\s*(.*)$/u);
  return {
    id: seat.seat_id || `seat-${index}`,
    emoji: emojiMatch ? emojiMatch[1] : '👤',
    name: emojiMatch ? emojiMatch[2].trim() : label,
    label,
    profile: seat.card || null,
    goal: seat.outcome || '',
    thresholds: seat.thresholds || null,
    needs: (seat.criteria || []).map((c) => ({
      name: c.id,
      dealBreaker: !!c.fatal,
      bar: c.the_bar || '',
      anchors: c.anchors || null,
      watch_for: c.watch_for || ''
    }))
  };
}

function loadCouncil() {
  const files = fs.readdirSync(COUNCIL_DIR)
    .filter((f) => f.endsWith('.json') && !f.endsWith('.example.json'))
    .sort();
  const seats = files.map((f, i) =>
    seatFromJson(JSON.parse(fs.readFileSync(path.join(COUNCIL_DIR, f), 'utf8')), i));
  return { seats, mtime: Date.now(), path: COUNCIL_DIR };
}

// ---------------------------------------------------------------------------
// In-memory job tracking (one job per "convene" run)
// ---------------------------------------------------------------------------

const jobs = new Map(); // jobId -> job
const plans = new Map(); // planId -> plan (remediation plan + reconvene state)

function newJob(meta) {
  const id = crypto.randomUUID();
  const job = {
    id,
    status: 'running', // running | done | error
    startedAt: Date.now(),
    finishedAt: null,
    log: '',
    result: null,
    error: null,
    ...meta
  };
  jobs.set(id, job);
  return job;
}

function appendLog(job, chunk) {
  job.log += chunk;
  // Cap the retained log so a very chatty run can't grow memory unbounded.
  const MAX = 200_000;
  if (job.log.length > MAX) job.log = job.log.slice(job.log.length - MAX);
}

// ---------------------------------------------------------------------------
// Building the prompt and invoking the GitHub Copilot CLI
// ---------------------------------------------------------------------------

function buildPrompt({ seats, contentPath, contentLabel }) {
  const seatBlock = seats.map((s, i) => {
    const crits = (s.needs || []).map((n) => {
      const anchors = n.anchors
        ? '\n' + ['0', '1', '2', '3'].filter((k) => n.anchors[k] != null).map((k) => `      ${k} = ${n.anchors[k]}`).join('\n')
        : '';
      return `   - ${n.name}${n.dealBreaker ? ' [deal-breaker]' : ''}: ${n.bar || ''}${anchors}`;
    }).join('\n');
    return `${i + 1}. ${s.label} (profile: ${s.profile || 'n/a'})\n   Goal: ${s.goal}\n   Verdict thresholds for THIS audience: Ship ${(s.thresholds && s.thresholds.SHIP != null) ? s.thresholds.SHIP : 2.5}+, Revise ${(s.thresholds && s.thresholds.REVISE != null) ? s.thresholds.REVISE : 1.5}+, else Reject\n   Criteria to score against (ONLY these):\n${crits}`;
  }).join('\n\n');

  return `You are running THE GREENLIGHT skill's convene step as a backend job for a live dashboard — there is no human to ask follow-up questions, so make reasonable calls and proceed.

Read "${CONVENE_REF_PATH}" for the exact review process: each audience judges the piece independently against only its own criteria, scoring each 0-3 with a quote, a reason, and a confidence (high/medium/low), then an overall verdict using THAT audience's own thresholds (shown per seat below); any deal-breaker criterion scored 0 forces Reject for that audience regardless of average.

Read the content to review at: "${contentPath}"  (label: ${contentLabel})

Score against THESE seated audiences and their criteria, in this exact order:

${seatBlock}

Judge each audience independently — don't let one verdict soften another. Every score needs a real quote from the content (or "no quote found" plus what you looked for). Every need needs a one-line "fix" when its score is 1 or lower.

After scoring every audience, write 1-2 sentences on the sharpest disagreement between audiences (the same passage that split them), and say which audiences the piece serves as-is vs. does not serve.

Respond with ONLY a single JSON object — no markdown code fences, no prose before or after it. It must match exactly this shape:

{
  "content_label": "${contentLabel}",
  "seats": [
    {
      "seat": "<one of the exact seat strings above>",
      "verdict": "Ship" | "Revise" | "Reject",
      "overall_score": <number, one decimal>,
      "one_line_reason": "<short reason with a quote in it>",
      "deal_breaker_hit": <true|false>,
      "needs": [
        {
          "name": "<criterion id from the seat>",
          "score": <0-3>,
          "quote": "<exact quote from the content, or 'no quote found'>",
          "reason": "<line from the audience profile or council file backing the score>",
          "confidence": "high" | "medium" | "low",
          "fix": "<what would raise the score, or null if score is 2-3>"
        }
      ]
    }
  ],
  "disagreement": "<1-2 sentences on the sharpest clash between audiences, naming both sides>",
  "coverage": {
    "served": ["<seat strings the piece serves as-is>"],
    "not_served": ["<seat strings it does not serve>"]
  }
}

Output that JSON object now, and nothing else.`;
}

function runConvene(job, { seats, contentPath, contentLabel }) {
  const prompt = buildPrompt({ seats, contentPath, contentLabel });
  execCopilotJson(prompt, { addDirs: [SKILL_DIR, UPLOADS_DIR], job })
    .then((parsed) => {
      job.result = parsed;
      job.status = 'done';
      job.finishedAt = Date.now();
      persistRun(job, contentLabel);
    })
    .catch((err) => {
      job.status = 'error';
      job.error = err.message;
      job.finishedAt = Date.now();
    });
}

function persistRun(job, contentLabel) {
  try {
    const runFile = path.join(RUNS_DIR, `${job.id}.json`);
    fs.writeFileSync(runFile, JSON.stringify({
      id: job.id,
      contentLabel,
      startedAt: job.startedAt,
      finishedAt: job.finishedAt,
      model: COPILOT_MODEL || null,
      result: job.result
    }, null, 2));
  } catch (e) {
    // Non-fatal — history is a nice-to-have.
  }
}

/**
 * Spawn the Copilot CLI with a prompt and resolve with the parsed JSON object
 * it returns. If `job` is passed, streams stdout/stderr into job.log as it
 * runs (works for both convene jobs and plans — both just have a .log string).
 */
function execCopilotJson(prompt, { addDirs = [], job, timeoutMs = COPILOT_TIMEOUT_MS } = {}) {
  return new Promise((resolve, reject) => {
    const args = ['-p', prompt, '--allow-all-tools'];
    for (const dir of addDirs) args.push('--add-dir', dir);
    if (COPILOT_MODEL) args.push('--model', COPILOT_MODEL);
    args.push('-s');

    if (job) {
      appendLog(job, `$ ${COPILOT_BIN} -p "<prompt omitted, ${prompt.length} chars>" --allow-all-tools ${addDirs.map((d) => `--add-dir "${d}"`).join(' ')} -s\n\n`);
    }

    let child;
    try {
      child = spawn(COPILOT_BIN, args, { cwd: SKILL_DIR, windowsHide: true, shell: false });
    } catch (err) {
      return reject(new Error(`Could not launch the GitHub Copilot CLI ("${COPILOT_BIN}"). Is it installed, signed in, and on PATH (or set COPILOT_BIN)? Details: ${err.message}`));
    }

    let stdout = '';
    let stderr = '';

    const killTimer = setTimeout(() => {
      if (job) appendLog(job, `\n[dashboard] timed out after ${timeoutMs}ms, killing process\n`);
      child.kill();
    }, timeoutMs);

    child.stdout.on('data', (d) => {
      const text = d.toString();
      stdout += text;
      if (job) appendLog(job, text);
    });
    child.stderr.on('data', (d) => {
      const text = d.toString();
      stderr += text;
      if (job) appendLog(job, text);
    });

    child.on('error', (err) => {
      clearTimeout(killTimer);
      reject(new Error(`Copilot CLI process error: ${err.message}`));
    });

    child.on('close', (code) => {
      clearTimeout(killTimer);
      if (code !== 0 && !stdout.trim()) {
        return reject(new Error(`Copilot CLI exited with code ${code}${stderr ? `: ${stderr.slice(-2000)}` : ''}`));
      }
      const parsed = extractJson(stdout);
      if (!parsed) {
        return reject(new Error('Could not find a JSON result in the Copilot CLI output. See the raw log below.'));
      }
      resolve(parsed);
    });
  });
}

/** Pull the first well-formed JSON object out of a blob of CLI output. */
function extractJson(text) {
  // Prefer a fenced ```json ... ``` block if present.
  const fenced = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/```\s*([\s\S]*?)```/);
  const candidates = [];
  if (fenced) candidates.push(fenced[1]);

  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    candidates.push(text.slice(first, last + 1));
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (e) {
      // try the next candidate
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// "Greenlight it" — turn a review's gaps into a remediation plan, then let
// the council reconvene on the drafted replacements until every audience
// that rejected the original would accept it (greenlight.md's Plan step).
// ---------------------------------------------------------------------------

function newPlan({ sourceJobId, contentLabel, contentPath, seats }) {
  const id = crypto.randomUUID();
  const plan = {
    id,
    sourceJobId,
    contentLabel,
    contentPath,
    seats, // full seat objects (goal + needs) captured at review time
    status: 'building', // building | ready | error
    log: '',
    error: null,
    items: [],
    leftOut: [],
    overall: 'building', // building | unchecked | checking | green | not_green | error
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  plans.set(id, plan);
  return plan;
}

function persistPlan(plan) {
  try {
    fs.writeFileSync(path.join(PLANS_DIR, `${plan.id}.json`), JSON.stringify(plan, null, 2));
  } catch (e) {
    // Non-fatal — plans are re-buildable from a review at any time.
  }
}

/** Render a plan as a human-readable Markdown document for download/export. */
function composePlanMarkdown(plan) {
  const lines = [];
  const overallLabel = plan.overall === 'green'
    ? '✅ GREEN — every audience is served'
    : plan.overall === 'not_green'
      ? '🟡 Not yet green — some drafts still need work'
      : plan.overall;

  lines.push('# The Greenlight — Remediation Plan');
  lines.push('');
  lines.push(`**Reviewed piece:** ${plan.contentLabel}`);
  lines.push(`**Plan status:** ${overallLabel}`);
  lines.push(`**Generated:** ${new Date(plan.updatedAt || Date.now()).toLocaleString()}`);
  lines.push('');
  lines.push('---');

  for (const item of plan.items) {
    lines.push('');
    lines.push(`## ${item.seat}`);
    lines.push('');

    if (item.status === 'keep') {
      lines.push('**Status:** Keep as-is — this audience already ships the original piece.');
      if (item.checkReason) lines.push(`> ${item.checkReason}`);
      continue;
    }

    lines.push(`**New artifact:** ${item.title || '(untitled)'}`);
    lines.push('');
    if (item.format_call) lines.push(`**Format call:** ${item.format_call}`);
    if (item.reason) lines.push(`**Why the original failed this audience:** ${item.reason}`);
    lines.push('');

    if (item.must_include && item.must_include.length) {
      lines.push('**Must include:**');
      item.must_include.forEach((m) => lines.push(`- ${m}`));
      lines.push('');
    }
    if (item.leave_out && item.leave_out.length) {
      lines.push('**Leave out:**');
      item.leave_out.forEach((m) => lines.push(`- ${m}`));
      lines.push('');
    }

    const checkLabel = item.checkStage === 'pass'
      ? `✅ PASS · ${item.checkVerdict || 'Ship'}`
      : item.checkStage === 'fail'
        ? `❌ FAIL · ${item.checkVerdict || 'Reject'}`
        : '⏳ Not yet checked';
    lines.push(`**Reconvene result:** ${checkLabel}`);
    if (item.checkReason) lines.push(`> ${item.checkReason}`);
    if (item.iterationCount) lines.push(`_Iterated ${item.iterationCount} time${item.iterationCount === 1 ? '' : 's'}._`);
    lines.push('');

    lines.push('**Draft content:**');
    lines.push('');
    lines.push('```');
    lines.push(item.draft_content || '(no draft)');
    lines.push('```');
  }

  if (plan.leftOut && plan.leftOut.length) {
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push('## Left out');
    lines.push('');
    lines.push(`${plan.leftOut.join(', ')} — deliberately not served by this plan.`);
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('_Generated by The Greenlight dashboard._');
  return lines.join('\n');
}

function buildPlanPrompt({ seats, convResult, contentPath, contentLabel }) {
  const seatsInfo = seats.map((s) => `- ${s.label} (profile: ${s.profile || 'n/a'})\n  Goal: ${s.goal}\n  Needs: ${s.needs.map((n) => `${n.name}${n.dealBreaker ? ' [deal-breaker]' : ''}`).join('; ')}`).join('\n');

  const dataPackNote = DATA_PACK_EXISTS
    ? `\nAudience card detail, if useful for grounding "what must include", lives at "${DATA_PACK_DIR}\\audience-cards\\" — read the file matching each seat's profile id if you want more texture than the seat's criteria give.\n`
    : '';

  return `You are running THE GREENLIGHT skill's "plan" step (see "${GREENLIGHT_REF_PATH}") as a backend job for a live dashboard. There is no human to ask follow-up questions — make reasonable calls and proceed.

The piece already reviewed: "${contentLabel}" (file: "${contentPath}")

The seated council and what each needs:
${seatsInfo}
${dataPackNote}
Here is the review that already ran, as JSON — use its verdicts, quotes, and per-need fixes as the gaps to build from. Do not re-review the piece from scratch; build the plan FROM these results:

${JSON.stringify(convResult, null, 2)}

For every seat whose verdict was Ship: mark it "keep" — the existing piece already serves them, no new artifact needed.

For every seat whose verdict was Revise or Reject: write a build order per the Plan step's rules:
- why it didn't work for them (the failed need + its quote, from the review above)
- the honest format call — if the piece failed because of format (too long, wrong medium, needs a desk, needs sound, etc.) say so plainly; don't just say "trim it" when the real answer is "this shouldn't be a document"
- what to make: a concrete, specific title for the new artifact and its format (e.g. "a 90-second silent-captioned video script", "a one-page laminated job aid", "a three-line Teams message")
- what it must include: 2-4 concrete things straight from that audience's needs/profile
- what to leave out: things other audiences needed that this one explicitly does not

Then ALSO draft the actual replacement content for every "make_new" item — not just a description of it. Write real text that could ship: if the format is a video, write the on-screen text / narration script line by line; if it's a job aid, write the actual job aid text; if it's a short message, write the actual message text. Keep it honest to the stated format's real-world constraints (time limits, reading level, offline/degraded-network realities, vocabulary) from that audience's criteria.

If any seat is deliberately left with nothing planned for them, list it under left_out and say why that's a decision, not an accident. Ideally left_out is empty — every audience gets something.

Respond with ONLY a single JSON object — no markdown fences, no prose before or after it. Match exactly this shape:

{
  "content_label": "${contentLabel}",
  "items": [
    {
      "seat": "<exact seat string from the list above>",
      "status": "keep" | "make_new",
      "reason": "<why it didn't work, with a quote — null if status is keep>",
      "format_call": "<the honest format call — null if status is keep>",
      "title": "<title of the new artifact — null if status is keep>",
      "must_include": ["<2-4 concrete things>"],
      "leave_out": ["<things intentionally excluded>"],
      "draft_content": "<the actual drafted replacement text, plain text with \\n for line breaks — null if status is keep>"
    }
  ],
  "left_out": ["<any seat strings intentionally left unserved, ideally empty>"]
}

Output that JSON object now, and nothing else.`;
}

function buildRecheckPrompt({ items }) {
  const itemsBlock = items.map((it, i) => `### Item ${i + 1} — for ${it.seat}
Goal: ${it.goal}
Needs to judge against (ONLY these — this draft was built for this one audience, don't apply any other audience's bar):
${it.needs.map((n) => `- ${n.name}${n.dealBreaker ? ' [deal-breaker]' : ''}`).join('\n')}

Title / intended format: ${it.title}

Draft content to score:
"""
${it.draft_content}
"""`).join('\n\n');

  return `You are running THE GREENLIGHT skill's "check the plan" step (see "${GREENLIGHT_REF_PATH}", Step 3) as a backend job. Score each drafted replacement artifact below against ONLY the single audience it was built for — the same needs, same 0-3 scale, same deal-breaker rule, same Ship/Revise/Reject bars as a normal review (Ship 2.5+, Revise 1.5+, Reject under 1.5; any deal-breaker need scored 0 forces Reject regardless of average).

${itemsBlock}

For each item, give a verdict, overall_score, whether a deal-breaker was hit, a one-line reason, and a per-need breakdown with score/quote (from the draft, or "no quote found")/reason/confidence/fix (fix required when score is 1 or lower, null otherwise).

The rule for "good to go": this new artifact passes only if the audience that rejected the original would now accept this draft, judged on the same needs it judged the original by.

Respond with ONLY a single JSON object — no markdown fences, no prose before or after it:

{
  "results": [
    {
      "seat": "<exact seat string>",
      "verdict": "Ship" | "Revise" | "Reject",
      "overall_score": <number, one decimal>,
      "deal_breaker_hit": <true|false>,
      "one_line_reason": "<short reason with a quote>",
      "needs": [
        { "name": "<need name>", "score": <0-3>, "quote": "<from the draft, or 'no quote found'>", "reason": "<why>", "confidence": "high"|"medium"|"low", "fix": "<what would raise it, or null>" }
      ]
    }
  ]
}

Output that JSON object now, and nothing else.`;
}

function buildIteratePrompt(item, seatInfo) {
  const fixes = (item.checkNeeds || [])
    .filter((n) => n.fix)
    .map((n) => `- ${n.name}: ${n.fix}`)
    .join('\n') || '(no specific per-need fixes recorded — use the reason below)';

  return `You are running THE GREENLIGHT skill's iteration loop — revising a drafted remediation artifact so it would pass the same audience's review on the next pass.

Audience: ${item.seat}
Goal: ${seatInfo ? seatInfo.goal : ''}
Title / intended format: ${item.title}
Must include: ${(item.must_include || []).join('; ') || '(none recorded)'}
Leave out: ${(item.leave_out || []).join('; ') || '(none recorded)'}

The current draft:
"""
${item.draft_content}
"""

Why it failed the last check: ${item.checkReason || '(unknown)'}
Specific fixes requested:
${fixes}

Rewrite the draft to address every fix while staying true to the stated format and everything it must include or leave out. Keep it realistic and concrete — actual content a reader would see, not a description of content.

Respond with ONLY a single JSON object — no markdown fences, no prose before or after it:

{ "draft_content": "<the revised draft, plain text with \\n for line breaks>", "changelog": "<one sentence on what changed>" }

Output that JSON object now, and nothing else.`;
}

function runPlanBuild(plan, sourceJob) {
  const prompt = buildPlanPrompt({
    seats: plan.seats,
    convResult: sourceJob.result,
    contentPath: plan.contentPath,
    contentLabel: plan.contentLabel
  });
  const addDirs = [SKILL_DIR, UPLOADS_DIR];
  if (DATA_PACK_EXISTS) addDirs.push(DATA_PACK_DIR);

  const originalVerdictBySeat = new Map((sourceJob.result.seats || []).map((s) => [s.seat, s.verdict]));

  execCopilotJson(prompt, { addDirs, job: plan })
    .then((parsed) => {
      plan.items = (parsed.items || []).map((it) => ({
        seat: it.seat,
        status: it.status === 'keep' ? 'keep' : 'make_new',
        reason: it.reason || null,
        format_call: it.format_call || null,
        title: it.title || null,
        must_include: it.must_include || [],
        leave_out: it.leave_out || [],
        draft_content: it.draft_content || null,
        changelog: null,
        iterationCount: 0,
        checkStage: it.status === 'keep' ? 'pass' : 'pending', // pending | checking | pass | fail
        checkVerdict: it.status === 'keep' ? 'Ship' : null,
        checkReason: it.status === 'keep' ? 'Unchanged — already Ship for this audience.' : '',
        checkNeeds: [],
        checkScore: it.status === 'keep' ? null : null,
        checkDealBreaker: false,
        // What this seat's verdict was in the *original* review, before any
        // plan/redraft — used so "Past runs" history can always compute an
        // up-to-date verdict per seat even for items nobody has rechecked yet.
        originalVerdict: originalVerdictBySeat.get(it.seat) || null
      }));
      plan.leftOut = parsed.left_out || [];
      plan.status = 'ready';
      plan.overall = 'unchecked';
      plan.updatedAt = Date.now();
      persistPlan(plan);
      updateRunFileWithEffectiveVerdicts(plan);
    })
    .catch((err) => {
      plan.status = 'error';
      plan.error = err.message;
      plan.updatedAt = Date.now();
    });
}

/**
 * Recomputes each seat's *current best-known* verdict — Ship for a kept seat,
 * the latest recheck verdict for a drafted replacement once it's been
 * checked, or otherwise the original review's verdict — and writes that back
 * into the persisted run file for this plan's source review. Without this,
 * "Past runs" would freeze on the review's initial verdicts forever, even
 * after the plan brings every audience to Ship.
 */
function updateRunFileWithEffectiveVerdicts(plan) {
  if (!plan.sourceJobId) return;
  try {
    const runFile = path.join(RUNS_DIR, `${plan.sourceJobId}.json`);
    if (!fs.existsSync(runFile)) return;
    const run = JSON.parse(fs.readFileSync(runFile, 'utf8'));
    if (!run.result || !Array.isArray(run.result.seats)) return;

    const effectiveBySeat = new Map(plan.items.map((it) => {
      let verdict;
      if (it.status === 'keep') verdict = 'Ship';
      else if (it.checkStage === 'pass' || it.checkStage === 'fail') verdict = it.checkVerdict || (it.checkStage === 'pass' ? 'Ship' : 'Reject');
      else verdict = it.originalVerdict || null;
      return [it.seat, verdict];
    }));

    run.result.seats = run.result.seats.map((s) => {
      const effective = effectiveBySeat.get(s.seat);
      return effective ? { ...s, verdict: effective } : s;
    });
    run.planId = plan.id;
    run.planOverall = plan.overall;
    run.updatedAt = Date.now();
    fs.writeFileSync(runFile, JSON.stringify(run, null, 2));
  } catch (e) {
    // Best-effort — history staying slightly stale is not worth failing the plan over.
  }
}

function recomputeOverall(plan) {
  plan.overall = plan.items.every((it) => it.checkStage === 'pass') ? 'green' : 'not_green';
}

function runPlanRecheck(plan, itemsToCheck) {
  const seatMap = new Map((plan.seats || []).map((s) => [s.label, s]));
  const promptItems = itemsToCheck.map((it) => {
    const seatInfo = seatMap.get(it.seat) || {};
    return {
      seat: it.seat,
      goal: seatInfo.goal || '',
      needs: seatInfo.needs || [],
      title: it.title,
      draft_content: it.draft_content
    };
  });
  const prompt = buildRecheckPrompt({ items: promptItems });

  execCopilotJson(prompt, { addDirs: [SKILL_DIR], job: plan })
    .then((parsed) => {
      const results = parsed.results || [];
      for (const r of results) {
        const item = plan.items.find((it) => it.seat === r.seat);
        if (!item) continue;
        item.checkVerdict = r.verdict;
        item.checkStage = String(r.verdict || '').toLowerCase() === 'ship' ? 'pass' : 'fail';
        item.checkReason = r.one_line_reason || '';
        item.checkNeeds = r.needs || [];
        item.checkScore = r.overall_score;
        item.checkDealBreaker = !!r.deal_breaker_hit;
      }
      // Anything we asked for but didn't get a result back on stays actionable, not silently stuck.
      for (const it of itemsToCheck) {
        if (it.checkStage === 'checking') {
          it.checkStage = 'fail';
          it.checkReason = 'No result returned for this item — try rechecking again.';
        }
      }
      recomputeOverall(plan);
      plan.updatedAt = Date.now();
      persistPlan(plan);
      updateRunFileWithEffectiveVerdicts(plan);
    })
    .catch((err) => {
      for (const it of itemsToCheck) {
        it.checkStage = 'fail';
        it.checkReason = `Check failed: ${err.message}`;
      }
      plan.overall = 'not_green';
      plan.updatedAt = Date.now();
      updateRunFileWithEffectiveVerdicts(plan);
    });
}

function runIterateThenRecheck(plan, item) {
  const seatMap = new Map((plan.seats || []).map((s) => [s.label, s]));
  const seatInfo = seatMap.get(item.seat);
  const prompt = buildIteratePrompt(item, seatInfo);

  execCopilotJson(prompt, { addDirs: [SKILL_DIR], job: plan })
    .then((parsed) => {
      item.draft_content = parsed.draft_content || item.draft_content;
      item.changelog = parsed.changelog || null;
      item.iterationCount = (item.iterationCount || 0) + 1;
      persistPlan(plan);
      // Chain straight into a recheck of just this item so one "Iterate" click
      // resolves all the way to a new pass/fail without a second button press.
      item.checkStage = 'checking';
      runPlanRecheck(plan, [item]);
    })
    .catch((err) => {
      item.checkStage = 'fail';
      item.checkReason = `Redraft failed: ${err.message}`;
      plan.overall = 'not_green';
      plan.updatedAt = Date.now();
      updateRunFileWithEffectiveVerdicts(plan);
    });
}

// ---------------------------------------------------------------------------
// Fetching a pasted link into a local text file so it can be reviewed the
// same way as a dropped document.
// ---------------------------------------------------------------------------

async function fetchUrlToFile(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  const contentType = res.headers.get('content-type') || '';
  const raw = await res.text();

  let text = raw;
  let ext = '.txt';
  if (contentType.includes('html')) {
    ext = '.html.txt';
    text = htmlToText(raw);
  }

  const safeName = `link-${Date.now()}${ext}`;
  const filePath = path.join(UPLOADS_DIR, safeName);
  fs.writeFileSync(filePath, `Source URL: ${url}\n\n${text}`, 'utf8');
  return filePath;
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
      const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      cb(null, `${Date.now()}-${safe}`);
    }
  }),
  limits: { fileSize: 25 * 1024 * 1024 }
});

app.get('/api/council', (req, res) => {
  try {
    const council = loadCouncil();
    res.json({ ok: true, ...council });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// --- Council management (TODO)  ·  Path: re-seat / add / remove / customize --
// The council is read-only today (GET above + "Reload council"). This path adds
// editing it from the UI — two endpoints to build, plus a bit of UI to call them.
// Tip: the "Manage council seats" button has a one-click "Copy prompt for
// Copilot Chat" that describes this whole feature.
app.post('/api/council/seat', (req, res) => {
  // TODO (council path): create or update a seat from req.body and write it to
  // council/<seat_id>.json; the next Reload/Convene picks it up automatically.
  //
  // A start (for you / your Copilot session):
  //   - Expect a seat shaped like council/retail.example.json:
  //       { seat_id, audience, card, outcome, thresholds, criteria: [ ... ] }
  //   - Validate the essentials (seat_id, audience, outcome, >=1 criterion) and
  //     reject anything missing — a malformed seat breaks convene.
  //   - Allow only [a-z0-9-_] in seat_id so it can't escape COUNCIL_DIR, then
  //     fs.writeFileSync(path.join(COUNCIL_DIR, `${seat_id}.json`), JSON...).
  return res.status(501).json({ ok: false, error: 'Council editing not built yet — implement POST /api/council/seat.' });
});

app.delete('/api/council/seat/:seatId', (req, res) => {
  // TODO (council path): remove council/<seatId>.json (guard the filename to
  // [a-z0-9-_]), then the next Reload reflects it. Refuse to drop below two
  // seats — a council of one can't disagree.
  return res.status(501).json({ ok: false, error: 'Council editing not built yet — implement DELETE /api/council/seat/:seatId.' });
});

app.post('/api/convene', upload.single('file'), async (req, res) => {
  let contentPath, contentLabel;

  try {
    if (req.file) {
      contentPath = req.file.path;
      contentLabel = req.file.originalname;
    } else if (req.body && req.body.url) {
      const url = String(req.body.url).trim();
      if (!/^https?:\/\//i.test(url)) {
        return res.status(400).json({ ok: false, error: 'Please provide a full http(s) URL.' });
      }
      contentPath = await fetchUrlToFile(url);
      contentLabel = url;
    } else {
      return res.status(400).json({ ok: false, error: 'Attach a file or provide a url.' });
    }
  } catch (err) {
    return res.status(400).json({ ok: false, error: `Could not read that link: ${err.message}` });
  }

  let council;
  try {
    council = loadCouncil();
  } catch (err) {
    return res.status(500).json({ ok: false, error: `Could not read the council (council/*.json): ${err.message}` });
  }
  if (!council.seats.length) {
    return res.status(400).json({ ok: false, error: 'No seats in council/*.json yet — seat the council first.' });
  }

  // The countable half runs first — it's instant, and showing it while the
  // model deliberates is the whole "code catches what the model might miss" point.
  const { status: checksStatus, seats: checks } = await runDeterministicChecks(contentPath);

  const job = newJob({ contentLabel, contentPath, seatCount: council.seats.length, seats: council.seats, checks, checksStatus });
  runConvene(job, { seats: council.seats, contentPath, contentLabel });

  res.status(202).json({ ok: true, jobId: job.id, contentLabel, seats: council.seats, checks, checksStatus });
});

app.get('/api/convene/:jobId', (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ ok: false, error: 'Unknown job id.' });
  res.json({
    ok: true,
    id: job.id,
    status: job.status,
    contentLabel: job.contentLabel,
    startedAt: job.startedAt,
    finishedAt: job.finishedAt,
    model: COPILOT_MODEL || null,
    checks: job.checks || [],
    checksStatus: job.checksStatus || 'ok',
    log: job.log,
    result: job.result,
    error: job.error
  });
});

app.get('/api/runs', (req, res) => {
  try {
    const files = fs.readdirSync(RUNS_DIR).filter((f) => f.endsWith('.json'));
    const runs = files
      .map((f) => {
        try {
          return JSON.parse(fs.readFileSync(path.join(RUNS_DIR, f), 'utf8'));
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.finishedAt - a.finishedAt)
      .slice(0, 25);
    res.json({ ok: true, runs });
  } catch (err) {
    res.json({ ok: true, runs: [] });
  }
});

// --- Greenlight it: build a remediation plan from a finished review -------

app.post('/api/plan', (req, res) => {
  const { jobId } = req.body || {};
  const sourceJob = jobs.get(jobId);
  if (!sourceJob) return res.status(404).json({ ok: false, error: 'Unknown review id.' });
  if (sourceJob.status !== 'done' || !sourceJob.result) {
    return res.status(400).json({ ok: false, error: 'That review has not finished yet.' });
  }
  if (!sourceJob.seats || !sourceJob.seats.length) {
    return res.status(400).json({ ok: false, error: 'That review has no seat data attached — re-run the review.' });
  }

  const plan = newPlan({
    sourceJobId: jobId,
    contentLabel: sourceJob.contentLabel,
    contentPath: sourceJob.contentPath,
    seats: sourceJob.seats
  });
  runPlanBuild(plan, sourceJob);

  res.status(202).json({ ok: true, planId: plan.id });
});

app.get('/api/plan/:planId', (req, res) => {
  const plan = plans.get(req.params.planId);
  if (!plan) return res.status(404).json({ ok: false, error: 'Unknown plan id.' });
  res.json({
    ok: true,
    id: plan.id,
    sourceJobId: plan.sourceJobId,
    contentLabel: plan.contentLabel,
    status: plan.status,
    overall: plan.overall,
    error: plan.error,
    log: plan.log,
    items: plan.items,
    leftOut: plan.leftOut,
    updatedAt: plan.updatedAt
  });
});

app.post('/api/plan/:planId/recheck', (req, res) => {
  const plan = plans.get(req.params.planId);
  if (!plan) return res.status(404).json({ ok: false, error: 'Unknown plan id.' });
  if (plan.status !== 'ready') return res.status(400).json({ ok: false, error: 'Plan is not ready yet.' });

  const targetSeats = (req.body && req.body.seats) || null;
  // With no explicit seats requested, "reconvene" means: recheck everything
  // that hasn't already passed — including drafts that were just revised via
  // Iterate. Already-passing items are left alone so a second reconvene only
  // spends CLI time on what actually still needs it.
  const itemsToCheck = plan.items.filter((it) => {
    if (it.status !== 'make_new') return false;
    if (targetSeats) return targetSeats.includes(it.seat);
    return it.checkStage !== 'pass';
  });
  if (!itemsToCheck.length) {
    return res.status(400).json({ ok: false, error: 'Nothing left to check — every drafted item already passed.' });
  }

  itemsToCheck.forEach((it) => { it.checkStage = 'checking'; });
  plan.overall = 'checking';
  plan.updatedAt = Date.now();

  runPlanRecheck(plan, itemsToCheck);
  res.status(202).json({ ok: true });
});

app.post('/api/plan/:planId/iterate', (req, res) => {
  const plan = plans.get(req.params.planId);
  if (!plan) return res.status(404).json({ ok: false, error: 'Unknown plan id.' });
  const seat = req.body && req.body.seat;
  const item = plan.items.find((it) => it.seat === seat && it.status === 'make_new');
  if (!item) return res.status(400).json({ ok: false, error: 'Unknown seat, or that seat has nothing to iterate on.' });

  item.checkStage = 'checking';
  plan.overall = 'checking';
  plan.updatedAt = Date.now();

  runIterateThenRecheck(plan, item);
  res.status(202).json({ ok: true });
});

app.get('/api/plan/:planId/export', (req, res) => {
  const plan = plans.get(req.params.planId);
  if (!plan) return res.status(404).json({ ok: false, error: 'Unknown plan id.' });

  const format = String(req.query.format || 'md').toLowerCase();
  const safeLabel = (plan.contentLabel || 'plan').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 60) || 'plan';

  if (format === 'json') {
    res.setHeader('Content-Disposition', `attachment; filename="greenlight-plan-${safeLabel}.json"`);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.send(JSON.stringify({
      contentLabel: plan.contentLabel,
      overall: plan.overall,
      items: plan.items,
      leftOut: plan.leftOut,
      updatedAt: plan.updatedAt
    }, null, 2));
  }

  res.setHeader('Content-Disposition', `attachment; filename="greenlight-plan-${safeLabel}.md"`);
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.send(composePlanMarkdown(plan));
});

// --- PR submission workflow (TODO)  ·  Path: Submit the greenlit plan --------
// The Submit button and this endpoint are wired; the workflow is yours to build:
// turn a GREEN plan into a pull request into the hack submission repo.
// Tip: clicking "Submit to hack repo" on a green plan pops a "Copy prompt for
// Copilot Chat" that describes this workflow.
app.post('/api/plan/:planId/submit', async (req, res) => {
  const plan = plans.get(req.params.planId);
  if (!plan) return res.status(404).json({ ok: false, error: 'Unknown plan id.' });
  if (plan.overall !== 'green') {
    return res.status(400).json({ ok: false, error: 'Plan is not green yet — every audience must be served before submitting.' });
  }

  // TODO (submission path): open a PR into SUBMISSION_REPO from this green plan.
  //
  // A shape to build toward (a start for you / your Copilot session):
  //   1. Assemble the artifacts from plan.items:
  //        - each item with status "make_new" has draft_content -> write it as a file
  //        - build a PR body summarizing coverage + per-seat verdicts
  //          (item.seat, item.status, item.checkVerdict, item.title)
  //      composePlanMarkdown(plan) already renders a full plan doc you can reuse.
  //   2. Write the bundle somewhere durable (e.g. SUBMISSIONS_DIR/<plan.id>/) so
  //      there's an artifact even before the PR opens.
  //   3. Open the PR. Simplest reliable path, from a local clone of the repo:
  //        git checkout -b greenlight/<slug>  ->  copy files  ->  git add/commit/push
  //        ->  spawn(GH_BIN, ['pr','create','--repo',SUBMISSION_REPO,'--base',
  //             SUBMISSION_BASE,'--title',...,'--body-file',...])
  //      Keep SUBMISSION_REPO a placeholder-safe default; only push when a real
  //      repo (and a local clone) are configured.
  //   4. Return { ok: true, prUrl } on success — the front-end shows it as a link.
  return res.status(501).json({
    ok: false,
    error: 'Submission workflow not built yet — implement POST /api/plan/:planId/submit (see the TODO in server.js).'
  });
});

app.listen(PORT, () => {
  console.log(`The Greenlight dashboard running at http://localhost:${PORT}`);
  console.log(`Reading council from: ${COUNCIL_DIR}`);
  preflightCopilot();
});
