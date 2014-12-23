define([
	"config",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(Config, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	var unit = Config.unit;
	
	function Body() {
		
	}
	
	// Extend GameObject
	_.extend(Body.prototype, GameObject.prototype);
	
	Body.prototype.draw = function(ctx) {
		ctx.fillStyle = Config.gameObjects.snake.color;
		ctx.fillRect(this.position.x, this.position.y, unit, unit);
		
		return this;
	};
	
	Body.prototype.getWidth = function() {
		return unit;
	};
	
	Body.prototype.getHeight = function() {
		return unit;
	};
	
	return Body;
});
