define([
	"underscore",
	"config",
	"game-objects/game-object",
	"utils/position"
], function(_, Config, GameObject, Position) {
	"use strict";
	
	var radius = (Config.unit + Config.spacing) / 2;
	var sideSize = radius * 2;
	
	function Apple() {
		
	}
	
	_.extend(Apple.prototype, GameObject.prototype);
	
	Apple.prototype.spawn = function(snake) {
		var min = Config.gameObjects.apple.spawnDistance.min, 
			max = Config.gameObjects.apple.spawnDistance.max,
			position = Position.getRandomFromReference(snake.getPosition(), min, max);
			
		this.setPosition(Position.getGridSnapped(position, sideSize));
		
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
		return new Position(this.position.x - radius, this.position.y - radius);
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
