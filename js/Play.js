var Play = function(game){}

Play.prototype = {

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
	this.machine = new Generator(game, 75, 227, 50);
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

	//Creates the spacebar Sprite
	this.spacebar = game.add.sprite(700, 500, 'spacebar');
	this.spacebar.anchor.set(0.5);
	this.spacebar.alpha = 0;

	//Arrow keys created
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.keyboardW = game.input.keyboard.addKey(Phaser.Keyboard.W);

	//Game Instructions
	this.gameStated = false;
	this.levelStart = game.add.sprite(165,73, 'LevelStart');
	this.levelStart.scale.setTo(1.2);
	this.startText = game.add.text(210, 110, 'Hey there new employee! Your tasks at this business will be pretty straight forward. The higher ups at corporate are worried about some of our faulty tech and we want you to fix them. Just walk over to any of them and you will be provided with a hand guide. \n\n press [left] to continue', {fontSize: '24px', fill: '#DDD', wordWrap: true, wordWrapWidth: 390})

	},
	update: function(){
		// run game loop

		//Game intro - Displays message then removes message and starts timer on button press
		if(!this.gameStated && this.cursors.left.downDuration(1)){
			this.gameStated = true;
			this.levelStart.destroy();
			this.startText.destroy();
		}else if(this.gameStated){

			//Update Test
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
			var overlap = game.physics.arcade.overlap(this.player, this.machine, fixGenerator, null, this);

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

			if(this.machine.health > 100){
				this.machine.health = 100;

				game.state.start('Level-2');
			}
		}
	}
}


//Overlap method called for the generator. When space bar is pressed increase health (minigame1)
function fixGenerator(player, machine){
	if(this.spaceBar.downDuration(5)){
		this.machine.health += 5;
		sound0.play();
	}
}