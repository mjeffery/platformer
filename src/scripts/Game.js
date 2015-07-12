(function(exports) {
	function Game() {}

	Game.preload = function(load) {
		load.image('white-prototype-tiles', 'assets/img/white prototype tiles.png', 64, 64);
		load.tilemap('empty-room', 'assets/tilemap/empty room.json', null, Phaser.Tilemap.TILED_JSON);
	}

	Game.prototype = {
		create: function() {
			var game = this.game;

			game.physics.startSystem(Phaser.Physics.ARCADE);

			var map = game.add.tilemap('empty-room');
			map.addTilesetImage('White Prototype Tiles', 'white-prototype-tiles');
			var layer = this.layer = map.createLayer(0);

			map.setCollision([2]);
			layer.resizeWorld();

			var player = this.player = new Player(game, 1280 / 2, 720 /2);
			var playerBullets = player.bullets = new PlayerBulletGroup(game);
			var controls = player.controls = new Controls(game);	

			game.add.existing(player);


		},
		update: function() {
			var physics = this.game.physics.arcade;
			var layer = this.layer;
			var player = this.player;
			
			player.controls.think(); //TODO save these somewhere else
			physics.collide(player, layer);
			physics.collide(player.bullets, layer, PlayerBullet.collideWorld);

			player.think();
		}
	}

	exports.Game = Game;	
})(this);
