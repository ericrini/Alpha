'use strict';

var Mouse = require('./Mouse');
var Keyboard = require('./Keyboard');
var Stage = require('./Stage');
var Stats = require('./Stats');
var Constants = require('./Constants');
var ResourceLoader = require('./animation/ResourceLoader');

var Game = function () {
    this.constants = new Constants(this);
    this.lastFrame = Infinity;
    this.frameDelta = Infinity;
    this.stage = new Stage(this);
    this.keyboard = new Keyboard(this);
    this.mouse = new Mouse(this);
    this.resources = new ResourceLoader();
    this.scenes = [];
};

Game.prototype.defineScene = function (name, strategy) {
    this.scenes[name] = strategy;
};

Game.prototype.loadScene = function (name) {
    var _this = this;

    console.log('Transitioning to scene: "' + name + '".');

    this.resources.load(function () {
        _this.stage.clear();
        _this.stage.addActor(new Stats());
        _this.stage.addActor(_this.constants);
        _this.scenes[name](_this.stage);
    });
};

Game.prototype.start = function () {
    var _this = this;

    requestAnimationFrame(function () {
        _this.stage.update(_this);
        _this.mouse.update(_this);
        _this.keyboard.update(_this);
        _this.stage.checkCollisions(_this);
        _this.stage.draw();
        _this.start();
    });

    this.frameDelta = Date.now() - _this.lastFrame;
    this.lastFrame = Date.now();
};

module.exports = Game;