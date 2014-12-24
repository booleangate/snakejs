/**
 * A simple Cartesian coordinate point.
 */
define([
	"underscore",
	"utils/utils",
	"utils/range"
], function(_, Utils, Range) {
	"use strict";
	
	/**
	 * 
	 * @param {Number} x The x coordinate. Optional; default 0.
	 * @param {Number} y The y coordinate. Optional; default 0.
	 */
	function Position(x, y) {
		// Copy constructor if x is a Position
		if (x instanceof Position) {
			this.x = x.x;
			this.y = x.y;
			
			return;
		}
		
		this.x = x || 0;
		this.y = y || 0;
	}
	
	Position.prototype.move = function(velocity) {
		this.x += velocity.x;
		this.y += velocity.y;
		
		return this;
	};
	
	Position.prototype.getDelta = function(position) {
		return {
			x: position.x - this.x,
			y: position.y - this.y
		};
	};
	
	Position.prototype.toString = function() {
		return "Position(x = " + this.x + ", y = " + this.y + ")";
	};
	
	/**
	 * Generate a random position within the ranges specified such that ([minX, maxX], [minY, maxY]).
	 * 
	 * @param {Number} minX
	 * @param {Number} maxX
	 * @param {Number} minY
	 * @param {Number} maxY
	 */
	Position.getRandom = function(minX, maxX, minY, maxY) {
		return new Position(
			_.random(minX, maxX),
			_.random(minY, maxY)
		);
	};
	
	/**
	 * Generate a point in a max-by-max square centered on referencePoint that is at least min distance away from referencePoint 
	 * 
	 * M M M M M M M M M
	 * M               M
	 * M   m m m m m   M
	 * M   m       m   M
	 * M   m   r   m   M
 	 * M   m       m   M
	 * M   m m m m m   M
	 * M               M
	 * M M M M M M M M M
	 * 
	 * M is the maximum range, m is the minimum range, and r is the reference point
	 * 
	 * @param {Position} referencePosition
	 * @param {Number} min Should be positive
	 * @param {Number} max Should be positive
	 */
	Position.getRandomFromReference = function(referencePosition, min, max) {
		// Generate x across the entire range.
		var x = _.random(referencePosition.x - max, referencePosition.x + max),
			y;
		
		// If x is within the minimum range from reference.x, then generate y so that it is at least min away from reference.y
		if (new Range(referencePosition.x - min, referencePosition.x + min).contains(x)) {
			y = referencePosition.y + (_.random(min, max) * Utils.getRandomSign());
		}
		// Otherwise, generate y across the entire range.
		else {
			y = _.random(referencePosition.y - max, referencePosition.y + max);
		}
		
		return new Position(x, y);
	};
	
	return Position;	
});
