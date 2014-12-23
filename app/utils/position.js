/**
 * A simple Cartesian coordinate point.
 */
define([
	"underscore",
	"utils/utils"
], function(_, Utils) {
	"use strict";
	
	/**
	 * 
	 * @param {Number} x The x coordinate. Optional; default 0.
	 * @param {Number} y The y coordinate. Optional; default 0.
	 */
	function Position(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	
	Position.prototype.getDelta = function(position) {
		return {
			x: position.x - this.x,
			y: position.y - this.y
		};
	};
	
	Position.prototype.applyDelta = function(velocity) {
		this.x += velocity.x;
		this.y += velocity.y;
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
	 * Get a point at least `min` units away but no more than `max` units away from `referencePoint`.
	 * 
	 * @param {Position} referencePosition
	 * @param {Number} min Should be positive
	 * @param {Number} max Should be positive
	 */
	Position.getRandomFromReference = function(referencePosition, min, max) {
		return new Position(
			referencePosition.x + _.random(min, max) * Utils.getRandomSign(), 
			referencePosition.y + _.random(min, max) * Utils.getRandomSign()
		);
	};
	
	return Position;	
});
