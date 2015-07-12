(function(exports) {

	function Button() {
		this.isUp =  true;
		this.isDown = false;
		this.justChanged = false;
	}

	_.extend(Button.prototype, {
		update: function(isDown) {
			var wasDown = this.isDown;

			this.isDown = isDown;

			if(wasDown != isDown) {
				this.isUp = !isDown;
				this.justChanged = true;
			}
			else {
				this.justChanged = false;
			}
		}
	});

	function Controls(game) {
		this.game = game;
		
		game.input.gamepad.start();	
		console.log('is gamepad enabled: ' + this.isGamepadEnabled());

		var buttons = this.buttons = [];
		buttons[Controls.JUMP] = new Button(Controls.JUMP);
		buttons[Controls.LEFT] = new Button(Controls.LEFT);
		buttons[Controls.RIGHT] = new Button(Controls.RIGHT);
	}

	_.extend(Controls, {
		LEFT: 0,
		RIGHT: 1,
		JUMP: 2,
		Buttons: {
			Jump: Phaser.Gamepad.XBOX360_A
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
			var left = false;
			var right = false;
			var jump = false;

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
			}			

			var buttons = this.buttons;

			buttons[Controls.LEFT].update(left);
			buttons[Controls.RIGHT].update(right);
			buttons[Controls.JUMP].update()
		},

		isDown: function(button) {
			var button = this.buttons[button];
			return button != null && button.isDown;
		},

		justPressed: function(button) {
			var button = this.buttons[button];
			return button != null && button.isDown && button.justChanged;
		}
	});

	exports.Controls = Controls;


})(this);
