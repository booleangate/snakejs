define([
	"underscore",
	"config"
], function(_, Config) {
	"use strict";
	
	var Utils = {
		/*
		 * Make sure the apple is completely within the
		 */
		isLegalApplePosition: function(apple, snake, screenWidth, screenHeight) {
			// Apple is outside of the visible area			
			if (Utils.isCollidingWithWall(apple, screenWidth, screenHeight, Config.spacing)) {
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
		},
		
		isCollidingWithWall: function(gameObject, screenWidth, screenHeight, spacing) {
			// Get the bounding box of the snake (this is just its head)
			var position = gameObject.getPosition();
			
			spacing = spacing || 0;
			
			// Left border.
			return position.x < spacing
				// Top border. 
				|| position.y < spacing
				// Right border.
				|| position.x + gameObject.getWidth() > screenWidth - spacing
				// Bottom border.
				|| position.y + gameObject.getHeight() > screenHeight - spacing;
		}
	};
	
	return Utils;
});
