// The ball: where it is, how fast it's going, and how big it is.
import { Vec, vec, add, scale, length } from "./vector";

export type Ball = {
  pos: Vec; // position: where the center of the ball is
  vel: Vec; // velocity: how far it moves each second, and in which direction
  radius: number;
};

// Make a ball sitting still at a spot.
export function makeBall(pos: Vec, radius: number): Ball {
  return { pos, vel: vec(0, 0), radius };
}

// Step 2: move the ball forward by a small amount of time (dt, in seconds).
// New position = old position + velocity × time.
export function move(ball: Ball, dt: number): Ball {
  return { ...ball, pos: add(ball.pos, scale(ball.vel, dt)) };
}

// Step 3: friction slows the ball down by a fixed amount each second.
// "slowdown" is how much speed it loses per second.
export function applyFriction(ball: Ball, slowdown: number, dt: number): Ball {
  const speed = length(ball.vel);

  // A ball that isn't moving has nothing to slow down.
  if (speed === 0) {
    return ball;
  }

  const newSpeed = speed - slowdown * dt;

  // If friction would take away all the speed (or more), just stop.
  if (newSpeed <= 0) {
    return { ...ball, vel: vec(0, 0) };
  }

  // Otherwise shrink the velocity, keeping the same direction.
  return { ...ball, vel: scale(ball.vel, newSpeed / speed) };
}
