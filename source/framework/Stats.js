'use strict';

var Stats = function () {
    this.actors = 0;
    this.fps = 0;
};

Stats.prototype.update = function (game) {
    this.actors = game.stage.actors.length + ' actors';
    this.fps = Math.floor(1000 / game.frameTime) + ' fps';
};

Stats.prototype.draw = function (context, game) {
    context.fillStyle = "#FFFF00";
    context.font = "30px Helvetica";
    context.fillText(game.frameTime + ' ms', context.canvas.width - 155, 35);
    context.fillText(this.fps, context.canvas.width - 155, 70);
    context.fillText(this.actors, context.canvas.width - 155, 105);
};

module.exports = Stats;