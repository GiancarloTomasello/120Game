// Group 29: Giancarlo Tomasello, Joseph Wang, Jovelean Villanueva
// link to git hub https://github.com/GiancarloTomasello/120Game

"use strict";

//Global Variables
var game;
var minigame = false;
var gameName = '';

//What to do when the window loads
window.onload = function(){

	//Initalized game
	game = new Phaser.Game(800, 600, Phaser.AUTO);

	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
}