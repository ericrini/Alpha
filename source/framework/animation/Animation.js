'use strict';

/**
 * An Animation.
 * @param frameRate {Number} The ideal number of frame changes per second for this animation.
 * @constructor
 */
var Animation = function (frameRate) {
    this.frameDeltaSum = 0;
    this.targetFrameDelta = 1000 / (frameRate || 20);
    this.frame = 0;
    this.frames = [];
};

/**
 * Manually add a draw function for a single frame.
 * @param draw {Function} A draw function.
 */
Animation.prototype.addFrame = function (draw) {
    if ('function' !== typeof(draw)) {
        this.frames.push(draw);
    }
};

/**
 * Add an image to an animation.
 * @param image {String} The image key from the the ResourceLoader.
 * @param width (optional) {Number} The width of each cell in a multi-cell image.
 * @param height (optional) {Number} The height of each cell in a multi-cell image.
 * @param rows (optional) {Number} The number of rows in a multi-cell image.
 * @param columns (optional) {Number} The number of columns in a multi-cell image.
 * @param x {Number} (optional) The x offset of the first cell in a multi-cell image.
 * @param y {Number} (optional) The x offset of the first cell in a multi-cell image.
 */
Animation.prototype.addFrames = function (image, width, height, rows, columns, x, y) {
    if (!image) {
        throw new Error('Animation.addFrames requires an image argument.');
    }

    width = width || image.naturalWidth || 0;
    height = height || image.naturalHeight || 0;
    rows = rows || 1;
    columns = columns || 1;
    x = x || 0;
    y = y || 0;

    function getDrawFn(image, x, y, width, height) {
        return function (context) {
            if (this.ready) {
                context.drawImage(image, x, y, width, height, 0, 0);
            }
        }
    }

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < columns; col++) {
            var fn = getDrawFn(image, (col * width) + x, (row * height) + y, width, height);
            this.addFrame(fn);
        }
    }
};

Animation.prototype.update = function (game) {
    if (this.frameDeltaSum < this.targetFrameDelta) {
        this.frameDeltaSum += game.frameDelta;
        return;
    }

    this.frameDeltaSum = 0;

    if (this.frame === this.frames.length - 1) {
        this.frame = -1;
    }

    this.frame += 1;
};

Animation.prototype.draw = function () {
    this.frames[this.frame].apply(this, arguments);
};

module.exports = Animation;