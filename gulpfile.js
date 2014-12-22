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
        		"no-trailing-spaces": 0
        	},
			envs: ["browser"]
		}))
        .pipe(lint.format())
        .pipe(lint.failOnError());
});

gulp.task("default", ["lint"]); 