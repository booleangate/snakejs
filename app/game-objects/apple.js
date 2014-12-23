define([
	"config",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(Config, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	var radius = (Config.unit + Config.spacing) / 2;
	var sideSize = radius * 2;
	
	function Apple() {
		
	}
	
	_.extend(Apple.prototype, GameObject.prototype);
	
	/**
	 * Set the position of the top left corner of the bounding box of the apple (which is a circle).  We will determine the center point.
	 * 
 	 * @param {Position} position
	 */
	Apple.prototype.setPosition = function(position) {
		position.x += radius;
		position.y += radius;
		this.position = position;
		 
		return this;
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
