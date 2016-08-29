'use strict';

var Matrix = require('./math/Matrix');
var Point = require('./math/Point');

var Actor = function () {

    /**
     * The x position of the actor on a hypothetical 1 unit Stage where 0,0 is the top left corner.
     * @type {Number}
     */
    this.x = 0;

    /**
     * The y position of the actor on a hypothetical 1 unit Stage where 0,0 is the top left corner.
     * @type {Number}
     */
    this.y = 0;

    /**
     * The z-index of the actor.
     * @type {Number}
     */
    this.z = 0;

    /**
     * Scale the actor. A value of 1.0 will fill the entire Stage.
     * @type {Number}
     */
    this.scale = 0.10;

    /**
     * Rotate the actor. This value is in degrees.
     * @type {Number}
     */
    this.rotate = 0;

    /**
     * If true, the bounding box will be drawn.
     * @type {Boolean}
     */
    this.drawBoundingBox = false;
};

/**
 * The stage matrix maps the actors coordinate system to the Stage coordinate system.
 * @param canvas
 * @returns {Matrix}
 */
Actor.prototype.getStageMatrix = function (canvas) {
    var x = this.x * canvas.width;
    var y = this.y * canvas.height;
    var width = this.scale * canvas.width;
    var height = this.scale * canvas.height;

    return new Matrix()
        .translate(x, y)
        .clockwise(this.rotate, width / 2, height / 2)
        .scale(width, height);
};

/**
 * Retrieves an Array of Points defining the bounds of this Actor in the Stage coordinate system.
 * @param canvas
 * @returns {{x: number, y: number, width: number, height: number}}
 */
Actor.prototype.getStageBounds = function (canvas) {
    var matrix = this.getStageMatrix(canvas);

    return [
        matrix.transform(new Point(0, 0)),
        matrix.transform(new Point(0, 1)),
        matrix.transform(new Point(1, 1)),
        matrix.transform(new Point(1, 0))
    ];
};

module.exports = Actor;