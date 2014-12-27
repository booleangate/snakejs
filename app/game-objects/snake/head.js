define([
	"underscore",
	"config",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(_, Config, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
	var unit = Config.unit,
		spacing = Config.spacing;
		
	function Head() {
		this.positions = [
			new Position(0, 0),
			new Position(unit , unit / 2),
			new Position(0, unit )
		];
		this.velocity = new Velocity();
		this.boundingBox = calculateBoundingBox(this.positions);
		this.rotation = Config.rotation.right;
	}
	
	// Extend GameObject
	_.extend(Head.prototype, GameObject.prototype);
	
	/**
	 * Create the head at the specified position with a random rotation.  Return a velocity that will be used as an offset to create the body. 
     * @param {Position} position
	 */
	Head.prototype.spawn = function(position) {
		var velocity;
		
		this.setPosition(position);
		
		// Randomly determine head rotation and return a velocity that respresents the body's growth direction.
		switch (_.random(1, 4)) {
			// Facing right
			case 1:
				this.rotation = Config.rotation.right;
				velocity = new Velocity(-unit - spacing, 0);
				break;
				
			// Facing right
			case 2:
				this.rotation = Config.rotation.left;
				velocity = new Velocity(unit + spacing, 0);
				break;
				
			// Facing right
			case 3:
				this.rotation = Config.rotation.up;
				velocity = new Velocity(0, unit + spacing);
				break;
				
			// Facing right
			case 4:
				this.rotation = Config.rotation.down;
				velocity = new Velocity(0, -unit - spacing);
				break;
		}
		
		this.setVelocity(new Velocity(velocity).invert());
		
		return velocity;
	};
	
	Head.prototype.setPosition = function(position) {
		return move(this, this.positions[0].getDelta(position));
	};
	
	Head.prototype.getPosition = function() {
		return this.positions[0];
	};
	
	Head.prototype.setVelocity = function(velocity) {
		// Determine the new rotation
		if (velocity.x < 0) {
			this.setRotation(Config.rotation.left);
		} else if (velocity.x > 0) {
			this.setRotation(Config.rotation.right);
		} else if (velocity.y < 0) {
			this.setRotation(Config.rotation.up);
		} else {
			this.setRotation(Config.rotation.down);
		}
		
		this.velocity = velocity;
	};
	
	Head.prototype.setRotation = function(rotation) {
		this.rotation = rotation;
	};
	
	Head.prototype.move = function() {
		return move(this, this.velocity);
	};
	
	Head.prototype.getBoundingBox = function() {
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
			case Config.rotation.right: ctx.translate(originalPosition.x + spacing, originalPosition.y); break;
			case Config.rotation.left:  ctx.translate(originalPosition.x + unit - spacing, originalPosition.y + unit); break;
			case Config.rotation.up:    ctx.translate(originalPosition.x, originalPosition.y + unit - spacing); break;
			case Config.rotation.down:  ctx.translate(originalPosition.x + unit, originalPosition.y + spacing); break;
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
			if (i === 0) {
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
		var leftX = null,
			rightX = null,
			topY = null,
			bottomY = null;
	
		// Calculate the bounding box of this object by finding its extremes
		_.each(positions, function(value) {
			if (leftX === null || value.x < leftX) {
				leftX = value.x;
			}
			
			if (rightX === null || value.x > rightX) {
				rightX = value.x;
			}
			
			if (topY === null || value.y < topY) {
				topY = value.y;
			}
			
			if (bottomY === null || value.y > bottomY) {
				bottomY = value.y;
			}
		});
	
		return new BoundingBox(new Position(leftX, topY), rightX - leftX, bottomY - topY);
	}

	/**
	 * Move the entire head by applying the delta to all positions as well as the bounding box.
	 * 
	 * @param {Head} head
	 * @param {Velocity} delta
	 * @return {Head}
	 */	
	function move(head, delta) {
		head.positions.forEach(function(position) {
			position.move(delta);
		});
	
		head.boundingBox.move(delta);
		
		return head;
	}
	
	return Head;
});
