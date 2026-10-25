// Tests for vectors: pairs of numbers (x, y) used for positions and speeds.
import { describe, it, expect } from "vitest";
import { vec, add, subtract, scale, length, distance } from "./vector";

describe("vec", () => {
  it("makes a vector from x and y", () => {
    expect(vec(3, 4)).toEqual({ x: 3, y: 4 });
  });
});

describe("add", () => {
  it("adds the x parts and the y parts", () => {
    expect(add(vec(1, 2), vec(10, 20))).toEqual({ x: 11, y: 22 });
  });

  it("works with negative numbers", () => {
    expect(add(vec(5, 5), vec(-2, -7))).toEqual({ x: 3, y: -2 });
  });
});

describe("scale", () => {
  it("multiplies both parts by a number", () => {
    expect(scale(vec(2, 3), 10)).toEqual({ x: 20, y: 30 });
  });

  it("scaling by 0 gives a zero vector", () => {
    expect(scale(vec(2, 3), 0)).toEqual({ x: 0, y: 0 });
  });
});

describe("length", () => {
  it("measures how long the vector is (3, 4 makes 5)", () => {
    expect(length(vec(3, 4))).toBe(5);
  });

  it("a zero vector has length 0", () => {
    expect(length(vec(0, 0))).toBe(0);
  });
});

describe("subtract", () => {
  it("subtracts the x parts and the y parts", () => {
    expect(subtract(vec(10, 20), vec(1, 2))).toEqual({ x: 9, y: 18 });
  });
});

describe("distance", () => {
  it("measures how far apart two points are", () => {
    expect(distance(vec(1, 1), vec(4, 5))).toBe(5);
  });

  it("a point is 0 away from itself", () => {
    expect(distance(vec(7, 7), vec(7, 7))).toBe(0);
  });
});
