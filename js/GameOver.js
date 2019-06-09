var GameOver = function(game){}
GameOver.prototype = {
	init: function(stateName){
		this.stateName = stateName;
		//console.log('stateName: ' + this.stateName);
	},

	create: function(){
		console.log('GameOver: create');
		//Background
		this.Background = game.add.sprite(0,-25, 'GameOverText');
		this.Background.scale.setTo(0.65,0.75);
		game.stage.backgroundColor = '#658AB2';

		var menuText = game.add.text(0, 40, 'Press [space] to retry the last level', { fontSize: '24px', fill: '#000', boundsAlignV: 'top'});
		menuText.setTextBounds(0,100,800,100);

		var menuText = game.add.text(0, 90, 'Press [w] to return to the menu', { fontSize: '24px', fill: '#000', boundsAlignV: 'top'});
		menuText.setTextBounds(0,100,800,100);
	},

	update: function(){
		//Restart Level
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start(this.stateName);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
			game.state.start('MainMenu');
		}
	}
}