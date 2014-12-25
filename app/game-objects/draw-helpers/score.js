define(["config"], function(Config) {
	"use strict";
	
	var width = 100,
		height = 27,
		padding = 6;
	
	function drawScore(ctx, score, screenWidth) {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 1;
		ctx.moveTo(screenWidth - 100, 0);
		ctx.lineTo(screenWidth - 100, height);
		ctx.lineTo(screenWidth, height);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = Config.text.score.color;
		ctx.textBaseline = "top";
		ctx.font = Config.text.score.font;
		ctx.fillText("Score: " + score, screenWidth - width + padding, padding); 

		ctx.closePath();
	}
	
	return drawScore;
});
