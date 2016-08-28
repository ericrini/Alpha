describe('The Point', function () {
    'use strict';

    var Point = require('./Point');

    it('can be instantiated with no arguments', function () {
        var point = new Point();
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
    });

    it('can be instantiated with explicit arguments', function () {
        var point = new Point(0, 0);
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
    });
});