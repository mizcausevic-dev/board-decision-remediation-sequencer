export type RemediationTrack =
  | "AI_GOVERNANCE"
  | "PROCUREMENT_TRUST"
  | "BIOTECH_DIAGNOSTICS"
  | "FINTECH_CONTROLS"
  | "PLATFORM_ENGINEERING"
  | "NONPROFIT_OPERATIONS";

export type RemediationAction =
  | "SIMPLIFY"
  | "STANDARDIZE"
  | "AUTOMATE"
  | "ESCALATE"
  | "CONTAIN"
  | "RESET_OWNER";

export type SequenceTier = "IMMEDIATE" | "NEXT" | "QUEUE" | "WATCH";

export type RemediationSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionRemediationSequencerItem {
  id: string;
  lane: string;
  track: RemediationTrack;
  action: RemediationAction;
  sequenceTier: SequenceTier;
  sequenceTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  sequenceNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  dependencyMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  dependencyLoadScore: number;
  ownerReadinessScore: number;
  executionWindowScore: number;
  dragContainmentScore: number;
  decisionAgeDays: number;
  sequenceReadinessScore: number;
  recoverableValueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface RemediationAssessment {
  severity: RemediationSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionRemediationSequencerReportItem extends BoardDecisionRemediationSequencerItem {
  dependencyAssessment: RemediationAssessment;
  ownerAssessment: RemediationAssessment;
  windowAssessment: RemediationAssessment;
  containmentAssessment: RemediationAssessment;
  freshnessAssessment: RemediationAssessment;
  readinessAssessment: RemediationAssessment;
  compositeRemediationDragScore: number;
}

export interface BoardDecisionRemediationSequencerSummary {
  lanesSequenced: number;
  immediateLanes: number;
  blockedLanes: number;
  ownerResetLanes: number;
  averageSequenceReadiness: number;
  recoverableValueMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionRemediationSequencerExport {
  generatedAt: string;
  summary: BoardDecisionRemediationSequencerSummary;
  items: BoardDecisionRemediationSequencerReportItem[];
}

export interface BoardDecisionRemediationSequencerPayload {
  report: BoardDecisionRemediationSequencerExport;
  remediationRegister: ReturnType<typeof import("./services/verticalBriefService.js").remediationRegister>;
  sequenceLanes: ReturnType<typeof import("./services/verticalBriefService.js").sequenceLanes>;
  remediationPosture: ReturnType<typeof import("./services/verticalBriefService.js").remediationPosture>;
  dragMap: ReturnType<typeof import("./services/verticalBriefService.js").dragMap>;
  verification: string[];
  sample: BoardDecisionRemediationSequencerItem[];
}
