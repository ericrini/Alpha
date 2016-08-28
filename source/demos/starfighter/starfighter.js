(function (Alpha) {
    'use strict';

    var game = new Alpha.Game();

    game.defineScene('level 1', function (stage) {
        stage.addActor(new Alpha.Starfield());
        stage.addActor(new Alpha.Player());
    });

    game.loadScene('level 1');

    game.start();
}(Alpha));