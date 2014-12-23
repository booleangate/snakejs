define([
	"underscore",
	"config",
	"game-objects/game-object",
	"game-objects/polygon",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(_, Config, GameObject, Polygon, Position, Velocity, BoundingBox) {
	"use strict";
	
	var rotationRight = 0,
		rotationLeft = 1,
		rotationUp = 1.5,
		rotationDown = 0.5,
		unit = Config.unit,
		spacing = Config.spacing;
		
	function Head() {
		this.triangle = new Polygon(
			new Position(0, 0),
			new Position(unit , unit / 2),
			new Position(0, unit )
		);

		this.rotation = rotationRight;
	}
	
	// Extend GameObject
	_.extend(Head.prototype, GameObject.prototype);
	
	Head.prototype.setPosition = function(position) {
		return this.triangle.setPosition(position);
	};
	
	Head.prototype.getPosition = function() {
		return this.triangle.getPosition();
	};
	
	Head.prototype.setVelocity = function(velocity) {
		return this.triangle.setVelocity(velocity);
	};
	
	Head.prototype.getVelocity = function() {
		return this.triangle.getVelocity();
	};
	
	Head.prototype.move = function(velocity) {
		return this.triangle.move(velocity);
	};
	
	Head.prototype.draw = function(ctx) {
		// Save the original position of the triangle.  We will need to move it to the origin to do our rotation and 
		// will want to move it back when we're done.
		var originalPosition = _.clone(this.triangle.positions[0]);
		
		// We're about to do some translations of the context.  Save its current state so we can revert back to it after 
		// we're done rotating things.  This will prevent the reset of the things that we draw from being affected.
		ctx.save();

		// Rotate the object within its bounding box, not on its first point
		switch (this.rotation) {
			case rotationRight: ctx.translate(originalPosition.x + spacing, originalPosition.y); break;
			case rotationLeft:  ctx.translate(originalPosition.x + unit - spacing, originalPosition.y + unit); break;
			case rotationUp:    ctx.translate(originalPosition.x, originalPosition.y + unit - spacing); break;
			case rotationDown:  ctx.translate(originalPosition.x + unit, originalPosition.y + spacing); break;
		}

		// Move to origin.
		this.triangle.setPosition(new Position(0, 0));

		// Rotate and draw.
		ctx.rotate(this.rotation * Math.PI);
		this.triangle.draw(ctx);

		// Restore canvas translation.
		ctx.restore();

		// Move the now rotated triangle back to where it belongs.
		this.triangle.setPosition(originalPosition);
	};
	
	Head.prototype.getBoundingBox = function() {
		return this.triangle.getBoundingBox();
	};
	
	Head.prototype.isColliding = function(gameObject) {
		return this.triangle.isColliding(gameObject);
	};
	
	return Head;
});
