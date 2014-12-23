define(function() {
	"use strict";
	
	var unitSize = 15;
	
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
				color: "red",
				relativeDistance: {
					min: unitSize * 4,
					max: unitSize * 10
				}
			},
			background: {
				color: "rgba(25, 25, 25, 1)"
			}
		},
		
		unit: unitSize,
		spacing: 1,
		lineWidth: 1,
		defaultGameSpeed: 1000 / 12 // 12 frames a second
	};
});
