var GameOver = function(game){}
GameOver.prototype = {
	init: function(){
		
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

	}
}