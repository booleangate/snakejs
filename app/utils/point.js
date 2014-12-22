/**
 * A simple Cartesian coordinate point.
 */
define(function() {
	"use strict";
	
	/**
	 * 
	 * @param {Number} x The x coordinate. Optional; default 0.
	 * @param {Number} y The y coordinate. Optional; default 0.
	 */
	function Point(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	
	/**
	 * Generate a random point within the ranges specified such that ([minX, maxX], [minY, maxY]).
	 * 
	 * @param {Number} minX
	 * @param {Number} maxX
	 * @param {Number} minY
	 * @param {Number} maxY
	 */
	Point.getRandom = function(minX, maxX, minY, maxY) {
		return new Point(
			Math.randomRange(minX, maxX), 
			Math.randomRange(minY, maxY)
		);
	}; 
	
	return Point;	
});
