import type { BoardDecisionRemediationSequencerSummary } from "./types.js";

export function formatSummary(
  summary: BoardDecisionRemediationSequencerSummary,
  title = "Board Decision Remediation Sequencer"
) {
  return [
    title,
    `Lanes sequenced: ${summary.lanesSequenced}`,
    `Immediate lanes: ${summary.immediateLanes}`,
    `Blocked lanes: ${summary.blockedLanes}`,
    `Owner-reset lanes: ${summary.ownerResetLanes}`,
    `Average sequence readiness: ${summary.averageSequenceReadiness}`,
    `Recoverable value: $${summary.recoverableValueMillions}M`,
    `Lead: ${summary.leadingMessage}`
  ].join("\n");
}
