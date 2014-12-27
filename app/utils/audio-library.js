/**
 * Simple manager for audio tracks.  Supports HTML attribute configuration for each audio entry:
 *   loop: valueless but if set, the track will loop once it reaches the end.
 *   start-time: the time at which to start the track in seconds.  
 */
define([
	"underscore",
	"jquery",
	"bowser"
], function(_, $, bowser) {
	"use strict";
	
	function AudioLibrary() {
		this.$tracks = $();
		this.currentTrack = false;
		this.isMuted = false;
	}
	
	function getStartTime(track) {
		return $(track).attr("start-time") || 0;
	}
	
	AudioLibrary.prototype.init = function(selector) {
		this.$tracks = this.$tracks.add($(selector || "audio").each(function(i, track) {
			var hasLoop = typeof $(track).attr("loop") !== "undefined";
			
			// If this is Firefox, switch from mp3s to ogg.  Safari doesn't support ogg, so we can't just use 
			// that format across the board.
			if (bowser.firefox) {
				track.src = track.src.replace(/\.mp3$/, ".ogg");
			}
			
			if (hasLoop) {
				$(track).on("ended", function() {
					this.currentTime = 0;
					this.play();
				});
			}
		}));
	};
	
	AudioLibrary.prototype.playForScore = function(score) {
		console.log("playForScore", score);
		try {
		// Make score an index.
		--score;
		
		// If the score index is not a valid track, do nothing.
		if (score < 0 || score >= this.$tracks.length) {
			return;
		}
		// Already playing this track, do nothing.
		else if (score === this.currentTrack) {
			return;
		}
		// Stop the currently playing track.
		else if (this.currentTrack !== false) {
			this.stop();
		}
		
		// Always keep track of the current track, even if we are muted.
		this.currentTrack = score;
		
		// If not muted, play the track.
		if (!this.isMuted) {
			this.$tracks[score].currentTime = getStartTime(this.$tracks[score]);
			this.$tracks[score].play();
		}
		} catch(e) {console.warn(e);}
	};
	
	AudioLibrary.prototype.stop = function() {
		// Nothing playing, do nothing.
		if (this.currentTrack === false) {
			return;
		}
		
		this.pause();
		this.$tracks[this.currentTrack].currentTime = 0;
		this.currentTrack = false;
	};
	
	AudioLibrary.prototype.pause = function() {
		// Nothing playing, do nothing.
		if (this.currentTrack === false) {
			return;
		}
		
		this.$tracks[this.currentTrack].pause();
	};
	
	AudioLibrary.prototype.resume = function() {
		// Nothing playing, do nothing.
		if (this.currentTrack === false) {
			return;
		}
		
		this.$tracks[this.currentTrack].play();
	};
	
	AudioLibrary.prototype.mute = function(isMuted) {
		this.isMuted = isMuted;
		
		if (isMuted) {
			this.pause();
		} else {
			this.resume();
		}
	};
	
	return AudioLibrary;
});
