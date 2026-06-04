import { dragMap, payload, remediationPosture, remediationRegister, sequenceLanes, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Decision Remediation Sequencer";
const domain = "https://remediate.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --panel-2:#102032; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap,.aside { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .hero-grid { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(320px,.9fr); gap:22px; align-items:start; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3,.aside h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,.aside p, li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
      @media (max-width: 960px) { .hero-grid { grid-template-columns:1fr; } }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/remediation-register", "Remediation register"],
    ["/sequence-lanes", "Sequence lanes"],
    ["/remediation-posture", "Remediation posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderRemediationOverview() {
  const executiveSummary = summary();
  const lanes = remediationRegister().slice(0, 4);
  const findings = dragMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.lane)}</h3>
        <p><strong>Tier:</strong> ${escapeHtml(item.sequenceTier)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.sequenceTheme)}</p>
        <p><strong>Sequence readiness:</strong> ${item.sequenceReadinessScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · drag ${item.compositeRemediationDragScore} · readiness ${item.sequenceReadinessScore} · dependency ${item.dependencyLoadScore}</li>`
    )
    .join("");

  return shell(
    productTitle,
    `<section class="hero">
      <span class="eyebrow">Remediation sequencing</span>
      <div class="hero-grid">
        <div>
          <h1>Which remediation motions should move first, and which ones are still dragging behind owner resets, dependency load, or bad timing?</h1>
          <p class="lede">Board Decision Remediation Sequencer turns dependency load, owner readiness, execution windows, and recoverable value into one reusable board-facing cleanup surface.</p>
          <div class="nav">${navLinks("/")}</div>
        </div>
        <aside class="aside">
          <div class="chip">Board takeaway</div>
          <h3>Move the simplest high-yield fixes first.</h3>
          <p>${escapeHtml(executiveSummary.boardMessage)}</p>
          <p><strong>Lead:</strong> ${escapeHtml(executiveSummary.leadingMessage)}</p>
        </aside>
      </div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Lanes sequenced</span><span class="metric-value">${executiveSummary.lanesSequenced}</span><div class="metric-copy">Modeled remediation lanes in the current board-facing cleanup estate.</div></div>
        <div class="metric"><span class="metric-label">Immediate lanes</span><span class="metric-value">${executiveSummary.immediateLanes}</span><div class="metric-copy">Lanes ready to move now without more structural cleanup.</div></div>
        <div class="metric"><span class="metric-label">Blocked lanes</span><span class="metric-value">${executiveSummary.blockedLanes}</span><div class="metric-copy">Lanes still stalled by dependency drag, weak owners, or timing ambiguity.</div></div>
        <div class="metric"><span class="metric-label">Recoverable value</span><span class="metric-value">$${executiveSummary.recoverableValueMillions}M</span><div class="metric-copy">Modeled value still trapped behind slow or mis-sequenced remediation.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Remediation register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible drag pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready sequencer for exposing remediation order, owner resets, dependency drag, and trapped recoverable value."
  );
}

export function renderRemediationRegister() {
  const rows = remediationRegister()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.sequenceTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.sequenceTheme)}</td><td>${item.sequenceReadinessScore}</td></tr>`
    )
    .join("");

  return shell(
    "Remediation register",
    `<section class="hero"><span class="eyebrow">Remediation register</span><h1>Each remediation lane keeps one tier, one owner, one audience, and one next move attached.</h1><p class="lede">The register keeps cleanup work tied to the exact lane where sequencing is immediate, queued, blocked, or just worth watching.</p><div class="nav">${navLinks("/remediation-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Owner</th><th>Audience</th><th>Action</th><th>Theme</th><th>Readiness</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Register view showing which remediation motions are ready, queued, or blocked."
  );
}

export function renderSequenceLanes() {
  const rows = sequenceLanes()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.sequenceTier)}</td><td>${escapeHtml(item.sequenceTheme)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.blockingIssue)}</td><td>${item.dependencyLoadScore}</td><td>${item.ownerReadinessScore}</td><td>${item.executionWindowScore}</td><td>${item.dragContainmentScore}</td><td>${item.decisionAgeDays}</td><td>${item.sequenceReadinessScore}</td></tr>`
    )
    .join("");

  return shell(
    "Sequence lanes",
    `<section class="hero"><span class="eyebrow">Sequence lanes</span><h1>The real remediation weakness stays visible: dependency drag, weak owner readiness, loose timing, thin containment, or stale packets.</h1><p class="lede">This route keeps each remediation lane tied to the pressure that is actually slowing cleanup so leadership can intervene in the right place first.</p><div class="nav">${navLinks("/sequence-lanes")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Theme</th><th>Risk headline</th><th>Blocking issue</th><th>Dependency</th><th>Owner</th><th>Window</th><th>Containment</th><th>Age</th><th>Readiness</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Sequence-lane view showing which remediation pressure is slowing each lane."
  );
}

export function renderRemediationPosture() {
  const rows = remediationPosture()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.compositeRemediationDragScore}</td><td>${escapeHtml(item.owner)}</td><td>$${item.recoverableValueMillions}M</td><td>${escapeHtml(item.nextMove)}</td></tr>`
    )
    .join("");

  return shell(
    "Remediation posture",
    `<section class="hero"><span class="eyebrow">Remediation posture</span><h1>Cleanup interventions stay tied to one owner, one drag score, and one next operating move.</h1><p class="lede">This posture makes it clear where to simplify, standardize, automate, escalate, contain, or reset ownership before the next board cycle compounds drag.</p><div class="nav">${navLinks("/remediation-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Drag score</th><th>Owner</th><th>Recoverable value</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Remediation-posture view for sequencing cleanup and recoverable value."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    `<section class="hero"><span class="eyebrow">Verification</span><h1>How this remediation-sequencing surface is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone treats the sample like live fiduciary or legal guidance.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`,
    "Verification notes for the Board Decision Remediation Sequencer sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    `<section class="hero"><span class="eyebrow">Docs</span><h1>Board Decision Remediation Sequencer docs</h1><p class="lede">This surface packages remediation order, dependency load, owner readiness, execution timing, and recoverable value into reproducible routes and JSON outputs for board and investor reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/remediation-register</code> keeps tiers, owners, audiences, and next moves tied to one remediation lane.</li><li><code>/sequence-lanes</code> compares dependency load, owner readiness, execution timing, containment, age, and sequence readiness.</li><li><code>/remediation-posture</code> sequences the next cleanup action for immediate or blocked lanes.</li><li><code>/api/payload</code> exposes the reproducible remediation packet.</li></ul></section>`,
    "Product documentation for Board Decision Remediation Sequencer and its board-facing sequencing routes."
  );
}
