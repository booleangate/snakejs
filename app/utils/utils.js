define(["underscore"], function(_) {
	"use strict";
	
	return {
		getRandomSign: function() {
			return _.random(0, 1) ? 1 : -1;
		}
	};
});
