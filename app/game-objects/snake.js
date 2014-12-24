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
	
	Snake.prototype.spawn = function(position) {
		var xDirection = _.random(-1, 1),
			yDirection = _.random(-1, 1);
			
		this.setPosition(position);
		
		for (var i = 0; i < Config.gameObjects.snake.initialSize; ++i) {
			// this.body.push(new Body());
		}
		
		return this;
	};
	
	Snake.prototype.setPosition = function(position) {
		return this.head.setPosition(position);
	};
	
	Snake.prototype.getPosition = function() {
		return this.head.getPosition();
	};
	
	Snake.prototype.setVelocity = function(velocity) {
		return this.head.setVelocity(velocity);
	};
	
	Snake.prototype.getVelocity = function() {
		return this.head.getVelocity();
	};
	
	Snake.prototype.move = function() {
		// The last peice of the body become the first piece.
		
		// Move that piece to where the head is now.
		
		// Move the head in whatever direction it should be going.
	};
	
	Snake.prototype.grow = function() {
		// The add new peice to the front of the body.
		
		// Move that piece to where the head is now.
		
		// Move the head in whatever direction it should be going.
	};
	
	Snake.prototype.draw = function(ctx) {
		this.head.draw(ctx);
		
		_.each(this.body, function(body) {
			body.draw(ctx);
		});
		
		return this;
	};
	
	/**
	 * Collisions only happen with the head, so always return the bounding box for the head of the snake
	 */
	Snake.prototype.getBoundingBox = function() {
		return this.head.getBoundingBox();
	};
	
	return Snake;
});
