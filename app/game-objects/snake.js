define([
	"underscore",
	"config",
	"game-objects/snake/head",
	"game-objects/snake/body",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box",
	"utils/utils"
], function(_, Config, Head, Body, GameObject, Position, Velocity, BoundingBox, Utils) {
	"use strict";
	
	function Snake() {
		this.head = new Head();
		this.body = [];
	}
	
	// Extend GameObject
	_.extend(Snake.prototype, GameObject.prototype);
	
	Snake.prototype.spawn = function(position, size) {
		var xDirection = _.random(-1, 1),
			yDirection = _.random(-1, 1);
			
		size = size || Config.gameObjects.snake.initialSize;
		
		this.head.setPosition(position);
		
		for (var i = 0; i < Config.gameObjects.snake.initialSize; ++i) {
			// this.body.push(new Body());
		}
	};
	
	Snake.prototype.draw = function(ctx) {
		this.head.draw(ctx);
		
		_.each(this.body, function(body) {
			console.log(body);
			body.draw(ctx);
		});
	};
	
	/**
	 * Collisions only happen with the head, so always return the bounding box for the head of the snake
	 */
	Snake.prototype.getBoundingBox = function() {
		return this.head.getBoundingBox();
	};
	
	return Snake;
});
