define([
	"utils/position",
	"utils/range"
], function(Position, Range) {
	"use strict";
	
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
		
		return;
		//TODO: fix me
		it("Should create random points within a range away from a reference point", function() {
			var reference = new Position(20, 20),
				random = Position.getRandomFromReference(reference, 5, 10),
				rangeLow = new Range(10, 15),
				rangeHigh = new Range(25, 30);
			
			// `random` should be betwen 5 and 10 units away from `refernce`.
			expect(rangeLow.contains(random.x) || rangeHigh.contains(random.x)).toBeTruthy(random + " (random.x) should be 5 to 10 units away from (reference.x) " + reference);
			expect(rangeLow.contains(random.y) || rangeHigh.contains(random.y)).toBeTruthy(random + " (random.y) should be 5 to 10 units away from (reference.y) " + reference);
		});
	});
});
