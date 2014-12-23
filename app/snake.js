require([
	"jquery",
	"underscore",
	"config", 
	"utils/position",
	"game-objects/snake", 
	"game-objects/apple",
	"game-objects/draw-helpers/background",
	"game-objects/draw-helpers/caption",
	"game-objects/draw-helpers/score",
], function($, _, Config, Position, Snake, Apple, drawBackgorund, drawCaption, drawScore) {
	"use strict";

	var isNewGame = true, 
		isPaused = false,
		isGameOver = false,
		isMuted = false,
		score = 0,
		speed = Config.defaultGameSpeed,
		apple = new Apple(),
		snake = new Snake(),
		ctx,
		screenWidth,
		screenHeight,
		$audio;
	
	function newGame() {
		isNewGame = true;
		score = 0;
		stopAudio();
		stepIdle();
	}
	
	function pause() {
		isPaused = true;
		stepIdle();
	}
	
	function gameOver() {
		isGameOver = true;
		stopAudio();
		stepIdle();
	}
	
	function activate() {
		isNewGame = isPaused = isGameOver = false;
		stepActive();
	}
	
	function isIdle() {
		return isNewGame || isPaused || isGameOver;
	}
	
	function isActive() {
		return !isIdle();
	}
	
	/**
	 * Play an audio clip for each score.
 	 * @param {Object} score
	 */
	function playAudio(score) {
		// Make score an index.
		--score;
		
		if (score < $audio.length) {
			$audio.get(score).play();
		}
	}
	
	/**
	 * Stop and rewind all audio
	 */
	function stopAudio() {
		$audio.each(function(i, audio) {
			audio.pause();
			audio.currentTime = 0;
		});
	}
	
	/**
	 * Draw appropriate idle screen.
	 */
	function stepIdle() {
		drawBackgorund(ctx, screenWidth, screenHeight);

		if (isNewGame) {
			drawCaption(ctx, "Snake-a-snake!", ["Use the arrow keys to guide the snake to collect apples.", "Press space to begin."]);
		}
		else if (isGameOver) {
			drawCaption(ctx, "Game over!", ["You scored " + score + " points. " + insult, "Press space to start a new game."]);
			score = 0;
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
		
			// Place the snake somewhere within the middle half of the screen.
		var quarterWidth = Math.floor(screenWidth / 4);
		var quarterHeight = Math.floor(screenHeight / 4);
		var position = Position.getRandom(quarterWidth, quarterWidth * 3, quarterHeight, quarterHeight * 3);
		
		snake.spawn(position);
		snake.draw(ctx);
		return;
		
		drawBackgorund(ctx, screenWidth, screenHeight);
		
		// Draw score
		drawScore(ctx, score, screenWidth);
		
		// Draw apple
		// apple.setPosition(Position.getRandomFromReference(snake.position, 5, 10))
			// .draw(ctx);
			
		// Draw snake
		
		// Check collisions
		

		setTimeout(function() {
			requestAnimationFrame(stepActive, ctx);
		}, speed);
	}
	
	/**
	 * Onload and other event handlers.
	 */
	$(function() {
		var canvas = $("canvas")[0];
		
		ctx = canvas.getContext("2d");
		
		// When resizing the window, update the canvas size to fit.
		$(window).resize(function() {
			screenWidth = window.innerWidth * .9;
			screenHeight = window.innerHeight * .75;
			canvas.width = screenWidth;
			canvas.height = screenHeight;
			
			// Idle into whatever step is appropriate (if the game was being played, it will pause; otherwise, just redraw what was already shown).
			stepIdle();
		});
		
		// Capture keyboard input.
		$("body").keydown(function(e) {
			var velocity = false;
	
			switch (event.keyCode) {
				// Arrow keys
				case 37: velocity = new Velocity(-Config.unit, 0); break; // Left
				case 38: velocity = new Velocity(0, -Config.unit); break; // Up
				case 39: velocity = new Velocity(Config.unit, 0);  break; // Right
				case 40: velocity = new Velocity(0, Config.unit);  break; // Down
	
				// Space
				case 32:
					if (isActive()) {
						pause();
					} else {
						activate();
					}
					
					return;
	
				// Ignore all other input
				default:
					return;
			}
	
			// The game is not running, there is nothing to do.
			if (isIdle() || !velocity) {
				return;
			}
	
			// Don't allow the snake to reverse directions/double back by ensuring that the new velocity isn't the 
			// opposite of the current velocity
			if ((snake.velocity.x && velocity.x == -snake.velocity.x)
				|| (snake.velocity.y && velocity.y == -snake.velocity.y)
			) {
				return;
			}
	
			snake.velocity = velocity;
		});
		
		// Capture mouse clicks in the canvas.
		$(canvas).click(function() {
			// If the game is not in a resetable state, do nothing.
			if (isNewGame || isGameOver) {
				return;
			}
			
			pause();
			
			if (confirm("Are you sure you want to reset the game?")) {
				newGame();
			}
		});
		
		// Audio controls
		$("#inp-enable-sounds").change(function() {
			isMuted = !this.checked;
		});
		
		// Audio bits.
		$audio = $("audio");
		
		// Make the full song (the last audio element) loop.
		$audio.last().on("ended", function() {
			this.currentTime = 0;
			this.play();
		});

		// Resize the game to match the window and show the canvas.
		$(window).trigger("resize");
		$(canvas).css("display", "block");
				
		// Start the game.
		newGame();
	});
});
