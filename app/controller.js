require([
	"jquery",
	"underscore",
	"config", 
	"utils/position",
	"utils/velocity",
	"utils/audio-library",
	"utils/bag",
	"game-objects/snake", 
	"game-objects/apple",
	"game-objects/draw-helpers/background",
	"game-objects/draw-helpers/caption",
	"game-objects/draw-helpers/score"
], function($, _, Config, Position, Velocity, AudioLibrary, Bag, Snake, Apple, drawBackgorund, drawCaption, drawScore) {
	"use strict";

	var isNewGame = true, 
		isPaused = false,
		isGameOver = false,
		score = 0,
		apple = new Apple(),
		snake = new Snake(),
		audioLibrary = new AudioLibrary(),
		insults = new Bag(Config.insults),
		ctx,
		speed,
		screenWidth,
		screenHeight;
	
	/**
	 * Called when the game first loads and when the user resets the game.
	 */
	function newGame() {
		// Reset all flags.
		isNewGame = true;
		isPaused = false;
		isGameOver = false;
		
		// Stop all audio.
		audioLibrary.stop();
		
		stepIdle();
	}
	
	function activate() {
		if (isNewGame) {
			// Place the snake somewhere within the middle half of the screen.
			var quarterWidth = Math.floor(screenWidth / 4);
			var quarterHeight = Math.floor(screenHeight / 4);
			var position = Position.getRandom(quarterWidth, quarterWidth * 3, quarterHeight, quarterHeight * 3);
			
			score = 0;
			snake.spawn(position);
			moveApple();
			updateSpeed();
		}
		
		isNewGame = isPaused = isGameOver = false;
		audioLibrary.resume();
		stepActive();
	}
	
	/**
	 * Called when the user pauses the game directly or resizes the screen.
	 */
	function pause() {
		isPaused = true;
		audioLibrary.pause();
		stepIdle();
	}
	
	/**
	 * Called when the user eats it.
	 */
	function gameOver() {
		isGameOver = true;
		audioLibrary.stop();
		stepIdle();
	}
	
	/**
	 * Draw appropriate idle screen.
	 */
	function stepIdle() {
		if (!isGameOver) {
			drawBackgorund(ctx, screenWidth, screenHeight);
		}

		if (isNewGame) {
			drawCaption(ctx, "Snake-a-snake!", ["Use the arrow keys to guide the snake to collect apples.", "Press space to begin."]);
		}
		else if (isGameOver) {
			drawCaption(ctx, "Game over!", ["You scored " + score + " points. " + insults.get(), "Press space to start a new game."]);
			isNewGame = true;
		}
		else if (isPaused) {
			drawCaption(ctx, "Paused", "Press space to continue");
		}
	}
	
	/**
	 * The game!
	 */
	function stepActive() {
		if (isIdle()) {
			return;
		}
		
		drawBackgorund(ctx, screenWidth, screenHeight);
		
		// Move the snake		
		snake.move();
		
		// Draw game objects
		apple.draw(ctx);
		snake.draw(ctx);
		drawScore(ctx, score, screenWidth);
		
		// Collision 1: snake eats an apple
		if (snake.isColliding(apple)) {
			++score;
			audioLibrary.playForScore(score);
			snake.grow();
			moveApple();
			updateSpeed();
		}
		// Collision 2 and 3: snake eats itself or snake hits the wall.
		else if (snake.isColliding(snake) || isSnakeCollidingWithWall()) {
			gameOver();
			return;
		}
		
		setTimeout(function() {
			requestAnimationFrame(stepActive, ctx);
		}, speed);
	}
	
	function moveApple() {
		do {
			apple.spawn(snake);
		} while (!isLegalApplePosition(apple));
	}
	
	function updateSpeed() {
		var fps = Config.fps,
			scaler = score <= 100 ? fps.scoreScalerBase : fps.scoreScalerPro;
			
		speed = 1000 / (fps.starting + (score * scaler));
	}
	
	function isIdle() {
		return isNewGame || isPaused || isGameOver;
	}
	
	function isActive() {
		return !isIdle();
	}
	
	/*
	 * Make sure the apple is completely within the
	 */
	function isLegalApplePosition(apple) {
		var position = apple.getPosition(),
			spacing = Config.spacing;
			
		// Apple is above or to the left of the screen.
		if (position.x <= spacing || position.y <= spacing) {
			return false;
		}
		// Apple is below or to the right of the screen.
		else if (position.x + spacing + apple.getWidth() > screenWidth || position.y + spacing + apple.getHeight() > screenHeight) {
			return false;
		}
		// Apple is already colliding with snake head
		else if (snake.isColliding(apple)) {
			return false;
		}
		
		// If the body is colliding with the apple, return false (illegal position); otherwise, return true (legal position).
		return !_.some(snake.body, function(body) {
			return body.isColliding(apple);
		});
	}
	
	function isSnakeCollidingWithWall() {
		// Get the bounding box of the snake (this is just its head)
		var boundingBox = snake.getBoundingBox(),
			position = boundingBox.position;
		
		// Left border.
		return position.x < 0
			// Top border. 
			|| position.y < 0
			// Right border.
			|| position.x + boundingBox.width > screenWidth
			// Bottom border.
			|| position.y + boundingBox.height > screenHeight;
	}
	
	/**
	 * Onload and other event handlers.
	 */
	$(function() {
		var canvas = $("canvas")[0];
		
		ctx = canvas.getContext("2d");
		
		function updateScreenSize() {
			screenWidth = window.innerWidth * .9;
			screenHeight = window.innerHeight * .75;
			canvas.width = screenWidth;
			canvas.height = screenHeight;
		}
		
		// When resizing the window, update the canvas size to fit.
		$(window).resize(function() {
			updateScreenSize();
			
			// Idle into whatever step is appropriate (if the game was being played, it will pause; otherwise, just redraw what was already shown).
			stepIdle();
		});
		
		// Capture keyboard input.
		$("body").keydown(function(event) {
			var unit = Config.unit + Config.spacing,
				newVelocity;
	
			switch (event.keyCode) {
				// Arrow keys
				case 37: // Left
					newVelocity = new Velocity(-unit, 0);
					break;
					
				case 38: // Up
					newVelocity = new Velocity(0, -unit);
					break;
					
				case 39: // Right
					newVelocity = new Velocity(unit, 0);
					break;
					
				case 40: // Down
					newVelocity = new Velocity(0, unit);
					break;
	
				// Spacebar
				case 32:
					if (isActive()) {
						pause();
					} else {
						activate();
					}
					
					return;
					
				// Ignore all other keyboard input
				default:
					return;
			}
	
			// The game is not running, there is nothing to do.
			if (isIdle()) {
				return;
			}
	
			snake.setVelocity(newVelocity);
		});
		
		// Capture mouse clicks in the canvas.
		$(canvas).click(function() {
			// If the game is not in a resetable state, do nothing.
			if (isNewGame || isGameOver) {
				return;
			}
			
			pause();
			
			if (window.confirm("Are you sure you want to reset the game?")) {
				newGame();
			}
		});
		
		// Audio controls
		$("#inp-enable-sounds").change(function() {
			audioLibrary.mute(!this.checked);
		});
		
		// Audio tracks.
		$("audio").each(function(i, track) {
			var loop = !!$(track).attr("loop");
			
			audioLibrary.addTrack(track, loop);
		});

		// Resize the game to match the window and show the canvas.
		updateScreenSize();
		$(canvas).css("display", "block");
				
		// Start the game.
		newGame();
	});
});
