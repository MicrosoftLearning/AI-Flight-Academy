// The Dispatch — live routing board
//
// Serves a browser dashboard that:
//  - reads council/*.json at request time and shows the seated Global Skilling teams
//  - accepts a dropped/pasted skilling request to "dispatch"
//  - runs the intake gate (check_content.py) to see if the request is routable
//  - shells out to the GitHub Copilot CLI (`copilot`) to run the Dispatch process:
//    each team takes a position, then the room lands ONE routing decision
//    (owner · audience · plan of deliverables + reuse · disposition · next-action)
//
// Nothing here hardcodes the council — every run re-reads council/*.json, so
// editing those files (adding/removing a team) changes the room and the next
// dispatch without touching this server. "Sharpen & re-dispatch" is just
// re-dropping an edited request — no separate machinery.

const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 4173;

// This dashboard ships inside the-dispatch-starter/. The seated room is DATA
// (council/*.json); the process references live in the sibling the-dispatch/
// skill. Everything is discovered relative to the starter so it works on any
// machine — override any path with an env var.
const STARTER_DIR = path.resolve(__dirname, '..');
const COUNCIL_DIR = process.env.DISPATCH_COUNCIL_DIR || path.join(STARTER_DIR, 'council');
const SKILL_DIR = process.env.DISPATCH_SKILL_DIR || path.resolve(STARTER_DIR, '..', 'the-dispatch');
const CONVENE_REF_PATH = path.join(SKILL_DIR, 'reference', 'convene.md');
const DISPATCH_REF_PATH = path.join(SKILL_DIR, 'reference', 'dispatch.md');
const RUN_CWD = fs.existsSync(SKILL_DIR) ? SKILL_DIR : STARTER_DIR;

