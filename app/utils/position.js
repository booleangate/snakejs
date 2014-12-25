/**
 * A simple Cartesian coordinate point.
 */
define([
	"underscore"
], function(_) {
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
	 * Generate a point on an arc that is between min and max units away from reference point.
	 * 
	 *      M M M M
	 *    M         M
	 *  M    m m m    M
	 * M   m       m   M
	 * M   m   r   m   M
 	 * M   m       m   M
	 *  M    m m m    M
	 *    M         M
	 *      M M M M  
	 * 
	 * M is the maximum range, m is the minimum range, and r is the reference point
	 * 
	 * @param {Position} referencePosition
	 * @param {Number} min Should be positive
	 * @param {Number} max Should be positive
	 * @return {Position}
	 * @see http://stackoverflow.com/a/839931/126562
	 */
	Position.getRandomFromReference = function(referencePosition, min, max) {
		var radius = _.random(min, max),
			angle = Math.random() * Math.PI * 2;
		
		// Parametric equation for a circle
		var x = referencePosition.x + radius * Math.cos(angle),
			y = referencePosition.y + radius * Math.sin(angle);
			
		return new Position(x, y);
	};
	
	/**
	 * Snap a point to a grid that has cells of size gridCellSize.  Returns a new Position instance (does not modify `position` argument).
	 * 
	 * @param {Position} position
	 * @param {Number} gridCellSize
	 * @return Position
	 */
	Position.getGridSnapped = function(position, gridCellSize) {
		var snappedPosition = new Position(position);
		
		snappedPosition.x = Math.floor(snappedPosition.x / gridCellSize) * gridCellSize;
		snappedPosition.y = Math.floor(snappedPosition.y / gridCellSize) * gridCellSize;
		
		return snappedPosition;
	};
	
	return Position;	
});
