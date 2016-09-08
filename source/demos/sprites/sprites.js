(function (Alpha) {
    'use strict';

    // 109 x 202
    var Zombie = function () {
        var _this = this;

        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.image = document.createElement('img');

        this.image.addEventListener('load', function () {
            _this.ready = true;
        });

        this.image.src = './images/baseball_zombie_walk.png';
    };

    Zombie.prototype = Object.create(Alpha.Actor.prototype);

    Zombie.prototype.draw = function (context) {
        context.drawImage(this.image, 179 * this.frame, 0, 179, 202, this.x, this.y, 179, 202);

        if (game.keyboard.left) {
            this.x -= 3;
        }

        if (game.keyboard.right) {
            this.x += 3;
        }

        if (game.keyboard.up) {
            this.y -= 3;
        }

        if (game.keyboard.down) {
            this.y += 3;
        }

        if (this.frame + 1 > 7) {
            this.frame = 0;
        }
        else {
            this.frame++;
        }
    };

    var game = new Alpha.Game();

    game.defineScene('level 1', function (stage) {
        stage.addActor(new Zombie());
    });

    game.loadScene('level 1');

    game.start();
}(Alpha));