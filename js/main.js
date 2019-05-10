var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var minigame = false;


function preload() {
	// preload assets
	game.load.image('hat', 'assets/img/Hat.png');
	game.load.image('player', 'assets/img/TempPlayer.png');
	game.load.atlas('player2', 'assets/img/maron.png', 'assets/img/Maron.json');
}

function create() {
	// place your assets

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//world assets loaded and physics-afied
	this.hat = game.add.sprite(200, 200, 'hat');
	game.physics.arcade.enable(this.hat);

	//this.player = game.add.sprite(200, 200, 'player2', 'Left');
	this.player = game.add.sprite(400, 200, 'player2');
	this.player.animations.add('Right');
	this.player.animations.play('Right');

	game.physics.arcade.enable(this.player);

	//Minigame 1 assets loaded and physics-afied
	this.miniHat = game.add.sprite(400, 400, 'hat');
	game.physics.arcade.enable(this.hat);
	this.miniHat.scale.setTo(.5,.5);


	//ToolTip Text
	this.toolTip = game.add.text(220,150, 'Up', {fill: '#FFFFFF'});
	this.toolTip.alpha = 0;

	//Arrow keys created
	this.cursors = game.input.keyboard.createCursorKeys();

}

function update() {
	// run game loop

	//Players movement
	if(this.cursors.left.isDown && !minigame){
		this.player.x +=-5;
	}
	if(this.cursors.right.isDown && !minigame){
		this.player.x +=5;
	}

	//Minigame 1 controls/rules
	if(this.cursors.left.isDown && minigame){
		this.miniHat.x +=-5;
	}
	if(this.cursors.right.isDown && minigame){
		this.miniHat.x +=5;
	}


	var overlap = game.physics.arcade.overlap(this.player, this.hat, interactObject, null, this);

	if(overlap && minigame == false){
		this.toolTip.alpha = 1;
	}
	else{
		this.toolTip.alpha = 0;
	}
}

function interactObject(player, hat){
	if(this.cursors.up.isDown && !minigame){
		console.log('You have touch-eth the hat-eth');
		minigame = true;
	}else if(this.cursors.down.isDown){
		console.log('You have drop-eth the hat-eth');
		minigame = false;
	}
}