// The data pack (team card detail, sample requests) sits next to the starter.
// Purely a grounding aid; everything still works if it isn't there.
const DATA_PACK_DIR = process.env.DISPATCH_DATA_PACK || path.resolve(STARTER_DIR, '..', 'dispatch-data');
const DATA_PACK_EXISTS = fs.existsSync(DATA_PACK_DIR);

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const RUNS_DIR = path.join(__dirname, 'runs');
for (const dir of [UPLOADS_DIR, RUNS_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// --- Config for the "act on the decision" path (TODO bonus) -----------------
// Placeholder by default. Wiring the decision to a real action (open a work
// item, post to a channel, route to the owner) is a build path — see the TODO
// stub at POST /api/dispatch/:id/act near the bottom of this file.
const ACT_TARGET = process.env.DISPATCH_ACT_TARGET || '<your intake tracker or channel>';

const COPILOT_BIN = process.env.COPILOT_BIN || 'copilot';
// Pin a cheap-ish model so runs are cost-predictable across the hack; override
// with DISPATCH_MODEL (set it to '' or 'auto' to let the CLI pick).
const COPILOT_MODEL = process.env.DISPATCH_MODEL !== undefined ? process.env.DISPATCH_MODEL : 'claude-sonnet-4.6';
const COPILOT_TIMEOUT_MS = Number(process.env.DISPATCH_TIMEOUT_MS || 6 * 60 * 1000);

// The intake gate — check_content.py at the starter root. Node shells to Python
// so the board can say "routable" or "sharpen first" before the room decides.
const PYTHON_BIN = process.env.DISPATCH_PYTHON || 'python';
const CHECK_SCRIPT = path.join(STARTER_DIR, 'check_content.py');

/**
 * Run the intake gate for a request. Resolves { status, routable, present,
 * missing, detail } where status is 'ok' (ran), 'todo' (check_content.py still
 * a stub), or 'error'. Best-effort: an unbuilt stub or missing Python never
 * blocks the room — the board just can't show the routable badge, so it lets
 * the request through and the model still applies the "sharpen if rough" rule.
 */
function runIntakeGate(requestPath) {
  return new Promise((resolve) => {
    let child;
    try {
      child = spawn(PYTHON_BIN, [CHECK_SCRIPT, requestPath], { windowsHide: true, shell: false });
    } catch {
      return resolve({ status: 'error', routable: true, present: [], missing: [], detail: '' });
    }
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', () => resolve({ status: 'error', routable: true, present: [], missing: [], detail: '' }));
    child.on('close', () => {
      let parsed = null;
      try { parsed = JSON.parse(out); } catch { /* non-JSON */ }
      if (parsed && typeof parsed.routable === 'boolean') {
        return resolve({ status: 'ok', routable: parsed.routable, present: parsed.present || [], missing: parsed.missing || [], detail: parsed.detail || '' });
      }
      const msg = (parsed && parsed.error) || err || '';
      if (/TODO|NotImplementedError/i.test(msg)) {
        return resolve({ status: 'todo', routable: true, present: [], missing: [], detail: 'intake gate not built yet (check_content.py is a stub)' });
      }
      return resolve({ status: 'error', routable: true, present: [], missing: [], detail: '' });
    });
  });
}

/**
 * On startup, confirm the GitHub Copilot CLI is reachable. Auth is the CLI's
 * own concern — a missing/unfound binary is the #1 first-run failure, so say so
 * clearly instead of letting the first dispatch blow up with a raw spawn error.
 */
function preflightCopilot() {
  console.log(`[dispatch] listening on http://localhost:${PORT}`);
  let child;
  try {
    child = spawn(COPILOT_BIN, ['--version'], { windowsHide: true, shell: false });
  } catch {
    child = null;
  }
  const warn = () => {
    console.warn(`\n[dispatch] Could not run the GitHub Copilot CLI ("${COPILOT_BIN}").`);
    console.warn('[dispatch] Install it and sign in to your GitHub account (the one with a Copilot seat),');
    console.warn('[dispatch] or set COPILOT_BIN to its full path. Dispatches will fail until this works.\n');
  };
  if (!child) return warn();
  let out = '';
  child.stdout.on('data', (d) => (out += d));
  child.stderr.on('data', (d) => (out += d));
  child.on('error', warn);
  child.on('close', (code) => {
    if (code === 0) console.log(`[dispatch] GitHub Copilot CLI OK: ${out.trim().split(/\r?\n/)[0] || 'found'}`);
    else warn();
  });
}

// ---------------------------------------------------------------------------
// council/*.json loading  (the seated room is DATA)
// ---------------------------------------------------------------------------

/** Map one team seat JSON (council/*.json) to the shape the dashboard renders
 *  and the prompt builds from. `*.example.json` is a template and is skipped. */
function seatFromJson(seat, index) {
  const label = seat.team || seat.team_id || `Team ${index + 1}`;
  const emojiMatch = label.match(/^(\p{Extended_Pictographic}\uFE0F?)\s*(.*)$/u);
  return {
    id: seat.team_id || `team-${index}`,
    emoji: emojiMatch ? emojiMatch[1] : '🏷️',
    name: emojiMatch ? emojiMatch[2].trim() : label,
    label,
    card: seat.card || null,
    owns: seat.owns || '',
    serves: seat.serves || '',
    produces: seat.produces || [],
    saysYesWhen: seat.says_yes_when || [],
    saysNoWhen: seat.says_no_when || [],
    formatBias: seat.format_bias || '',
    voice: seat.voice || ''
  };
}

function loadCouncil() {
  const files = fs.readdirSync(COUNCIL_DIR)
    .filter((f) => f.endsWith('.json') && !f.endsWith('.example.json'))
    .sort();
  const seats = files.map((f, i) =>
    seatFromJson(JSON.parse(fs.readFileSync(path.join(COUNCIL_DIR, f), 'utf8')), i));
  return { seats, path: COUNCIL_DIR };
}

// ---------------------------------------------------------------------------
// In-memory job tracking (one job per "dispatch" run)
// ---------------------------------------------------------------------------

const jobs = new Map(); // jobId -> job

function newJob(meta) {
  const id = crypto.randomUUID();
  const job = { id, status: 'running', startedAt: Date.now(), finishedAt: null, log: '', result: null, error: null, ...meta };
  jobs.set(id, job);
  return job;
}

function appendLog(job, chunk) {
  job.log += chunk;
  const MAX = 200_000;
  if (job.log.length > MAX) job.log = job.log.slice(job.log.length - MAX);
}

// ---------------------------------------------------------------------------
// Building the prompt and invoking the GitHub Copilot CLI
// ---------------------------------------------------------------------------

function buildPrompt({ seats, requestPath, requestLabel, routable, missing }) {
  const seatBlock = seats.map((s, i) => `${i + 1}. ${s.label} (card: ${s.card || 'n/a'})
   Owns: ${s.owns}
   Serves: ${s.serves}
   Produces: ${(s.produces || []).join(', ')}
   Says YES when: ${(s.saysYesWhen || []).join('; ')}
   Says NO / routes elsewhere when: ${(s.saysNoWhen || []).join('; ')}
   Format bias: ${s.formatBias}
   Voice: ${s.voice}`).join('\n\n');

  const routableLine = routable
    ? 'The intake gate says this request is ROUTABLE — it has enough to decide.'
    : `The intake gate says this request is NOT yet routable — missing: ${(missing || []).join(', ') || 'required fields'}. The room's honest job is to SHARPEN it (pin the missing pieces); the disposition should be "defer" or "decline-and-redirect" (go back to the requester), NOT a confident route.`;

  return `You are running THE DISPATCH skill's convene step as a backend job for a live dashboard — there is no human to ask follow-up questions, so make reasonable calls and proceed.

Read "${CONVENE_REF_PATH}" for how each team takes a position, and "${DISPATCH_REF_PATH}" for how the room turns positions into ONE routing decision.

The incoming skilling request is at: "${requestPath}"  (label: ${requestLabel})
${routableLine}

Seat these Global Skilling teams, in this exact order. Each reacts to the request through its OWN lens — what it owns, who it serves, what makes it say yes or no, its format bias, its voice:

${seatBlock}

STEP 1 — Each team takes a position. For every team above, decide:
  - interest: "in" (wants to own it) | "support" (would help) | "out" (passes)
  - deliverable: what THIS team would make for it (draw from what it produces), or null if out
  - reuse: a deliverable it could REUSE from another team, or one of ITS deliverables another team could reuse — or null
  - effort: "S" | "M" | "L"
  - ownership: "own" | "support" | "pass"
  - disposition_lean: proceed-as-is | reshape | split | defer | decline-and-redirect
  - rationale: one line in the team's own voice, grounded in its card

STEP 2 — The room lands ONE routing decision. Who FIELDS it is often easy; the DEBATE is the PLAN — the deliverables, the audience, and especially REUSE (build once, reuse across teams). Decide:
  - owner: exactly ONE primary team label that fields and coordinates it
  - audience: who it's REALLY for (one or more) — may differ from the request's stated audience
  - plan: the deliverables that satisfy it. Each: { what (the shape), builder (a team label), reused_by (team labels that reuse it, or []), audience (who that deliverable serves) }. Build once, reuse across teams — never have two teams build the same thing.
  - disposition: proceed-as-is | reshape | split | defer | decline-and-redirect
  - next_action: one concrete next step with a team on it

STEP 3 — Name the sharpest DISAGREEMENT in 1-2 sentences (usually about the plan or the reuse, not who owns it).

Guardrails: exactly one primary owner; audience is never blank or "everyone" without a primary; every audience named is served by at least one deliverable; if the audience is partners, Field & Partner must be the owner or in next_action; certify only stable topics; a NOT-routable request must defer or redirect, never route confidently.

Respond with ONLY a single JSON object — no markdown code fences, no prose before or after it. It must match exactly this shape:

{
  "request_label": "${requestLabel}",
  "routable": ${routable},
  "positions": [
    {
      "team": "<one of the exact team labels above>",
      "interest": "in" | "support" | "out",
      "deliverable": "<what this team would make, or null>",
      "reuse": "<a build-once/reuse link, or null>",
      "effort": "S" | "M" | "L",
      "ownership": "own" | "support" | "pass",
      "disposition_lean": "proceed-as-is" | "reshape" | "split" | "defer" | "decline-and-redirect",
      "rationale": "<one line in the team's voice>"
    }
  ],
  "decision": {
    "owner": "<one exact team label>",
    "audience": ["<who it's really for>"],
    "plan": [
      { "what": "<deliverable / shape>", "builder": "<team label>", "reused_by": ["<team labels, or empty>"], "audience": "<who this deliverable serves>" }
    ],
    "disposition": "proceed-as-is" | "reshape" | "split" | "defer" | "decline-and-redirect",
    "next_action": "<one concrete next step with a team on it>"
  },
  "debate": "<1-2 sentences on the sharpest clash, naming both sides>"
}

Output that JSON object now, and nothing else.`;
}

function runDispatch(job, { seats, requestPath, requestLabel, routable, missing }) {
  const prompt = buildPrompt({ seats, requestPath, requestLabel, routable, missing });
  const addDirs = [UPLOADS_DIR];
  if (fs.existsSync(SKILL_DIR)) addDirs.push(SKILL_DIR);
  if (DATA_PACK_EXISTS) addDirs.push(DATA_PACK_DIR);
  execCopilotJson(prompt, { addDirs, job })
    .then((parsed) => {
      job.result = parsed;
      job.status = 'done';
      job.finishedAt = Date.now();
      persistRun(job, requestLabel);
    })
    .catch((err) => {
      job.status = 'error';
      job.error = err.message;
      job.finishedAt = Date.now();
    });
}

function persistRun(job, requestLabel) {
  try {
    fs.writeFileSync(path.join(RUNS_DIR, `${job.id}.json`), JSON.stringify({
      id: job.id, requestLabel, startedAt: job.startedAt, finishedAt: job.finishedAt,
      model: COPILOT_MODEL || null, routable: job.routable, result: job.result
    }, null, 2));
  } catch { /* history is a nice-to-have */ }
}

/**
 * Spawn the Copilot CLI with a prompt and resolve with the parsed JSON object
 * it returns. Streams stdout/stderr into job.log as it runs.
 */
function execCopilotJson(prompt, { addDirs = [], job, timeoutMs = COPILOT_TIMEOUT_MS } = {}) {
  return new Promise((resolve, reject) => {
    const args = ['-p', prompt, '--allow-all-tools'];
    for (const dir of addDirs) args.push('--add-dir', dir);
    if (COPILOT_MODEL) args.push('--model', COPILOT_MODEL);
    args.push('-s');

    if (job) appendLog(job, `$ ${COPILOT_BIN} -p "<prompt omitted, ${prompt.length} chars>"${COPILOT_MODEL ? ` --model ${COPILOT_MODEL}` : ''} --allow-all-tools ${addDirs.map((d) => `--add-dir "${d}"`).join(' ')} -s\n\n`);

    let child;
    try {
      child = spawn(COPILOT_BIN, args, { cwd: RUN_CWD, windowsHide: true, shell: false });
    } catch (err) {
      return reject(new Error(`Could not launch the GitHub Copilot CLI ("${COPILOT_BIN}"). Is it installed, signed in, and on PATH (or set COPILOT_BIN)? Details: ${err.message}`));
    }

    let stdout = '';
    let stderr = '';
    const killTimer = setTimeout(() => {
      if (job) appendLog(job, `\n[dashboard] timed out after ${timeoutMs}ms, killing process\n`);
      child.kill();
    }, timeoutMs);

    child.stdout.on('data', (d) => { const t = d.toString(); stdout += t; if (job) appendLog(job, t); });
    child.stderr.on('data', (d) => { const t = d.toString(); stderr += t; if (job) appendLog(job, t); });
    child.on('error', (err) => { clearTimeout(killTimer); reject(new Error(`Copilot CLI process error: ${err.message}`)); });
    child.on('close', (code) => {
      clearTimeout(killTimer);
      if (code !== 0 && !stdout.trim()) {
        return reject(new Error(`Copilot CLI exited with code ${code}${stderr ? `: ${stderr.slice(-2000)}` : ''}`));
      }
      const parsed = extractJson(stdout);
      if (!parsed) return reject(new Error('Could not find a JSON result in the Copilot CLI output. See the raw log below.'));
      resolve(parsed);
    });
  });
}

/** Pull the model's JSON object out of CLI output that may include tool-call
 *  logs (with their own braces) before the final answer. Returns the LAST
 *  top-level balanced {...} that parses — robust to preamble and trailing text. */
function extractJson(text) {
  // Prefer fenced ```json blocks, last one first.
  let fences = [...text.matchAll(/```json\s*([\s\S]*?)```/gi)].map((m) => m[1]);
  if (!fences.length) fences = [...text.matchAll(/```\s*([\s\S]*?)```/g)].map((m) => m[1]);
  for (let i = fences.length - 1; i >= 0; i--) {
    try { return JSON.parse(fences[i]); } catch { /* next */ }
  }
  // Otherwise scan for every top-level balanced object (ignoring braces inside
  // strings) and return the last one that parses — that's the final answer.
  const objs = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === '{') { if (depth === 0) start = i; depth++; }
    else if (ch === '}' && depth > 0) {
      depth--;
      if (depth === 0 && start !== -1) { objs.push(text.slice(start, i + 1)); start = -1; }
    }
  }
  for (let i = objs.length - 1; i >= 0; i--) {
    try {
      const parsed = JSON.parse(objs[i]);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch { /* next */ }
  }
  return null;
}

// ---------------------------------------------------------------------------
// HTTP surface
// ---------------------------------------------------------------------------

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));
const upload = multer({ dest: UPLOADS_DIR });

