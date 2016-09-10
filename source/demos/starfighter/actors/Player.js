(function (Alpha) {
    'use strict';

    Alpha.Player = function () {
        this.x = 0;
        this.xv = 0;
        this.y = 0;
        this.yv = 0;
        this.cooldown = 0;
    };

    Alpha.Player.prototype = Object.create(Alpha.Actor.prototype);

    Alpha.Player.prototype.init = function (game) {
        game.constants.define('Player.VELOCITY', 'range', 4, {
            min: 2,
            max: 8
        }, true);

        game.constants.define('Player.MAX_VELOCITY', 'range', 20, {
            min: 10,
            max: 30
        }, true);

        game.constants.define('Player.VELOCITY_DECAY', 'range', 1, {
            min: 1,
            max: 5
        }, true);

        game.constants.define('Player.PROJECTILE_COOLDOWN', 'range', 10, {
            min: 1,
            max: 30
        });

        game.constants.define('Projectile.VELOCITY', 'range', 10, {
            min: 1,
            max: 50
        });

        game.constants.define('Projectile.GROWTH_RATE', 'range', 1, {
            min: 1,
            max: 5
        });

        game.constants.define('Projectile.MAX_RADIUS', 'range', 13, {
            min: 1,
            max: 25
        });

        game.constants.define('Projectile.MIN_RADIUS', 'range', 5, {
            min: 1,
            max: 25
        });

        this.x = (game.stage.canvas.width / 2) - 50;
        this.y = game.stage.canvas.height - 200;
    };

    Alpha.Player.prototype.update = function (game) {

        /* X-AXIS */
        if (game.keyboard.left && this.xv > -game.constants.get('Player.MAX_VELOCITY')) {
            this.xv -= game.constants.get('Player.VELOCITY');
        }

        if (game.keyboard.right && this.xv < game.constants.get('Player.MAX_VELOCITY')) {
            this.xv += game.constants.get('Player.VELOCITY');
        }

        this.x += this.xv;

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > game.stage.canvas.width - 100) {
            this.x = game.stage.canvas.width - 100
        }

        if (this.xv > 0) {
            this.xv -= game.constants.get('Player.VELOCITY_DECAY');
        }

        if (this.xv < 0) {
            this.xv += game.constants.get('Player.VELOCITY_DECAY');
        }

        /* Y-AXIS */
        if (game.keyboard.up && this.yv > -game.constants.get('Player.MAX_VELOCITY')) {
            this.yv -= game.constants.get('Player.VELOCITY');
        }

        if (game.keyboard.down && this.yv < game.constants.get('Player.MAX_VELOCITY')) {
            this.yv += game.constants.get('Player.VELOCITY');
        }

        this.y += this.yv;

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > game.stage.canvas.height - 100) {
            this.y = game.stage.canvas.height - 100
        }

        if (this.yv > 0) {
            this.yv -= game.constants.get('Player.VELOCITY_DECAY');
        }

        if (this.yv < 0) {
            this.yv += game.constants.get('Player.VELOCITY_DECAY');
        }

        /* BULLET */
        if (game.keyboard.space) {
            if (0 === this.cooldown) {
                game.stage.addActor(new Alpha.Projectile(this.x + 50, this.y + 25));
                this.cooldown += game.constants.get('Player.PROJECTILE_COOLDOWN');
            }
        }

        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
    };

    Alpha.Player.prototype.draw = function (context) {
        context.translate(this.x, this.y);

        context.beginPath();
        context.lineJoin = 'miter';
        context.strokeStyle = 'rgb(100, 100, 100)';
        context.lineCap = 'butt';
        context.lineWidth = 1;
        context.fillStyle = 'rgb(51, 51, 51)';
        context.moveTo(49.956660, 0.640007);
        context.lineTo(0.566443, 49.856277);
        context.lineTo(30.200573, 99.072373);
        context.lineTo(49.956660, 69.542577);
        context.lineTo(69.712748, 99.072373);
        context.lineTo(99.346882, 49.856277);
        context.lineTo(49.956660, 0.640007);
        context.fill();
        context.stroke();

        context.beginPath();
        context.lineJoin = 'miter';
        context.strokeStyle = 'rgb(100, 100, 100)';
        context.lineCap = 'butt';
        context.lineWidth = 1.000000;
        context.fillStyle = 'rgb(255, 255, 0)';
        context.moveTo(49.868272, 26.362197);
        context.lineTo(24.211418, 57.776377);
        context.lineTo(49.896077, 46.816277);
        context.lineTo(74.641243, 58.129977);
        context.fill();
        context.stroke();

        context.setTransform(1,0,0,1,0,0);
    };
}(Alpha));