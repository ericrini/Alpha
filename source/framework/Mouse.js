'use strict';

var Point = require('./geometry/Point');

var Mouse = function (game) {
    var _this = this;

    this.game = game;
    this.click;
    this.up = true;
    this.down = false;
    this.clickX = 0;
    this.clickY = 0;
    this.x = 0;
    this.y = 0;

    game.stage.canvas.addEventListener('mousemove', function (event) {
        var rect = game.stage.canvas.getBoundingClientRect();
        _this.x = event.clientX - rect.left;
        _this.y = event.clientY - rect.top;
    });

    game.stage.canvas.addEventListener('mousedown', function () {
        _this.click = true;
        _this.up = false;
        _this.down = true;
        console.info('mousedown');
    });

    game.stage.canvas.addEventListener('mouseup', function () {
        _this.up = true;
        _this.down = false;
        console.info('mouseup');
    });
};

Mouse.prototype.update = function () {
    this.click = false;
};

/**
 * The pointer position on the physical stage.
 * @returns {Point}
 */
Mouse.prototype.getPoint = function () {
    return new Point(this.x, this.y);
};

/**
 * The pointer position on a hypothetical Stage where 0,0 is the top left corner and the width is 1 unit.
 * @type {Number}
 */
Mouse.prototype.getNormalizedPoint = function () {
    return new Point(this.x / this.game.stage.canvas.width, this.y / this.game.stage.canvas.height);
};

module.exports = Mouse;