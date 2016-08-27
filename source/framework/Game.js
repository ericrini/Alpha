window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    Alpha.Game = function () {
        this.keyboard = new Alpha.Keyboard();
        this.stage = new Alpha.Stage(this);

        this.stats = new Alpha.Statistics();
        this.stage.addActor(this.stats);

        this.config = new Alpha.Config();
        this.stage.addActor(this.config);
    };

    Alpha.Game.prototype.loop = function () {
        var _this = this;
        this.frameStart = Date.now();

        window.requestAnimationFrame(function () {
            _this.stage.update(_this);
            _this.stage.draw();
            _this.loop();
        });
    };

    window.game = new Alpha.Game();
    game.stage.addActor(new Alpha.Starfield());
    game.stage.addActor(new Alpha.Player());
    game.loop();

}(Alpha));