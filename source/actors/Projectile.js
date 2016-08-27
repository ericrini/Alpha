window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    Alpha.Projectile = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Alpha.Projectile.prototype.update = function (game) {
        this.y -= game.config.get('Projectile.VELOCITY');

        if (this.y < -10) {
            game.stage.removeActor(this);
        }
    };

    Alpha.Projectile.prototype.draw = function (context, game) {
        context.fillStyle = "#FFFF00";
        context.beginPath();
        context.arc(this.x, this.y, game.config.get('Projectile.RADIUS'), 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    };

}(Alpha));
