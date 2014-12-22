define([
	"utils/point",
	"utils/velocity",
	"utils/bounding-box"
], function(Position, Velocity, BoundingBox) {
	function getClassName(instance) {
		return instance.__proto__.constructor.toString().match(/\w+ (\w+)/)[1];
	}
	
	function GameObject(position) {
		this.setPosition(position); 
	}
	
	GameObject.prototype.setPosition = function(position) {
		this.position = position;
	};
	
	GameObject.prototype.draw = function(context) {
		throw getClassName(this) + ".draw() is not implemented.";
	};
	
	GameObject.prototype.getBoundingBox = function() {
		throw getClassName(this) + ".getBoundingBox() is not implemented.";
	};
	
	GameObject.prototype.isColliding = function(gameObject) {
		return this.getBoundingBox().isColliding(gameObject.getBoundingBox());
	};

	return GameObject;
});
