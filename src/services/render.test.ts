import { describe, expect, it } from "vitest";
import {
  renderDocs,
  renderRemediationOverview,
  renderRemediationPosture,
  renderRemediationRegister,
  renderSequenceLanes,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderRemediationOverview()).toContain("Board Decision Remediation Sequencer");
  });

  it("renders the remediation register route", () => {
    expect(renderRemediationRegister()).toContain("/remediation-register");
  });

  it("renders the sequence lanes route", () => {
    expect(renderSequenceLanes()).toContain("/sequence-lanes");
  });

  it("renders the remediation posture route", () => {
    expect(renderRemediationPosture()).toContain("/remediation-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic remediation-sequencing data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
