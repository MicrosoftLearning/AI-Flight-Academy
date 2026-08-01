// The Greenlight — dashboard frontend. No build step, no framework: talks to
// the local server's /api/* endpoints and renders the council + run state.

const state = {
  seats: [],
  seatCardById: new Map(),
  currentJobId: null,
  pollTimer: null,
  currentPlanId: null,
  planPollTimer: null,
  currentExportPlanId: null,
  // Plan-item "show draft" / "show scorecard" toggles the user has opened.
  // Persisted here (not just in the DOM) because the plan panel is fully
  // re-rendered from scratch on every poll tick while any item is still
  // "checking" — without this, an expanded scorecard would get wiped out and
  // silently collapsed within ~1.2s of opening it.
  expandedPlanSections: new Set()
};

const els = {
  councilRow: document.getElementById('council-row'),
  councilStatus: document.getElementById('council-status'),
  councilPath: document.getElementById('council-path'),
  refreshCouncil: document.getElementById('refresh-council'),
  manageSeats: document.getElementById('manage-seats'),
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('file-input'),
  browseBtn: document.getElementById('browse-btn'),
  urlInput: document.getElementById('url-input'),
  urlConveneBtn: document.getElementById('url-convene-btn'),
  runStatusSpinner: document.getElementById('run-status-spinner'),
  runStatusText: document.getElementById('run-status-text'),
  runLog: document.getElementById('run-log'),
  toggleLog: document.getElementById('toggle-log'),
  resultsPanel: document.getElementById('results-panel'),
  resultsHeading: document.getElementById('results-heading'),
  coverage: document.getElementById('coverage'),
  disagreement: document.getElementById('disagreement'),
  historyList: document.getElementById('history-list'),
  historyHeader: document.getElementById('history-header'),
  historyCount: document.getElementById('history-count'),
  historyToggleAll: document.getElementById('history-toggle-all'),
  allGreenNote: document.getElementById('all-green-note'),
  greenlightPanel: document.getElementById('greenlight-panel'),
  greenlightBanner: document.getElementById('greenlight-banner'),
  greenlightIntro: document.getElementById('greenlight-intro'),
  greenlightActionBtn: document.getElementById('greenlight-action-btn'),
  greenlightSpinner: document.getElementById('greenlight-spinner'),
  planLog: document.getElementById('plan-log'),
  togglePlanLog: document.getElementById('toggle-plan-log'),
  exportRow: document.getElementById('export-row'),
  exportContentLabel: document.getElementById('export-content-label'),
  exportMdBtn: document.getElementById('export-md-btn'),
  exportJsonBtn: document.getElementById('export-json-btn'),
  submitPrBtn: document.getElementById('submit-pr-btn'),
  submitStatus: document.getElementById('submit-status'),
  exportError: document.getElementById('export-error'),
  exportModalOverlay: document.getElementById('export-modal-overlay'),
  exportModalTitle: document.getElementById('export-modal-title'),
  exportModalClose: document.getElementById('export-modal-close'),
  exportModalStatus: document.getElementById('export-modal-status'),
  exportModalText: document.getElementById('export-modal-text'),
  exportModalCopy: document.getElementById('export-modal-copy'),
  exportModalCopyStatus: document.getElementById('export-modal-copy-status'),
  planItems: document.getElementById('plan-items')
};

// --------------------------------------------------------------------------
// Council loading + rendering
// --------------------------------------------------------------------------

async function loadCouncil() {
  els.councilStatus.textContent = 'reading council…';
  els.councilStatus.className = 'council-status';
  try {
    const res = await fetch('/api/council');
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Unknown error');

    state.seats = data.seats;
    renderCouncil(data.seats);
    els.councilPath.textContent = 'council/*.json';
    els.councilPath.title = data.path;
    const t = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    els.councilStatus.textContent = `${data.seats.length} seat${data.seats.length === 1 ? '' : 's'} · ${t}`;
    els.councilStatus.className = 'council-status ok';
  } catch (err) {
    els.councilStatus.textContent = "couldn't load council";
    els.councilStatus.title = err.message;
    els.councilStatus.className = 'council-status err';
  }
}

/** Shared avatar markup — an emoji bubble with an idle "bob" and a working "wiggle+glow+dots" state. */
function avatarHtml(emoji, size) {
  const sizeClass = size === 'sm' ? 'avatar-sm' : '';
  return `
    <div class="avatar ${sizeClass}" data-state="idle">
      <span class="avatar-emoji">${escapeHtml(emoji)}</span>
      <span class="avatar-dots"><span></span><span></span><span></span></span>
    </div>
  `;
}

function setAvatarState(container, state) {
  const avatar = container.querySelector('.avatar');
  if (avatar) avatar.dataset.state = state;
}

function renderCouncil(seats) {
  els.councilRow.innerHTML = '';
  state.seatCardById.clear();

  if (!seats.length) {
    els.councilRow.innerHTML = '<p class="muted">No seats yet — add council/*.json.</p>';
    return;
  }

  seats.forEach((seat) => {
    const card = document.createElement('div');
    card.className = 'seat-card state-idle';
    card.dataset.label = seat.label;

    card.innerHTML = `
      <div class="seat-top">
        ${avatarHtml(seat.emoji)}
        <div>
          <div class="seat-name">${escapeHtml(seat.name)}</div>
          ${seat.profile ? `<div class="seat-profile">profile: ${escapeHtml(seat.profile)}</div>` : ''}
        </div>
      </div>
      <div class="seat-goal">${escapeHtml(seat.goal || 'No goal recorded yet.')}</div>
      <div class="seat-status-row">
        <span class="verdict-badge idle">not yet reviewed</span>
      </div>
      <div class="seat-checks"></div>
      <div class="seat-toggle">show scorecard ▾</div>
      <div class="seat-needs"></div>
    `;

    const toggle = card.querySelector('.seat-toggle');
    const needsEl = card.querySelector('.seat-needs');
    toggle.addEventListener('click', () => {
      needsEl.classList.toggle('show');
      toggle.textContent = needsEl.classList.contains('show') ? 'hide scorecard ▴' : 'show scorecard ▾';
    });

    els.councilRow.appendChild(card);
    state.seatCardById.set(seat.label, card);
  });
}

/**
 * Draw the deterministic-check chips on each seat card. These come from
 * check_content.py (checks.py) and are shown the instant a review starts — the
 * code half is fast, the model half takes seconds — so a code-caught FAIL is
 * visible next to (and sometimes against) the model's verdict.
 *
 * `status` lets an unbuilt/erroring check show a build-path hint on every seat
 * instead of a silent blank: 'todo' = check_content.py still a stub,
 * 'error' = it couldn't run.
 */
