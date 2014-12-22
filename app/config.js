define(function() {
	"use strict";
	
	return {
		text: {
			caption: {
				title: {
					color: "#f0f0f0",
					font: "bold 74px sans-serif"
				},
				subtitle: {
					color: "#f0f0f0",
					font: "normal 28px sans-serif",
					verticalOffset: 33
				}
			},
			score: {
				color: "#f0f0f0",
				font: "bold 14px sans-serif"
			}
		},
		
		gameObjects: {
			snake: {
				color: "rgba(127, 175, 27, 1)",
				initialSize: 4
			},
			apple: {
				apple: "red"
			},
			background: {
				color: "rgba(25, 25, 25, 1)"
			}
		},
		
		unit: 10,
		spacing: 1,
	};
});
