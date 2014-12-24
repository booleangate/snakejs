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
	"utils/position",
	"utils/velocity",
	"utils/bounding-box",
	"utils/utils"
], function(_, Config, Head, Body, GameObject, Position, Velocity, BoundingBox, Utils) {
	"use strict";
	
	function Snake() {
		this.head = new Head();
		this.body = [];
	}
	
	// Extend GameObject
	_.extend(Snake.prototype, GameObject.prototype);
	
	Snake.prototype.spawn = function(position) {
		var bodyVelocity = this.head.spawn(position),
			bodyPosition = new Position(position);
			
		// Reset the body.
		this.body = [];
		
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
		return this.head.setVelocity(velocity);
	};
	
	/**
	 * Proxy for head velocity.
	 */
	Snake.prototype.getVelocity = function() {
		return this.head.getVelocity();
	};
	
	Snake.prototype.move = function() {
		// The last peice of the body become the first piece.
		var tail = this.body.pop();
		this.body.unshift(tail);
		
		// Move that piece to where the head is now.
		tail.setPosition(new Position(this.head.getPosition()));
		
		// Move the head in whatever direction it should be going.
		this.head.move();
	};
	
	Snake.prototype.grow = function() {
		// Clone the end of the body and add it at the end.  This way, when the snake moves again,
		// one tail piece will be moved to the front, but the clone will remain at the end in the 
		// same place giving us that "growing" effect.
		// TODO
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