function applyChecks(checkSeats, status) {
  if (status === 'todo' || status === 'error') {
    const chip = status === 'todo'
      ? '<span class="check-chip check-todo" title="Deterministic code checks (reading time, required installs, table width…) aren’t wired yet — implement check_content.py (and check_table_width in checks.py) to show code-caught fails next to each verdict.">⚙ code checks · not wired</span>'
      : '<span class="check-chip check-error" title="The code checks couldn’t run — is Python installed and check_content.py valid?">⚠ code checks · error</span>';
    for (const card of state.seatCardById.values()) {
      const el = card.querySelector('.seat-checks');
      if (el) el.innerHTML = chip;
    }
    return;
  }
  if (!Array.isArray(checkSeats)) return;
  for (const cs of checkSeats) {
    const card = state.seatCardById.get(cs.audience);
    if (!card) continue;
    const el = card.querySelector('.seat-checks');
    if (!el) continue;
    if (!cs.checks || !cs.checks.length) {
      el.innerHTML = '<span class="check-chip check-none">model-only · no code checks</span>';
      continue;
    }
    el.innerHTML = cs.checks.map((c) => {
      const cls = c.passed ? 'check-pass' : 'check-fail';
      const mark = c.passed ? '✓' : '✗';
      const name = String(c.check || '').replace(/^check_/, '');
      return `<span class="check-chip ${cls}" title="${escapeHtml(`${c.criterion} — ${c.detail}`)}">${mark} code: ${escapeHtml(name)}</span>`;
    }).join('');
  }
}

function setSeatThinking() {
  for (const card of state.seatCardById.values()) {
    card.className = 'seat-card state-thinking';
    setAvatarState(card, 'working');
    card.querySelector('.verdict-badge').className = 'verdict-badge thinking';
    card.querySelector('.verdict-badge').textContent = 'deliberating…';
    card.querySelector('.seat-toggle').classList.remove('show');
    const needsEl = card.querySelector('.seat-needs');
    needsEl.classList.remove('show');
    needsEl.innerHTML = '';
    delete card.dataset.viaPlan;
  }
}

/**
 * Resolve a seat name coming back from the model (which may append a
 * " (profile: AC-0X)" suffix or vary whitespace) to its card, which is keyed by
 * the council's exact label. Falls back to a normalized match so a cosmetic
 * difference never strands a card on "deliberating…".
 */
function seatCardFor(name) {
  if (!name) return null;
  const direct = state.seatCardById.get(name);
  if (direct) return direct;
  const norm = (s) => String(s).replace(/\s*\(profile:[^)]*\)\s*$/i, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const target = norm(name);
  for (const [label, card] of state.seatCardById) {
    if (norm(label) === target) return card;
  }
  for (const [label, card] of state.seatCardById) {
    const a = norm(label);
    if (a && target && (a.includes(target) || target.includes(a))) return card;
  }
  return null;
}

function applySeatResult(seatResult) {
  const card = seatCardFor(seatResult.seat);
  if (!card) return; // seat name from the CLI didn't match a known card — ignored, still shown in raw log

  const verdict = String(seatResult.verdict || '').toLowerCase();
  const verdictClass = ['ship', 'revise', 'reject'].includes(verdict) ? verdict : 'idle';

  card.className = `seat-card state-${verdictClass}`;
  setAvatarState(card, verdictClass === 'idle' ? 'idle' : verdictClass);
  const badge = card.querySelector('.verdict-badge');
  badge.className = `verdict-badge ${verdictClass}`;
  badge.textContent = `${(seatResult.verdict || '?').toUpperCase()}${seatResult.overall_score != null ? ` · ${seatResult.overall_score}` : ''}`;
  if (seatResult.deal_breaker_hit) {
    badge.textContent += ' ⚠';
    badge.title = 'A deal-breaker need was scored 0';
  }

  const toggle = card.querySelector('.seat-toggle');
  toggle.classList.add('show');
  toggle.textContent = 'show scorecard ▾';

  const needsEl = card.querySelector('.seat-needs');
  const reasonHtml = seatResult.one_line_reason
    ? `<div class="need-item"><div class="need-reason">${escapeHtml(seatResult.one_line_reason)}</div></div>`
    : '';
  const needsHtml = (seatResult.needs || []).map((n) => `
    <div class="need-item">
      <div class="need-name"><span>${escapeHtml(n.name)}</span><span class="need-score">${n.score}/3${n.confidence ? `<span class="confidence-tag">${escapeHtml(n.confidence)}</span>` : ''}</span></div>
      ${n.quote ? `<div class="need-quote">“${escapeHtml(n.quote)}”</div>` : ''}
      ${n.reason ? `<div class="need-reason">${escapeHtml(n.reason)}</div>` : ''}
      ${n.fix ? `<div class="need-fix">fix: ${escapeHtml(n.fix)}</div>` : ''}
    </div>
  `).join('');
  needsEl.innerHTML = reasonHtml + needsHtml;
  delete card.dataset.viaPlan; // a fresh review always overrides any earlier "via plan" state
}

/**
 * Keep the top council row synced with the remediation plan as it's checked —
 * this is what makes the top row eventually go all-green once every audience
 * is served, either by the original piece (status 'keep') or by a passing
 * drafted replacement (status 'make_new', checkStage 'pass'). Without this,
 * the top row would stay frozen on the *original* review forever, even after
 * the plan reached GREEN, which is misleading.
 */
