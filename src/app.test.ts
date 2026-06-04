import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-remediation-sequencer app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Remediation Sequencer");
  });

  it("serves the remediation register route", async () => {
    const response = await request(app).get("/remediation-register");
    expect(response.status).toBe(200);
  });

  it("serves the sequence lanes route", async () => {
    const response = await request(app).get("/sequence-lanes");
    expect(response.status).toBe(200);
  });

  it("serves the remediation posture route", async () => {
    const response = await request(app).get("/remediation-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.lanesSequenced).toBeGreaterThan(0);
  });
});
