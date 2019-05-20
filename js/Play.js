

var Play = function(game){}

Play.prototype = {

	create: function(){
// place your assets

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//world assets loaded and physics-afied
	this.background = game.add.sprite(0,0, 'background');

	this.hat = game.add.sprite(200, 200, 'hat');
	game.physics.arcade.enable(this.hat);

	this.hat2 = game.add.sprite(600, 200, 'hat');
	game.physics.arcade.enable(this.hat2);



	// this.hat2 = game.add.sprite(600, 200, 'hat');
	// game.physics.arcade.enable(this.hat);


	//this.player = game.add.sprite(200, 200, 'player2', 'Left');
	this.player = game.add.sprite(400, 200, 'player2');
	this.player.animations.add('Right');
	this.player.animations.play('Right');

	game.physics.arcade.enable(this.player);
	this.player.body.collideWorldBounds = true;

	//Minigame 1 text and sprites created

	this.M1Background = game.add.sprite(500,400, 'M1Background');

	this.M1Info000 = game.add.text(600, 500, 'Mash', {fill: '#FFFFFF'});
	this.M1Info000.anchor.set(0.5);
	this.M1Info001 = game.add.text(625, 525, 'to fix', {fill: '#FFFFFF'});
	this.M1Info001.anchor.set(0.5);
	this.M1Info000.alpha = 0;
	this.M1Info001.alpha = 0;
	
	this.spacebar = game.add.sprite(700, 500, 'spacebar');
	this.spacebar.anchor.set(0.5);
	this.spacebar.alpha = 0;

	this.m1Health = 50;
	this.m1Text = game.add.text(500,350, 'Machine Health: ' + this.m1Health, {fill: '#000'});
	this.m1Text.alpha = 0;
	this.exitText = game.add.text(325, 450, 'Press down\n to exit.', {fill: '#000'});
	this.exitText.alpha = 0;

	//m2 text
	this.m2Health = 50;
	this.m2Text = game.add.text(500,350, 'Machine Health: ' + this.m1Health, {fill: '#000'});
	this.m2Text.alpha = 0;

	//set up time and timer event
	this.time = 0;
	this.timeText = game.add.text(300, 25, 'Time: ' + this.time, {fontSize: '48px'});

	game.time.events.loop(Phaser.Timer.SECOND, lowerM1Health, this);

	//game audio
	this.fixSound000 = game.add.audio('fix000');
	this.fixSound001 = game.add.audio('fix001');

	//ToolTip Text
	this.toolTip = game.add.text(220,150, 'Up', {fill: '#000'});
	this.toolTip.alpha = 0;
	this.toolTip2 = game.add.text(620,150, 'Up', {fill: '#000'});
	this.toolTip2.alpha = 0;

	//Arrow keys created
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},
	update: function(){
	// run game loop
	this.timeText.setText('Time: ' + this.time);

	//Players movement
	if(this.cursors.left.isDown && !minigame){
		this.player.x +=-5;
	}
	if(this.cursors.right.isDown && !minigame){
		this.player.x +=5;
	}

	//Player object interaction
	var overlap = game.physics.arcade.overlap(this.player, this.hat, interactObject, null, this);
	var overlap2 = game.physics.arcade.overlap(this.player, this.hat2, interactObject, null, this);
	
	//Minigame 1 controls/rules
	if(overlap && minigame == false){
		this.toolTip.alpha = 1;
	}
	else{
		this.toolTip.alpha = 0;
	}

	//overlap 2
	if(overlap2 && minigame == false){
		this.toolTip2.alpha = 1;
	}
	else{
		this.toolTip2.alpha = 0;
	}
	//Toggles M1 game on/off when interacting with the respected part
	if(minigame && overlap){
		this.spacebar.alpha = 1;
		this.exitText.alpha = 1;
		this.M1Info000.alpha = 1;
		this.M1Info001.alpha = 1;
		this.m1Text.alpha = 1;
	}else if(!minigame && overlap){
		this.spacebar.alpha = 0;
		this.exitText.alpha = 0;
		this.M1Info000.alpha = 0;
		this.M1Info001.alpha = 0;
		this.m1Text.alpha = 0;
	}

	//M1 space bar control. Increases health and plays a fixing sound
	if(overlap && minigame == true && this.spaceBar.downDuration(5)){
		console.log('spaceBar is pressed');

		var sound = game.rnd.integerInRange(1,2);

		if(sound == 1){
			this.fixSound000.play();
		}else{
			this.fixSound001.play();
		}
		this.m1Health += 5;
		if(this.m1Health > 100){
			this.m1Health = 100;
		}
	}
	this.m1Text.setText('Machine Health = ' + this.m1Health);


//Toggles M2 game on/off when interacting with the respected part
	if(minigame && overlap2){
		this.spacebar.alpha = 1;
		this.exitText.alpha = 1;
		this.M1Info000.alpha = 1;
		this.M1Info001.alpha = 1;
		this.m2Text.alpha = 1;
	}else if(!minigame && overlap2){
		this.spacebar.alpha = 0;
		this.exitText.alpha = 0;
		this.M1Info000.alpha = 0;
		this.M1Info001.alpha = 0;
		this.m2Text.alpha = 0;
	}

	//M1 space bar control. Increases health and plays a fixing sound
	if(overlap2 && minigame == true && this.spaceBar.downDuration(5)){
		console.log('spaceBar is pressed');

		var sound = game.rnd.integerInRange(1,2);

		if(sound == 1){
			this.fixSound000.play();
		}else{
			this.fixSound001.play();
		}
		this.m2Health += 5;
		if(this.m2Health > 100){
			this.m2Health = 100;
		}
	}
	this.m1Text.setText('Machine Health = ' + this.m1Health);
	this.m2Text.setText('Machine Health = ' + this.m2Health);

	//When the machine runs out of health(lose) or when player lasts a minute(win) game ends
	if(this.m1Health <= 0 || this.m2Health <= 0){
		game.state.start('GameOver');
	}
	else if(this.time == 60){
		game.state.start('GameOver');
	}

	}
}

//functions for inteactig with machine part 1
function interactObject(player, hat){
	if(this.cursors.up.isDown && !minigame){
		console.log('You have touch-eth the hat-eth');
		minigame = true;
	}else if(this.cursors.down.isDown){
		console.log('You have drop-eth the hat-eth');
		minigame = false;
	}
}

//Timer function that goes off every second. Lowers machines health with gradual speed up
function lowerM1Health(){
	this.time++;
	if(this.time < 15){
		this.m1Health--;
		this.m2Health--;
	}
	else if(this.time >= 15 && this.time < 30){
		this.m1Health -= 5;
		this.m2Health -= 7;
	}
	else{
		this.m1Health -= 10;
		this.m2Health -= 3;
	}
	
}