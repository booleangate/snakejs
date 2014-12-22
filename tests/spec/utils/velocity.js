define(["utils/velocity"], function(Velocity) {
	"use strict";
	
	describe("Velocity contains speeds for x and y axes.", function() {
		it("Should accept two numbers in the constructor", function() {
			var v = new Velocity(1, 2);
			
			expect(v.x).toEqual(1);
			expect(v.y).toEqual(2);
		});
		
		it("Should default to zero if no values are passed to the constructor", function() {
			var v = new Velocity();
			
			expect(v.x).toEqual(0);
			expect(v.y).toEqual(0);
		});
		
		it("Should be invertable", function() {
			// Invert x without inverting y.
			var v = new Velocity(1, 1);
			v.invertX();
			expect(v.x).toEqual(-1);
			expect(v.y).toEqual(1);
			
			// Invert y without inverting x.
			v = new Velocity(1, 1);
			v.invertY();
			expect(v.x).toEqual(1);
			expect(v.y).toEqual(-1);
			
			// Invert both x and y.
			v = new Velocity(1, 1);
			v.invert();
			expect(v.x).toEqual(-1);
			expect(v.y).toEqual(-1);
		});
	});
});
