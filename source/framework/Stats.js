'use strict';

var util = require('util');
var Actor = require('./Actor');

var Stats = function () {
    this.x = 0.86;
    this.y = 0.05;
    this.z = 100;
    this.scale = 0;
    this.rotate = 0;
    this.drawBoundingBox = false;
    this.actors = 0;
    this.fps = 0;
    this.lastUpdate = Infinity;
    this.updateTime = Infinity;
};

util.inherits(Stats, Actor);

Stats.prototype.update = function (game) {
    this.updateTime = Date.now() - this.lastUpdate;
    this.lastUpdate = Date.now();
    this.actors = game.stage.actors.length;
    this.fps = Math.floor(1000 / game.frameTime);
};

Stats.prototype.draw = function (context) {
    var x = this.x * context.canvas.width;
    var y = this.y * context.canvas.height;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(x, y);

    context.font = "20px Helvetica";
    context.fillStyle = "#FFFF00";

    context.textAlign = 'right';
    context.fillText(this.actors, -10, 0);
    context.fillText(this.updateTime, -10, 20);
    context.fillText(this.fps, -10, 40);

    context.textAlign = 'left';
    context.fillText('actors', 0, 0);
    context.fillText('ms', 0, 20);
    context.fillText('fps', 0, 40);
};

module.exports = Stats;