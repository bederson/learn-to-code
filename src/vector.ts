// A vector is a pair of numbers: how far across (x) and how far down (y).
// We use vectors for the ball's position and for its velocity (speed + direction).
export type Vec = { x: number; y: number };

// Make a new vector.
export function vec(x: number, y: number): Vec {
  return { x, y };
}

// Add two vectors: add the x parts together and the y parts together.
export function add(a: Vec, b: Vec): Vec {
  return vec(a.x + b.x, a.y + b.y);
}

// Multiply both parts of a vector by the same number.
export function scale(v: Vec, factor: number): Vec {
  return vec(v.x * factor, v.y * factor);
}

// How long the vector is, using the Pythagorean theorem: √(x² + y²).
export function length(v: Vec): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
