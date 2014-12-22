define([
	"utils/range"
],function(Range) {
	function updateRanges(boundingBox) {
		var pos = boundingBox.position;
		
		boundingBox.rangeX.update(pos.x, pos.x + boundingBox.width);
		boundingBox.rangeY.update(pos.y, pos.y + boundingBox.height);
		
		return boundingBox;
	}
	
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
	
	BoundingBox.prototype.setWidth = function(width) {
		this.width = width;
		
		return updateRanges(this);
	};
	
	BoundingBox.prototype.setHeight = function(Height) {
		this.height = height;
		
		return updateRanges(this);
	};
	
	/**
	 * Is this bounding box colliding with another?
	 * 
 	 * @param {BoundingBox} other
	 * @return bool
	 * @see http://gamedev.stackexchange.com/a/587/54196
	 */
	BoundingBox.prototype.isColliding = function(other) {
		return this.rangeX.intersects(other.rangeX) && this.rangeY.intersects(other.rangeY);
		
		
		// Are the centers of the two boxes close enough on both axes to have their edges touch or intersect?
		return (Math.abs(this.position.x - other.position.x) * 2 <= (this.width + other.width))
         	&& (Math.abs(this.position.y - other.position.y) * 2 <= (this.height + other.height));
	};
	
	BoundingBox.prototype.toString = function() {
		return "BoundingBox(rangeX = " + this.rangeX + ", rangeY = " + this.rangeY + ")";
	};
	
	
	return BoundingBox;
});
