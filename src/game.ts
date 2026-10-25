// Step 7: the whole game, and what happens in one small slice of time.
import { Vec, vec } from "./vector";
import { Ball, makeBall, move, applyFriction } from "./ball";
import { Table, makeTable, bounceOffWalls, isInPocket } from "./table";
import { shotVelocity, canShoot } from "./shot";

// The sizes of everything, in pixels.
export const TABLE_WIDTH = 800;
export const TABLE_HEIGHT = 400;
export const BALL_RADIUS = 10;
export const POCKET_RADIUS = 20;

// How much speed the ball loses each second from rolling on the felt.
export const FRICTION = 150;

export type Game = {
  table: Table;
  ball: Ball;
  startPos: Vec; // where a new ball is placed
  score: number; // how many balls have gone into a pocket
  shots: number; // how many times you've hit the ball
};

// A new game: the ball sits still on the left side of the table.
export function makeGame(): Game {
  const table = makeTable(TABLE_WIDTH, TABLE_HEIGHT, POCKET_RADIUS);
  const startPos = vec(TABLE_WIDTH / 4, TABLE_HEIGHT / 2);
  return { table, ball: makeBall(startPos, BALL_RADIUS), startPos, score: 0, shots: 0 };
}

// Start over: score and shots back to 0, ball back on the start spot.
export function resetGame(): Game {
  return makeGame();
}

// Hit the ball (only if it has stopped rolling).
export function shoot(game: Game, pressedAt: Vec, releasedAt: Vec): Game {
  if (!canShoot(game.ball)) {
    return game;
  }
  const vel = shotVelocity(pressedAt, releasedAt);

  // A click without pulling back doesn't count as a shot.
  if (vel.x === 0 && vel.y === 0) {
    return game;
  }
  return { ...game, ball: { ...game.ball, vel }, shots: game.shots + 1 };
}

// Let a small amount of time (dt, in seconds) pass.
export function step(game: Game, dt: number): Game {
  let ball = move(game.ball, dt);

  // Fell in a pocket? Add 1 to the score and put a new ball on the start spot.
  if (isInPocket(ball, game.table)) {
    return { ...game, ball: makeBall(game.startPos, BALL_RADIUS), score: game.score + 1 };
  }

  ball = bounceOffWalls(ball, game.table);
  ball = applyFriction(ball, FRICTION, dt);
  return { ...game, ball };
}
