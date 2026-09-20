import assert from "node:assert/strict";
import test from "node:test";
import { sortExperiences, summarize } from "../lib/portfolio.mjs";

test("summarize selects meaningful text and stays within the requested length", () => {
  const value = `Overview\n\n${"Reliable infrastructure needs clear operational boundaries. ".repeat(8)}`;
  const result = summarize(value, 140);

  assert.match(result, /^Reliable infrastructure/);
  assert.ok(result.length <= 143);
  assert.match(result, /\.\.\.$/);
});

test("sortExperiences places the current role first without mutating input", () => {
  const experiences = [
    { id: 2, period: "2024" },
    { id: 7, period: "June 2026 - Present" },
    { id: 5, period: "2025 - 2026" }
  ];
  const result = sortExperiences(experiences);

  assert.deepEqual(result.map(({ id }) => id), [7, 5, 2]);
  assert.deepEqual(experiences.map(({ id }) => id), [2, 7, 5]);
});