// The seated room — re-read every call so editing council/*.json shows up live.
app.get('/api/council', (req, res) => {
  try {
    res.json({ seats: loadCouncil().seats });
  } catch (e) {
    res.status(500).json({ error: `Could not read the council: ${e.message}` });
  }
});

// Drop a request (an uploaded file OR pasted text) and dispatch it.
app.post('/api/dispatch', upload.single('file'), async (req, res) => {
  try {
    let requestPath;
    let requestLabel;
    if (req.file) {
      requestPath = req.file.path;
      requestLabel = req.body.label || req.file.originalname || 'Dropped request';
    } else if (req.body && (req.body.text || '').trim()) {
      const id = crypto.randomUUID();
      requestPath = path.join(UPLOADS_DIR, `${id}.md`);
      fs.writeFileSync(requestPath, req.body.text, 'utf8');
      requestLabel = req.body.label || 'Pasted request';
    } else {
      return res.status(400).json({ error: 'Drop a request file or paste request text.' });
    }

    const seats = loadCouncil().seats;
    if (!seats.length) return res.status(400).json({ error: 'No teams seated. Add a council/*.json team seat first.' });

    const gate = await runIntakeGate(requestPath);
    const job = newJob({ requestLabel, routable: gate.routable, gate });
    runDispatch(job, { seats, requestPath, requestLabel, routable: gate.routable, missing: gate.missing });
    res.json({ jobId: job.id, gate });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/dispatch/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'No such dispatch.' });
  res.json({
    id: job.id, status: job.status, requestLabel: job.requestLabel,
    routable: job.routable, gate: job.gate, result: job.result,
    error: job.error, log: job.log.slice(-8000)
  });
});

// --- Act on the decision (TODO bonus) --------------------------------------
// Turning a routing decision into a real action — open a work item, post to a
// channel, route to the owner — is a build path. Wire it up; until then it
// answers 501 so the dashboard can show a "build path" hint.
app.post('/api/dispatch/:id/act', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job || !job.result) return res.status(404).json({ error: 'No decision to act on yet.' });
  res.status(501).json({
    error: 'Not wired yet (build path).',
    hint: `Wire this to ${ACT_TARGET}: open a work item for the owner, post the decision to a channel, or route it onward. The decision is in job.result.decision.`
  });
});

app.get('/api/runs', (req, res) => {
  try {
    const files = fs.readdirSync(RUNS_DIR).filter((f) => f.endsWith('.json')).sort().reverse().slice(0, 25);
    res.json({ runs: files.map((f) => JSON.parse(fs.readFileSync(path.join(RUNS_DIR, f), 'utf8'))) });
  } catch (e) {
    res.json({ runs: [] });
  }
});

app.listen(PORT, preflightCopilot);
