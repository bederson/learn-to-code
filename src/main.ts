// This file runs in the browser when the page loads.
// It connects the game to the screen and the mouse, then keeps it running.
import { Vec, vec } from "./vector";
import { makeGame, step, shoot, resetGame } from "./game";
import { draw } from "./draw";
import { loadNumber, saveNumber } from "./storage";

const canvas = document.getElementById("table") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const scoreText = document.getElementById("score")!;
const shotsText = document.getElementById("shots")!;
const resetButton = document.getElementById("reset")!;

// Start a game, picking up the score and shots saved from last time.
let game = makeGame();
game = { ...game, score: loadNumber(localStorage, "score"), shots: loadNumber(localStorage, "shots") };
canvas.width = game.table.width;
canvas.height = game.table.height;

// Where you pressed and where the pointer is now, while you're pulling back.
let aim: { from: Vec; to: Vec } | null = null;

// Show the score and shots on the page, and save them for next time.
function updateScoreboard() {
  scoreText.textContent = String(game.score);
  shotsText.textContent = String(game.shots);
  saveNumber(localStorage, "score", game.score);
  saveNumber(localStorage, "shots", game.shots);
}
updateScoreboard();

// Reset: start over from 0.
resetButton.addEventListener("click", () => {
  game = resetGame();
  aim = null;
  updateScoreboard();
});

// Turn a mouse or touch position into a spot on the table.
// (The canvas may be shown smaller than its real size, e.g. on a phone,
// and the wooden rail around it isn't part of the table.)
function pointOnTable(event: PointerEvent): Vec {
  const box = canvas.getBoundingClientRect();
  const left = box.left + canvas.clientLeft; // skip past the rail
  const top = box.top + canvas.clientTop;
  return vec(
    ((event.clientX - left) / canvas.clientWidth) * canvas.width,
    ((event.clientY - top) / canvas.clientHeight) * canvas.height,
  );
}

// Press: start aiming.
canvas.addEventListener("pointerdown", (event) => {
  const point = pointOnTable(event);
  aim = { from: point, to: point };
  canvas.setPointerCapture(event.pointerId);
});

// Move: pull back.
canvas.addEventListener("pointermove", (event) => {
  if (aim) {
    aim.to = pointOnTable(event);
  }
});

// Let go: shoot!
canvas.addEventListener("pointerup", () => {
  if (aim) {
    game = shoot(game, aim.from, aim.to);
    aim = null;
    updateScoreboard();
  }
});

// The game loop: about 60 times a second, move the game forward and redraw it.
let lastTime = performance.now();

function frame(now: number) {
  // How many seconds since the last frame. If the tab was hidden for a while,
  // pretend only a tiny bit of time passed so the ball doesn't jump.
  const dt = Math.min((now - lastTime) / 1000, 1 / 30);
  lastTime = now;

  const scoreBefore = game.score;
  game = step(game, dt);
  if (game.score !== scoreBefore) {
    updateScoreboard();
  }
  draw(ctx, game, aim);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
