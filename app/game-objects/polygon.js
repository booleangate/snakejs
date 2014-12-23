define([
	"config",
	"game-objects/game-object",
	"utils/position",
	"utils/velocity",
	"utils/bounding-box"
], function(Config, GameObject, Position, Velocity, BoundingBox) {
	"use strict";
	
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
	
	/**
	 * @param Point1
	 * @param Point2
	 * @param Point3
	 * ...
	 * @param PointN
	 * @param velocity optional
	 */
	function Polygon(/*position1, position2, position3, ..., positionN[, velocity]*/) {
		var that = this;
	
		this.positions = [];
		this.velocity = new Velocity();
		this.lineWidth = 1;
		this.boundingBox = null;
	
		_.each(arguments, function(value) {
			if (value instanceof Velocity) {
				that.velocity = value;
				return;
			}
	
			that.positions.push(value);
		});
	}
	
	_.extend(Polygon.prototype, GameObject.prototype);
	
	Polygon.prototype.draw = function(ctx) {
		var color = Config.gameObjects.snake.color;
		
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
	
		return this;
	};
	
	Polygon.prototype.move = function() {
		applyDelta(this, this.velocity);
	
		return this;
	};
	
	Polygon.prototype.setPosition = function(position) {
		var delta = this.positions[0].getDelta(position);
		
		applyDelta(this, delta);
	
		return this;
	};
	
	Polygon.prototype.getPosition = function() {
		return this.positions[0];
	};
	
	function applyDelta(polygon, delta) {
		polygon.positions.forEach(function(position) {
			position.applyDelta(delta);
		});
	
		if (polygon.boundingBox) {
			polygon.boundingBox.position.applyDelta(delta);
		}
	}
	
	Polygon.prototype.getBoundingBox = function() {
		if (!this.boundingBox) {
			this.boundingBox = calculateBoundingBox(this.positions);
		}
		
		return this.boundingBox;
	};
	
	return Polygon;
});