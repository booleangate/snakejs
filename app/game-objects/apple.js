define([
	"underscore",
	"config",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(_, Config, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	var radius = (Config.unit + Config.spacing) / 2;
	var sideSize = radius * 2;
	
	function Apple() {
		
	}
	
	_.extend(Apple.prototype, GameObject.prototype);
	
	Apple.prototype.spawn = function(snake) {
		var min = Config.gameObjects.apple.spawnDistance.min, 
			max = Config.gameObjects.apple.spawnDistance.max;
			
		this.setPosition(Position.getRandomFromReference(snake.getPosition(), min, max));
		
		return this;
	};
	
	/**
	 * Set the position with the top left corner of the bounding box of the apple (which is a circle).  We will determine the center point.
	 * 
 	 * @param {Position} position
	 */
	Apple.prototype.setPosition = function(position) {
		this.position = position;
		this.position.x += radius;
		this.position.y += radius;
		 
		return this;
	};
	
	/**
	 * Get the position of the top left corner of the bounding box of the apple.
	 */
	Apple.prototype.getPosition = function() {
		var position = _.clone(this.position);
		position.x -= radius;
		position.y -= radius;
		 
		return position;
	};
	
	Apple.prototype.draw = function(ctx) {
		ctx.beginPath();
		ctx.fillStyle = Config.gameObjects.apple.color;
		ctx.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		 
		return this;
	};
	
	Apple.prototype.getWidth = function() {
		return sideSize;
	};
	
	Apple.prototype.getHeight = function() {
		return sideSize;
	};
	
	
	return Apple;
});
