/**
 * All in-game objects should inherit from this base class, GameObject.  It provides core functionality for
 * managing position and velocity as well as defining a consistent interface for drawing and collision detection
 * (which is implemented by default with bounding boxes). 
 */
define([
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(Position, Velocity, BoundingBox) {
	"use strict";
	
	function getClassName(instance) {
		return instance.constructor.toString().match(/\w+ (\w+)/)[1];
	}
	
	function GameObject(position, velocity) {
		this.setPosition(position);
		this.setVelocity(velocity); 
	}
	
	GameObject.prototype.setPosition = function(position) {
		this.position = position;
		
		return this;
	};
	
	GameObject.prototype.getPosition = function() {
		return this.position;
	};
	
	GameObject.prototype.setVelocity = function(velocity) {
		this.velocity = velocity;
		
		return this;
	};
	
	GameObject.prototype.getVelocity = function() {
		return this.velocity;
	};
	
	GameObject.prototype.move = function(velocity) {
		this.position.move(velocity);
		
		return this;
	};
	
	GameObject.prototype.getBoundingBox = function() {
		return new BoundingBox(this.getPosition(), this.getWidth(), this.getHeight());
	};
	
	/**
	 * Determine whether or not this GameObject is colliding with another using BoundBox collision detection.
	 * 
	 * @return {Boolean}
	 */
	GameObject.prototype.isColliding = function(gameObject) {
		return this.getBoundingBox().isColliding(gameObject.getBoundingBox());
	};
	
	/**
	 * Draw the GameObject.  Must be implemented by child class.
	 * 
 	 * @param {Context} ctx The canvas context.
 	 * @return {GameObject} Should always `return this` for chaining.
	 */
	GameObject.prototype.draw = function(ctx) {
		throw getClassName(this) + ".draw() is not implemented.";
	};
	
	/**
	 * Get the GameObject's width.  Use for calculating the BoundBox of this object. Must be implemented by child class.
	 * 
	 * @return {Number}
	 */
	GameObject.prototype.getWidth = function() {
		throw getClassName(this) + ".getWidth() is not implemented.";
	};
	
	/**
	 * Get the GameObject's height.  Use for calculating the BoundBox of this object. Must be implemented by child class.
	 * 
	 * @return {Number}
	 */
	GameObject.prototype.getHeight = function() {
		throw getClassName(this) + ".getHeight() is not implemented.";
	};

	return GameObject;
});
