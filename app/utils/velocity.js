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
	 * Increase (percent > 0) or decrease (percent < 0) the velocity on both axes.
	 *  
 	 * @param {Number} percent Percentage as a decimal (where 1 = 100%).
	 */	
	Velocity.prototype.scale = function(percent) {
		this.x += this.x * percent;
		this.y += this.y * percent;
		
		return this;
	};
	
	return Velocity;	
});
