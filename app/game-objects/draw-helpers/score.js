define(["config"], function(Config) {
	"use strict";
	
	function drawScore(ctx, score, screenWidth) {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 1;
		ctx.moveTo(screenWidth - 70, 0);
		ctx.lineTo(screenWidth - 70, 27);
		ctx.lineTo(screenWidth, 27);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = Config.text.score.color;
		ctx.textBaseline = "top";
		ctx.font = Config.text.score.font;
		ctx.fillText("Score: " + score, screenWidth - 64, 5); 

		ctx.closePath();
	}
	
	return drawScore;
});
