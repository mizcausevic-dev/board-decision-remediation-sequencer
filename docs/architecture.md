# Architecture

Board Decision Remediation Sequencer is a static-friendly TypeScript executive-intelligence surface for sequencing remediation motions, exposing dependency drag, and clarifying which owner resets or timing windows should move first across the broader Kinetic Gain suite.

## Routes

- `/`
- `/remediation-register`
- `/sequence-lanes`
- `/remediation-posture`
- `/verification`
- `/docs`

## Core Flow

1. `src/data/sampleVerticalBrief.ts`
   - contains the modeled remediation estate
2. `src/analyze.ts`
   - converts dependency load, owner readiness, execution windows, drag containment, age, and sequence readiness into one report
3. `src/services/verticalBriefService.ts`
   - shapes route-specific views for the register, sequence lanes, and posture surfaces
4. `src/services/render.ts`
   - renders the static board-facing HTML routes
5. `scripts/prerender.ts`
   - writes the static site, robots, sitemap, and JSON payloads into `dist-static/`
