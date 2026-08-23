// Dispatch dashboard — client logic.
// Talks to the lean routing API in server.js:
//   GET  /api/council            -> the seated teams
//   POST /api/dispatch           -> drop/paste a request, start a routing run
//   GET  /api/dispatch/:id        -> poll a run (positions + decision + debate)
//   POST /api/dispatch/:id/act    -> (bonus) act on the decision
// "Sharpen & re-dispatch" is just editing the request and dispatching again.

const $ = (id) => document.getElementById(id);
const api = (p, opts) => fetch(p, opts).then((r) => r.json());
let pollTimer = null;
let currentJobId = null;

async function loadCouncil() {
  try {
    const { seats, error } = await api('/api/council');
    if (error) throw new Error(error);
    renderCouncil(seats || []);
    $('council-status').textContent = `${seats.length} team${seats.length === 1 ? '' : 's'} seated`;
  } catch (e) {
    $('council-status').textContent = 'could not read the room';
  }
}

function renderCouncil(seats) {
  $('council-row').innerHTML = seats.map((s) => `
    <div class="team-chip" title="${escapeAttr(s.owns)}">
      <span class="team-emoji">${s.emoji || '🏷️'}</span>
      <span class="team-name">${escapeHtml(s.name || s.label)}</span>
      <span class="team-bias">${escapeHtml(s.formatBias || '')}</span>
    </div>`).join('') || '<em>No teams seated — add a council/*.json.</em>';
}

async function dispatch(formData) {
  resetResults();
  $('results-panel').hidden = false;
  $('results-heading').textContent = 'Dispatching…';
  $('run-status-text').textContent = 'seating the room and reading the request…';
  try {
    const res = await fetch('/api/dispatch', { method: 'POST', body: formData }).then((r) => r.json());
    if (res.error) throw new Error(res.error);
    showGate(res.gate);
    poll(res.jobId);
  } catch (e) {
    fail(e.message);
  }
}

function dispatchText() {
  const text = $('text-input').value.trim();
  if (!text) { $('text-input').focus(); return; }
  const fd = new FormData();
  fd.append('text', text);
  const label = $('label-input').value.trim();
  if (label) fd.append('label', label);
  dispatch(fd);
}

function dispatchFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  dispatch(fd);
}

function showGate(gate) {
  const el = $('gate-badge');
  el.hidden = false;
  if (!gate || gate.status === 'todo') { el.className = 'gate-badge gate-unknown'; el.textContent = 'intake gate not built'; }
  else if (gate.routable) { el.className = 'gate-badge gate-ok'; el.textContent = '✅ routable'; }
  else { el.className = 'gate-badge gate-warn'; el.textContent = `⚠️ sharpen first — missing ${(gate.missing || []).join(', ') || 'fields'}`; }
}

function poll(jobId) {
  currentJobId = jobId;
  $('toggle-log').hidden = false;
  clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    let job;
    try { job = await api('/api/dispatch/' + jobId); } catch { return; }
    $('run-log').textContent = job.log || '';
    if (job.status === 'running') { $('run-status-text').textContent = 'the room is deliberating…'; return; }
    clearInterval(pollTimer);
    $('run-spinner').style.display = 'none';
    if (job.status === 'error' || !job.result) return fail(job.error || 'no result returned');
    renderResult(job.result);
  }, 1500);
}

function renderResult(r) {
  $('results-heading').textContent = 'Routing decision';
  $('run-status-text').textContent = 'done';
  const d = r.decision || {};
  $('decision-panel').hidden = false;
  $('decision-panel').innerHTML = `
    <div class="decision-grid">
      <div class="decision-field"><span class="df-label">Owner — who fields it</span><span class="df-value owner">${escapeHtml(d.owner || '—')}</span></div>
      <div class="decision-field"><span class="df-label">Audience</span><span class="df-value">${(d.audience || []).map((a) => `<span class="chip">${escapeHtml(a)}</span>`).join(' ') || '—'}</span></div>
      <div class="decision-field"><span class="df-label">Disposition</span><span class="df-value"><span class="disp disp-${escapeAttr(d.disposition || '')}">${escapeHtml(d.disposition || '—')}</span></span></div>
    </div>
    <div class="plan-block">
      <span class="df-label">The plan — build once, reuse across teams</span>
      <div class="deliverables">${(d.plan || []).map(renderDeliverable).join('') || '<em>no deliverables</em>'}</div>
    </div>
    <div class="next-action"><span class="df-label">Next</span> &nbsp;${escapeHtml(d.next_action || '—')}</div>`;
  if (r.debate) { $('debate').hidden = false; $('debate').innerHTML = `<strong>Where the room split:</strong> ${escapeHtml(r.debate)}`; }
  $('act-row').hidden = false;
  renderPositions(r.positions || []);
}

