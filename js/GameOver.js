var GameOver = function(game){}
GameOver.prototype = {
	init: function(stateName){
		this.stateName = stateName;
		console.log('text: ' + this.stateName);

	},

	create: function(){
		console.log('GameOver: create');
		//Background
		this.Background = game.add.sprite(0,-25, 'GameOverText');
		this.Background.scale.setTo(0.65,0.75);
		game.stage.backgroundColor = '#658AB2';

		if(this.stateName != 'Level-4'){

			this.add.sprite(10, 100, 'LevelStart');
			var menuText = game.add.text(50, 35, 'Who knew fixing machines would be such a challange. Maybe you can convince your boss to let you try again.', { fontSize: '24px', fill: '#000', boundsAlignV: 'top', wordWrap: 'True', wordWrapWidth: 325});
			menuText.setTextBounds(0,100,800,100);

			var menuText = game.add.text(50, 350, 'Press [space] to try again', {fontSize: '24px'});

			var menuText = game.add.text(50, 425, 'Press [W] to return to menu', {fontSize: '24px'});
		}
		else{

			var menuText = game.add.text(250, 50, 'You Win!', { fontSize: '48px', fill: '#000', boundsAlignV: 'top'});

			this.add.sprite(10, 100, 'LevelStart');
			var menuText = game.add.text(50, 35, 'Despite how hectic your new job is, you managed to prove your skill at fixing things to your boss, way to go! Though you do not remember any of this in the job discription.', { fontSize: '24px', fill: '#000', boundsAlignV: 'top', wordWrap: 'True', wordWrapWidth: 325});
			menuText.setTextBounds(0,100,800,100);

			var menuText = game.add.text(50, 425, 'Press [W] to return to menu', {fontSize: '24px'})

		}
	},

	update: function(){
		//Restart Level
		if(this.stateName != 'Level-4'){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				game.state.start(this.stateName);
			}
		}
		
		else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
			game.state.start('MainMenu');
		}
	}
}