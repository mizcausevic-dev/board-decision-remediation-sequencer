import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the remediation summary", () => {
    const output = formatSummary({
      lanesSequenced: 6,
      immediateLanes: 2,
      blockedLanes: 3,
      ownerResetLanes: 1,
      averageSequenceReadiness: 61,
      recoverableValueMillions: 82,
      leadingMessage: "Too many remediation lanes are still blocked by dependency drag, weak owner readiness, or unclear timing."
    });

    expect(output).toContain("Board Decision Remediation Sequencer");
    expect(output).toContain("Immediate lanes: 2");
    expect(output).toContain("Recoverable value: $82M");
  });
});
