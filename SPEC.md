# Perspective
Take the perspective of someone that has never coded before. Forget anything you know about me. I want to build a project that is going to teach me about the basic of coding. 

## Technologies
Let's use web technologies - probably typescript, html, and css only.

# Goal
The project is going to be a one ball billiard simulation. We want to be able to hit a ball, and watch it bounce off walls and go down holes with friction.

## Table
A pool table with a cushion on each side and six pockets: one in each corner and one in the middle of each long side. The ball slows down as it rolls, and stops on its own.

## Hitting the ball
Aim like a slingshot: press on the table, pull back, and let go. The ball shoots the opposite way you pulled, and a longer pull makes a harder shot, up to a maximum speed. While pulling back, a line shows where the ball will go. You can only hit the ball once it has stopped rolling. It works with a mouse or a touch screen.

## Score
Keep score: the number of balls that go into a hole. After a ball is sunk, a new ball is placed on the table. Remember the score in the browser's local storage so it is kept when the page is reloaded.

Also count shots: the number of times the ball has been hit. A click without pulling back is not a shot. Shots are remembered the same way as the score.

A Reset button sets the score and shots back to 0 and puts the ball back on the starting spot.

# Testing
We want every feature to have a unit test built before the feature itself is built.

We want a test harness to run all tests after very bit of code is written.

Parts that only run in the browser (drawing, the mouse, the page) can't be unit tested, so they are checked by playing the game.

# Repository
Make a public repository called learn-to-code under my name @bederson. Set up github to run the tests there on every push to github.

Local commits to git and pushes to github manually, only on my direction.

Include a README with a screenshot and a user-friendly description of the game.

# Hosting
Publish the game on GitHub Pages at https://bederson.github.io/learn-to-code/. Every push to main publishes it automatically, but only after all the tests pass.
