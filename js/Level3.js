//Level 3
var Play3 = function(game){}

Play3.prototype = {
create: function(){
// place your assets

	game.physics.startSystem(Phaser.Physics.ARCADE);
	stateName = 'Level-3';
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
	this.machine = new Generator(game, 75, 227, 50);
	game.add.existing(this.machine);
	this.machine2 = new Wires(game, 700, 227, 50)
	game.add.existing(this.machine2);

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

	//Creates the spacebar Sprite
	this.spacebar = game.add.sprite(700, 500, 'spacebar');
	this.spacebar.anchor.set(0.5);
	this.spacebar.alpha = 0;


	//set up time and timer event
	this.time = 30;
	this.timeText = game.add.text(300, 25, 'Time: ' + this.time, {fontSize: '48px'});

	

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
	this.startText = game.add.text(210, 110, 'Great work newbie! You are making quick work of these tasks, which reminds me. One of the higher ups got a little carried away at the staff party and so out machines are on the frits. Make sure none of them break during your shift or else you will be in hot water. Good luck!\n\n press [left] to continue', {fontSize: '24px', fill: '#DDD', wordWrap: true, wordWrapWidth: 390})

	},
	update: function(){
		// run game loop

		//Game intro - Displays message then removes message and starts timer on button press
		if(!this.gameStated && this.cursors.left.downDuration(1)){
			this.gameStated = true;
			this.levelStart.destroy();
			this.startText.destroy();
			game.time.events.loop(Phaser.Timer.SECOND, timeTick, this);
		}

		//Update Test
		this.timeText.setText('Time: ' + this.time);
		this.machine.healthText.setText('Machine Health: ' + this.machine.health);
		this.machine2.healthText.setText('Machine Health: ' + this.machine2.health);
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
		var overlap = game.physics.arcade.overlap(this.player, this.machine, fixMachine, null, this);

		if(overlap){
			this.machine.Info0.alpha = 1;
			this.machine.Info1.alpha = 1;
			this.machine.healthText.alpha = 1;
			this.machine.Background.alpha = 1;
			this.spacebar.alpha = 1;
			
		}
		else{
			this.machine.Info0.alpha = 0;
			this.machine.Info1.alpha = 0;
			this.machine.healthText.alpha = 0;
			this.machine.Background.alpha = 0;
			this.spacebar.alpha = 0;
		}

		var overlap2 = game.physics.arcade.overlap(this.player, this.machine2, fixMachineWire, null, this);

		if(overlap2){
			this.machine2.Info0.alpha = 1;
			this.machine2.Info1.alpha = 1;
			this.machine2.healthText.alpha = 1;
			this.machine2.Background.alpha = 1;
			this.machine2.plug.alpha = 1;
			
		}
		else{
			this.machine2.Info0.alpha = 0;
			this.machine2.Info1.alpha = 0;
			this.machine2.healthText.alpha = 0;
			this.machine2.Background.alpha = 0;
			this.machine2.plug.alpha = 0;

		}


		if(this.machine.health > 100){
			this.machine.health = 100;
		}
		else if(this.machine2.health > 100){
			this.machine2.health = 100;
		}

		if(this.time == 0){
			game.state.start('Level-4');
		}
		else if (this.machine.health <= 0 || this.machine2.health <= 0){
			game.state.start('GameOver', true, false, stateName);
		}

	}
}

function timeTick(){
	this.time -= 1;
	this.machine.health -= 1;
}

//Overlap method called for the generator. When space bar is pressed increase health (minigame1)
function fixMachine(player, machine){
	if(this.spaceBar.downDuration(5)){
		this.machine.health += 5;
	}
}

//Timer event for moving the plug forward and increasing health(minigame2)
function movePlugF(machine){
	machine.plug.x += 11.5;
	machine.health += 5;
	if(machine.plug.x > game.width - 72){
		machine.plug.x = game.width - 72;
	}
}

//Time event for movinf the plug back and slowly deteriate the machine health(minigame2)
function movePlugB(machine){
	machine.plug.x -= 2.5;
	machine.health -= 1;
	if(machine.plug.x < 500){
		machine.plug.x = 500;
		game.time.events.remove(this.timeLoop);
	}
}
//Overlap method called for moving the plug (minigame2)
function fixMachineWire(player, machine){
	if(this.keyboardD.downDuration(5)){
		game.time.events.remove(this.timeLoop);
		this.timeLoop = game.time.events.loop(Phaser.Timer.SECOND, movePlugF, this, machine);
	}
	if(this.keyboardD.upDuration(50)){
		game.time.events.remove(this.timeLoop);
		this.timeLoop = game.time.events.loop(Phaser.Timer.SECOND, movePlugB, this, machine);
	}
}
