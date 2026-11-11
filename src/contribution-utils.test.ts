import { describe, expect, it } from "vitest";
import {
  barHeight,
  clamp01,
  computeStats,
  dayMs,
  easeInOutCubic,
  easeOutCubic,
  lerp,
  levelOf,
  smoothstep,
  toKey,
  type Cell,
} from "./contribution-utils";

describe("contribution-utils math primitives", () => {
  it("clamps values between 0 and 1", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(0)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(1)).toBe(1);
    expect(clamp01(2.5)).toBe(1);
  });

  it("interpolates linearly between numbers", () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("evaluates easing curves within bounds", () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(0.5)).toBe(0.5);
    expect(easeInOutCubic(1)).toBe(1);

    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it("evaluates smoothstep correctly", () => {
    expect(smoothstep(0, 10, -5)).toBe(0);
    expect(smoothstep(0, 10, 5)).toBe(0.5);
    expect(smoothstep(0, 10, 15)).toBe(1);
  });
});

describe("contribution-utils date handling", () => {
  it("converts timestamps to YYYY-MM-DD keys in UTC", () => {
    const timestamp = Date.UTC(2026, 10, 11);
    expect(toKey(timestamp)).toBe("2026-11-11");
  });

  it("parses literal date strings without timezone drift", () => {
    const ms = dayMs("2026-11-11");
    expect(new Date(ms).toISOString().slice(0, 10)).toBe("2026-11-11");
  });
});

describe("contribution-utils levels & heights", () => {
  it("quantizes commit counts into activity levels 0-4", () => {
    expect(levelOf(0, 10)).toBe(0);
    expect(levelOf(-1, 10)).toBe(0);
    expect(levelOf(1, 10)).toBe(1);
    expect(levelOf(10, 10)).toBe(4);
    expect(levelOf(25, 10)).toBe(4);
  });

  it("calculates 3D bar height proportional to max count", () => {
    expect(barHeight(0, 10)).toBe(0.2);
    expect(barHeight(10, 10)).toBeGreaterThan(5);
  });
});

describe("contribution-utils stats computation", () => {
  it("computes stats, busiest day, and streaks accurately", () => {
    const sampleCells: Cell[] = [
      { date: "2026-11-01", count: 0, level: 0, week: 0, day: 0 },
      { date: "2026-11-02", count: 3, level: 1, week: 0, day: 1 },
      { date: "2026-11-03", count: 8, level: 3, week: 0, day: 2 },
      { date: "2026-11-04", count: 0, level: 0, week: 0, day: 3 },
    ];

    const stats = computeStats(sampleCells);
    expect(stats.total).toBe(11);
    expect(stats.first).toBe("2026-11-01");
    expect(stats.last).toBe("2026-11-04");
    expect(stats.busiest.count).toBe(8);
    expect(stats.busiest.date).toBe("2026-11-03");
    expect(stats.longest.days).toBe(2);
  });
});
