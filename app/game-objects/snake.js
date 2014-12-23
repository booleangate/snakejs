define([
	"config",
	"game-objects/snake/head",
	"game-objects/snake/body",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(config, Head, Body, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	/**
	 * @return Number -1, 0, or 1.
	 */
	function getRandomDirection() {
		return Math.floor(Math.random() * (3)) + -1;
	}
	
	function Snake() {
		this.head = new Head();
		this.body = [];
	}
	
	// Extend GameObject
	_.extend(Snake.prototype, GameObject.prototype);
	
	Snake.prototype.spawn = function(position, size) {
		size = size || Config.gameObjects.snake.initialSize;
		
		var x = getRandomDirection();
		
		console.log("Make a snake starting at " + position + " that is " +size + " long");
	};
	
	return Snake;
});
