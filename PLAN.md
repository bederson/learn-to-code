# Plan: one-ball billiards (learn-to-code)

Based on [SPEC.md](SPEC.md).

The game is built in small steps. Every step follows the same loop:

1. Write a test.
2. Watch it fail.
3. Write the code.
4. Watch the test pass.

Each step also teaches one basic coding idea.

## Tools

| Tool | What it's for |
|---|---|
| **TypeScript, HTML, CSS** | The game itself |
| **Node.js + npm** | Installs and runs the other tools. It's not part of the game. |
| **Vitest** | Runs the tests. In "watch mode" it reruns every test each time a file is saved. This is the test harness. |
| **Vite** | A small local web server, so the game runs in the browser while we edit |
| **HTML `<canvas>`** | Draws the table and the ball |

**Main design choice:** the physics (how the ball moves) goes in plain functions that don't draw anything. That makes them easy to test. The drawing code stays small and just shows whatever the physics worked out.

## Steps

### 0. Setup ✅
- Install Node, then create the project and add TypeScript, Vitest and Vite.
- Write one trivial test (`1 + 1 === 2`) to prove the test harness works.
- *You learn:* the terminal, files and folders, what a test is.

### 1. Vectors ✅
- Positions and speeds are pairs of numbers (x, y).
- Write `add`, `scale` and `length` functions.
- *You learn:* variables, functions, types.

### 2. Movement ✅
- Each moment, the ball's position goes up by its velocity multiplied by the time step.
- *Test:* a ball at (0,0) moving at (10,0) is at (1,0) after 0.1 seconds.

### 3. Friction ✅
- Each step makes the ball a little slower. It stops completely below a tiny speed.
- *Test:* speed always drops, and the ball eventually stops.
- *You learn:* `if` statements.

### 4. Wall bounces ✅
- When the ball reaches a cushion, flip that part of its velocity and keep the ball inside the table.
- *Test:* a ball moving right into the right wall ends up moving left.
- *You learn:* comparisons, edge cases.

### 5. Pockets ✅
- Six holes. If the ball's center gets close enough to one, the ball is sunk.
- *Test:* a ball over a pocket is sunk; a ball nearby is not.
- *You learn:* arrays and loops.

### 6. Hitting the ball ✅
- Click and drag to aim. The drag direction and length set the shot's direction and power, up to a maximum.
- *Test:* the drag-to-velocity math.
- *You learn:* user input, events.

### 7. Drawing and the game loop ✅
- Draw the table, pockets and ball on the canvas.
- Use `requestAnimationFrame` to run about 60 physics steps and redraws per second.
- *Test:* one full "step" of the game. The drawing itself gets checked by eye.

### 8. Score ✅
- The score is the number of balls that have gone into a hole.
- When the ball is sunk, add 1 to the score. (Putting a new ball back on the table was already done in Step 7.)
- Save the score in the browser's `localStorage` so it survives a page reload. Show it on the page.
- *Test:* sinking a ball adds 1. Saving and then loading gives back the same score. With nothing saved yet, the score starts at 0. The tests use a pretend storage object, so they don't need a real browser.
- *You learn:* state, and saving data between visits.

### 9. Polish ✅
- An aim line, a reset button and a shot counter.

## GitHub (only when directed)

- **Set up once:** create the public repository `bederson/learn-to-code` and add a GitHub Actions file (`.github/workflows/test.yml`) that runs `npm test` on every push.
- **As we go:** Claude suggests good moments to commit, but only commits or pushes when told to.

## Before starting

- [x] Is Node.js installed? (Node v26.4.0, npm 11.17.0)
- [x] Is the `gh` command-line tool installed and logged in? (gh 2.98.0, logged in as `bederson`)
