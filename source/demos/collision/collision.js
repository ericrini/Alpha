(function (Alpha) {
    'use strict';

    var game = new Alpha.Game();

    var Box = function (x, y, scale, color) {
        this.color = color;
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.rotate = 0;
        this.drawBoundingBox = true;
    };

    Box.prototype = Object.create(Alpha.Actor.prototype);

    Box.prototype.update = function () {
        this.rotate += 1;
    };

    Box.prototype.draw = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, 1, 1);
    };

    game.defineScene('boxes', function (stage) {
        stage.addActor(new Box(0.20, 0.20, 0.20, 'cyan'));
        stage.addActor(new Box(0.50, 0.50, 0.30, 'yellow'));
    });

    game.loadScene('boxes');

    game.start();
}(Alpha));