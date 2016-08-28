'use strict';

var Actor = function (strategy) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.width = 0;
    this.height = 0;
    this.init = strategy.init;
    this.update = strategy.update;
    this.draw = strategy.draw;
};

module.exports = Actor;