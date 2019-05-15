var GameOver = function(game){}
GameOver.prototype = {
	preload: function(){

	},

	create: function(){
		console.log('GameOver: create');
		//Background
		game.stage.backgroundColor = '#658AB2';

		var menuText = game.add.text(0, 0, 'GameOver', { fontSize: '48px', fill: '#000', boundsAlignH: 'center', boundsAlignV: 'top'});
		menuText.setTextBounds(0,100,800,100);
	},

	update: function(){

	}
}