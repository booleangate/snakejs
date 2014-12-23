define([
	"config",
	"game-objects/snake/head",
	"game-objects/snake/body",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box",
	"utils/utils"
], function(Config, Head, Body, GameObject, Position, Velocity, BoundingBox, Utils) {
	"use strict";
	
	function Snake() {
		this.head = new Head();
		this.body = [];
	}
	
	// Extend GameObject
	_.extend(Snake.prototype, GameObject.prototype);
	
	Snake.prototype.spawn = function(position, size) {
		size = size || Config.gameObjects.snake.initialSize;
		
		var xDirection = _.random(-1, 1),
			yDirection = _.random(-1, 1);
		
		console.log("Make a snake starting at " + position + " that is " +size + " long");
		
		for (var i = 0; i < Config.gameObjects.snake.initialSize; ++i) {
			this.body.push(new Body());
		}
	};
	
	Snake.prototype.draw = function(ctx) {
		
	};
	
	return Snake;
});
