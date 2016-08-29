'use strict';

var Point = require('./Point');

var DEG2RAD_SCALAR = Math.PI / 180;

/**
 * Matrix
 * @param xScale {Number} The x axis scale.
 * @param xSkew {Number} The x axis skew.
 * @param ySkew {Number} The y axis skew.
 * @param yScale {Number} The y axis scale.
 * @param x {Number} The x axis translation.
 * @param y {Number} The y axis translation.
 * @constructor
 */
var Matrix = function (xScale, xSkew, ySkew, yScale, x, y) {
    this.xScale = (xScale === undefined) ? 1 : xScale;
    this.xSkew = (xSkew === undefined) ? 0 : xSkew;
    this.ySkew = (ySkew === undefined) ? 0 : ySkew;
    this.yScale = (yScale === undefined) ? 1 : yScale;
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
};

/**
 * Multiply this Matrix by another Matrix.
 * @param matrix {Matrix} The Matrix that will be the second operand in the dot product.
 * @returns {Matrix} A new Matrix object.
 */
Matrix.prototype.multiply = function (matrix) {
    return new Matrix(
        (this.xScale * matrix.xScale) + (this.ySkew * matrix.xSkew),
        (this.xSkew * matrix.xScale) + (this.yScale * matrix.xSkew),
        (this.xScale * matrix.ySkew) + (this.ySkew * matrix.yScale),
        (this.xSkew * matrix.ySkew) + (this.yScale * matrix.yScale),
        (this.xScale * matrix.x) + (this.ySkew * matrix.y) + this.x,
        (this.xSkew * matrix.x) + (this.yScale * matrix.y) + this.y
    );
};

/**
 * Scale this Matrix.
 * @param x {Number} The x axis scale factor.
 * @param y {Number} The y axis scale factor.
 * @returns {Matrix} A new Matrix object.
 */
Matrix.prototype.scale = function (x, y) {
    var matrix = new Matrix(x, 0, 0, y, 0, 0);
    return this.multiply(matrix);
};

/**
 * Translate this Matrix.
 * @param x {Number} The x axis translate factor.
 * @param y {Number} The y axis translate factor.
 * @returns {Matrix} A new Matrix object.
 */
Matrix.prototype.translate = function (x, y) {
    var matrix = new Matrix(1, 0, 0, 1, x, y);
    return this.multiply(matrix);
};

/**
 * Translate this Matrix.
 * @param x {Number} The x axis translate factor.
 * @param y {Number} The y axis translate factor.
 * @returns {Matrix} A new Matrix object.
 */
Matrix.prototype.skew = function (x, y) {
    var matrix = new Matrix(0, x, y, 0, 0, 0);
    return this.multiply(matrix);
};

/**
 * Rotate this Matrix clockwise.
 * @param degrees {Number} The number of degrees to rotate.
 * @param x {Number} The x origin of rotation.
 * @param y {Number} The y origin of rotation.
 * @returns {Matrix} A new Matrix object.
 */
Matrix.prototype.clockwise = function (degrees, x, y) {
    x = x || 0;
    y = y || 0;

    var radians = degrees * DEG2RAD_SCALAR;
    var translate = new Matrix(1, 0, 0, 1, x, y);
    var rotate = new Matrix(Math.cos(radians), -Math.sin(radians), Math.sin(radians), Math.cos(radians), 0, 0);
    var untranslate = new Matrix(1, 0, 0, 1, -x, -y);

    return this.multiply(translate).multiply(rotate).multiply(untranslate);
};

/**
 * Rotate this Matrix counterclockwise.
 * @param degrees {Number} The number of degrees to rotate.
 * @param x {Number} The x origin of rotation.
 * @param y {Number} The y origin of rotation.
 * @returns {Matrix} A new Matrix object.
 */
Matrix.prototype.counterclockwise = function (degrees, x, y) {
    x = x || 0;
    y = y || 0;

    var radians = degrees * DEG2RAD_SCALAR;
    var matrix1 = this.translate(x, y);
    var matrix2 = new Matrix(Math.cos(radians), Math.sin(radians), -Math.sin(radians), Math.cos(radians), 0, 0);
    var matrix3 = this.translate(-x, -y);

    return matrix1.multiply(matrix2).multiply(matrix3);
};

/**
 * Transform a coordinate by this Matrix.
 * @param point {Point} The point to transform.
 * @returns {Point} The new point.
 */
Matrix.prototype.transform = function (point) {
    return new Point(
        (this.xScale * point.x) + (this.ySkew * point.y) + this.x,
        (this.xSkew * point.x) + (this.yScale * point.y) + this.y
    );
};

/**
 * Apply the matrix to a canvas context.
 * @param context {CanvasRenderingContext2D} A CanvasRenderingContext2D object.
 * @param relative {Boolean} If true, the current canvas transform will be preserved. Otherwise this will overwrite it.
 * with this transform.
 */
Matrix.prototype.apply = function (context, relative) {
    if (relative) {
        context.transform(this.xScale, this.xSkew, this.ySkew, this.yScale, this.x, this.y);
        return;
    }

    context.setTransform(this.xScale, this.xSkew, this.ySkew, this.yScale, this.x, this.y);
};

module.exports = Matrix;

/*
    ==========================
    Dot Product of 2D Matrices
    ==========================

    xScale	ySkew	x
    xSkew	yScale	y
    0		0		1

    xScale	ySkew	x
    xSkew	yScale	y
    0		0		1

    COL 1
    (xScale * xScale) + (ySkew * xSkew)
    (xSkew * xScale) + (yScale * xSkew)
    0

    COL 2
    (xScale * ySkew) + (ySkew * yScale)
    (xSkew * ySkew) + (yScale * yScale)
    0

    COL 3
    (xScale * x) + (ySkew * y) + x
    (xSkew * x) + (yScale * y) + y
    1

    ===============
    Transform Point
    ===============

    xScale	ySkew	x
    xSkew	yScale	y
    0		0		1

    x
    y
    1

    (xScale * x) + (ySkew * y) + x
    (xSkew * x) + (yScale * y) + y
 */