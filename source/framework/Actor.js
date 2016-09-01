'use strict';

var util = require('util');
var Matrix = require('./geometry/Matrix');
var Point = require('./geometry/Point');
var Polygon = require('./geometry/Polygon');

var Actor = function () {

    /**
     * The x position of the actor on a hypothetical Stage where 0,0 is the top left corner and the width is 1 unit.
     * @type {Number}
     */
    this.x = 0;

    /**
     * The y position of the actor on a hypothetical Stage where 0,0 is the top left corner and the height is 1 unit.
     * @type {Number}
     */
    this.y = 0;

    /**
     * The z-index of this Actors relative to the other Actors on the Stage.
     * @type {Number}
     */
    this.z = 0;

    /**
     * The scale of the actor relative to the Stage. A scale of 1.0 will fill the entire stage.
     * @type {Number}
     */
    this.scale = 0.10;

    /**
     * The clockwise rotation of the actor on the Stage. The value is in degrees.
     * @type {Number}
     */
    this.rotate = 0;

    /**
     * If true, the bounding box will be visible.
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

Actor.prototype.getStageBounds = function (canvas) {
    var matrix = this.getStageMatrix(canvas);

    return new Polygon([
        matrix.transform(new Point(0, 0)),
        matrix.transform(new Point(0, 1)),
        matrix.transform(new Point(1, 1)),
        matrix.transform(new Point(1, 0))
    ]);
};

module.exports = Actor;