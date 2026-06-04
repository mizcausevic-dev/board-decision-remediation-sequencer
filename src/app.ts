import express from "express";
import { dragMap, payload, remediationPosture, remediationRegister, sequenceLanes, summary, verification } from "./services/verticalBriefService.js";
import {
  renderDocs,
  renderRemediationOverview,
  renderRemediationPosture,
  renderRemediationRegister,
  renderSequenceLanes,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderRemediationOverview()));
  app.get("/remediation-register", (_req, res) => res.type("html").send(renderRemediationRegister()));
  app.get("/sequence-lanes", (_req, res) => res.type("html").send(renderSequenceLanes()));
  app.get("/remediation-posture", (_req, res) => res.type("html").send(renderRemediationPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/remediation-register", (_req, res) => res.json(remediationRegister()));
  app.get("/api/sequence-lanes", (_req, res) => res.json(sequenceLanes()));
  app.get("/api/remediation-posture", (_req, res) => res.json(remediationPosture()));
  app.get("/api/drag-map", (_req, res) => res.json(dragMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`board-decision-remediation-sequencer listening on http://127.0.0.1:${port}`);
  });
}
