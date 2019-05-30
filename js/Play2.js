//Level 2
var Play2 = function(game){}

Play2.prototype = {

	create: function(){
// place your assets

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//world assets loaded and physics-afied
	this.background = game.add.sprite(0,0, 'background');


	//Prefab instance
	this.machine = new Wires(game, 500, 200, 50)
	game.add.existing(this.machine);



	//create the player and add them to the world, sets up animations
	this.player = game.add.sprite(400, 200, 'player2');
	this.player.anchor.set(0.5);
	this.player.animations.add('Right');
	this.player.animations.play('Right');

	game.physics.arcade.enable(this.player);
	this.player.body.collideWorldBounds = true;


	//set up time and timer event
	this.time = 0;
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
	this.levelStart = game.add.sprite(200,100, 'LevelStart');
	this.startText = game.add.text(210, 110, 'Hi again. Corporate wanted me to congratulate you on a task well done, they even sent you a present. That is right, it is a new task! One of our machine keeps getting unpluged and they want you to fix it. And go slow! Any broken cords are coming out of your paycheck. \n\n press [left] to continue', {fontSize: '24px', fill: '#DDD', wordWrap: true, wordWrapWidth: 390})

	},
	update: function(){
		// run game loop

		//Game intro - Displays message then removes message and starts timer on button press
		if(!this.gameStated && this.cursors.left.downDuration(1)){
			this.gameStated = true;
			this.levelStart.destroy();
			this.startText.destroy();
			game.time.events.loop(Phaser.Timer.SECOND, timeEvent, this);
		}

		this.timeText.setText('Time: ' + this.time);
		this.machine.healthText.setText('Machine Health: ' + this.machine.health);
		//Players movement
		if(this.cursors.left.isDown && !minigame){
			this.player.x +=-5;
		}
		if(this.cursors.right.isDown && !minigame){
			this.player.x +=5;
		}

		//On Overlap the machine will change the alpha of the info text (located in Generator.js)
		var overlap = game.physics.arcade.overlap(this.player, this.machine, fixMachineWire, null, this);

		if(overlap){
			this.machine.Info0.alpha = 1;
			this.machine.Info1.alpha = 1;
			this.machine.healthText.alpha = 1;
			this.machine.Background.alpha = 1;
			this.machine.plug.alpha = 1;
			
		}
		else{
			this.machine.Info0.alpha = 0;
			this.machine.Info1.alpha = 0;
			this.machine.healthText.alpha = 0;
			this.machine.Background.alpha = 0;
			this.machine.plug.alpha = 0;
		}

		if(this.machine.health >= 100){
			this.machine.health = 100;
			//console.log("level2 (tutorial) complete!")
		}
		else if (this.machine.health <= 0){
			game.state.start('GameOver');
		}

	}
}

function timeEvent(){
	this.time++;
}

//Timer event for moving the plug forward and increasing health(minigame2)
function movePlugF(machine){
	machine.plug.x += 11.5;
	machine.health += 5;
	if(machine.plug.x > game.width - 72){
		machine.plug.x = game.width - 72;
	}
}

//Overlap method called for moving the plug (minigame2)
function fixMachineWire(player, machine){
	if(this.keyboardD.downDuration(5)){
		this.timeLoop = game.time.events.loop(Phaser.Timer.SECOND, movePlugF, this, machine);
	}
	if(this.keyboardD.upDuration(50)){
		game.time.events.remove(this.timeLoop);
	}
}
