// Tests for the table: bouncing off walls (Step 4) and pockets (Step 5).
import { describe, it, expect } from "vitest";
import { vec } from "./vector";
import { makeBall } from "./ball";
import { makeTable, bounceOffWalls, isInPocket } from "./table";

const table = makeTable(800, 400, 20);

function ballAt(x: number, y: number, vx = 0, vy = 0) {
  return { ...makeBall(vec(x, y), 10), vel: vec(vx, vy) };
}

describe("makeTable", () => {
  it("has a width, height, and pocket size", () => {
    expect(table.width).toBe(800);
    expect(table.height).toBe(400);
    expect(table.pocketRadius).toBe(20);
  });

  it("has 6 pockets: 4 corners and the middle of each long side", () => {
    expect(table.pockets).toHaveLength(6);
    expect(table.pockets).toContainEqual({ x: 0, y: 0 });
    expect(table.pockets).toContainEqual({ x: 400, y: 0 });
    expect(table.pockets).toContainEqual({ x: 800, y: 0 });
    expect(table.pockets).toContainEqual({ x: 0, y: 400 });
    expect(table.pockets).toContainEqual({ x: 400, y: 400 });
    expect(table.pockets).toContainEqual({ x: 800, y: 400 });
  });
});

// Step 4: walls
describe("bounceOffWalls", () => {
  it("a ball moving right into the right wall ends up moving left", () => {
    const after = bounceOffWalls(ballAt(795, 200, 100, 0), table);
    expect(after.vel).toEqual({ x: -100, y: 0 });
  });

  it("a ball moving left into the left wall ends up moving right", () => {
    const after = bounceOffWalls(ballAt(3, 200, -100, 0), table);
    expect(after.vel).toEqual({ x: 100, y: 0 });
  });

  it("a ball moving up into the top wall ends up moving down", () => {
    const after = bounceOffWalls(ballAt(300, 2, 0, -50), table);
    expect(after.vel).toEqual({ x: 0, y: 50 });
  });

  it("a ball moving down into the bottom wall ends up moving up", () => {
    const after = bounceOffWalls(ballAt(300, 399, 0, 50), table);
    expect(after.vel).toEqual({ x: 0, y: -50 });
  });

  it("only flips the part of the velocity that hit the wall", () => {
    const after = bounceOffWalls(ballAt(795, 200, 100, 30), table);
    expect(after.vel).toEqual({ x: -100, y: 30 });
  });

  it("pushes the ball back so its edge touches the wall", () => {
    const after = bounceOffWalls(ballAt(795, 200, 100, 0), table);
    expect(after.pos).toEqual({ x: 790, y: 200 });
  });

  it("bounces off two walls at once in a corner", () => {
    const after = bounceOffWalls(ballAt(2, 3, -10, -20), table);
    expect(after.pos).toEqual({ x: 10, y: 10 });
    expect(after.vel).toEqual({ x: 10, y: 20 });
  });

  it("leaves a ball in the middle of the table alone", () => {
    const ball = ballAt(400, 200, 100, 30);
    expect(bounceOffWalls(ball, table)).toEqual(ball);
  });
});

// Step 5: pockets
describe("isInPocket", () => {
  it("a ball right over a pocket is sunk", () => {
    expect(isInPocket(ballAt(400, 0), table)).toBe(true);
  });

  it("a ball near a pocket, but not close enough, is not sunk", () => {
    expect(isInPocket(ballAt(400, 25), table)).toBe(false);
  });

  it("a ball in the middle of the table is not sunk", () => {
    expect(isInPocket(ballAt(400, 200), table)).toBe(false);
  });

  it("checks every pocket, not just the first one", () => {
    expect(isInPocket(ballAt(795, 395), table)).toBe(true);
  });

  it("a ball pushed tight into a corner falls in", () => {
    // The walls stop the ball's center 10 away from each side,
    // so the corner pocket must be big enough to reach it.
    const squashed = bounceOffWalls(ballAt(0, 0, -5, -5), table);
    expect(isInPocket(squashed, table)).toBe(true);
  });
});
