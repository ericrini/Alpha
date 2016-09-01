'use strict';

var Point = require('./Point');

var Polygon = function (vertices) {
    this.vertices = vertices || [];
};

/**
 * Get the axes used for separating axis theory (http://www.dyn4j.org/2010/01/sat/). I'm not real clear why these are
 * called "axes", they look to me like line slopes, and conveniently have the same structure as a Point (x, y) but
 * different semantic meaning, making this a very confusing concept to work with.
 *
 * @returns {Array} An Array of slopes, represented as Points, that are perpendicular to each edge of this Polygon.
 */
Polygon.prototype.getSeparatingAxes = function () {
    var axes = [];

    for (var i = 0; i < this.vertices.length; i++) {
        var next = (i + 1) > (this.vertices.length - 1) ? this.vertices[0] : this.vertices[i + 1];
        var slope = this.vertices[i].slopeTo(next);
        axes.push(slope);
    }

    return axes;
};

/**
 * Project this Polygon into the specified axis.
 * @param axis
 */
Polygon.prototype.project = function (axis) {
    var  min = this.vertices[0].project(axis);
    var  max = min;

    for (var i = 1; i < this.vertices.length; i++) {
        var p = this.vertices[i].project(axis);

        if (p < min) {
            min = p;
        }
        else if (p > max) {
            max = p;
        }
    }

    return {
        min: min,
        max: max
    };
};

// http://www.dyn4j.org/2010/01/sat/
Polygon.prototype.intersects = function (polygon) {
    var axes = this.getSeparatingAxes().concat(polygon.getSeparatingAxes());

    for (var i = 0; i < axes.length; i++) {
        var axis = axes[i];

        var projection1 = this.project(axis);
        var projection2 = polygon.project(axis);

        if (projection1.max < projection2.min || projection1.min > projection2.max) {
            return false;
        }
    }

    return true;
};

// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
Polygon.prototype.contains = function (point) {
    var x = point.x, y = point.y;
    var inside = false;

    for (var i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
        var xi = this.vertices[i].x, yi = this.vertices[i].y;
        var xj = this.vertices[i].x, yj = this.vertices[j].y;

        if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside;
        }
    }

    return inside;
};

function checkcheck (x, y, cornersX, cornersY) {

    var i, j=cornersX.length-1 ;
    var  oddNodes=false;

    var polyX = cornersX;
    var polyY = cornersY;

    for (i=0; i<cornersX.length; i++) {
        if ((polyY[i]< y && polyY[j]>=y ||  polyY[j]< y && polyY[i]>=y) &&  (polyX[i]<=x || polyX[j]<=x)) {
            oddNodes^=(polyX[i]+(y-polyY[i])/(polyY[j]-polyY[i])*(polyX[j]-polyX[i])<x);
        }
        j=i;
    }

    return oddNodes;
}

module.exports = Polygon;