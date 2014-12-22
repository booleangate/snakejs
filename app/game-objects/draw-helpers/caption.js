define([
	"underscore",
	"config"
], function(_, Config) {
	"use strict";
	
	function drawCaption(ctx, title, subtitles) {
		var subtitleY = 84;
		
		ctx.fillStyle = Config.text.caption.title.color;
		ctx.textBaseline = "top";
		ctx.font = Config.text.caption.title.font;
		ctx.fillText(title, 20, 10); 
		
		// Make sure subtitles is an array
		if (!_.isArray(subtitles)) {
			subtitles = [subtitles];
		}
		
		// Draw all subtitles
		ctx.fillStyle = Config.text.caption.subtitle.color;
		ctx.font = Config.text.caption.subtitle.font;
		
		_.forEach(subtitles, function(subtitle) {
			ctx.fillText(subtitle, 20, subtitleY);
			subtitleY += Config.text.caption.subtitle.verticalOffset;	
		});
	}
	
	return drawCaption;
});
