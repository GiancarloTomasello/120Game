
function Generator(game, x, y, startingHealth){
	//sets the paramaters when created
	Phaser.Sprite.call(this, game, x, y, 'hat');
	this.anchor.set(0.5);
	this.health = startingHealth;
}

//Extends the Phaser.Sprite to prefab and sets the constructor name
Generator.prototype = Object.create(Phaser.Sprite.prototype);

Generator.prototype.constructor = Generator;

Generator.prototype.update = function(){

}