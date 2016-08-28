'use strict';

var Stage = function (game) {
    var _this = this;

    this.game = game;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 768;
    this.canvas.style.backgroundColor = 'black';
    this.context = this.canvas.getContext('2d');
    this.actors = [];
    this.fps = 0;
    this.scenes = [];

    document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(_this.canvas);
    });
};

Stage.prototype.defineScene = function (name, strategy) {
    this.scenes[name] = strategy;
};

Stage.prototype.loadScene = function (name) {
    console.log('Transitioning to scene: "' + name + '".');
    this.clear();
    this.scenes[name](this, this.game);
};

Stage.prototype.addActor = function (actor) {
    //console.log('add actor', actor);

    if (actor.initialize) {
        actor.initialize(this.game);
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
            this.actors.splice(i, 1);
            //console.log('remove actor', this.actors[i]);
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
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.actors.length; i++) {
        if (this.actors[i].draw) {
            this.actors[i].draw(this.context, this.game);
        }
    }
};

module.exports = Stage;