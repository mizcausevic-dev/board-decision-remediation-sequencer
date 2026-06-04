import { analyze } from "../analyze.js";
import { sampleBoardDecisionRemediationSequencer } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionRemediationSequencer, { now: "2026-06-03T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Collapse AI approval hops, standardize procurement proof bundles, contain biotech closeout drift, simplify FinTech packet scope, reset the platform cutover owner, and keep nonprofit refresh in watch mode before the next board cycle."
  };
}

export function remediationRegister() {
  return sampleBoardDecisionRemediationSequencer.map((item) => ({
    lane: item.lane,
    sequenceTier: item.sequenceTier,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    sequenceTheme: item.sequenceTheme,
    sequenceNarrative: item.sequenceNarrative,
    sequenceReadinessScore: item.sequenceReadinessScore,
    nextMove: item.nextMove
  }));
}

export function sequenceLanes() {
  return sampleBoardDecisionRemediationSequencer.map((item) => ({
    lane: item.lane,
    sequenceTier: item.sequenceTier,
    sequenceTheme: item.sequenceTheme,
    riskHeadline: item.riskHeadline,
    blockingIssue: item.blockingIssue,
    evidenceArtifacts: item.evidenceArtifacts,
    dependencyLoadScore: item.dependencyLoadScore,
    ownerReadinessScore: item.ownerReadinessScore,
    executionWindowScore: item.executionWindowScore,
    dragContainmentScore: item.dragContainmentScore,
    decisionAgeDays: item.decisionAgeDays,
    sequenceReadinessScore: item.sequenceReadinessScore
  }));
}

export function remediationPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeRemediationDragScore: item.compositeRemediationDragScore,
    owner: item.owner,
    recoverableValueMillions: item.recoverableValueMillions,
    nextMove: item.nextMove
  }));
}

export function dragMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    sequenceTheme: item.sequenceTheme,
    compositeRemediationDragScore: item.compositeRemediationDragScore,
    sequenceReadinessScore: item.sequenceReadinessScore,
    dependencyLoadScore: item.dependencyLoadScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic remediation-sequencing data only - no live board packets, private committee minutes, or confidential investor materials are included.",
    "Scores are modeled to show how Kinetic Gain can expose dependency drag, owner weakness, timing ambiguity, and trapped recoverable value in one board-readable sequencing surface.",
    "All routes are read-only and demonstrate executive remediation planning, not legal advice, fiduciary guidance, or live board instruction."
  ];
}

export function payload() {
  return {
    report,
    remediationRegister: remediationRegister(),
    sequenceLanes: sequenceLanes(),
    remediationPosture: remediationPosture(),
    dragMap: dragMap(),
    verification: verification(),
    sample: sampleBoardDecisionRemediationSequencer
  };
}
