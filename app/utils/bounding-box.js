define([
	"utils/range"
],function(Range) {
	"use strict";
	
	function BoundingBox(position, width, height) {
		this.position = position;
		this.width = width;
		this.height = height;
		
		this.rangeX = new Range(position.x, position.x + width);
		this.rangeY = new Range(position.y, position.y + width);
	}
	
	BoundingBox.prototype.setPosition = function(position) {
		this.position = position;
		
		return updateRanges(this);
	};
	
	BoundingBox.prototype.move = function(velocity) {
		this.position.move(velocity);
		
		return updateRanges(this);
	};
	
	BoundingBox.prototype.setWidth = function(width) {
		this.width = width;
		
		return updateRanges(this);
	};
	
	BoundingBox.prototype.setHeight = function(height) {
		this.height = height;
		
		return updateRanges(this);
	};
	
	/**
	 * Is this bounding box colliding with another?
	 * 
 	 * @param {BoundingBox} other
	 * @return bool
	 */
	BoundingBox.prototype.isColliding = function(other) {
		var isCollidingX = this.rangeX.intersects(other.rangeX),
			isCollidingY = this.rangeY.intersects(other.rangeY);
			
		return isCollidingX && isCollidingY;
	};
	
	BoundingBox.prototype.toString = function() {
		return "BoundingBox(rangeX = " + this.rangeX + ", rangeY = " + this.rangeY + ")";
	};
	
	function updateRanges(boundingBox) {
		var pos = boundingBox.position;
		
		boundingBox.rangeX.update(pos.x, pos.x + boundingBox.width);
		boundingBox.rangeY.update(pos.y, pos.y + boundingBox.height);
		
		return boundingBox;
	}
	
	return BoundingBox;
});