function applyPlanStatusToSeatCards(items) {
  items.forEach((item) => {
    const card = seatCardFor(item.seat);
    if (!card) return;

    const badge = card.querySelector('.verdict-badge');
    const toggle = card.querySelector('.seat-toggle');
    const needsEl = card.querySelector('.seat-needs');

    // 'keep' means the original review already shipped this seat — actively
    // (re)assert Ship rather than trusting the card already shows it. If the
    // page state ever gets out of sync with the plan (e.g. a reload mid-plan,
    // or the plan built from a review this card never rendered), this keeps
    // the top row honest instead of silently leaving a stale "not yet
    // reviewed" badge sitting there. Tagged "via plan" like the drafted
    // seats so it's clear *why* this verdict is showing — the plan checked
    // and confirmed it, same as it did for the others.
    if (item.status === 'keep') {
      card.className = 'seat-card state-ship';
      setAvatarState(card, 'ship');
      badge.className = 'verdict-badge ship';
      badge.textContent = 'SHIP · via plan';
      badge.title = 'Already served by the original piece — the plan confirmed no change was needed for this audience.';
      card.dataset.viaPlan = '1';
      return;
    }

    if (item.checkStage === 'checking') {
      card.className = 'seat-card state-thinking';
      setAvatarState(card, 'working');
      badge.className = 'verdict-badge thinking';
      badge.textContent = 'revising…';
      card.dataset.viaPlan = '1';
      return;
    }

    if (item.checkStage === 'pass') {
      card.className = 'seat-card state-ship';
      setAvatarState(card, 'ship');
      badge.className = 'verdict-badge ship';
      badge.textContent = 'SHIP · via plan';
      badge.title = `Served by the plan's replacement: ${item.title || 'untitled artifact'}`;
    } else if (item.checkStage === 'fail') {
      const v = String(item.checkVerdict || 'reject').toLowerCase();
      const cls = ['ship', 'revise', 'reject'].includes(v) ? v : 'reject';
      card.className = `seat-card state-${cls}`;
      setAvatarState(card, cls);
      badge.className = `verdict-badge ${cls}`;
      badge.textContent = `${(item.checkVerdict || 'REJECT').toUpperCase()} · plan draft`;
      badge.title = 'Latest check of the plan\'s drafted replacement for this audience — not the original piece.';
    } else {
      return; // still pending its first check — leave the original review's verdict showing
    }

    card.dataset.viaPlan = '1';
    toggle.classList.add('show');
    toggle.textContent = 'show scorecard ▾';

    // Swap the scorecard to the plan draft's own per-need breakdown, since
    // that's now the most current judgment available for this seat.
    const reasonHtml = item.checkReason
      ? `<div class="need-item"><div class="need-reason">${escapeHtml(item.checkReason)}</div></div>`
      : '';
    const needsHtml = (item.checkNeeds || []).map((n) => `
      <div class="need-item">
        <div class="need-name"><span>${escapeHtml(n.name)}</span><span class="need-score">${n.score}/3${n.confidence ? `<span class="confidence-tag">${escapeHtml(n.confidence)}</span>` : ''}</span></div>
        ${n.quote ? `<div class="need-quote">“${escapeHtml(n.quote)}”</div>` : ''}
        ${n.reason ? `<div class="need-reason">${escapeHtml(n.reason)}</div>` : ''}
        ${n.fix ? `<div class="need-fix">fix: ${escapeHtml(n.fix)}</div>` : ''}
      </div>
    `).join('');
    needsEl.innerHTML = reasonHtml + needsHtml;
  });
}

// --------------------------------------------------------------------------
// Convening
// --------------------------------------------------------------------------

/**
 * Set the results heading as "<prefix> <label>" where a long label truncates
 * with a fade-out (no ellipsis text, no wrapping — just swallows the overflow)
 * instead of wrapping onto a second line and colliding with the row below it.
 * The fade class is only applied when the label actually overflows, so short
 * labels stay crisp.
 */
function setResultsHeading(prefix, label) {
  els.resultsHeading.innerHTML = `<span class="heading-prefix">${escapeHtml(prefix)}</span><span class="truncate-fade" id="results-label-text" title="${escapeHtml(label)}">${escapeHtml(label)}</span>`;
  const span = document.getElementById('results-label-text');
  // Measure after layout so scrollWidth reflects the actual rendered width.
  requestAnimationFrame(() => {
    if (span && span.scrollWidth > span.clientWidth + 1) {
      span.classList.add('is-truncated');
    }
  });
}

async function startConvene(formData, label) {
  if (state.pollTimer) clearInterval(state.pollTimer);
  if (state.planPollTimer) clearInterval(state.planPollTimer);
  state.currentPlanId = null;
  els.greenlightPanel.hidden = true;

  // The results panel is now a single, persistent "Summary" — it stays visible
  // and gets rewritten on every convene run (running -> done/error), rather
  // than disappearing between runs. That's what makes it a running summary
  // instead of a one-shot verdict from the very first review.
  els.resultsPanel.hidden = false;
  setResultsHeading('Convening the council on', `${label}…`);
  els.coverage.innerHTML = '';
  els.disagreement.hidden = true;
  els.allGreenNote.hidden = true;
  els.runStatusSpinner.hidden = false;
  els.runStatusText.classList.remove('error');
  els.runStatusText.textContent = 'Deliberating…';
  els.runLog.textContent = '';

  // Re-read the council fresh before every review — seats may have been
  // added/edited since the last run, and the roster should always reflect
  // what's actually on disk right now, not just what was loaded at page load.
  await loadCouncil();
  setSeatThinking();

  try {
    const res = await fetch('/api/convene', { method: 'POST', body: formData });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Could not start the review.');

    state.currentJobId = data.jobId;
    applyChecks(data.checks, data.checksStatus);
    pollJob(data.jobId);
  } catch (err) {
    showRunError(err.message, label);
  }
}

