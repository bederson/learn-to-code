// Drawing the game on the canvas. This file only draws: it never changes the game.
import { Vec } from "./vector";
import { Game } from "./game";

// Draw everything: the felt, the pockets, the aim line (while aiming), and the ball.
export function draw(ctx: CanvasRenderingContext2D, game: Game, aim: { from: Vec; to: Vec } | null) {
  const { table, ball } = game;

  // The green felt.
  ctx.fillStyle = "#1f7a3a";
  ctx.fillRect(0, 0, table.width, table.height);

  // The pockets: black circles. The ones on the edges get cut off, which looks right.
  ctx.fillStyle = "#000";
  for (const pocket of table.pockets) {
    circle(ctx, pocket, table.pocketRadius);
  }

  // While you pull back, show a line from the ball in the direction it will go.
  if (aim) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ball.pos.x, ball.pos.y);
    ctx.lineTo(ball.pos.x + (aim.from.x - aim.to.x), ball.pos.y + (aim.from.y - aim.to.y));
    ctx.stroke();
  }

  // The ball.
  ctx.fillStyle = "#fff";
  circle(ctx, ball.pos, ball.radius);
}

// Fill in a circle.
function circle(ctx: CanvasRenderingContext2D, center: Vec, radius: number) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fill();
}
