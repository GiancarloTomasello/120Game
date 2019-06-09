var GameOver = function(game){}
GameOver.prototype = {
	init: function(stateName){
		this.stateName = stateName;
		console.log('stateName: ' + this.stateName);
	},

	create: function(){
		console.log('GameOver: create');
		//Background
		this.Background = game.add.sprite(0,-25, 'GameOverText');
		this.Background.scale.setTo(0.65,0.75);
		game.stage.backgroundColor = '#658AB2';

		// var menuText = game.add.text(0, 0, 'GameOver', { fontSize: '48px', fill: '#000', boundsAlignH: 'center', boundsAlignV: 'top'});
		// menuText.setTextBounds(0,100,800,100);
	},

	update: function(){
		//Restart Level
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start(this.stateName);
		}
	}
}