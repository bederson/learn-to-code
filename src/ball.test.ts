// Tests for how the ball moves (Step 2) and slows down (Step 3).
import { describe, it, expect } from "vitest";
import { vec, length } from "./vector";
import { makeBall, move, applyFriction } from "./ball";

describe("makeBall", () => {
  it("starts at the given spot, not moving", () => {
    const ball = makeBall(vec(100, 50), 10);
    expect(ball.pos).toEqual({ x: 100, y: 50 });
    expect(ball.vel).toEqual({ x: 0, y: 0 });
    expect(ball.radius).toBe(10);
  });
});

// Step 2: movement
describe("move", () => {
  it("moves by velocity × time", () => {
    const ball = { ...makeBall(vec(0, 0), 10), vel: vec(10, 0) };
    expect(move(ball, 0.1).pos).toEqual({ x: 1, y: 0 });
  });

  it("moves in both directions at once", () => {
    const ball = { ...makeBall(vec(5, 5), 10), vel: vec(-20, 40) };
    expect(move(ball, 0.5).pos).toEqual({ x: -5, y: 25 });
  });

  it("a ball that isn't moving stays put", () => {
    const ball = makeBall(vec(5, 5), 10);
    expect(move(ball, 1).pos).toEqual({ x: 5, y: 5 });
  });

  it("does not change the velocity", () => {
    const ball = { ...makeBall(vec(0, 0), 10), vel: vec(3, 4) };
    expect(move(ball, 1).vel).toEqual({ x: 3, y: 4 });
  });
});

// Step 3: friction
describe("applyFriction", () => {
  it("makes the ball slower", () => {
    const ball = { ...makeBall(vec(0, 0), 10), vel: vec(100, 0) };
    const after = applyFriction(ball, 50, 0.1);
    expect(length(after.vel)).toBeCloseTo(95);
  });

  it("keeps the ball going the same direction", () => {
    const ball = { ...makeBall(vec(0, 0), 10), vel: vec(30, 40) }; // speed 50
    const after = applyFriction(ball, 10, 1); // speed 40
    expect(after.vel.x).toBeCloseTo(24);
    expect(after.vel.y).toBeCloseTo(32);
  });

  it("stops the ball completely instead of making it go backwards", () => {
    const ball = { ...makeBall(vec(0, 0), 10), vel: vec(1, 0) };
    expect(applyFriction(ball, 50, 1).vel).toEqual({ x: 0, y: 0 });
  });

  it("a ball sitting still stays still, even if time goes backwards", () => {
    // Bug found by playing: a negative time step made the ball's position "not a number".
    const ball = makeBall(vec(0, 0), 10);
    expect(applyFriction(ball, 50, -0.01).vel).toEqual({ x: 0, y: 0 });
  });

  it("eventually stops a fast ball", () => {
    let ball = { ...makeBall(vec(0, 0), 10), vel: vec(500, 300) };
    for (let i = 0; i < 1000; i++) {
      ball = applyFriction(ball, 100, 1 / 60);
    }
    expect(ball.vel).toEqual({ x: 0, y: 0 });
  });
});
