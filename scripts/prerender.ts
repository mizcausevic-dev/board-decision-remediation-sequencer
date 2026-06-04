import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { payload, remediationPosture, remediationRegister, sequenceLanes, summary, verification } from "../src/services/verticalBriefService.js";
import {
  renderDocs,
  renderRemediationOverview,
  renderRemediationPosture,
  renderRemediationRegister,
  renderSequenceLanes,
  renderVerification
} from "../src/services/render.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist-static");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const pages = new Map<string, [string, string]>([
  ["/", ["index.html", renderRemediationOverview()]],
  ["/remediation-register", ["remediation-register/index.html", renderRemediationRegister()]],
  ["/sequence-lanes", ["sequence-lanes/index.html", renderSequenceLanes()]],
  ["/remediation-posture", ["remediation-posture/index.html", renderRemediationPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [relativePath, html]] of pages) {
  const fullPath = path.join(outDir, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html);
}

writeFileSync(path.join(outDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://remediate.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://remediate.kineticgain.com/</loc></url><url><loc>https://remediate.kineticgain.com/remediation-register/</loc></url><url><loc>https://remediate.kineticgain.com/sequence-lanes/</loc></url><url><loc>https://remediate.kineticgain.com/remediation-posture/</loc></url><url><loc>https://remediate.kineticgain.com/verification/</loc></url><url><loc>https://remediate.kineticgain.com/docs/</loc></url></urlset>`
);

const apiDir = path.join(outDir, "api");
mkdirSync(apiDir, { recursive: true });
const jsonPayloads = {
  "dashboard-summary.json": summary(),
  "remediation-register.json": remediationRegister(),
  "sequence-lanes.json": sequenceLanes(),
  "remediation-posture.json": remediationPosture(),
  "verification.json": verification(),
  "payload.json": payload()
};

for (const [name, body] of Object.entries(jsonPayloads)) {
  writeFileSync(path.join(apiDir, name), JSON.stringify(body, null, 2));
}
