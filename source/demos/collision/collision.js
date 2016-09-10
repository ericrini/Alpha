(function (Alpha) {
    'use strict';

    var game = new Alpha.Game();

    var Box = function (x, y, scale, color) {
        Alpha.Actor.call(this);
        this.original = color;
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.drawBoundingBox = true;
        this.waitingForRelease = false;
    };

    Box.prototype = Object.create(Alpha.Actor.prototype);

    Box.prototype.update = function (game) {
        this.color = this.original;
        this.hover = this.getStageBounds(game.stage.canvas).contains(game.mouse.getPoint());
        this.rotate += Math.random();

        if (this.waitingForRelease && game.mouse.up) {
            this.waitingForRelease = false;
        }

        if (game.mouse.click && this.hover) {
            this.waitingForRelease = game.mouse.getNormalizedPoint();
        }

        if (this.waitingForRelease) {
            var slope = game.mouse.getNormalizedPoint().slopeTo(this.waitingForRelease);

            this.hover = true;
            this.x += slope.x;
            this.y += slope.y;
            this.waitingForRelease = game.mouse.getNormalizedPoint();
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = 0;
        }

    };

    Box.prototype.collision = function () {
        this.color = 'red';
    };

    Box.prototype.draw = function (context) {
        context.fillStyle = this.hover ? 'pink' : this.color;
        context.fillRect(0, 0, 1, 1);
    };

    game.defineScene('boxes', function (stage) {
        stage.addActor(new Box(0.50, 0.50, 0.30, 'yellow'));
        stage.addActor(new Box(0.20, 0.20, 0.20, 'cyan'));
    });

    game.loadScene('boxes');

    game.start();
}(Alpha));