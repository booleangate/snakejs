require.config({
	paths: {
		underscore: "../vendor/underscore/underscore-min",
		domReady: "../vendor/domReady/domReady"
	}
});

require([
	"domReady!",
	"underscore",
	"config", 
	"game-objects/snake", 
	"game-objects/apple"
], function(_, Config, Snake, Apple) {
	// Get canvas reference
	var canvas = document.getElementsByTagName("canvas")[0],
		ctx = canvas.getContext("2d");
		
	// Capture keyboard movement in the canvas
	
	// Capture mouse clicks in the canvas	
});
