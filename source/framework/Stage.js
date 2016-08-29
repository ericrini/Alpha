'use strict';

var Matrix = require('./math/Matrix');

var Stage = function (game) {
    var _this = this;

    this.game = game;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.context = this.canvas.getContext('2d');
    this.actors = [];
    this.fps = 0;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(_this.canvas);
    });
};

Stage.prototype.addActor = function (actor) {
    console.log('adding actor', actor);

    if (actor.init) {
        actor.init(this.game);
    }

    var myZ = actor.z || 0;

    for (var i = 0; i < this.actors.length; i++) {
        var theirZ = this.actors[i].z || 0;

        if (myZ < theirZ) {
            this.actors.splice(i, 0, actor);
            return;
        }
    }

    this.actors.push(actor);
};

Stage.prototype.removeActor = function (actor) {
    for (var i = 0; i < this.actors.length; i++) {
        if (this.actors[i] === actor) {
            console.log('removing actor', this.actors[i]);
            this.actors.splice(i, 1);
            break;
        }
    }
};

Stage.prototype.clear = function () {
    this.actors = [];
};

Stage.prototype.update = function (game) {
    for (var i = 0; i < this.actors.length; i++) {
        if (this.actors[i].update) {
            this.actors[i].update(game);
        }
    }
};

Stage.prototype.draw = function () {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.actors.length; i++) {
        if (this.actors[i].draw) {
            this.actors[i].getStageMatrix(this.canvas).apply(this.context);
            this.actors[i].draw(this.context);

            if (this.actors[i].drawBoundingBox) {
                var bounds = this.actors[i].getStageBounds(this.canvas);

                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.beginPath();
                this.context.moveTo(bounds[0].x, bounds[0].y);
                this.context.lineTo(bounds[1].x, bounds[1].y);
                this.context.lineTo(bounds[2].x, bounds[2].y);
                this.context.lineTo(bounds[3].x, bounds[3].y);
                this.context.closePath();
                this.context.strokeStyle = 'red';
                this.context.lineWidth = 3;
                this.context.stroke();
            }
        }
    }
};

module.exports = Stage;