function pollJob(jobId) {
  state.pollTimer = setInterval(async () => {
    try {
      const res = await fetch(`/api/convene/${jobId}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Lost track of that run.');

      els.runLog.textContent = data.log || '';
      if (els.runLog.parentElement && !els.runLog.hidden) {
        els.runLog.scrollTop = els.runLog.scrollHeight;
      }

      if (data.status === 'running') return;

      clearInterval(state.pollTimer);

      if (data.status === 'error') {
        showRunError(data.error || 'The council could not finish that review.', data.contentLabel);
        return;
      }

      // done — this same panel updates in place every run: heading flips from
      // "Convening…" to "Verdict on X", and the meta line becomes non-duplicative
      // run info (how long it took, which model) instead of repeating the title.
      els.runStatusSpinner.hidden = true;
      const durationText = formatDuration(data.finishedAt - data.startedAt);
      const modelText = data.model ? ` · model: ${escapeHtml(data.model)}` : '';
      els.runStatusText.innerHTML = `✅ Reviewed in ${durationText}${modelText}`;
      setResultsHeading('Verdict on', data.contentLabel);
      renderResults(data.result);
      addHistoryEntry(jobId, data.contentLabel, data.result, data.finishedAt);
    } catch (err) {
      clearInterval(state.pollTimer);
      showRunError(err.message);
    }
  }, 1200);
}

/** Format a millisecond duration as "8.4s" or "1m 12s". */
function formatDuration(ms) {
  if (!ms || ms < 0) return 'n/a';
  const totalSec = ms / 1000;
  if (totalSec < 60) return `${totalSec.toFixed(1)}s`;
  const min = Math.floor(totalSec / 60);
  const sec = Math.round(totalSec % 60);
  return `${min}m ${sec}s`;
}

function showRunError(message, label) {
  els.runStatusSpinner.hidden = true;
  els.runStatusText.innerHTML = `<span style="color:#e85d5d">Review failed: ${escapeHtml(message)}</span>`;
  if (label) setResultsHeading('Could not review', label);
  els.runLog.hidden = false;
  els.toggleLog.textContent = 'Hide deliberation log';
  for (const card of state.seatCardById.values()) {
    card.className = 'seat-card state-idle';
    const badge = card.querySelector('.verdict-badge');
    badge.className = 'verdict-badge idle';
    badge.textContent = 'review failed';
  }
}

/** Rewrites the coverage/disagreement/all-green parts of the summary panel and
 * updates every seat card + the greenlight panel — called fresh on every run. */
function renderResults(result) {
  if (!result) return;

  (result.seats || []).forEach(applySeatResult);

  const served = (result.coverage && result.coverage.served) || [];
  const notServed = (result.coverage && result.coverage.not_served) || [];
  els.coverage.innerHTML = `<b class="served">Served:</b> ${served.length ? served.map(escapeHtml).join(', ') : 'none'} &nbsp;·&nbsp; <b class="not-served">Not served:</b> ${notServed.length ? notServed.map(escapeHtml).join(', ') : 'none'}`;

  if (result.disagreement) {
    els.disagreement.hidden = false;
    els.disagreement.innerHTML = `<strong>Where the room split:</strong> ${escapeHtml(result.disagreement)}`;
  } else {
    els.disagreement.hidden = true;
  }

  const allShip = (result.seats || []).every((s) => String(s.verdict || '').toLowerCase() === 'ship');
  els.allGreenNote.hidden = !allShip;

  // The greenlight panel is the single, unified place for "build a plan" and
  // "reconvene" — it appears the moment there's something to fix, and its one
  // action button evolves through the whole loop from there.
  if (allShip) {
    els.greenlightPanel.hidden = true;
  } else {
    els.greenlightPanel.hidden = false;
    resetGreenlightPanel();
  }
}

// --------------------------------------------------------------------------
// Greenlight it — one unified panel that carries the whole loop:
//   build plan -> reconvene -> reconvene again (as drafts get iterated) -> green
// A single action button drives every stage; its label and behavior change
// with plan state instead of handing off between separate buttons.
// --------------------------------------------------------------------------

function resetGreenlightPanel() {
  state.currentPlanId = null;
  state.currentExportPlanId = null;
  state.expandedPlanSections.clear();
  els.planItems.innerHTML = '';
  els.planLog.textContent = '';
  els.planLog.hidden = true;
  els.togglePlanLog.hidden = true;
  els.togglePlanLog.textContent = 'Show log';
  els.exportRow.hidden = true;
  els.exportError.hidden = true;
  setGreenlightState('start');
}

/**
 * Central state machine for the single greenlight action button + banner.
 * kind: 'start' | 'building' | 'ready' | 'checking' | 'not_green' | 'green' | 'error'
 */
function setGreenlightState(kind, opts = {}) {
  const busy = kind === 'building' || kind === 'checking';
  els.greenlightSpinner.hidden = !busy;
  els.greenlightActionBtn.disabled = busy;
  els.greenlightActionBtn.hidden = false;
  els.togglePlanLog.hidden = kind === 'start';

  switch (kind) {
    case 'start':
      els.greenlightActionBtn.textContent = '🚦 Greenlight it — build a remediation plan';
      els.greenlightBanner.textContent = '';
      els.greenlightBanner.className = 'plan-banner';
      break;
    case 'building':
      els.greenlightActionBtn.textContent = 'Building the plan…';
      els.greenlightBanner.textContent = '';
      els.greenlightBanner.className = 'plan-banner';
      break;
    case 'ready': {
      const pending = opts.pending || 0;
      els.greenlightActionBtn.textContent = '🔄 Reconvene on the plan';
      els.greenlightBanner.textContent = `🟡 ${pending} draft${pending === 1 ? '' : 's'} waiting on a first reconvene`;
      els.greenlightBanner.className = 'plan-banner not-green';
      break;
    }
    case 'checking':
      els.greenlightActionBtn.textContent = 'Reconvening…';
      els.greenlightBanner.textContent = '🔄 Reconvening the council on the plan…';
      els.greenlightBanner.className = 'plan-banner checking';
      break;
    case 'not_green': {
      const remaining = opts.remaining || 0;
      const total = opts.total || 0;
      els.greenlightActionBtn.textContent = `🔄 Reconvene again (${remaining} remaining)`;
      els.greenlightBanner.textContent = `🟡 Not yet green — ${remaining} of ${total} drafts still failing`;
      els.greenlightBanner.className = 'plan-banner not-green';
      break;
    }
    case 'green':
      els.greenlightActionBtn.hidden = true;
      els.greenlightBanner.textContent = '✅ GREEN — every audience is served';
      els.greenlightBanner.className = 'plan-banner green';
      break;
    case 'error':
      els.greenlightActionBtn.disabled = false;
      els.greenlightActionBtn.hidden = false;
      els.greenlightActionBtn.textContent = state.currentPlanId ? '🔄 Try reconvening again' : '🔁 Try building the plan again';
      els.greenlightBanner.textContent = `⚠ ${opts.message || 'Something went wrong.'}`;
      els.greenlightBanner.className = 'plan-banner not-green';
      els.togglePlanLog.hidden = false;
      break;
  }
}

/** The single button's click handler — dispatches based on where the loop currently is. */
async function handleGreenlightAction() {
  if (!state.currentPlanId) {
    await startPlan();
  } else {
    await triggerRecheck();
  }
}

async function startPlan() {
  if (!state.currentJobId) return;
  if (state.planPollTimer) clearInterval(state.planPollTimer);

  els.greenlightPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  els.planItems.innerHTML = '';
  els.planLog.textContent = '';
  setGreenlightState('building');

  try {
    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: state.currentJobId })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Could not start building the plan.');
    state.currentPlanId = data.planId;
    pollPlan(data.planId);
  } catch (err) {
    setGreenlightState('error', { message: err.message });
  }
}

function pollPlan(planId) {
  state.planPollTimer = setInterval(async () => {
    try {
      const res = await fetch(`/api/plan/${planId}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Lost track of that plan.');

      els.planLog.textContent = data.log || '';
      if (!els.planLog.hidden) els.planLog.scrollTop = els.planLog.scrollHeight;

      if (data.status === 'building') {
        setGreenlightState('building');
        return;
      }

      if (data.status === 'error') {
        clearInterval(state.planPollTimer);
        setGreenlightState('error', { message: data.error || 'Could not build a plan from this review.' });
        return;
      }

      // status === 'ready' — render current item states, then decide the
      // button/banner state from where the loop actually is right now.
      renderPlanItems(data.items, data.leftOut);

      // Keep the "Past runs" entry for the review this plan came from showing
      // the *current* best-known verdict per seat, not the one frozen at the
      // moment the original review finished.
      const effectiveSeats = data.items.map((it) => ({
        seat: it.seat,
        verdict: it.status === 'keep'
          ? 'Ship'
          : (it.checkStage === 'pass' || it.checkStage === 'fail')
            ? (it.checkVerdict || (it.checkStage === 'pass' ? 'Ship' : 'Reject'))
            : it.originalVerdict
      }));
      updateHistoryEntryVerdicts(data.sourceJobId, effectiveSeats);

      const makeNewItems = data.items.filter((it) => it.status === 'make_new');
      const anyChecking = data.overall === 'checking' || makeNewItems.some((it) => it.checkStage === 'checking');

      if (anyChecking) {
        setGreenlightState('checking');
        els.exportRow.hidden = true;
      } else if (data.overall === 'green') {
        setGreenlightState('green');
        updateExportLinks(planId, data.contentLabel);
      } else {
        const everChecked = makeNewItems.some((it) => it.checkStage !== 'pending');
        if (!everChecked) {
          setGreenlightState('ready', { pending: makeNewItems.length });
        } else {
          const remaining = makeNewItems.filter((it) => it.checkStage !== 'pass').length;
          setGreenlightState('not_green', { remaining, total: makeNewItems.length });
        }
        els.exportRow.hidden = true;
      }

      if (!anyChecking) clearInterval(state.planPollTimer);
    } catch (err) {
      clearInterval(state.planPollTimer);
      setGreenlightState('error', { message: err.message });
    }
  }, 1200);
}

/** Reveal the export row and remember which plan/label the view/copy buttons should fetch. Only called once the plan is GREEN. */
function updateExportLinks(planId, contentLabel) {
  els.exportRow.hidden = false;
  els.exportContentLabel.textContent = contentLabel || '';
  els.exportError.hidden = true;
  els.submitStatus.hidden = true;
  els.submitPrBtn.disabled = false;
  state.currentExportPlanId = planId;
}

/**
 * Submit the green plan as a PR into the hack submission repo. The repo is a
 * placeholder by default, so this normally writes a ready-to-push bundle and
 * returns where it landed; when a real repo + clone + GREENLIGHT_AUTO_SUBMIT
 * are configured, the server opens the PR and returns its URL.
 */
async function submitPlan() {
  const planId = state.currentExportPlanId;
  if (!planId) return;
  const prev = els.submitPrBtn.textContent;
  els.submitPrBtn.disabled = true;
  els.submitPrBtn.textContent = 'Submitting…';
  els.submitStatus.hidden = true;
  try {
    const res = await fetch(`/api/plan/${planId}/submit`, { method: 'POST' });
    // Not wired yet — treat it like the other build paths: a toast, not an error.
    if (res.status === 501) {
      showToast(
        '<strong>Not wired yet — this one is yours to build.</strong>' +
        '<p>Turn a green plan into a pull request into the hack repo: implement ' +
        '<code>POST /api/plan/:planId/submit</code> in <code>server.js</code> — assemble the ' +
        'artifacts, open the PR, and return <code>{ prUrl }</code>.</p>' +
        '<span class="toast-hint">Click to dismiss</span>',
        { tone: 'build', timeout: 0, copyText: COPILOT_PROMPTS.submit }
      );
      return;
    }
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Submit failed.');
    els.submitStatus.hidden = false;
    els.submitStatus.className = 'submit-status ok';
    if (data.prUrl) {
      els.submitStatus.innerHTML = `✅ PR opened: <a href="${escapeHtml(data.prUrl)}" target="_blank" rel="noopener">${escapeHtml(data.prUrl)}</a>`;
    } else {
      els.submitStatus.textContent = `✅ Submission bundle ready. ${data.note || ''}`;
    }
  } catch (err) {
    els.submitStatus.hidden = false;
    els.submitStatus.className = 'submit-status err';
    els.submitStatus.textContent = `Submit failed: ${err.message}`;
  } finally {
    els.submitPrBtn.disabled = false;
    els.submitPrBtn.textContent = prev;
  }
}

/**
 * Opens an in-page modal showing the plan export as text, with a "Copy to
 * clipboard" button. Deliberately never triggers a file download or any
 * browser navigation/new-window — some embedded/webview hosts (this
 * dashboard is frequently viewed inside one) don't support native download
 * flows, and both a direct Content-Disposition link and a blob-URL anchor
 * click were observed to misbehave badly there (up to closing/crashing the
 * view). A plain fetch + clipboard-API copy has no navigation surface at
 * all, so it's safe everywhere.
 */
async function openExportModal(format) {
  const planId = state.currentExportPlanId;
  if (!planId) return;

  els.exportError.hidden = true;
  els.exportModalTitle.textContent = format === 'json' ? 'Plan export — JSON' : 'Plan export — Markdown';
  els.exportModalStatus.textContent = 'Loading…';
  els.exportModalStatus.hidden = false;
  els.exportModalText.hidden = true;
  els.exportModalText.value = '';
  els.exportModalCopyStatus.textContent = '';
  els.exportModalOverlay.hidden = false;

  try {
    const res = await fetch(`/api/plan/${planId}/export?format=${format}`);
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    const text = await res.text();

    els.exportModalStatus.hidden = true;
    els.exportModalText.hidden = false;
    els.exportModalText.value = text;
  } catch (err) {
    els.exportModalStatus.hidden = false;
    els.exportModalStatus.textContent = `Could not load export: ${err.message}`;
  }
}

function closeExportModal() {
  els.exportModalOverlay.hidden = true;
}

async function copyExportModalText() {
  const text = els.exportModalText.value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    els.exportModalCopyStatus.textContent = '✅ Copied!';
  } catch (err) {
    // Clipboard API can be blocked in some contexts — fall back to the
    // classic select + execCommand('copy'), which works via a user gesture
    // even where the async Clipboard API is unavailable.
    try {
      els.exportModalText.hidden = false;
      els.exportModalText.focus();
      els.exportModalText.select();
      document.execCommand('copy');
      els.exportModalCopyStatus.textContent = '✅ Copied!';
    } catch (fallbackErr) {
      els.exportModalCopyStatus.textContent = 'Could not copy — select the text above and press Ctrl+C.';
    }
  }
  setTimeout(() => { els.exportModalCopyStatus.textContent = ''; }, 4000);
}

