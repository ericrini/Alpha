window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    /**
     * Alpha.Matrix
     *
     * @param xScale {Number} The x axis scale.
     * @param xSkew {Number} The x axis skew.
     * @param ySkew {Number} The y axis skew.
     * @param yScale {Number} The y axis scale.
     * @param x {Number} The x axis translation.
     * @param y {Number} The y axis translation.
     * @constructor
     */
    Alpha.Matrix = function (xScale, xSkew, ySkew, yScale, x, y) {
        this.xScale = xScale || 1;
        this.xSkew = xSkew || 0;
        this.ySkew = ySkew || 0;
        this.yScale = yScale || 1;
        this.x = x || 0;
        this.y = y || 0;
    };

    /**
     * Multiply this Matrix by another Matrix.
     * @param matrix {Alpha.Matrix} The Matrix that will be the second operand in the dot product.
     * @returns {Alpha.Matrix} A new Matrix object.
     */
    Alpha.Matrix.prototype.multiply = function (matrix) {
        return new Alpha.Matrix(
            (this.xScale * matrix.xScale) + (this.ySkew * matrix.xSkew),
            (this.xSkew * matrix.xScale) + (this.yScale * matrix.xSkew),
            (this.xScale * matrix.ySkew) + (this.ySkew * matrix.yScale),
            (this.xSkew * matrix.ySkew) + (this.yScale * matrix.yScale),
            (this.x * matrix.xScale) + (this.y * matrix.xSkew) + matrix.x,
            (this.x * matrix.ySkew) + (this.y * matrix.yScale) + matrix.y
        );
    };

    /**
     * Scale this Matrix.
     * @param x {Number} The x axis scale factor.
     * @param y {Number} The y axis scale factor.
     * @returns {Alpha.Matrix} A new Matrix object.
     */
    Alpha.Matrix.prototype.scale = function (x, y) {
        var matrix = new Alpha.Matrix(x, 0, 0, y, 0, 0);
        return this.multiply(matrix);
    };

    /**
     * Translate this Matrix.
     * @param x {Number} The x axis translate factor.
     * @param y {Number} The y axis translate factor.
     * @returns {Alpha.Matrix} A new Matrix object.
     */
    Alpha.Matrix.prototype.translate = function (x, y) {
        var matrix = new Alpha.Matrix(0, 0, 0, 0, x, y);
        return this.multiply(matrix);
    };

    /**
     * Translate this Matrix.
     * @param x {Number} The x axis translate factor.
     * @param y {Number} The y axis translate factor.
     * @returns {Alpha.Matrix} A new Matrix object.
     */
    Alpha.Matrix.prototype.skew = function (x, y) {
        var matrix = new Alpha.Matrix(0, x, y, 0, 0, 0);
        return this.multiply(matrix);
    };

    /**
     * Rotate this Matrix.
     * @param degrees {Number} The number of degrees to rotate.
     * @param x {Number} The x origin of rotation.
     * @param y {Number} The y origin of rotation.
     * @returns {Alpha.Matrix} A new Matrix object.
     */
    Alpha.Matrix.prototype.rotate = function (degrees, x, y) {
        var matrix1 = this.translate(x, y);
        var matrix2 = new Alpha.Matrix(Math.cos(degrees), -Math.sin(degrees), Math.sin(degrees), Math.cos(degrees), 0, 0);
        var matrix3 = this.translate(-x, -y);
        return matrix1.multiply(matrix2).multiply(matrix3);
    };

    /**
     * Transform a coordinate by this Matrix.
     * @param point {Alpha.Point} The point to transform.
     * @returns {Alpha.Point} The new point.
     */
    Alpha.Matrix.prototype.transform = function (point) {
        return new Alpha.Point(
            (this.xScale * point.x) + (this.ySkew * point.y),
            (this.xSkew * point.x) + (this.yScale * point.y)
        );
    };

    /**
     * Apply the matrix to a canvas context.
     * @param context {CanvasRenderingContext2D} A CanvasRenderingContext2D object.
     * @param overwrite {Boolean} If true, the current transform will be overwritten. Otherwise it will be multiplied
     * with this transform.
     */
    Alpha.Matrix.prototype.apply = function (context, overwrite) {
        var fn = overwrite ? context.setTransform : context.transform;
        fn(this.xScale, this.xSkew, this.ySkew, this.yScale, this.x, this.y);
    };

}(Alpha));