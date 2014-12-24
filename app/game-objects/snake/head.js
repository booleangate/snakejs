define([
	"underscore",
	"config",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(_, Config, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	var rotationRight = 0,
		rotationLeft = 1,
		rotationUp = 1.5,
		rotationDown = 0.5,
		unit = Config.unit,
		spacing = Config.spacing;
		
	function Head() {
		this.positions = [
			new Position(0, 0),
			new Position(unit , unit / 2),
			new Position(0, unit )
		];
		this.velocity = new Velocity();
		this.boundingBox = null;
		this.rotation = rotationRight;
	}
	
	// Extend GameObject
	_.extend(Head.prototype, GameObject.prototype);
	
	Head.prototype.spawn = function(position) {
		var unit = Config.unit + Config.spacing;
		this.setPosition(position);
		
		// Randomly determine head rotation and return a velocity that respresents the body's growth direction.
		switch (_.random(1, 4)) {
			// Facing right
			case 1:
				this.rotation = rotationRight;
				return new Velocity(-unit, 0);
				
			// Facing right
			case 2:
				this.rotation = rotationLeft;
				return new Velocity(unit, 0);
				
			// Facing right
			case 3:
				this.rotation = rotationUp;
				return new Velocity(0, unit);
				
			// Facing right
			case 4:
				this.rotation = rotationDown;
				return new Velocity(0, -unit);
		}
	};
	
	Head.prototype.setPosition = function(position) {
		var delta = this.positions[0].getDelta(position);
		
		move(this, delta);
	
		return this;
	};
	
	Head.prototype.getPosition = function() {
		return this.positions[0];
	};
	
	Head.prototype.move = function() {
		move(this, this.velocity);
	
		return this;
	};
	
	Head.prototype.getBoundingBox = function() {
		if (!this.boundingBox) {
			this.boundingBox = calculateBoundingBox(this.positions);
		}
		
		return this.boundingBox;
	};
	
	Head.prototype.draw = function(ctx) {
		// Save the original position of the triangle.  We will need to move it to the origin to do our rotation and 
		// will want to move it back when we're done.
		var originalPosition = _.clone(this.positions[0]),
			color = Config.gameObjects.snake.color;
		
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
		this.setPosition(new Position(0, 0));

		// Rotate and draw.
		ctx.rotate(this.rotation * Math.PI);
		
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = Config.lineWidth;
	
		_.each(this.positions, function(p, i) {
			if (i == 0) {
				ctx.moveTo(p.x, p.y);
			} else {
				ctx.lineTo(p.x, p.y);
			}
		});
	
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// Restore canvas translation.
		ctx.restore();

		// Move the now rotated triangle back to where it belongs.
		this.setPosition(originalPosition);
	};
		
	function calculateBoundingBox(positions) {
		var leftX   = null,
			rightX  = null,
			topY    = null,
			bottomY = null;
	
		// Calculate the bounding box of this object by finding its extremes
		_.each(positions, function(value) {
			if (leftX === null   || value.x < leftX)   leftX   = value.x;
			if (rightX === null  || value.x > rightX)  rightX  = value.x;
			if (topY === null    || value.y < topY)    topY    = value.y;
			if (bottomY === null || value.y > bottomY) bottomY = value.y;
		});
	
		return new BoundingBox(new Position(leftX, topY), rightX - leftX, bottomY - topY);
	};
	
	function move(head, delta) {
		head.positions.forEach(function(position) {
			position.move(delta);
		});
	
		if (head.boundingBox) {
			head.boundingBox.position.move(delta);
		}
	}
	
	return Head;
});