function renderPlanItems(items, leftOut) {
  els.planItems.innerHTML = '';
  items.forEach((item, idx) => els.planItems.appendChild(renderPlanItem(item, idx)));
  applyPlanStatusToSeatCards(items);

  if (leftOut && leftOut.length) {
    const note = document.createElement('div');
    note.className = 'plan-item';
    note.innerHTML = `<div class="plan-item-seat">⚠ Left out</div><div class="plan-item-reason">${leftOut.map(escapeHtml).join(', ')} — deliberately not served by this plan.</div>`;
    els.planItems.appendChild(note);
  }
}

function renderPlanItem(item, idx) {
  const card = document.createElement('div');
  const checkClass = item.status === 'keep' ? 'keep' : `check-${item.checkStage}`;
  card.className = `plan-item ${checkClass}`;

  const badgeLabel = item.status === 'keep'
    ? 'KEEP AS-IS'
    : { pending: 'not yet checked', checking: 'checking…', pass: `PASS · ${item.checkVerdict || 'Ship'}`, fail: `FAIL · ${item.checkVerdict || 'Reject'}` }[item.checkStage] || item.checkStage;
  const badgeClass = item.status === 'keep' ? 'pass' : item.checkStage;

  const listsHtml = item.status === 'make_new' ? `
    <div class="plan-item-lists">
      <div><div class="list-title">Must include</div><ul>${(item.must_include || []).map((m) => `<li>${escapeHtml(m)}</li>`).join('') || '<li>(none listed)</li>'}</ul></div>
      <div><div class="list-title">Leave out</div><ul>${(item.leave_out || []).map((m) => `<li>${escapeHtml(m)}</li>`).join('') || '<li>(none listed)</li>'}</ul></div>
    </div>
  ` : '';

  const draftId = `draft-${idx}`;
  const draftKey = `draft::${item.seat}`;
  const draftExpanded = state.expandedPlanSections.has(draftKey);
  const draftHtml = item.draft_content ? `
    <div class="draft-toggle" data-target="${draftId}" data-key="${escapeHtml(draftKey)}">${draftExpanded ? 'hide draft ▴' : 'show draft ▾'}</div>
    <div class="draft-box${draftExpanded ? ' show' : ''}" id="${draftId}">${escapeHtml(item.draft_content)}</div>
  ` : '';

  const checkDetailId = `checkdetail-${idx}`;
  const checkDetailKey = `scorecard::${item.seat}`;
  const checkDetailExpanded = state.expandedPlanSections.has(checkDetailKey);
  const needsHtml = (item.checkNeeds || []).map((n) => `
    <div class="check-need">
      <div class="check-need-name"><span>${escapeHtml(n.name)}</span><span>${n.score}/3 <span class="confidence-tag">${escapeHtml(n.confidence || '')}</span></span></div>
      ${n.quote ? `<div class="check-need-quote">“${escapeHtml(n.quote)}”</div>` : ''}
      ${n.fix ? `<div class="check-need-fix">fix: ${escapeHtml(n.fix)}</div>` : ''}
    </div>
  `).join('');
  const checkDetailToggle = (item.checkNeeds || []).length ? `<div class="draft-toggle" data-target="${checkDetailId}" data-key="${escapeHtml(checkDetailKey)}">${checkDetailExpanded ? 'hide scorecard ▴' : 'show scorecard ▾'}</div>` : '';
  const checkDetailHtml = (item.checkNeeds || []).length ? `<div class="check-detail${checkDetailExpanded ? ' show' : ''}" id="${checkDetailId}">${needsHtml}</div>` : '';

  const iterateBtn = (item.status === 'make_new' && item.checkStage === 'fail')
    ? `<button class="btn btn-secondary btn-sm iterate-btn" data-seat="${escapeHtml(item.seat)}">✏️ Iterate on this draft</button>`
    : '';

  const seatInfo = state.seats.find((s) => s.label === item.seat);
  const avatarState = item.checkStage === 'checking' ? 'working' : item.checkStage === 'pass' ? 'pass' : item.checkStage === 'fail' ? 'fail' : 'idle';

  card.innerHTML = `
    <div class="plan-item-top">
      <div class="avatar-and-name">
        ${avatarHtml(seatInfo ? seatInfo.emoji : '👤', 'sm')}
        <div>
          <div class="plan-item-seat">${escapeHtml(item.seat)}</div>
          ${item.title ? `<div class="plan-item-title">${escapeHtml(item.title)}</div>` : ''}
        </div>
      </div>
      <span class="check-badge ${badgeClass}">${escapeHtml(badgeLabel)}</span>
    </div>
    ${item.format_call ? `<div class="plan-item-format-call">${escapeHtml(item.format_call)}</div>` : ''}
    ${item.reason ? `<div class="plan-item-reason">${escapeHtml(item.reason)}</div>` : ''}
    ${item.status === 'keep' ? `<div class="plan-item-reason">${escapeHtml(item.checkReason || '')}</div>` : ''}
    ${listsHtml}
    ${draftHtml}
    ${item.status === 'make_new' && item.checkStage !== 'pending' ? `<div class="plan-item-reason"><strong>Last check:</strong> ${escapeHtml(item.checkReason || '')}</div>` : ''}
    ${checkDetailToggle}
    ${checkDetailHtml}
    ${item.changelog ? `<div class="changelog-note">Last revision: ${escapeHtml(item.changelog)}</div>` : ''}
    <div class="plan-item-controls">
      ${iterateBtn}
      ${item.iterationCount ? `<span class="iteration-count">iterated ${item.iterationCount}×</span>` : ''}
    </div>
  `;

  setAvatarState(card, avatarState);

  card.querySelectorAll('.draft-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const target = card.querySelector(`#${CSS.escape(toggle.dataset.target)}`);
      target.classList.toggle('show');
      const isShown = target.classList.contains('show');
      const key = toggle.dataset.key;
      if (key) {
        if (isShown) state.expandedPlanSections.add(key);
        else state.expandedPlanSections.delete(key);
      }
      toggle.textContent = toggle.textContent.replace(/▾|▴/, isShown ? '▴' : '▾').replace(/^show|^hide/, isShown ? 'hide' : 'show');
    });
  });

  const iterate = card.querySelector('.iterate-btn');
  if (iterate) {
    iterate.addEventListener('click', () => triggerIterate(iterate.dataset.seat));
  }

  return card;
}

