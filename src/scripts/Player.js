(function(exports) {
	function Player(game, x, y) { 
		Phaser.Sprite.call(this, game, x, y, 'prototype-player-small');

		game.physics.enable(this, Phaser.Physics.ARCADE);	
		this.anchor.setTo(0.5, 0.5);
		this.body.setSize(32, 64);

		this.body.acceleration.setTo(0, Player.Physics.Gravity); 

	}

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;
	
	_.extend(Player, {
		preload: function(load) {
			load.image('prototype-player', 'assets/img/prototype player.png', 64, 128);
			load.image('prototype-player-small', 'assets/img/prototype player small.png', 32, 128);
		},
		Physics: {
			Gravity: 300,
			Walk: {
				Speed: 300
			}
		}
	});

	_.extend(Player.prototype, {
		think: function() {
			var controls = this.controls;

			controls.think();

			if(controls.isDown(Controls.LEFT)) {
				this.scale.x = -1;
				this.body.velocity.x = -Player.Physics.Walk.Speed;
			}
			else if(controls.isDown(Controls.RIGHT)) {
				this.scale.x = 1;
				this.body.velocity.x = Player.Physics.Walk.Speed;
			}
			else {
				this.body.velocity.x = 0;	
			}
		}	
	});

	exports.Player = Player;

})(this);
