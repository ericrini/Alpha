window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    /**
     * Alpha.Point
     * @param x {Number} The x coordinate of the Point.
     * @param y {Number} The y coodrinate of the Point.
     * @constructor
     */
    Alpha.Point = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

}(Alpha));