async function triggerRecheck(seats) {
  if (!state.currentPlanId) return;
  setGreenlightState('checking');
  try {
    const res = await fetch(`/api/plan/${state.currentPlanId}/recheck`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seats ? { seats } : {})
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Could not start the recheck.');
    if (state.planPollTimer) clearInterval(state.planPollTimer);
    pollPlan(state.currentPlanId);
  } catch (err) {
    setGreenlightState('error', { message: err.message });
  }
}

async function triggerIterate(seat) {
  if (!state.currentPlanId) return;
  setGreenlightState('checking');
  try {
    const res = await fetch(`/api/plan/${state.currentPlanId}/iterate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seat })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Could not start that redraft.');
    if (state.planPollTimer) clearInterval(state.planPollTimer);
    pollPlan(state.currentPlanId);
  } catch (err) {
    setGreenlightState('error', { message: err.message });
  }
}

// --------------------------------------------------------------------------
// History
// --------------------------------------------------------------------------

let historyEntryCount = 0;

/** Builds the two chip HTML strings shared between a fresh entry and a live update. */
function buildHistoryChipsHtml(seats) {
  const verdictCounts = { ship: 0, revise: 0, reject: 0 };
  seats.forEach((s) => {
    const v = String(s.verdict || '').toLowerCase();
    if (verdictCounts[v] !== undefined) verdictCounts[v]++;
  });
  // Compact summary shown when the row is collapsed — e.g. "1 Ship · 3 Reject" —
  // so you can scan outcomes at a glance without expanding every entry.
  const summaryChips = ['ship', 'revise', 'reject']
    .filter((v) => verdictCounts[v] > 0)
    .map((v) => `<span class="chip ${v}">${verdictCounts[v]} ${v[0].toUpperCase()}${v.slice(1)}</span>`)
    .join('');

  const fullChips = seats.map((s) => {
    const v = String(s.verdict || '').toLowerCase();
    const cls = ['ship', 'revise', 'reject'].includes(v) ? v : '';
    return `<span class="chip ${cls}">${escapeHtml(shortSeatName(s.seat))}: ${escapeHtml(s.verdict || '?')}</span>`;
  }).join(' ');

  return { summaryChips, fullChips };
}

function addHistoryEntry(jobId, label, result, finishedAt) {
  if (els.historyList.querySelector('.muted')) els.historyList.innerHTML = '';

  const seats = result.seats || [];
  const { summaryChips, fullChips } = buildHistoryChipsHtml(seats);
  const detailId = `history-detail-${historyEntryCount++}`;

  const item = document.createElement('div');
  item.className = 'history-item';
  if (jobId) item.dataset.jobId = jobId;
  item.innerHTML = `
    <div class="history-item-summary">
      <span class="history-toggle">▸</span>
      <span class="history-label" title="${escapeHtml(label)}">${escapeHtml(label)}</span>
      <span class="history-summary-chips">${summaryChips}</span>
      <span class="history-time">${new Date(finishedAt).toLocaleTimeString()}</span>
    </div>
    <div class="history-item-detail" id="${detailId}">
      <div class="history-full-label">${escapeHtml(label)}</div>
      <div class="history-chips">${fullChips}</div>
    </div>
  `;

  const summary = item.querySelector('.history-item-summary');
  const toggle = item.querySelector('.history-toggle');
  const detail = item.querySelector('.history-item-detail');
  summary.addEventListener('click', () => {
    const show = detail.classList.toggle('show');
    toggle.classList.toggle('expanded', show);
  });

  els.historyList.prepend(item);
  updateHistoryCount();
}

/**
 * Updates an existing history row's chips in place to reflect the *current*
 * best-known verdict per seat — e.g. once a remediation plan ships a
 * replacement for an audience that originally rejected the piece. Without
 * this, "Past runs" would freeze on the review's initial verdicts forever,
 * even after the plan brings every audience to Ship.
 */
function updateHistoryEntryVerdicts(jobId, seats) {
  if (!jobId) return;
  const item = els.historyList.querySelector(`.history-item[data-job-id="${CSS.escape(jobId)}"]`);
  if (!item) return;

  const { summaryChips, fullChips } = buildHistoryChipsHtml(seats);
  const summaryEl = item.querySelector('.history-summary-chips');
  const chipsEl = item.querySelector('.history-chips');
  if (summaryEl) summaryEl.innerHTML = summaryChips;
  if (chipsEl) chipsEl.innerHTML = fullChips;
}

function updateHistoryCount() {
  const count = els.historyList.querySelectorAll('.history-item').length;
  els.historyCount.textContent = count ? `(${count})` : '';
}

function shortSeatName(label) {
  // Strip a leading emoji for compact chips, e.g. "🛒 Retail Store Operations Lead" -> "Retail Store Operations Lead"
  return (label || '').replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, '');
}

async function loadHistory() {
  try {
    const res = await fetch('/api/runs');
    const data = await res.json();
    if (!data.ok || !data.runs.length) return;
    els.historyList.innerHTML = '';
    // The server already returns runs newest-first. addHistoryEntry always
    // prepends (so a live new run lands on top of existing history) — iterating
    // an already-descending list with prepend would reverse it back to
    // oldest-on-top, so we walk it in reverse to land back on newest-first.
    [...data.runs].reverse().forEach((run) => addHistoryEntry(run.id, run.contentLabel, run.result, run.finishedAt));
  } catch (err) {
    // history is best-effort
  }
}

// --------------------------------------------------------------------------
// Wiring
// --------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/**
 * A small dismissible popup note in the top-right — used for the "not wired
 * yet" build paths so a hint doesn't have to hijack the council status text.
 * Pass `copyText` to add a one-click "copy this prompt for Copilot Chat" button.
 */
function showToast(html, { tone = 'info', timeout = 9000, copyText = null } = {}) {
  let host = document.getElementById('toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toast-host';
    host.className = 'toast-host';
    document.body.appendChild(host);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${tone}`;
  toast.innerHTML = html + (copyText ? '<button class="toast-copy" type="button">📋 Copy prompt for Copilot Chat</button>' : '');
  const dismiss = () => { toast.classList.add('leaving'); setTimeout(() => toast.remove(), 200); };
  toast.addEventListener('click', dismiss);
  const copyBtn = toast.querySelector('.toast-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation(); // copying shouldn't dismiss the note
      try {
        await navigator.clipboard.writeText(copyText);
        copyBtn.textContent = '✅ Copied — paste into Copilot Chat';
        return;
      } catch { /* Clipboard API blocked in this context — fall back below. */ }
      // Fallback: a selectable textarea + execCommand, which works via the user
      // gesture even where the async Clipboard API is unavailable. If even that
      // fails, the box stays visible so the prompt is never trapped.
      let box = toast.querySelector('.toast-copy-area');
      if (!box) {
        box = document.createElement('textarea');
        box.className = 'toast-copy-area';
        box.readOnly = true;
        box.value = copyText;
        box.addEventListener('click', (ev) => ev.stopPropagation());
        toast.appendChild(box);
      }
      box.focus();
      box.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { /* ignore */ }
      copyBtn.textContent = ok
        ? '✅ Copied — paste into Copilot Chat'
        : '⚠ Select the prompt below and press Ctrl/Cmd+C';
    });
  }
  host.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  if (timeout) setTimeout(dismiss, timeout);
}

