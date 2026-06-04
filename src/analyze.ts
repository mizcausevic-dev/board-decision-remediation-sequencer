import type {
  BoardDecisionRemediationSequencerExport,
  BoardDecisionRemediationSequencerItem,
  BoardDecisionRemediationSequencerReportItem,
  RemediationAssessment,
  RemediationSeverity
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): RemediationAssessment {
  let severity: RemediationSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessLow(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): RemediationAssessment {
  return assessHigh(
    100 - score,
    100 - healthy,
    100 - pressured,
    healthyMessage,
    pressureMessage,
    highMessage
  );
}

export function analyze(
  items: BoardDecisionRemediationSequencerItem[],
  options: { now?: string } = {}
): BoardDecisionRemediationSequencerExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionRemediationSequencerReportItem[] = items.map((item) => {
    const dependencyAssessment = assessHigh(
      item.dependencyLoadScore,
      36,
      58,
      "Dependency load is contained enough to move this remediation lane now.",
      "Dependency load is visible and should be reduced before more work piles on.",
      "Dependency load is too high for this remediation lane to move cleanly."
    );

    const ownerAssessment = assessLow(
      item.ownerReadinessScore,
      78,
      64,
      "Owner readiness is strong enough to carry this remediation lane.",
      "Owner readiness is visible, though still thin enough to justify a reset or backup owner.",
      "Owner readiness is too weak for this remediation lane to move safely."
    );

    const windowAssessment = assessLow(
      item.executionWindowScore,
      74,
      58,
      "Execution timing is clear enough to sequence this lane now.",
      "Execution timing is visible, but still loose enough to create sequence drag.",
      "Execution timing is too weak for this remediation lane to move safely."
    );

    const containmentAssessment = assessLow(
      item.dragContainmentScore,
      76,
      60,
      "Drag containment is strong enough to protect this lane while it moves.",
      "Drag containment is visible, though more buffering is still needed.",
      "Drag containment is too weak; this lane will shed value if sequenced too early."
    );

    const freshnessAssessment = assessHigh(
      item.decisionAgeDays,
      14,
      24,
      "The remediation packet is still fresh enough to act on cleanly.",
      "The remediation packet is aging and should be refreshed soon.",
      "The remediation packet is stale enough to weaken sequence quality."
    );

    const readinessAssessment = assessLow(
      item.sequenceReadinessScore,
      76,
      60,
      "Sequence readiness is strong enough in this lane.",
      "Sequence readiness is visible, though not yet strong enough to move without more cleanup.",
      "Sequence readiness is too weak for this lane to be sequenced now."
    );

    const compositeRemediationDragScore =
      Math.round(
        ((item.dependencyLoadScore +
          100 - item.ownerReadinessScore +
          100 - item.executionWindowScore +
          100 - item.dragContainmentScore +
          Math.min(item.decisionAgeDays * 2, 100) +
          100 - item.sequenceReadinessScore) /
          6) *
          10
      ) / 10;

    return {
      ...item,
      dependencyAssessment,
      ownerAssessment,
      windowAssessment,
      containmentAssessment,
      freshnessAssessment,
      readinessAssessment,
      compositeRemediationDragScore
    };
  });

  const immediateLanes = reportItems.filter((item) => item.sequenceTier === "IMMEDIATE").length;
  const blockedLanes = reportItems.filter(
    (item) =>
      item.dependencyAssessment.severity === "HIGH" ||
      item.ownerAssessment.severity === "HIGH" ||
      item.windowAssessment.severity === "HIGH"
  ).length;
  const ownerResetLanes = reportItems.filter((item) => item.action === "RESET_OWNER").length;
  const averageSequenceReadiness =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.sequenceReadinessScore, 0) / reportItems.length) * 10) / 10;
  const recoverableValueMillions = reportItems.reduce((sum, item) => sum + item.recoverableValueMillions, 0);

  const leadingMessage =
    blockedLanes >= 3
      ? "Too many remediation lanes are still blocked by dependency drag, weak owner readiness, or unclear timing."
      : immediateLanes >= 2
        ? "A few remediation motions are ready to move now and should not wait behind the broader cleanup backlog."
        : "The remediation estate is directionally credible, though a few lanes still need cleaner owner resets, tighter timing windows, or lower dependency load.";

  return {
    generatedAt,
    summary: {
      lanesSequenced: reportItems.length,
      immediateLanes,
      blockedLanes,
      ownerResetLanes,
      averageSequenceReadiness,
      recoverableValueMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionRemediationSequencerItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
