// Tests for hitting the ball (Step 6).
// You aim like a slingshot: press, pull back, let go. The ball shoots
// the opposite way you pulled, and a longer pull means a harder shot.
import { describe, it, expect } from "vitest";
import { vec, length } from "./vector";
import { makeBall } from "./ball";
import { shotVelocity, canShoot, SHOT_POWER, MAX_SHOT_SPEED } from "./shot";

describe("shotVelocity", () => {
  it("shoots the opposite way you pulled", () => {
    // Pulled left, so the ball goes right.
    const v = shotVelocity(vec(100, 100), vec(80, 100));
    expect(v.x).toBeGreaterThan(0);
    expect(v.y).toBe(0);
  });

  it("a longer pull makes a faster shot", () => {
    const short = shotVelocity(vec(100, 100), vec(90, 100));
    const long = shotVelocity(vec(100, 100), vec(50, 100));
    expect(length(long)).toBeGreaterThan(length(short));
  });

  it("speed is pull length × power", () => {
    const v = shotVelocity(vec(100, 100), vec(100, 80)); // pulled 20 up, so it goes down
    expect(v).toEqual({ x: 0, y: 20 * SHOT_POWER });
  });

  it("never goes faster than the maximum speed", () => {
    const v = shotVelocity(vec(0, 0), vec(-5000, -5000));
    expect(length(v)).toBeCloseTo(MAX_SHOT_SPEED);
  });

  it("keeps the aim direction when capping the speed", () => {
    const v = shotVelocity(vec(0, 0), vec(-3000, -4000));
    expect(v.x).toBeCloseTo(MAX_SHOT_SPEED * 0.6);
    expect(v.y).toBeCloseTo(MAX_SHOT_SPEED * 0.8);
  });

  it("no pull means no shot", () => {
    expect(shotVelocity(vec(50, 50), vec(50, 50))).toEqual({ x: 0, y: 0 });
  });
});

describe("canShoot", () => {
  it("you can hit a ball that is sitting still", () => {
    expect(canShoot(makeBall(vec(10, 10), 10))).toBe(true);
  });

  it("you can't hit a ball that is still rolling", () => {
    const rolling = { ...makeBall(vec(10, 10), 10), vel: vec(5, 0) };
    expect(canShoot(rolling)).toBe(false);
  });
});
