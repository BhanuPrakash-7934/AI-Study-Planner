import { describe, expect, it } from "vitest";
import { completionPercent } from "../lib/planner";

describe("completionPercent", () => {
  it("returns zero for empty plans", () => expect(completionPercent(0, 0)).toBe(0));
  it("calculates completion percentage", () => expect(completionPercent(10, 5)).toBe(50));
});
