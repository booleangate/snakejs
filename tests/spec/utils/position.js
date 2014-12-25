define([
	"utils/position"
], function(Position) {
	"use strict";
	
	function getDistance(p1, p2) {
		return Math.sqrt(
			Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
		);
	}
	
	describe("Position contains (x,y) coordinates for a Cartesian system.", function() {
		it("Should accept two numbers in the constructor", function() {
			var p = new Position(1, 2);
			
			expect(p.x).toEqual(1);
			expect(p.y).toEqual(2);
		});
		
		it("Should default to zero if no values are passed to the constructor", function() {
			var p = new Position();
			
			expect(p.x).toEqual(0);
			expect(p.y).toEqual(0);
		});
		
		it("Should be snap to grid", function() {
			// Position with prime (x, y)
			var p = new Position(79, 83),
				gridCellSize = 15,
				snappedP = Position.getGridSnapped(p, gridCellSize);
			
			expect(snappedP.x % gridCellSize).toEqual(0);
			expect(snappedP.y % gridCellSize).toEqual(0);
		});
		
		it("Should create random points within a range away from a reference point", function() {
			var reference = new Position(20, 20),
				min = 5,
				max = 10,
				random = Position.getRandomFromReference(reference, min, max),
				// Round the distance to avoid precision errors (e.g.: 4.9999999999)
				distance = Math.round(getDistance(reference, random));
				
			expect(distance >= min && distance <= max).toBeTruthy(random + " (random.x) should be 5 to 10 units away from (reference.x) " + reference);
		});
	});
});
