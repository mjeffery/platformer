(function(exports) {
	
	function PlayerBullet(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player-bullet');
		
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.anchor.setTo(0.5, 0.5);
		this.outOfBoundsKill = true;
		this.checkWorldBounds = true;
	}

	PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
	PlayerBullet.prototype.constructor = PlayerBullet;

	_.extend(PlayerBullet, {
		preload: function(load) {
			load.image('player-bullet', 'assets/img/player bullet.png');
		},
		collideWorld: function(bullet, world) {
			bullet.kill();
		}
	});

	function PlayerBulletGroup(game) {
		Phaser.Group.call(this, game);	

		for(var i = 0; i < PlayerBulletGroup.InitialSize; i++) {
			var bullet = new PlayerBullet(game, 0, 0);
			bullet.kill();
		}
	}

	PlayerBulletGroup.prototype = Object.create(Phaser.Group.prototype);
	PlayerBulletGroup.prototype.constructor = PlayerBulletGroup;

	_.extend(PlayerBulletGroup, {
		InitialSize: 25
	});

	_.extend(PlayerBulletGroup.prototype, {	
		obtain: function(x, y) {
			var bullet = this.getFirstExists(false);
			if(!bullet) {
				bullet = new PlayerBullet(this.game, x, y);
				this.add(bullet);
			}
			else {
				bullet.reset(x, y);
			}

			return bullet;	
		}
	});

	exports.PlayerBullet = PlayerBullet;
	exports.PlayerBulletGroup = PlayerBulletGroup;

})(this);
