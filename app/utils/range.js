define(function() {
	function Range(min, max) {
		this.update(min, max);
	}
	
	Range.prototype.update = function(min, max) {
		this.min = min;
		this.max = max;
		
		return this;
	};
	
	Range.prototype.contains = function(n) {
		return n >= this.min && n <= this.max;
	};
	
	Range.prototype.intersects = function(other) {
		return this.contains(other.min) || this.contains(other.max);
	};
	
	Range.prototype.toString = function() {
		return "Range(min = " + this.min + ", max = " + this.max + ")";
	};
	
	return Range;
});