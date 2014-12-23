define([
	"utils/bounding-box",
	"utils/position"
], function(BoundingBox, Position) {
	"use strict";
	
	describe("BoundingBox is for detecting game object collions", function() {
		it("Should accept a Position, width and height in the constructor", function() {
			var position = new Position(10, 10),
				box = new BoundingBox(position, 2, 5);
			
			expect(box.position).toBe(position);
			expect(box.width).toBe(2);
			expect(box.height).toBe(5);
		});
		
		it("Should report true for boxes that is intersecting", function() {
			var size = 6,
				center   = new BoundingBox(new Position(5, 5), size, size),
				aboveBox = new BoundingBox(new Position(5, 0), size, size),
				belowBox = new BoundingBox(new Position(5, 10), size, size),
				leftBox  = new BoundingBox(new Position(0, 0), size, size),
				rightBox = new BoundingBox(new Position(10, 5), size, size);
			
			expect(center.isColliding(aboveBox)).toBeTruthy("should be colliding with above box");
			expect(center.isColliding(belowBox)).toBeTruthy("should be colliding with below box");
			expect(center.isColliding(leftBox)).toBeTruthy("should be colliding with left");
			expect(center.isColliding(rightBox)).toBeTruthy("should be colliding with right box");
		});
		
		it("Should report true for boxes that is intersecting on an edge", function() {
			var size = 5,
				center   = new BoundingBox(new Position(5, 5), size, size),
				aboveBox = new BoundingBox(new Position(5, 0), size, size),
				belowBox = new BoundingBox(new Position(5, 10), size, size),
				leftBox  = new BoundingBox(new Position(0, 0), size, size),
				rightBox = new BoundingBox(new Position(10, 5), size, size);
			
			expect(center.isColliding(aboveBox)).toBeTruthy("should be edge colliding with above");
			expect(center.isColliding(belowBox)).toBeTruthy("should be edge colliding with below box");
			expect(center.isColliding(leftBox)).toBeTruthy("should be edge colliding with left box");
			expect(center.isColliding(rightBox)).toBeTruthy("should be edge colliding with right box");
		});
		
		it("Should report true for boxes that is intersecting on an corner", function() {
			var size = 5,
				center     = new BoundingBox(new Position(5, 5), size, size),
				aboveLeft  = new BoundingBox(new Position(0, 0), size, size),
				aboveRight = new BoundingBox(new Position(10, 0), size, size),
				belowLeft  = new BoundingBox(new Position(0, 10), size, size),
				belowRight = new BoundingBox(new Position(10, 10), size, size);
			
			expect(center.isColliding(aboveLeft)).toBeTruthy("should be corner colliding with above left box");
			expect(center.isColliding(aboveRight)).toBeTruthy("should be corner colliding with above right box");
			expect(center.isColliding(belowLeft)).toBeTruthy("should be corner colliding with below left box");
			expect(center.isColliding(belowRight)).toBeTruthy("should be corner colliding with below right box");
		});
		
		it("Should report false for boxes that it is not intersecting", function() {
			var size = 4;
			var center   = new BoundingBox(new Position(5, 5), size, size),
				aboveBox = new BoundingBox(new Position(5, 0), size, size),
				belowBox = new BoundingBox(new Position(5, 10), size, size),
				leftBox  = new BoundingBox(new Position(0, 0), size, size),
				rightBox = new BoundingBox(new Position(10, 5), size, size);
			
			expect(center.isColliding(aboveBox)).toBeFalsy("should not be colliding with above box");
			expect(center.isColliding(belowBox)).toBeFalsy("should not be colliding with below box");
			expect(center.isColliding(leftBox)).toBeFalsy("should not be colliding with left box");
			expect(center.isColliding(rightBox)).toBeFalsy("should not be colliding with right box");
		});
	});
});