// Ready-to-paste prompts for the build-path features — the "Copy prompt for
// Copilot Chat" button in each toast hands these to the participant verbatim.
const COPILOT_PROMPTS = {
  council: `In the Node/Express dashboard at the-greenlight-starter/dashboard, implement the "council editing" feature end to end.

Backend — server.js (two TODO stubs already exist near "Council management"):
- POST /api/council/seat: read the seat from req.body, shaped exactly like council/retail.example.json — { seat_id, audience, card, outcome, thresholds, criteria: [{ id, the_bar, fatal, anchors, watch_for }] }. Validate seat_id, audience, outcome and at least one criterion. Allow only [a-z0-9-_] in seat_id (so it can't escape the folder), then write council/<seat_id>.json with fs.writeFileSync(JSON.stringify(seat, null, 2)). Return { ok: true }.
- DELETE /api/council/seat/:seatId: sanitize seatId the same way and delete council/<seatId>.json if it exists. Return { ok: true }.

Frontend — public/index.html, public/app.js, public/styles.css:
- Wire the existing #manage-seats button to open a modal that matches the existing modal + dark-theme styling.
- The modal is a form for the seat shape above, with an add/remove list for criteria. On save POST /api/council/seat; add a delete action that calls DELETE /api/council/seat/:seatId; then call loadCouncil() to refresh the board and showToast() for feedback.

Follow the existing conventions in these files. Keep it minimal and readable.`,
  submit: `In the Node/Express dashboard at the-greenlight-starter/dashboard, implement the PR submission workflow in server.js at the POST /api/plan/:planId/submit TODO stub.

From a GREEN plan (plans.get(planId), plan.overall === 'green'):
1. Assemble artifacts from plan.items — each item with status "make_new" has draft_content; write each as a file, and reuse composePlanMarkdown(plan) for a full plan doc.
2. Save the bundle under SUBMISSIONS_DIR/<plan.id>/ so there's an artifact even before the PR.
3. Open a PR into SUBMISSION_REPO (base SUBMISSION_BASE): from a local clone, git checkout -b greenlight/<slug>, copy the files, git add/commit/push, then spawn(GH_BIN, ['pr','create','--repo',SUBMISSION_REPO,'--base',SUBMISSION_BASE,'--title',...,'--body-file',...]). Keep SUBMISSION_REPO a placeholder-safe default; only push when a real repo and local clone are configured.
4. Return { ok: true, prUrl } — the front-end renders it as a link.

Follow the existing conventions in server.js.`
};

