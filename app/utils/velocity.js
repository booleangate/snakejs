/**
 * Unit movement speed in x and y directions.
 */
define(function() {
	"use strict";
	
	/**
	 * Velocity for X and Y axes.
	 * 
	 * @param {Number} xVelocity The x axis velocity. Optional; default 0.
	 * @param {Number} yVelocity The y axis velocity. Optional; default 0.
	 */
	function Velocity(xVelocity, yVelocity) {
		// Copy constructor
		if (xVelocity instanceof Velocity) {
			this.x = xVelocity.x;
			this.y = xVelocity.y;
			
			return;
		}
		
		this.x = xVelocity || 0;
		this.y = yVelocity || 0;
	}
	
	/**
	 * Invert velocity both axes.
	 */
	Velocity.prototype.invert = function() {
		this.invertX();
		this.invertY();
		
		return this;
	};
	
	/**
	 * Invert X axis speed.
	 */
	Velocity.prototype.invertX = function() {
		this.x *= -1;
		
		return this;
	};
	
	/**
	 * Invert Y axis speed.
	 */
	Velocity.prototype.invertY = function() {
		this.y *= -1;
		
		return this;
	};

	/**
	 * Determine whether or not `this` velocity is in the same direction as `other`.
	 * 
	 * @param {Velocity} other
	 * @return {bool} 
	 */	
	Velocity.prototype.isSameDirection = function(other) {
		return isSameDirection(this.x, other.x) && isSameDirection(this.y, other.y);
	};

	/**
	 * Increase (percent > 0) or decrease (percent < 0) the velocity on both axes.
	 *  
 	 * @param {Number} percent Percentage as a decimal (where 1 = 100%).
	 */	
	Velocity.prototype.scale = function(percent) {
		this.x += this.x * percent;
		this.y += this.y * percent;
		
		return this;
	};
	
	/**
	 * Determines whether or not d1 and d2 are both zero, both positive, or both negative.
	 * 
	 * @param {Number} d1
	 * @param {Number} d2
	 * @return bool
	 */
	function isSameDirection(d1, d2) {
		return (d1 === 0 && d2 === 0) ||
			(d1 < 0 && d2 < 0) ||
			(d1 > 0 && d2 > 0); 
	}
	
	return Velocity;	
});
