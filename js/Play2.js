//Level 2
var Play2 = function(game){}

Play2.prototype = {

	create: function(){
// place your assets

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//world assets loaded and physics-afied
	this.background = game.add.sprite(0,0, 'background');

	//Ground
	this.floor = game.add.group();
	this.floor.enableBody = true;
	for(var i = 0; i < 7; i++){
		this.tile = this.floor.create(0+i*128, 445, 'ground');
		this.tile.scale.set(1, 1.25);
		this.tile.body.immovable = true;

		this.tile = this.floor.create(0+i*128, 285, 'ground');
		this.tile.scale.set(1, 1.25);
		this.tile.body.immovable = true;
	}

	//Prefab instance
	this.machine = new Wires(game, 650, 227, 50)
	game.add.existing(this.machine);

	//create the player and add them to the world, sets up animations
	this.player = game.add.sprite(400, 223, 'player');
	this.player.anchor.set(0.5);
	this.player.animations.add('StandR', [0], 1, false);
	this.player.animations.add('StandL', [1], 1, false);
	this.player.animations.add('walkRight', [2, 3, 4, 5, 6, 7, 8, 9], 10, true);
	this.player.animations.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);
	this.direction = 0;

	game.physics.arcade.enable(this.player);
	this.player.body.collideWorldBounds = true;
	this.player.body.drag.setTo(400, 0);

	//game audio
	this.fixSound000 = game.add.audio('fix000');
	this.fixSound001 = game.add.audio('fix001');


	//Arrow keys created
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.keyboardW = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.keyboardD = game.input.keyboard.addKey(Phaser.Keyboard.D);

	//Game Instructions
	this.gameStated = false;
	this.levelStart = game.add.sprite(165,73, 'LevelStart');
	this.levelStart.scale.setTo(1.2);
	this.startText = game.add.text(210, 110, 'Hi again. Corporate wanted me to congratulate you on a task well done, they even sent you a present. That is right, it is a new task! One of our machine keeps getting unpluged and they want you to fix it. And go slow! Any broken cords are coming out of your paycheck. \n\n press [right] to continue', {fontSize: '24px', fill: '#DDD', wordWrap: true, wordWrapWidth: 390})

	},
	update: function(){
		// run game loop

		//Game intro - Displays message then removes message and starts timer on button press
		if(!this.gameStated && this.cursors.right.downDuration(1)){
			this.gameStated = true;
			this.levelStart.destroy();
			this.startText.destroy();
		}
		else if (this.gameStated){

			this.machine.healthText.setText('Machine Health: ' + this.machine.health);
			//Players movement
			if(this.cursors.left.isDown){
				this.player.body.velocity.x += -10;
				this.player.animations.play('walkLeft');
				this.direction = 0;
			}else if(this.cursors.right.isDown){
				this.player.body.velocity.x += 10;
				this.player.animations.play('walkRight');
				this.direction = 1;
			}
			else if(this.direction == 0){
				this.player.animations.play('StandL');
				this.player.body.velocity.x = 0;
			}else if (this.direction == 1){
				this.player.animations.play('StandR');
				this.player.body.velocity.x = 0;
			}

			//On Overlap the machine will change the alpha of the info text (located in Generator.js)
			var overlap = game.physics.arcade.overlap(this.player, this.machine, fixWire, null, this);

			if(overlap){
				this.machine.Info0.alpha = 1;
				this.machine.healthText.alpha = 1;
				this.machine.Background.alpha = 1;
				this.machine.plug.alpha = 1;
				
			}
			else{
				this.machine.Info0.alpha = 0;
				this.machine.healthText.alpha = 0;
				this.machine.Background.alpha = 0;
				this.machine.plug.alpha = 0;
			}

			if(this.machine.health >= 100){
				this.machine.health = 100;
				//console.log("level2 (tutorial) complete!")
				game.state.start('Level-3');
			}

		}

	}
}

//Timer event for moving the plug forward and increasing health(minigame2)
function plugF(machine){
	machine.plug.x += 11.5;
	machine.health += 5;
	if(machine.plug.x > game.width - 72){
		machine.plug.x = game.width - 72;
	}
	sound1.play();
}

//Overlap method called for moving the plug (minigame2)
function fixWire(player, machine){
	if(this.keyboardD.downDuration(5)){
		this.timeLoop = game.time.events.loop(Phaser.Timer.SECOND, plugF, this, machine);
	}
	if(this.keyboardD.upDuration(5)){
		game.time.events.remove(this.timeLoop);
	}
}
