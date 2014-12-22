require([
	"jquery",
	"underscore",
	"config", 
	"game-objects/snake", 
	"game-objects/apple",
	"game-objects/draw-helpers/background",
	"game-objects/draw-helpers/caption",
	"game-objects/draw-helpers/score"
], function($, _, Config, Snake, Apple, drawBackgorund, drawCaption, drawScore) {
	"use strict";

	var isNewGame = true, 
		isPaused = false,
		isGameOver = false,
		apple = new Apple(),
		snake = new Snake(),
		ctx,
		screenWidth,
		screenHeight,
		score;
		
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

		return false;
	}
	
	function stepPause() {
		
	}
	
	
	function stepActive() {
		setTimeout(function() {
			requestAnimFrame(stepActive, ctx);
		}, speed);
	}
	
	function stepGameOver() {
		
	}
	
	// On-load
	$(function() {
		var canvas = $("canvas")[0];
		
		ctx = canvas.getContext("2d");
		
		// When resizing the window, update the canvas size to fit.
		$(window).resize(function() {
			screenWidth = window.innerWidth * .9;
			screenHeight = window.innerHeight * .75;
			canvas.width = screenWidth;
			canvas.height = screenHeight;
		});
		
		
		// Capture keyboard input.
		$("body").keydown(function(e) {
			var v = [];
	
			switch (event.keyCode) {
				case 37: v = [Config.unit * -1, 0];   break; // Left
				case 38: v = [0, Config.unit * -1];   break; // Up
				case 39: v = [Config.unit, 0];        break; // Right
				case 40: v = [0, Config.unit];        break; // Down
	
				// Space
				case 32:
					stepPause();
					return;
	
				// Ignore all other input
				default:
					return;
			}
	
			// Don't allow for changes in snake velocity if the game is not running
			if ( !v.length ) {
				return;
			}
	
			// Don't allow the snake to reverse directions/double back by ensuring that the new velocity isn't the opposite of the current
			// velocity
			if (
				(segment.velocity.x && v[0] == segment.velocity.x * -1)
				|| (segment.velocity.y && v[1] == segment.velocity.y * -1)
			) {
				return;
			}
	
			segment.velocity.x = v[0];
			segment.velocity.y = v[1];
		});
		
		// Capture mouse clicks in the canvas.
		$(canvas).click(function() {
			isPaused = true;
			stepIdle();
			
			if (confirm("Are you sure you want to reset the game?")) {
				isNewGame = true;
				stepIdle();
			}
		});

		// Start the game.
		$(window).trigger("resize");
		stepIdle();
		$(canvas).css("display", "block");		
	});
});
