var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var minigame = false;


function preload() {
	// preload assets
	game.load.image('hat', 'assets/img/Hat.png');
	game.load.image('player', 'assets/img/TempPlayer.png');
	game.load.image('background', 'assets/img/Background.png');	
	game.load.image('M1Background', 'assets/img/MinigameBackground.png');
	game.load.image('spacebar', 'assets/img/Spacebar.png');
	game.load.atlas('player2', 'assets/img/maron.png', 'assets/img/Maron.json');
}

function create() {
	// place your assets

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//world assets loaded and physics-afied
	this.background = game.add.sprite(0,0, 'background');

	this.hat = game.add.sprite(200, 200, 'hat');
	game.physics.arcade.enable(this.hat);

	//this.player = game.add.sprite(200, 200, 'player2', 'Left');
	this.player = game.add.sprite(400, 200, 'player2');
	this.player.animations.add('Right');
	this.player.animations.play('Right');

	game.physics.arcade.enable(this.player);
	this.player.body.collideWorldBounds = true;

	//Minigame 1 assets loaded and physics-afied

	this.M1Background = game.add.sprite(500,400, 'M1Background');

	this.spacebar = game.add.sprite(600, 450, 'spacebar');
	this.spacebar.alpha = 0;

	this.m1Health = 50;
	this.m1Text = game.add.text(500,350, 'Machine Health: ' + this.m1Health, {fill: '#000'});
	this.exitText = game.add.text(350, 450, 'Press down\n to exit.', {fill: '#000'});
	this.exitText.alpha = 0;

	game.time.events.loop(Phaser.Timer.SECOND, lowerM1Health, this);

	//ToolTip Text
	this.toolTip = game.add.text(220,150, 'Up', {fill: '#000'});
	this.toolTip.alpha = 0;

	//Arrow keys created
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

	//Player object interaction
	var overlap = game.physics.arcade.overlap(this.player, this.hat, interactObject, null, this);

	//Minigame 1 controls/rules
	if(overlap && minigame == false){
		this.toolTip.alpha = 1;
	}
	else{
		this.toolTip.alpha = 0;
	}

	if(minigame){
		this.spacebar.alpha = 1;
		this.exitText.alpha = 1;
	}else{
		this.spacebar.alpha = 0;
		this.exitText.alpha = 0;
	}

	if(minigame == true && this.spaceBar.downDuration(5)){
		console.log('spaceBar is pressed');
		this.m1Health += 5;
		if(this.m1Health > 100){
			this.m1Health = 100;
		}
	}

	this.m1Text.setText('Machine Health = ' + this.m1Health);

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

function lowerM1Health(){
	this.m1Health--;
}