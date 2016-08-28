'user strict';

var Game = require('./framework/Game.js');
var Player = require('./actors/Player');
var Starfield = require('./actors/Starfield');

var game = new Game();

game.stage.defineScene('briefing', function (stage) {
});

game.stage.defineScene('level 1', function (stage) {
    stage.addActor(new Starfield());
    stage.addActor(new Player());
});

game.stage.loadScene('level 1');

game.start();

module.exports = game;