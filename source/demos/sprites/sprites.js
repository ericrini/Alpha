(function (Alpha) {
    'use strict';

    var Lydia = function () {
        Alpha.Actor.call(this);
        this.width = 64;
        this.height = 64;
        this.scale = 0.25;
        this.drawBoundingBox = true;
        this.x = 0.5;
        this.y = 0.5;
    };

    Lydia.prototype = Object.create(Alpha.Actor.prototype);

    Lydia.prototype.init = function (game) {
        var sprite = game.resources.get('lidia');
        this.addAnimation('up', new Alpha.Animation(30).addFrames(sprite, 64, 64, 1, 9));
        this.addAnimation('left', new Alpha.Animation(30).addFrames(sprite, 64, 64, 1, 9, 0, 64));
        this.animations.left.frames.reverse();
        this.addAnimation('down', new Alpha.Animation(30).addFrames(sprite, 64, 64, 1, 9, 0, 128));
        this.addAnimation('right', new Alpha.Animation(30).addFrames(sprite, 64, 64, 1, 9, 0, 192));
        this.addAnimation('idle', new Alpha.Animation(30).addFrames(sprite, 64, 64, 1, 1, 256, 128));
        this.setActiveAnimation('idle', true);
    };

    Lydia.prototype.update = function (game) {
        Alpha.Actor.prototype.update.call(this, game);

        if (game.keyboard.left) {
            this.setActiveAnimation('left');
            this.x -= 0.01;
        }

        else if (game.keyboard.right) {
            this.setActiveAnimation('right');
            this.x += 0.01;
        }

        else if (game.keyboard.up) {
            this.setActiveAnimation('up');
            this.y -= 0.01;
        }

        else if (game.keyboard.down) {
            this.setActiveAnimation('down');
            this.y += 0.01;
        }

        else {
            this.setActiveAnimation('idle');
        }
    };

    Lydia.prototype.draw = function (context) {
        Alpha.Actor.prototype.draw.call(this, context);
    };

    var game = new Alpha.Game();

    game.resources.add('lidia', './lidia.png');

    game.defineScene('level 1', function (stage) {
        stage.addActor(new Lydia());
    });

    game.loadScene('level 1');

    game.start();
}(Alpha));