els.refreshCouncil.addEventListener('click', loadCouncil);
// The seat editor is a participant build path — the button explains itself in a
// toast (with a copy-paste Copilot prompt) rather than opening a modal we
// deliberately don't ship.
els.manageSeats.addEventListener('click', () => {
  showToast(
    '<strong>Not wired yet — this one is yours to build.</strong>' +
    '<p>Add a small editor to add, edit, and remove seats, wired to the ' +
    '<code>POST</code> / <code>DELETE /api/council/seat</code> stubs in <code>server.js</code>, ' +
    'then <em>Reload council</em> to see your changes.</p>' +
    '<span class="toast-hint">Click to dismiss</span>',
    { tone: 'build', timeout: 0, copyText: COPILOT_PROMPTS.council }
  );
});

els.historyHeader.addEventListener('click', () => {
  const collapsed = els.historyList.classList.toggle('collapsed');
  els.historyToggleAll.classList.toggle('collapsed', collapsed);
});

els.toggleLog.addEventListener('click', () => {
  els.runLog.hidden = !els.runLog.hidden;
  els.toggleLog.textContent = els.runLog.hidden ? 'Show deliberation log' : 'Hide deliberation log';
});

els.greenlightActionBtn.addEventListener('click', handleGreenlightAction);
els.togglePlanLog.addEventListener('click', () => {
  els.planLog.hidden = !els.planLog.hidden;
  els.togglePlanLog.textContent = els.planLog.hidden ? 'Show log' : 'Hide log';
});
els.exportMdBtn.addEventListener('click', () => openExportModal('md'));
els.exportJsonBtn.addEventListener('click', () => openExportModal('json'));
els.submitPrBtn.addEventListener('click', submitPlan);
els.exportModalClose.addEventListener('click', closeExportModal);
els.exportModalCopy.addEventListener('click', copyExportModalText);
els.exportModalOverlay.addEventListener('click', (e) => {
  if (e.target === els.exportModalOverlay) closeExportModal();
});

els.browseBtn.addEventListener('click', () => els.fileInput.click());
els.fileInput.addEventListener('change', () => {
  if (els.fileInput.files.length) {
    const file = els.fileInput.files[0];
    const fd = new FormData();
    fd.append('file', file);
    startConvene(fd, file.name);
  }
});

els.urlConveneBtn.addEventListener('click', () => {
  const url = els.urlInput.value.trim();
  if (!url) return;
  const fd = new FormData();
  fd.append('url', url);
  startConvene(fd, url);
});
els.urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') els.urlConveneBtn.click();
});

['dragenter', 'dragover'].forEach((evt) => {
  els.dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    els.dropzone.classList.add('dragover');
  });
});
['dragleave', 'drop'].forEach((evt) => {
  els.dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    els.dropzone.classList.remove('dragover');
  });
});
els.dropzone.addEventListener('drop', (e) => {
  const dt = e.dataTransfer;
  if (dt.files && dt.files.length) {
    const file = dt.files[0];
    const fd = new FormData();
    fd.append('file', file);
    startConvene(fd, file.name);
    return;
  }
  // Some browsers expose a dragged link as text/uri-list or text/plain.
  const uri = dt.getData('text/uri-list') || dt.getData('text/plain');
  if (uri && /^https?:\/\//i.test(uri.trim())) {
    els.urlInput.value = uri.trim();
    els.urlConveneBtn.click();
  }
});

loadCouncil();
loadHistory();
