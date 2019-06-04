
function Wires(game, x, y, startingHealth){
	//sets the paramaters when created
	Phaser.Sprite.call(this, game, x, y, 'generator');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	this.machineType = 'Wires';

	this.Background = game.add.sprite(500,400, 'M1Background');
	this.Background.alpha = 0;

	//X value is gonna need to be tweeked
	this.plug = game.add.sprite(625,450, 'plug');
	this.plug.alpha = 0;

	this.health = startingHealth;
	this.healthText = game.add.text(500, 360, 'Machine health: ' + this.health);
	this.healthText.alpha = 0;

	

	this.Info0 = game.add.text(600, 525, 'Hold', {fill: '#FFFFFF'});
	this.Info0.anchor.set(0.5);
	this.Info1 = game.add.text(625, 550, 'to fix', {fill: '#FFFFFF'});
	this.Info1.anchor.set(0.5);
	this.Info0.alpha = 0;
	this.Info1.alpha = 0;

	
	
}

//Extends the Phaser.Sprite to prefab and sets the constructor name
Wires.prototype = Object.create(Phaser.Sprite.prototype);

Wires.prototype.constructor = Wires;

Wires.prototype.update = function(){

}