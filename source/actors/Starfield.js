'use strict';

var Star = function () {};

Star.prototype.initialize = function (game) {
    this.velocity = Math.floor(Math.random() * game.config.get('Star.MAX_VELOCITY')) + 1;
    this.radius = Math.floor(Math.random() * game.config.get('Star.MAX_RADIUS')) + 1;
    this.alpha = Math.random();
    this.x = Math.floor(Math.random() * game.stage.canvas.width) + 1;
    this.y = -this.radius;
    this.z = -1;
    this.cooldown = 0;
};

Star.prototype.update = function (game) {
    this.y += this.velocity;

    if (this.y > game.stage.canvas.height + this.radius) {
        game.stage.removeActor(this);
    }
};

Star.prototype.draw = function (context) {
    context.fillStyle = "#FFFFFF";
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
};

var Starfield = function () {
    this.cooldown = 0;
};

Starfield.prototype.initialize = function (game) {
    game.config.define('Starfield.DENSITY', 'range', 5, {
        min: 0,
        max: 30
    });

    game.config.define('Starfield.COOLDOWN', 'range', 15, {
        min: 10,
        max: 30
    });

    game.config.define('Star.MAX_VELOCITY', 'range', 4, {
        min: 0,
        max: 10
    });

    game.config.define('Star.MAX_RADIUS', 'range', 2, {
        min: 0,
        max: 10
    });
};

Starfield.prototype.update = function (game) {
    if (0 === this.cooldown) {
        for (var i = 0; i < game.config.get('Starfield.DENSITY'); i++) {
            game.stage.addActor(new Star());
        }

        this.cooldown += game.config.get('Starfield.COOLDOWN');
    }

    if (this.cooldown > 0) {
        this.cooldown -= 1;
    }
};

module.exports = Starfield;