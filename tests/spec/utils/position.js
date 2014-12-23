define(["utils/position"], function(Position) {
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
	});
});
