'use strict';

var util = require('util');
var Actor = require('./Actor');

var Stats = function () {
    this.x = 0.90;
    this.y = 0.05;
    this.z = 100;
    this.scale = 0;
    this.rotate = 0;
    this.drawBoundingBox = false;

    this.actors = 0;

    this.lastFrame = Infinity;
    this.frameTime = Infinity;
    this.fps = 0;
};

util.inherits(Stats, Actor);

Stats.prototype.init = function (game) {
    game.constants.define('Stats.DISPLAY', 'boolean', false);
};

Stats.prototype.update = function (game) {
    this.actors = game.stage.actors.length;
};

Stats.prototype.draw = function (context, game) {
    this.frameTime = Date.now() - this.lastFrame;
    this.fps = Math.floor(1000 / this.frameTime);
    this.lastFrame = Date.now();

    if (game.constants.get('Stats.DISPLAY')) {
        var x = this.x * context.canvas.width;
        var y = this.y * context.canvas.height;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x, y);

        context.font = "20px Helvetica";
        context.fillStyle = "#FFFF00";

        context.textAlign = 'right';
        context.fillText('Actors:', -10, 0);
        context.fillText('Frame Time:', -10, 24);
        context.fillText('FPS:', -10, 48);
        //context.fillText('Frame Delta:', -10, 72);
        //context.fillText('UPS:', -10, 96);

        context.textAlign = 'left';
        context.fillText(this.actors, 0, 0);
        context.fillText(this.frameTime, 0, 24);
        context.fillText(this.fps, 0, 48);
        //context.fillText(game.frameDelta, 0, 72);
        //context.fillText(this.ups, 0, 96);
    }
};

module.exports = Stats;