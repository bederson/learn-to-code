// Our very first test. It only checks that the test tools work.
import { describe, it, expect } from "vitest";
import { add } from "./setup";

describe("setup", () => {
  it("adds 1 + 1 to get 2", () => {
    expect(add(1, 1)).toBe(2);
  });
});
