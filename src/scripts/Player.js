(function(exports) {
	function Player(game, x, y) { 
		Phaser.Sprite.call(this, game, x, y, 'prototype-player');

		this.anchor.setTo(0.5, 1);

		game.physics.enable(this, Phaser.Physics.ARCADE);	

		this.body.setSize(64, 128);
		this.body.gravity.setTo(0, Player.Physics.Gravity); 
		this.body.drag.setTo(Player.Physics.Walk.Drag, 0);
		this.body.maxVelocity.setTo(Player.Physics.Walk.MaxSpeed, Player.Physics.TerminalVelocity);

		
		this.jumping = false;
		this.jumps = Player.Physics.Jump.Count;

		this.shotTimer = 0;
		this.facing = 'right';
	}

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;
	
	_.extend(Player, {
		preload: function(load) {
			load.image('prototype-player', 'assets/img/prototype player.png', 64, 128);
			load.image('prototype-player-small', 'assets/img/prototype player small.png', 32, 128);
		},
		Physics: {
			Gravity: 2600,
			TerminalVelocity: 26000,
	 		Walk: {
				Drag: 600,
				MaxSpeed: 500,
				Acceleration: 1500
			},
			Jump: {
				Speed: -700,
				Count: 2
			}
		},
		Shooting: {
			FireRate: 100,
			BulletSpeed: 900,
			OffsetY: -64
		}
	});

	_.extend(Player.prototype, {
		think: function() {
			this.updateWalk();
			this.updateJump();
			this.updateShoot();
		},

		updateWalk: function() {
			var controls = this.controls;

			if(controls.isDown(Controls.LEFT)) {
				this.scale.x = -1;
				this.facing = 'left';
				this.body.acceleration.x = -Player.Physics.Walk.Acceleration;
			}
			else if(controls.isDown(Controls.RIGHT)) {
				this.scale.x = 1;
				this.facing = 'right';
				this.body.acceleration.x = Player.Physics.Walk.Acceleration;
			}
			else {
				this.body.acceleration.x = 0;	
			}
		},

		updateJump: function() {
			var controls = this.controls;
			var grounded = this.body.blocked.down;

			if(grounded) {
				this.jumps = Player.Physics.Jump.Count;
				this.jumping = false;
			}

			if(this.jumps > 0  && controls.downDuration(Controls.JUMP, 150)) {
				this.body.velocity.y = Player.Physics.Jump.Speed;
				this.jumping = true;
			}

			if(this.jumping && controls.isUp(Controls.JUMP)) {
				this.jumps --;
				this.jumping = false;
			}
		},

		updateShoot: function() {
			this.shotTimer += this.game.time.physicsElapsedMS;

			if(this.controls.justPressed(Controls.SHOOT) && 
			   this.shotTimer > Player.Shooting.FireRate) 
			{
				this.shotTimer = 0;
				
				var bullet = this.bullets.obtain(this.x, this.y + Player.Shooting.OffsetY);
				
				var bulletSpeed = Player.Shooting.BulletSpeed;
				if(this.facing != 'right')
					bulletSpeed = -bulletSpeed;

				bullet.body.velocity.setTo(bulletSpeed, 0);
			}
		}
	});

	exports.Player = Player;

})(this);
