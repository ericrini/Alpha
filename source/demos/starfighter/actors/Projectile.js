(function (Alpha) {
    'use strict';

    Alpha.Projectile = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Alpha.Projectile.prototype = Object.create(Alpha.Actor.prototype);

    Alpha.Projectile.prototype.init = function (game) {
        this.radius = game.constants.get('Projectile.MIN_RADIUS');
        this.grow = true;
    };

    Alpha.Projectile.prototype.update = function (game) {
        this.y -= game.constants.get('Projectile.VELOCITY');

        if (this.y < -10) {
            game.stage.removeActor(this);
        }

        if (this.grow) {
            if ((this.radius + game.constants.get('Projectile.GROWTH_RATE')) >= game.constants.get('Projectile.MAX_RADIUS')) {
                this.radius = game.constants.get('Projectile.MAX_RADIUS');
                this.grow = false;
            }
            else {
                this.radius += game.constants.get('Projectile.GROWTH_RATE');
            }
        }
        else {
            if ((this.radius - game.constants.get('Projectile.GROWTH_RATE')) <= game.constants.get('Projectile.MIN_RADIUS')) {
                this.radius = game.constants.get('Projectile.MIN_RADIUS');
                this.grow = true;
            }
            else {
                this.radius -= game.constants.get('Projectile.GROWTH_RATE');
            }
        }
    };

    Alpha.Projectile.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#FFFF00';
        context.fill();
        context.closePath();
    };
}(Alpha));