(function(exports) {

	function Button() {
		this.isUp =  true;
		this.isDown = false;
		this.justChanged = false;
		this.duration = 0;
	}

	_.extend(Button.prototype, {
		update: function(isDown, dt) {
			var wasDown = this.isDown;

			this.isDown = isDown;

			if(wasDown != isDown) {
				this.isUp = !isDown;
				this.duration = 0;
			}
			else {
				this.duration += dt;
			}
		}
	});

	function Controls(game) {
		this.game = game;
		
		game.input.gamepad.start();	
		console.log('is gamepad enabled: ' + this.isGamepadEnabled());

		var buttons = this.buttons = [];
		buttons[Controls.LEFT] = new Button(Controls.LEFT);
		buttons[Controls.RIGHT] = new Button(Controls.RIGHT);
		buttons[Controls.JUMP] = new Button(Controls.JUMP);
		buttons[Controls.SHOOT] = new Button(Controls.SHOOT);
	}

	_.extend(Controls, {
		LEFT: 0,
		RIGHT: 1,
		JUMP: 2,
		SHOOT: 3,
		Buttons: {
			Jump: Phaser.Gamepad.XBOX360_A,
			Shoot: Phaser.Gamepad.XBOX360_X
		},
		Dpad: {
			Left: Phaser.Gamepad.XBOX360_DPAD_LEFT,
			Right: Phaser.Gamepad.XBOX360_DPAD_RIGHT,
		},
		Stick: {
			Left: {
				X: Phaser.Gamepad.XBOX360_STICK_LEFT_X,
				Y: Phaser.Gamepad.XBOX360_STICK_LEFT_Y
			}
		}
	});

	_.extend(Controls.prototype, {
		isGamepadEnabled: function() {
			var gamepad = this.game.input.gamepad;
			return gamepad.supported && gamepad.active && gamepad.pad1.connected;
		},

		think: function() {
			var dt = this.game.time.physicsElapsedMS;

			var left = false;
			var right = false;
			var jump = false;
			var shoot = false;

			if(this.isGamepadEnabled()) {
				var pad = this.game.input.gamepad.pad1;	
				if(pad.isDown(Controls.Dpad.Left) || pad.axis(Controls.Stick.Left.X) < -0.1) {
					left = true;	
					right = false;
				}
				else if(pad.isDown(Controls.Dpad.Right) || pad.axis(Controls.Stick.Left.X) > 0.1) {
					left = false;
					right = true;	
				}

				if(pad.isDown(Controls.Buttons.Jump)) {
					jump = true;
				}

				if(pad.isDown(Controls.Buttons.Shoot)) {
					shoot = true;
				}
			}			

			var buttons = this.buttons;

			buttons[Controls.LEFT].update(left, dt);
			buttons[Controls.RIGHT].update(right, dt);
			buttons[Controls.JUMP].update(jump, dt);
			buttons[Controls.SHOOT].update(shoot, dt);
		},

		isDown: function(button) {
			var button = this.buttons[button];
			return button != null && button.isDown;
		},

		isUp: function(button) {
			var button = this.buttons[button];
			return button != null && button.isUp;
		},

		justPressed: function(button) {
			var button = this.buttons[button];
			return button != null && button.isDown && button.duration <= 0;
		},

		downDuration: function(button, time) {
			var button = this.buttons[button];	
			return button != null && button.isDown && button.duration <= time;
		}
	});

	exports.Controls = Controls;


})(this);
