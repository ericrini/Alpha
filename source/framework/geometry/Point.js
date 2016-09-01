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

Point.prototype.project = function (point) {
    return this.x * point.x + this.y * point.y;
};

Point.prototype.slopeTo = function (point) {
    return new Point(this.x - point.x, this.y - point.y);
};

Point.prototype.distanceTo = function (point) {
    return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
};

module.exports = Point;