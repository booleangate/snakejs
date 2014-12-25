/**
 * A random list.
 */
define(["underscore"], function(_) {
	"use strict";
	
	function Bag(items) {
		this.items = Array.isArray(items) ? items : [];
	}
	
	Bag.prototype.get = function() {
		return this.items[_.random(0, this.items.length - 1)];
	};
	
	Bag.prototype.add = function(item) {
		this.items.push(item);
		
		return this;
	};
	
	Bag.prototype.concat = function(items) {
		this.items.concat(items);
		
		return this;
	};
	
	return Bag;
});
