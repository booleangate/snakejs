define([
	"config",
	"game-objects/snake/head",
	"game-objects/snake/body",
	"game-objects/game-object",
	"utils/point",
	"utils/velocity",
	"utils/bounding-box"
], function(config, Head, Body, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	function Snake() {
		this.head = new Head();
		this.body = [];
	}
	
	Snake.prototype.spawn = function(point, size) {
		size = size || Config.gameObjects.snake.initialSize;
		
		console.log("Make a snake starting at " + point + " that is " +size + " long");
	};
	
	return Snake;
});
