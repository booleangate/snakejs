define(["utils/velocity"], function(Velocity) {
	"use strict";
	
	describe("Velocity contains speeds for x and y axes.", function() {
		it("Should accept two numbers in the constructor", function() {
			var v = new Velocity(1, 2);
			
			expect(v.x).toBe(1);
			expect(v.y).toBe(2);
		});
		
		it("Should default to zero if no values are passed to the constructor", function() {
			var v = new Velocity();
			
			expect(v.x).toBe(0);
			expect(v.y).toBe(0);
		});
		
		it("Should be invertable", function() {
			// Invert x without inverting y.
			var v = new Velocity(1, 1);
			v.invertX();
			expect(v.x).toBe(-1);
			expect(v.y).toBe(1);
			
			// Invert y without inverting x.
			v = new Velocity(1, 1);
			v.invertY();
			expect(v.x).toBe(1);
			expect(v.y).toBe(-1);
			
			// Invert both x and y.
			v = new Velocity(1, 1);
			v.invert();
			expect(v.x).toBe(-1);
			expect(v.y).toBe(-1);
		});
		
		it("Should be scalable", function() {
			var v = new Velocity(10, 10);
			
			// Scale positively (increase).
			v.scale(.25);
			expect(v.x).toBe(12.5);
			expect(v.y).toBe(12.5);
			
			// Scale negatively (decrease).
			v = new Velocity(10, 10);
			v.scale(-0.25);
			expect(v.x).toBe(7.5);
			expect(v.y).toBe(7.5);
		});
	});
});
