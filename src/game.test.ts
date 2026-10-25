// Tests for the game as a whole (Step 7): one "step" of time passing.
import { describe, it, expect } from "vitest";
import { vec, length } from "./vector";
import { makeGame, step, shoot, resetGame } from "./game";

describe("makeGame", () => {
  it("starts with the ball sitting still at the start spot", () => {
    const game = makeGame();
    expect(game.ball.pos).toEqual(game.startPos);
    expect(game.ball.vel).toEqual({ x: 0, y: 0 });
  });

  it("the start spot is on the table", () => {
    const { startPos, table } = makeGame();
    expect(startPos.x).toBeGreaterThan(0);
    expect(startPos.x).toBeLessThan(table.width);
    expect(startPos.y).toBeGreaterThan(0);
    expect(startPos.y).toBeLessThan(table.height);
  });
});

describe("shoot", () => {
  it("gives a still ball some speed", () => {
    const game = shoot(makeGame(), vec(100, 100), vec(50, 100));
    expect(game.ball.vel.x).toBeGreaterThan(0);
  });

  it("does nothing while the ball is still rolling", () => {
    const rolling = shoot(makeGame(), vec(100, 100), vec(50, 100));
    const again = shoot(rolling, vec(100, 100), vec(100, 0));
    expect(again.ball.vel).toEqual(rolling.ball.vel);
  });
});

describe("step", () => {
  it("a still ball stays where it is", () => {
    const game = makeGame();
    expect(step(game, 1 / 60).ball).toEqual(game.ball);
  });

  it("a rolling ball moves", () => {
    const game = shoot(makeGame(), vec(100, 100), vec(50, 100));
    const after = step(game, 1 / 60);
    expect(after.ball.pos.x).toBeGreaterThan(game.ball.pos.x);
  });

  it("a rolling ball slows down", () => {
    const game = shoot(makeGame(), vec(100, 100), vec(50, 100));
    const after = step(game, 1 / 60);
    expect(length(after.ball.vel)).toBeLessThan(length(game.ball.vel));
  });

  it("the ball bounces off a wall", () => {
    const game = makeGame();
    const nearWall = {
      ...game,
      ball: { ...game.ball, pos: vec(game.table.width / 2 + 50, game.table.height - 12), vel: vec(0, 300) },
    };
    const after = step(nearWall, 1 / 60);
    expect(after.ball.vel.y).toBeLessThan(0);
  });

  it("a ball that goes into a pocket is put back on the start spot, still", () => {
    const game = makeGame();
    const nearPocket = { ...game, ball: { ...game.ball, pos: vec(15, 15), vel: vec(-300, -300) } };
    const after = step(nearPocket, 1 / 60);
    expect(after.ball.pos).toEqual(game.startPos);
    expect(after.ball.vel).toEqual({ x: 0, y: 0 });
  });

  it("a rolling ball eventually stops on its own", () => {
    let game = shoot(makeGame(), vec(0, 0), vec(30, 10));
    for (let i = 0; i < 60 * 60; i++) {
      game = step(game, 1 / 60);
    }
    expect(game.ball.vel).toEqual({ x: 0, y: 0 });
  });
});

// Step 8: score
describe("score", () => {
  it("a new game starts with a score of 0", () => {
    expect(makeGame().score).toBe(0);
  });

  it("sinking a ball adds 1 to the score", () => {
    const game = makeGame();
    const nearPocket = { ...game, score: 4, ball: { ...game.ball, pos: vec(15, 15), vel: vec(-300, -300) } };
    expect(step(nearPocket, 1 / 60).score).toBe(5);
  });

  it("rolling around without sinking doesn't change the score", () => {
    let game = shoot(makeGame(), vec(100, 200), vec(100, 150)); // straight down and back up
    for (let i = 0; i < 60; i++) {
      game = step(game, 1 / 60);
    }
    expect(game.score).toBe(0);
  });
});

// Step 9: shot counter and reset
describe("shots", () => {
  it("a new game starts with 0 shots", () => {
    expect(makeGame().shots).toBe(0);
  });

  it("each shot adds 1", () => {
    const game = shoot(makeGame(), vec(100, 100), vec(50, 100));
    expect(game.shots).toBe(1);
  });

  it("a click with no pull isn't a shot", () => {
    const game = shoot(makeGame(), vec(100, 100), vec(100, 100));
    expect(game.shots).toBe(0);
  });

  it("trying to hit a rolling ball isn't a shot", () => {
    const rolling = shoot(makeGame(), vec(100, 100), vec(50, 100));
    expect(shoot(rolling, vec(100, 100), vec(50, 100)).shots).toBe(1);
  });
});

describe("resetGame", () => {
  it("sets the score and shots back to 0 and puts the ball on the start spot", () => {
    const played = { ...shoot(makeGame(), vec(100, 100), vec(50, 100)), score: 9 };
    const reset = resetGame();
    expect(reset.score).toBe(0);
    expect(reset.shots).toBe(0);
    expect(reset.ball.pos).toEqual(played.startPos);
    expect(reset.ball.vel).toEqual({ x: 0, y: 0 });
  });
});
