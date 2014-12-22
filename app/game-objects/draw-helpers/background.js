define([
	"underscore",
	"config"
], function(_, Config) {
	"use strict";
	
	function drawBackgorund(ctx, screenWidth, screenHeight) {
		ctx.fillStyle = Config.gameObjects.background.color;
		ctx.fillRect(0, 0, screenWidth, screenHeight);
	}
	
	return drawBackgorund;
});