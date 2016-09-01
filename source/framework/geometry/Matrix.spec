describe('The Matrix', function () {
    'use strict';

    var Matrix = require('./Matrix');
    var Point = require('./Point');
    var MockCanvas = require('../../mocks/Canvas');

    it('can be constructed', function () {
        var matrix = new Matrix();

        expect(matrix.xScale).toBe(1);
        expect(matrix.xSkew).toBe(0);
        expect(matrix.ySkew).toBe(0);
        expect(matrix.yScale).toBe(1);
        expect(matrix.x).toBe(0);
        expect(matrix.y).toBe(0);
    });

    it('can be constructed with explicit values', function () {
        var matrix = new Matrix(0, 1, 1, 0, 1, 1);

        expect(matrix.xScale).toBe(0);
        expect(matrix.xSkew).toBe(1);
        expect(matrix.ySkew).toBe(1);
        expect(matrix.yScale).toBe(0);
        expect(matrix.x).toBe(1);
        expect(matrix.y).toBe(1);
    });

    it('can find the dot product of two Matrices', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix3 = matrix1.multiply(matrix2);

        expect(matrix3.xScale).toBe(16);
        expect(matrix3.xSkew).toBe(21);
        expect(matrix3.ySkew).toBe(28);
        expect(matrix3.yScale).toBe(37);
        expect(matrix3.x).toBe(46);
        expect(matrix3.y).toBe(60);
    });

    it('can scale a Matrix', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.scale(8, 9);

        expect(matrix2.xScale).toBe(16);
        expect(matrix2.xSkew).toBe(24);
        expect(matrix2.ySkew).toBe(36);
        expect(matrix2.yScale).toBe(45);
        expect(matrix2.x).toBe(6);
        expect(matrix2.y).toBe(7);
    });

    it('can translate a Matrix', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.translate(8, 9);

        expect(matrix2.xScale).toBe(2);
        expect(matrix2.xSkew).toBe(3);
        expect(matrix2.ySkew).toBe(4);
        expect(matrix2.yScale).toBe(5);
        expect(matrix2.x).toBe(58);
        expect(matrix2.y).toBe(76);
    });

    it('can skew a Matrix', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.skew(8, 9);

        expect(matrix2.xScale).toBe(32);
        expect(matrix2.xSkew).toBe(40);
        expect(matrix2.ySkew).toBe(18);
        expect(matrix2.yScale).toBe(27);
        expect(matrix2.x).toBe(6);
        expect(matrix2.y).toBe(7);
    });

    it('can rotate a Matrix clockwise', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.clockwise(45);

        expect(matrix2.xScale).toBe(-1.4142135623730947);
        expect(matrix2.xSkew).toBe(-1.4142135623730945);
        expect(matrix2.ySkew).toBe(4.242640687119286);
        expect(matrix2.yScale).toBe(5.65685424949238);
        expect(matrix2.x).toBe(6);
        expect(matrix2.y).toBe(7);
    });

    it('can rotate a Matrix clockwise around a specific origin', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.clockwise(45, 8, 9);

        expect(matrix2.xScale).toBe(-1.4142135623730947);
        expect(matrix2.xSkew).toBe(-1.4142135623730945);
        expect(matrix2.ySkew).toBe(4.242640687119286);
        expect(matrix2.yScale).toBe(5.65685424949238);
        expect(matrix2.x).toBe(31.12994231491119);
        expect(matrix2.y).toBe(36.40202025355333);
    });

    it('can rotate a Matrix counterclockwise', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.counterclockwise(45);

        expect(matrix2.xScale).toBe(12.727922061357855);
        expect(matrix2.xSkew).toBe(15.556349186104045);
        expect(matrix2.ySkew).toBe(24.041630560342618);
        expect(matrix2.yScale).toBe(29.698484809834994);
        expect(matrix2.x).toBe(41.35533905932738);
        expect(matrix2.y).toBe(50.840620433565945);
    });

    it('can rotate a Matrix counterclockwise around a specific origin', function () {
        var matrix1 = new Matrix(2, 3, 4, 5, 6, 7);
        var matrix2 = matrix1.counterclockwise(45, 8, 9);

        expect(matrix2.xScale).toBe(12.727922061357855);
        expect(matrix2.xSkew).toBe(15.556349186104045);
        expect(matrix2.ySkew).toBe(24.041630560342618);
        expect(matrix2.yScale).toBe(29.698484809834994);
        expect(matrix2.x).toBe(-224.84271247461902);
        expect(matrix2.y).toBe(-271.8965363437814);
    });

    it('can find the dot product of a Matrix and a Point', function () {
        var matrix = new Matrix(2, 3, 4, 5, 6, 7);
        var point1 = new Point(8, 9);
        var point2 = matrix.transform(point1);

        expect(point2.x).toBe(58);
        expect(point2.y).toBe(76);
    });

    it('can apply the transform to a canvas', function () {
        var matrix = new Matrix(1, 0, 0, 1, 0, 0);
        var canvas = new MockCanvas();
        var context = canvas.getContext('2d');

        spyOn(context, 'setTransform');
        spyOn(context, 'transform');

        matrix.apply(context, true);
        expect(context.transform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);

        matrix.apply(context);
        expect(context.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    });
});