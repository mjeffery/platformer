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
		}	
	});

	function PlayerBulletGroup(game) {
		Phaser.Group.call(this, game);	
	}

	PlayerBulletGroup.prototype = Object.create(Phaser.Group.prototype);
	PlayerBulletGroup.prototype.constructor = PlayerBulletGroup;

	_.extend(PlayerBulletGroup.prototype, {	
	});

	exports.PlayerBullet = PlayerBullet;
	exports.PlayerBulletGroup = PlayerBulletGroup;

})(this);
