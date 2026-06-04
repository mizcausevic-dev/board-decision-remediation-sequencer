import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleBoardDecisionRemediationSequencer } from "../src/data/sampleVerticalBrief.js";
import type { BoardDecisionRemediationSequencerItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionRemediationSequencer.length);
  });

  it("counts immediate lanes", () => {
    const report = analyze(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.immediateLanes).toBeGreaterThan(0);
  });

  it("counts blocked lanes", () => {
    const report = analyze(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.blockedLanes).toBeGreaterThan(0);
  });

  it("sums recoverable value", () => {
    const report = analyze(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.recoverableValueMillions).toBe(82);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.lanesSequenced).toBe(0);
    expect(report.summary.averageSequenceReadiness).toBe(0);
    expect(report.summary.leadingMessage).toContain("directionally credible");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: BoardDecisionRemediationSequencerItem[] = [
      {
        id: "low-branch",
        lane: "Stable remediation lane",
        track: "PLATFORM_ENGINEERING",
        action: "RESET_OWNER",
        sequenceTier: "WATCH",
        sequenceTheme: "Owner reset",
        boardQuestion: "Is the remediation lane stable?",
        owner: "Platform engineering lead",
        audience: "Board operating committee",
        currentPosture: "Stable.",
        sequenceNarrative: "Controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low remediation drag.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        dependencyMoves: ["keep it stable"],
        relatedSurfaces: ["remediate.kineticgain.com"],
        companyTags: ["Azure"],
        dependencyLoadScore: 24,
        ownerReadinessScore: 82,
        executionWindowScore: 79,
        dragContainmentScore: 83,
        decisionAgeDays: 9,
        sequenceReadinessScore: 83,
        recoverableValueMillions: 4,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Pressured remediation lane",
        track: "AI_GOVERNANCE",
        action: "ESCALATE",
        sequenceTier: "NEXT",
        sequenceTheme: "Escalation readiness",
        boardQuestion: "Where is sequencing visible but not yet stable?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Watch state.",
        sequenceNarrative: "Pressured.",
        operatingReality: "Mixed.",
        riskHeadline: "Moderate remediation drag.",
        blockingIssue: "Split owners",
        evidenceArtifacts: ["control audit"],
        dependencyMoves: ["align the owner group"],
        relatedSurfaces: ["governance.kineticgain.com"],
        companyTags: ["OpenAI"],
        dependencyLoadScore: 52,
        ownerReadinessScore: 69,
        executionWindowScore: 63,
        dragContainmentScore: 66,
        decisionAgeDays: 21,
        sequenceReadinessScore: 66,
        recoverableValueMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Align owners."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-03T00:00:00Z" });
    expect(report.items[0].dependencyAssessment.severity).toBe("LOW");
    expect(report.items[0].readinessAssessment.severity).toBe("LOW");
    expect(report.items[1].dependencyAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].ownerAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].windowAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].containmentAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].freshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].readinessAssessment.severity).toBe("MEDIUM");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });
    expect(report.summary.lanesSequenced).toBe(sampleBoardDecisionRemediationSequencer.length);
  });
});
