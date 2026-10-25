// Step 6: hitting the ball, like a slingshot.
// Press, pull back, and let go: the ball shoots the opposite way you pulled.
import { Vec, subtract, scale, length } from "./vector";
import { Ball } from "./ball";

// How much speed you get for each pixel you pull back.
export const SHOT_POWER = 5;

// The fastest a shot can be, in pixels per second.
export const MAX_SHOT_SPEED = 1500;

// Turn a pull (from where you pressed to where you let go) into a velocity.
export function shotVelocity(pressedAt: Vec, releasedAt: Vec): Vec {
  // The arrow from where you let go back to where you pressed points the way the ball goes.
  const shot = scale(subtract(pressedAt, releasedAt), SHOT_POWER);
  const speed = length(shot);

  // Too fast? Shrink it down to the maximum, keeping the same direction.
  if (speed > MAX_SHOT_SPEED) {
    return scale(shot, MAX_SHOT_SPEED / speed);
  }
  return shot;
}

// You can only hit the ball once it has stopped rolling.
export function canShoot(ball: Ball): boolean {
  return ball.vel.x === 0 && ball.vel.y === 0;
}
