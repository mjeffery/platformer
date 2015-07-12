(function(exports) {
	function Preload() {}

	Preload.prototype = {
		preload: function() {
			var x = 490,
				y = 356,
				add = this.add,
				load = this.load;

			add.sprite(x, y, 'loading-bar-bg');

			var loadingBar = add.sprite(x, y, 'loading-bar');
			load.setPreloadSprite(loadingBar);

			load.bitmapFont('minecraftia', 'assets/font/minecraftia.png', 'assets/font/minecraftia.xml');

			Game.preload(load);
			Player.preload(load);
			PlayerBullet.preload(load);

			load.onLoadComplete.addOnce(this.onLoadComplete, this);					
		},
		create: function() {
			this.stage.backgroundColor = '#000000';
		},
		onLoadComplete: function() {
			this.state.start('game');
		}
	};

	exports.Preload = Preload;
})(this);
