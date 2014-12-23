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
	
	GameObject.prototype.setVelocity = function(velocity) {
		this.velocity = velocity;
		
		return this;
	};
	
	GameObject.prototype.move = function(velocity) {
		this.position.move(velocity);
		
		return this;
	};
	
	GameObject.prototype.draw = function(context) {
		throw getClassName(this) + ".draw() is not implemented.";
		
		return this;
	};
	
	GameObject.prototype.getWidth = function() {
		throw getClassName(this) + ".getWidth() is not implemented.";
	};
	
	GameObject.prototype.getHeight = function() {
		throw getClassName(this) + ".getHeight() is not implemented.";
	};
	
	GameObject.prototype.getBoundingBox = function() {
		return new BoundingBox(this.position, this.getWidth(), this.getHeight());
	};
	
	GameObject.prototype.isColliding = function(gameObject) {
		return this.getBoundingBox().isColliding(gameObject.getBoundingBox());
	};

	return GameObject;
});
