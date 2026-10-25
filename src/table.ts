// The table: its size, its walls, and its pockets.
import { Vec, vec, distance } from "./vector";
import { Ball } from "./ball";

export type Table = {
  width: number;
  height: number;
  pockets: Vec[]; // the center of each pocket
  pocketRadius: number;
};

// Make a table with 6 pockets: one in each corner and one in the middle of each long side.
export function makeTable(width: number, height: number, pocketRadius: number): Table {
  const pockets = [
    vec(0, 0),
    vec(width / 2, 0),
    vec(width, 0),
    vec(0, height),
    vec(width / 2, height),
    vec(width, height),
  ];
  return { width, height, pockets, pocketRadius };
}

// Step 4: if the ball has gone past a wall, push it back and send it the other way.
export function bounceOffWalls(ball: Ball, table: Table): Ball {
  const r = ball.radius;
  let x = ball.pos.x;
  let y = ball.pos.y;
  let vx = ball.vel.x;
  let vy = ball.vel.y;

  // Left wall: make sure it's moving right.
  if (x < r) {
    x = r;
    vx = Math.abs(vx);
  }
  // Right wall: make sure it's moving left.
  if (x > table.width - r) {
    x = table.width - r;
    vx = -Math.abs(vx);
  }
  // Top wall: make sure it's moving down.
  if (y < r) {
    y = r;
    vy = Math.abs(vy);
  }
  // Bottom wall: make sure it's moving up.
  if (y > table.height - r) {
    y = table.height - r;
    vy = -Math.abs(vy);
  }

  return { ...ball, pos: vec(x, y), vel: vec(vx, vy) };
}

// Step 5: the ball is sunk if its center is close enough to any pocket.
export function isInPocket(ball: Ball, table: Table): boolean {
  for (const pocket of table.pockets) {
    if (distance(ball.pos, pocket) < table.pocketRadius) {
      return true;
    }
  }
  return false;
}
