var MainMenu = function(game){}
MainMenu.prototype = {
	preload: function(){
		// preload assets
		game.load.image('hat', 'assets/img/Hat.png');
		game.load.image('generator', 'assets/img/generator.png');
		game.load.image('plug', 'assets/img/TempPlug.png');
		game.load.image('background', 'assets/img/Background.png');	
		game.load.image('M1Background', 'assets/img/MinigameBackground.png');
		game.load.image('LevelStart', 'assets/img/Message.png');
		game.load.image('spacebar', 'assets/img/Spacebar.png');
		game.load.atlas('player', 'assets/img/maron.png', 'assets/img/Maron.json');
		game.load.audio('fix000', 'assets/audio/FixSoundFX.wav');
		game.load.audio('fix001', 'assets/audio/FixSoundFX001.wav')
	},

	create: function(){
		console.log('MainMenu: create');
		//Background
		game.stage.backgroundColor = '#facade';

		var menuText = game.add.text(0, 0, 'Balncing Buisness', { fontSize: '48px', fill: '#000', boundsAlignH: 'center', boundsAlignV: 'top'});
		menuText.setTextBounds(0,100,800,100);

		var menuText = game.add.text(0, 75, 'by group 29', { fontSize: '24px', fill: '#000', boundsAlignH: 'center', boundsAlignV: 'top'});
		menuText.setTextBounds(0,100,800,100);

		var menuText = game.add.text(0, 400, 'Press [space] to start', { fontSize: '24px', fill: '#000', boundsAlignH: 'center', boundsAlignV: 'top'});
		menuText.setTextBounds(0,100,800,100);

	},

	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Level-1');
		}
	}
}