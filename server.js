/**
 * For running a stand alone server on Heroku.
 */
var harp = require("harp");

harp.server(__dirname, {
	port: process.env.PORT || 5000
});