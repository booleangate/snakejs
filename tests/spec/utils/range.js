define(["utils/range"], function(Range) {
	"use strict";
	
	describe("Range encaspulates a set of numbers with a minimum and maximum", function() {
		it("Should accept a min and max in the constructor", function() {
			var r = new Range(1, 2);
			
			expect(r.min).toEqual(1);
			expect(r.max).toEqual(2);
		});
		
		it("Should detect whether or not an individual number within its range", function() {
			var r = new Range(-3, 4);
			
			// Numbers within and at each end of the range.
			expect(r.contains(0)).toBeTruthy();
			expect(r.contains(-3)).toBeTruthy();
			expect(r.contains(4)).toBeTruthy();
			
			// Numbers ourside of the range.
			expect(r.contains(-3.001)).toBeFalsy();
			expect(r.contains(4.001)).toBeFalsy();
		});
		
		it("Should detect whether or not a range intersects with another", function() {
			var base = new Range(-3, 4);
			var subset = new Range(-2, 2);
			var minMeeting = new Range(-4, -3);
			var minOverlapping = new Range(-4, -2);
			var maxMeeting = new Range(4, 10);
			var maxOverlapping = new Range(3, 10);
			var lessThanMin = new Range(-10, -5);
			var greaterThanMax = new Range(5, 10);

			// Intersecting ranges.			
			expect(base.intersects(base)).toBeTruthy();
			expect(base.intersects(subset)).toBeTruthy();
			expect(base.intersects(minMeeting)).toBeTruthy();
			expect(base.intersects(minOverlapping)).toBeTruthy();
			expect(base.intersects(maxMeeting)).toBeTruthy();
			expect(base.intersects(maxOverlapping)).toBeTruthy();
			
			// Non-intersecting ranges.			
			expect(base.intersects(lessThanMin)).toBeFalsy();
			expect(base.intersects(greaterThanMax)).toBeFalsy();
		});
	});
});
