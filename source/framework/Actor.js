'use strict';

var util = require('util');
var Matrix = require('./geometry/Matrix');
var Point = require('./geometry/Point');
var Polygon = require('./geometry/Polygon');
var Animation = require('./animation/Animation');

var Actor = function () {

    /**
     * The private width of this actor in its own coordinate system.
     * @type {number}
     */
    this.width = 1;

    /**
     * The private height of this actor in its own coordinate system.
     * @type {number}
     */
    this.height = 1;

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
     * The scale of the actor where a scale of 1.0 will fill the entire stage.
     * @type {Number}
     */
    this.scale = 0.10;

    /**
     * The clockwise rotation of the actor on the Stage  in degrees.
     * @type {Number}
     */
    this.rotate = 0;

    /**
     * If true, the bounding box will be visible.
     * @type {Boolean}
     */
    this.drawBoundingBox = false;

    this.animations = {};
    this.animation = null;
};

/**
 * Adds an animation to this actor.
 * @param name {string} The name of the animation.
 * @param animation {Animation} The Animation object to add.
 */
Actor.prototype.addAnimation = function (name, animation) {
    if (!name) {
        throw Error('Actor.addAnimation requires a name argument.');
    }

    if(!animation) {
        throw Error('Actor.addAnimation requires an animation argument.');
    }

    if(animation.constructor !== Animation) {
       throw Error('The animation argument passed to Actor.addAnimation should be an Animation.');
    }

    this.animations[name] = animation;
};

/**
 * Sets the active animation.
 * @param name {string} The name of the animation.
 * @param reset {boolean} If true, the animation will be forced, wven if it already active. This will cause it to start over.
 */
Actor.prototype.setActiveAnimation = function (name, reset) {
    if (!this.animations[name]) {
        throw Error('There is no animation called "' + name + '".');
    }

    if (reset || this.animation !== this.animations[name]) {
        this.animation = this.animations[name];
        this.animation.reset();
    }
};

/**
 * Update the Animation.
 * @param game {object} A Game instance.
 */
Actor.prototype.update = function (game) {
    if (this.animation) {
        this.animation.update(game);
    }
};

/**
 * Draw the current animation frame.
 * @param context {CanvasRenderingContext2D} A CanvasRenderingContext2D
 */
Actor.prototype.draw = function (context) {
    if (this.animation) {
        this.animation.draw(context);
    }
};

/**
 * The stage Matrix can be used to place this actor into the Stage coordinate system.
 * @param canvas {HTMLCanvasElement} The stages HTMLCanvasElement.
 * @returns {Matrix} A Matrix transformation.
 */
Actor.prototype.getStageMatrix = function (canvas) {
    var x = this.x * canvas.width;
    var y = this.y * canvas.height;
    var width = this.scale * canvas.width;
    var height = this.scale * canvas.height;

    return new Matrix()
        .translate(x, y)
        .clockwise(this.rotate, width / 2, height / 2)
        .scale(width / this.width , height / this.height);
};

/**
 * Retrieve the bounding box for this actor in the stage coordinate system.
 * @param canvas {HTMLCanvasElement} The stages HTMLCanvasElement.
 * @returns {Polygon} A Polygon for the bounding box.
 */
Actor.prototype.getStageBounds = function (canvas) {
    var matrix = this.getStageMatrix(canvas);

    return new Polygon([
        matrix.transform(new Point(0, 0)),
        matrix.transform(new Point(0, this.height)),
        matrix.transform(new Point(this.width, this.height)),
        matrix.transform(new Point(this.width, 0))
    ]);
};

module.exports = Actor;