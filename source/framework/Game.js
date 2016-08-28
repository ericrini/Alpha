'use strict';

var Keyboard = require('./Keyboard');
var Stage = require('./Stage');
var Stats = require('./Stats');
var Config = require('./Config');

var Game = function () {
    this.keyboard = new Keyboard();
    this.stage = new Stage(this);

    this.stats = new Stats();
    this.stage.addActor(this.stats);

    this.config = new Config();
    this.stage.addActor(this.config);

    this.scenes = [];
};

Game.prototype.defineScene = function (name, strategy) {
    this.scenes[name] = strategy;
};

Game.prototype.loadScene = function (name) {
    console.log('Transitioning to scene: "' + name + '".');
    this.stage.clear();
    this.scenes[name](this.stage);
};

Game.prototype.start = function () {
    var _this = this;
    this.frameStart = Date.now();

    window.requestAnimationFrame(function () {
        _this.stage.update(_this);
        _this.stage.draw();
        _this.frameTime = Date.now() - _this.frameStart;
        _this.start();
    });
};

module.exports = Game;