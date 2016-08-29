(function (Alpha) {
    'use strict';

    var game = new Alpha.Game();

    var green = new Alpha.Actor({
        init: function () {
            this.x = 0.20;
            this.y = 0.20;
            this.scale = 0.20;
            this.drawBoundingBox = true;
        },
        update: function () {
            this.rotate += 1;
        },
        draw: function (context) {
            context.fillStyle = 'green';
            context.fillRect(0, 0, 1, 1);
        }
    });

    var yellow = new Alpha.Actor({
        init: function () {
            this.x = 0.50;
            this.y = 0.50;
            this.scale = 0.30;
            this.drawBoundingBox = true;
        },
        update: function () {
            this.rotate += 1;
        },
        draw: function (context) {
            context.fillStyle = 'yellow';
            context.fillRect(0, 0, 1, 1);
        }
    });

    game.defineScene('boxes', function (stage) {
        stage.addActor(green);
        stage.addActor(yellow);
    });

    game.loadScene('boxes');

    game.start();
}(Alpha));