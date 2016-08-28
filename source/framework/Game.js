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

    Alpha.Game.prototype.start = function () {
        var _this = this;
        this.frameStart = Date.now();

        window.requestAnimationFrame(function () {
            _this.stage.update(_this);
            _this.stage.draw();
            _this.frameTime = Date.now() - _this.frameStart;
            _this.start();
        });
    };

    var game = new Alpha.Game();

    game.stage.defineScene('briefing', function (stage) {
        stage.addActor(new Alpha.Briefing());
    });

    game.stage.defineScene('level 1', function (stage) {
        stage.addActor(new Alpha.Starfield());
        stage.addActor(new Alpha.Player());
    });

    game.stage.loadScene('level 1');
    game.start();

    window.game = game;

}(Alpha));