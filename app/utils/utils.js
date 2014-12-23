define(["underscore"], function(_) {
	return {
		getRandomSign: function() {
			return _.random(0, 1) ? 1 : -1;
		}
	};
});
