window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    Alpha.Statistics = function () {
        this.actors = 0;
        this.fps = 0;
    };

    Alpha.Statistics.prototype.update = function (game) {
        this.actors = game.stage.actors.length + ' actors';
        this.fps = Math.floor(1000 / (Date.now() - game.frameStart)) + ' fps';
    };

    Alpha.Statistics.prototype.draw = function (context) {
        context.fillStyle = "#FFFF00";
        context.font = "30px Helvetica";
        context.fillText(this.actors, context.canvas.width - 145, 35);
        context.fillText(this.fps, context.canvas.width - 145, 70);
    };

}(Alpha));

