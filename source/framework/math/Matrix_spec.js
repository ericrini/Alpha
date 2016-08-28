describe('The Matrix', function () {
    'use strict';

    it('can find the dot product of two Matrices', function () {
        var matrix1 = new Alpha.Matrix(1, 2, 3, 4, 5, 6);
        var matrix2 = new Alpha.Matrix(6, 5, 4, 3, 2, 1);
        var matrix3 = matrix1.multiply(matrix2);

        expect(matrix3.xScale).toBe(21);
        expect(matrix3.xSkew).toBe(32);
        expect(matrix3.ySkew).toBe(13);
        expect(matrix3.yScale).toBe(20);
        expect(matrix3.x).toBe(62);
        expect(matrix3.y).toBe(39);
    });

    it('can find the dot product of a Matrix and a Point', function () {
        var matrix = new Alpha.Matrix(1, 2, 3, 4, 5, 6);
        var point1 = new Alpha.Point(7, 8);
        var point2 = matrix.transform(point1);

        expect(point2.x).toBe(31);
        expect(point2.y).toBe(46);
    })
});