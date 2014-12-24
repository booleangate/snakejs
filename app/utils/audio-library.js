define([
	"underscore",
	"jquery"
], function(_, $) {
	function AudioLibrary() {
		this.tracks = [];
		this.currentTrack = false;
		this.isMuted = false;
	}
	
	AudioLibrary.prototype.addTrack = function(track, loop) {
		this.tracks.push(track);
		
		if (loop) {
			$(track).on("ended", function() {
				this.currentTime = 0;
				this.play();
			});
		}
	};
	
	AudioLibrary.prototype.playForScore = function(score) {
		// Make score an index.
		--score;
		
		// If the score index is not a valid track, do nothing.
		if (score < 0 || score >= this.tracks.length) {
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
			this.tracks[score].play();
		}
	};
	
	AudioLibrary.prototype.stop = function() {
		// Nothing playing, do nothing.
		if (this.currentTrack === false) {
			return;
		}
		
		this.pause();
		this.tracks[this.currentTrack].currentTime = 0;
		this.currentTrack = false;
	};
	
	AudioLibrary.prototype.pause = function() {
		// Nothing playing, do nothing.
		if (this.currentTrack === false) {
			return;
		}
		
		this.tracks[this.currentTrack].pause();
	};
	
	AudioLibrary.prototype.resume = function() {
		// Nothing playing, do nothing.
		if (this.currentTrack === false) {
			return;
		}
		
		this.tracks[this.currentTrack].play();
	};
	
	AudioLibrary.prototype.mute = function(isMuted) {
		this.isMuted = isMuted;
		
		if (isMuted) {
			this.pause();
		} else {
			this.play();
		}
	};
	
	return AudioLibrary;
});
