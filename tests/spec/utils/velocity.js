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
		
		it("Should detect whether another velocity is in the same direction", function() {
			var left1 = new Velocity(-3.333, 0),
				left2 = new Velocity(-42, 0),
				right1 = new Velocity(23, 0),
				right2 = new Velocity(59.333, 0),
				up1 = new Velocity(0, -32.333),
				up2 = new Velocity(0, -6.666),
				down1 = new Velocity(0, 57),
				down2 = new Velocity(0, 6.666);
			
			// Positive cases
			// expect(left1.isSameDirection(left2)).toBeTruthy();
			// expect(left2.isSameDirection(left1)).toBeTruthy();
// 			
			// expect(right1.isSameDirection(right2)).toBeTruthy();
			// expect(right2.isSameDirection(right1)).toBeTruthy();
// 			
			// expect(up1.isSameDirection(up2)).toBeTruthy();
			// expect(up2.isSameDirection(up1)).toBeTruthy();
// 			
			// expect(down1.isSameDirection(down2)).toBeTruthy();
			// expect(down2.isSameDirection(down1)).toBeTruthy();
				
			// Negative cases
			expect(left1.isSameDirection(right1)).toBeFalsy("left is not the same direction as right");
			// expect(left1.isSameDirection(up1)).toBeFalsy("left is not the same direction as up");
			// expect(left1.isSameDirection(down2)).toBeFalsy("left is not the same direction as down");
			
			expect(right1.isSameDirection(left1)).toBeFalsy("right is not the same direction as left");
			// expect(right1.isSameDirection(up1)).toBeFalsy("right is not the same direction as up");
			// expect(right1.isSameDirection(down2)).toBeFalsy("right is not the same direction as down");
			
			// expect(up1.isSameDirection(right1)).toBeFalsy("up is not the same direction as right");
			// expect(up1.isSameDirection(left1)).toBeFalsy("up is not the same direction as left");
			expect(up1.isSameDirection(down2)).toBeFalsy("up is not the same direction as down");
			
			// expect(down1.isSameDirection(right1)).toBeFalsy("down is not the same direction as right");
			expect(down1.isSameDirection(up1)).toBeFalsy("down is not the same direction as up");
			// expect(down1.isSameDirection(left1)).toBeFalsy("down is not the same direction as left");
		});
	});
});
