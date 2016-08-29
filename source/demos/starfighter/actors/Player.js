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
        game.config.define('Player.VELOCITY', 'range', 4, {
            min: 2,
            max: 8
        }, true);

        game.config.define('Player.MAX_VELOCITY', 'range', 20, {
            min: 10,
            max: 30
        }, true);

        game.config.define('Player.VELOCITY_DECAY', 'range', 1, {
            min: 1,
            max: 5
        }, true);

        game.config.define('Player.PROJECTILE_COOLDOWN', 'range', 10, {
            min: 1,
            max: 30
        });

        game.config.define('Projectile.VELOCITY', 'range', 10, {
            min: 1,
            max: 50
        });

        game.config.define('Projectile.GROWTH_RATE', 'range', 1, {
            min: 1,
            max: 5
        });

        game.config.define('Projectile.MAX_RADIUS', 'range', 13, {
            min: 1,
            max: 25
        });

        game.config.define('Projectile.MIN_RADIUS', 'range', 5, {
            min: 1,
            max: 25
        });

        this.x = (game.stage.canvas.width / 2) - 50;
        this.y = game.stage.canvas.height - 200;
    };

    Alpha.Player.prototype.update = function (game) {

        /* X-AXIS */
        if (game.keyboard.left && this.xv > -game.config.get('Player.MAX_VELOCITY')) {
            this.xv -= game.config.get('Player.VELOCITY');
        }

        if (game.keyboard.right && this.xv < game.config.get('Player.MAX_VELOCITY')) {
            this.xv += game.config.get('Player.VELOCITY');
        }

        this.x += this.xv;

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > game.stage.canvas.width - 100) {
            this.x = game.stage.canvas.width - 100
        }

        if (this.xv > 0) {
            this.xv -= game.config.get('Player.VELOCITY_DECAY');
        }

        if (this.xv < 0) {
            this.xv += game.config.get('Player.VELOCITY_DECAY');
        }

        /* Y-AXIS */
        if (game.keyboard.up && this.yv > -game.config.get('Player.MAX_VELOCITY')) {
            this.yv -= game.config.get('Player.VELOCITY');
        }

        if (game.keyboard.down && this.yv < game.config.get('Player.MAX_VELOCITY')) {
            this.yv += game.config.get('Player.VELOCITY');
        }

        this.y += this.yv;

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > game.stage.canvas.height - 100) {
            this.y = game.stage.canvas.height - 100
        }

        if (this.yv > 0) {
            this.yv -= game.config.get('Player.VELOCITY_DECAY');
        }

        if (this.yv < 0) {
            this.yv += game.config.get('Player.VELOCITY_DECAY');
        }

        /* BULLET */
        if (game.keyboard.space) {
            if (0 === this.cooldown) {
                game.stage.addActor(new Alpha.Projectile(this.x + 50, this.y + 25));
                this.cooldown += game.config.get('Player.PROJECTILE_COOLDOWN');
            }
        }

        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
    };

    Alpha.Player.prototype.draw = function (context) {
        context.fillStyle = "#FF0000";
        context.beginPath();
        context.moveTo(this.x, this.y + 100);
        context.lineTo(this.x + 100, this.y + 100);
        context.lineTo(this.x + 50, this.y);
        context.fill();
        context.closePath();
    };
}(Alpha));