
function Generator(game, x, y, startingHealth){
	//sets the paramaters when created
	this.abc = 0;
	Phaser.Sprite.call(this, game, x, y, 'generator');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	//this.machine2 = game.add.sprite(700,210, 'generatorA');
	this.animations.add('Healthy', [0], 1, false);
	this.animations.add('Damaged', [0,1], 2, true);

	this.health = startingHealth;
	this.healthText = game.add.text(500, 360, 'Machine health: ' + this.health);
	this.healthText.alpha = 0;

	this.Background = game.add.sprite(500,400, 'M1Background');
	this.Background.alpha = 0;

	this.Info0 = game.add.text(600, 500, 'Mash', {fill: '#FFFFFF'});
	this.Info0.anchor.set(0.5);
	this.Info1 = game.add.text(625, 525, 'to fix', {fill: '#FFFFFF'});
	this.Info1.anchor.set(0.5);
	this.Info0.alpha = 0;
	this.Info1.alpha = 0;

	
	
}

//Extends the Phaser.Sprite to prefab and sets the constructor name
Generator.prototype = Object.create(Phaser.Sprite.prototype);

Generator.prototype.constructor = Generator;

Generator.prototype.update = function(){
	if(this.health >= 25){
		this.animations.play('Healthy');
	}
	else{
		this.animations.play('Damaged');
	}
}