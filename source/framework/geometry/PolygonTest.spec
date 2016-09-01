describe('The Polygon', function () {
    'use strict';

    var Point = require('./Point');
    var Polygon = require('./Polygon');

    it('can check if it is overlapping another Polygon', function () {
        var poly1 = new Polygon([
            new Point(0, 0),
            new Point(100, 0),
            new Point(100, 100),
            new Point(0, 100)
        ]);

        var poly2 = new Polygon([
            new Point(0, 0),
            new Point(50, 0),
            new Point(50, 50),
            new Point(0, 50)
        ]);

        var poly3 = new Polygon([
            new Point(200, 200),
            new Point(300, 200),
            new Point(300, 300),
            new Point(200, 300)
        ]);

        expect(poly1.intersects(poly2)).toBe(true);
        expect(poly1.intersects(poly3)).toBe(false);
    });

    it('can check if it contains a Point', function () {
        var poly = new Polygon([
            new Point(0, 0),
            new Point(100, 0),
            new Point(100, 100),
            new Point(0, 100)
        ]);

        var point1 = new Point(50, 50);
        var point2 = new Point(150, 150);

        expect(poly.contains(point1)).toBe(true);
        expect(poly.contains(point2)).toBe(false);
    });
});