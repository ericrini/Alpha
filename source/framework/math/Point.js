'use strict';

/**
 * Point
 * @param x {Number} The x coordinate of the Point.
 * @param y {Number} The y coodrinate of the Point.
 * @constructor
 */
var Point = function (x, y) {
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
};

module.exports = Point;