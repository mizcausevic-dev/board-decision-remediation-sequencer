import { describe, expect, it } from "vitest";
import { payload, remediationPosture, remediationRegister, sequenceLanes, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the remediation summary", () => {
    expect(summary().lanesSequenced).toBeGreaterThan(0);
  });

  it("returns the remediation register view", () => {
    expect(remediationRegister().length).toBeGreaterThan(0);
  });

  it("returns the sequence lanes view", () => {
    expect(sequenceLanes().length).toBeGreaterThan(0);
  });

  it("returns the remediation posture view", () => {
    expect(remediationPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.lanesSequenced).toBeGreaterThan(0);
  });
});