function renderDeliverable(x) {
  const reusers = (x.reused_by || []).map((t) => `<span class="reuse-chip">↩ ${escapeHtml(t)}</span>`).join(' ');
  return `<div class="deliverable">
    <div class="deliv-what">${escapeHtml(x.what || '')}</div>
    <div class="deliv-meta">
      <span class="deliv-builder">🔨 builds: ${escapeHtml(x.builder || '?')}</span>
      ${reusers ? `<span class="deliv-reuse">${reusers}</span>` : ''}
      <span class="deliv-aud">🎯 ${escapeHtml(x.audience || '')}</span>
    </div>
  </div>`;
}

function renderPositions(positions) {
  $('positions-heading').hidden = positions.length === 0;
  $('positions').innerHTML = positions.map((p) => `
    <div class="position-card interest-${escapeAttr(p.interest || 'out')}">
      <div class="pos-head"><span class="pos-team">${escapeHtml(p.team || '')}</span><span class="pos-interest">${interestLabel(p.interest)}</span></div>
      ${p.deliverable ? `<div class="pos-deliverable">📦 ${escapeHtml(p.deliverable)}</div>` : ''}
      ${p.reuse ? `<div class="pos-reuse">↩ ${escapeHtml(p.reuse)}</div>` : ''}
      <div class="pos-rationale">${escapeHtml(p.rationale || '')}</div>
      <div class="pos-foot"><span class="pos-effort">effort ${escapeHtml(p.effort || '?')}</span><span class="disp disp-${escapeAttr(p.disposition_lean || '')}">${escapeHtml(p.disposition_lean || '')}</span></div>
    </div>`).join('');
}

function interestLabel(i) { return i === 'in' ? '🙋 wants it' : i === 'support' ? '🤝 will help' : '🙅 passes'; }

async function act() {
  if (!currentJobId) return;
  $('act-status').textContent = 'working…';
  try {
    const res = await fetch('/api/dispatch/' + currentJobId + '/act', { method: 'POST' });
    const body = await res.json();
    $('act-status').textContent = res.ok ? '✅ routed' : `🔧 ${body.hint || body.error || 'not wired yet'}`;
  } catch (e) {
    $('act-status').textContent = '⚠️ ' + e.message;
  }
}

function resetResults() {
  $('decision-panel').hidden = true;
  $('debate').hidden = true;
  $('act-row').hidden = true;
  $('act-status').textContent = '';
  $('positions').innerHTML = '';
  $('positions-heading').hidden = true;
  $('gate-badge').hidden = true;
  $('run-spinner').style.display = '';
  $('run-log').hidden = true;
}

function fail(msg) {
  clearInterval(pollTimer);
  $('run-spinner').style.display = 'none';
  $('run-status-text').textContent = '⚠️ ' + msg;
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s).replace(/\s+/g, ' ').trim(); }

// Wire up.
$('dispatch-text-btn').addEventListener('click', dispatchText);
$('browse-btn').addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', (e) => { if (e.target.files[0]) dispatchFile(e.target.files[0]); });
$('refresh-council').addEventListener('click', loadCouncil);
$('toggle-log').addEventListener('click', () => { const l = $('run-log'); l.hidden = !l.hidden; });
$('act-btn').addEventListener('click', act);

const dz = $('dropzone');
['dragover', 'dragenter'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('drag'); }));
['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('drag'); }));
dz.addEventListener('drop', (e) => { const f = e.dataTransfer.files[0]; if (f) dispatchFile(f); });

loadCouncil();
