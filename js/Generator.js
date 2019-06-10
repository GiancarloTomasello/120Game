
function Generator(game, x, y, startingHealth, type){
	//sets the paramaters when created
	this.abc = 0;
	Phaser.Sprite.call(this, game, x, y, 'hat');
	this.anchor.set(0.5);
	this.health = startingHealth;
	this.type = type
	this.cats = 2;
	

}

//Extends the Phaser.Sprite to prefab and sets the constructor name
Generator.prototype = Object.create(Phaser.Sprite.prototype);

Generator.prototype.constructor = Generator;

Generator.prototype.update = function(){

}