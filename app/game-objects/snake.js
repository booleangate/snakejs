/**
 * The snake.  This encapsulates the head and the body.  Position, Velocity and BoundingBox are delegated directly to the head,
 * since this is the only body part that has any active role.  The body is just there for a visual indicator of the score
 */
define([
	"underscore",
	"config",
	"game-objects/snake/head",
	"game-objects/snake/body",
	"game-objects/game-object",
	"utils/position"
], function(_, Config, Head, Body, GameObject, Position) {
	"use strict";
	
	function Snake() {
		this.head = new Head();
		this.body = [];
		this.velocityChangeQueue = [];
	}
	
	// Extend GameObject
	_.extend(Snake.prototype, GameObject.prototype);
	
	Snake.prototype.spawn = function(position) {
		var bodyVelocity = this.head.spawn(position),
			bodyPosition = new Position(position);
			
		// Reset the body and velocity change queue
		this.body = [];
		this.velocityChangeQueue = [];
		
		// Create body segments.
		for (var i = 0; i < Config.gameObjects.snake.initialSize; ++i) {
			bodyPosition = new Position(bodyPosition).move(bodyVelocity);
			this.body.push(new Body(bodyPosition));
		}
		
		return this;
	};
	
	/**
	 * Proxy for head position.
	 */
	Snake.prototype.setPosition = function(position) {
		return this.head.setPosition(position);
	};
	
	/**
	 * Proxy for head position.
	 */
	Snake.prototype.getPosition = function() {
		return this.head.getPosition();
	};

	/**
	 * Proxy for head velocity.
	 */	
	Snake.prototype.setVelocity = function(velocity) {
		var len = this.velocityChangeQueue.length,
			lastVelocity = len ? this.velocityChangeQueue[len - 1] : this.head.getVelocity();

		// Ignore new velocities that are in the opposite or same direction.  Trying to got in the opposite 
		// direction is the same as trying to go backward, which is not allowed as the snake only moves forward.
		// Trying to change the velocity in the same direction is redundant.
		if (velocity.isOppositeDirection(lastVelocity) || velocity.isSameDirection(lastVelocity)) {
			return this;
		}

		// Add the new velocity change to the queue.  The change will be applied before the head is moved in the next Snake.move() call.		
		this.velocityChangeQueue.push(velocity);
		
		return this;
	};
	
	/**
	 * Proxy for head velocity.
	 */
	Snake.prototype.getVelocity = function() {
		return this.head.getVelocity();
	};
	
	Snake.prototype.getWidth = function() {
		return this.head.getWidth();
	};
	
	Snake.prototype.getHeight = function() {
		return this.head.getHeight();
	};
	
	Snake.prototype.move = function() {
		// The last peice of the body become the first piece.
		var tail = this.body.pop();
		this.body.unshift(tail);
		
		// Move that piece to where the head is now.
		tail.setPosition(new Position(this.head.getPosition()));
		
		// If there is a pending velocity change, apply it.
		if (this.velocityChangeQueue.length) {
			this.head.setVelocity(this.velocityChangeQueue.shift());
		}
		
		this.head.move();
	};
	
	Snake.prototype.grow = function() {
		// Clone the end of the body and add it at the end.  This way, when the snake moves again,
		// one tail piece will be moved to the front, but the clone will remain at the end in the 
		// same place giving us that "growing" effect.
		var tailPosition = new Position(this.body[this.body.length - 1].getPosition()),
			tail = new Body(tailPosition);
			
		this.body.push(tail);
	};
	
	Snake.prototype.draw = function(ctx) {
		this.head.draw(ctx);
		
		_.each(this.body, function(body) {
			body.draw(ctx);
		});
		
		return this;
	};
	
	Snake.prototype.isColliding = function(gameObject) {
		var head = this.head;
		
		if (gameObject instanceof Snake) {
			return _.some(this.body, function(body) {
				return head.isColliding(body);
			});
		}
		
		return head.isColliding(gameObject);
	};
	
	/**
	 * Collisions only happen with the head, so always return the bounding box for the head of the snake
	 */
	Snake.prototype.getBoundingBox = function() {
		return this.head.getBoundingBox();
	};
	
	
	return Snake;
});
