var gulp = require("gulp");
var lint = require("gulp-eslint");

gulp.task("lint", function() {
	return gulp.src(["app/**/*.js", "test/**/*.js"])
		.pipe(lint({
			globals: {
				"define": true,
				"require": true,
				"jQuery": true,
				"$": true
        	},
        	rules: {
        		// Removing whitespace can be handled by a build tool
        		"no-trailing-spaces": 0,
        		// All functions that are being used before their definition are function statements,
        		// not function expressions. As such hoisting isn't a problem and we can ignore this.
        		"no-use-before-define": 0,
        		// no-alert also raises an error when using `confirm`, which we are intentionally using
        		// for simplicity
        		"no-alert": 0
        	},
			envs: ["browser"]
		}))
        .pipe(lint.format())
        .pipe(lint.failOnError());
});

gulp.task("default", ["lint"]); 