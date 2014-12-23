define([
	"config",
	"game-objects/game-object",
	"game-objects/polygon",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(Config, GameObject, Polygon, Position, Velocity, BoundingBox) {
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
	
	Head.prototype.setVelocity = function(velocity) {
		return this.triangle.setVelocity(velocity);
	};
	
	Head.prototype.move = function(velocity) {
		return this.triangle.move(velocity);
	};
	
	Head.prototype.draw = function(ctx) {
		var originalPosition = new Position(this.triangle.positions[0]);
		
		ctx.save();

		// Rotate the object within its bounding box, not on its first point
		switch (this.rotation) {
			case rotationRight: ctx.translate(originalPosition.x + spacing, originalPosition.y); break;
			case rotationLeft:  ctx.translate(originalPosition.x + unit - spacing, originalPosition.y + unit); break;
			case rotationUp:    ctx.translate(originalPosition.x, originalPosition.y + unit - spacing); break;
			case rotationDown:  ctx.translate(originalPosition.x + unit, originalPosition.y + spacing); break;
		}

		this.triangle.moveTo(new Position(0, 0));

		ctx.rotate(this.rotation * Math.PI);
		this.triangle.draw(ctx);

		ctx.restore();

		this.triangle.moveTo(originalPosition);
	};
	
	Head.prototype.getBoundingBox = function() {
		return this.triangle.getBoundingBox();
	};
	
	Head.prototype.isColliding = function(gameObject) {
		return this.triangle.isColliding(gameObject);
	};
	
	return Head;
});
