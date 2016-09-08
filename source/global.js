/**
 * This entry point allows the framework to be accessed with plain old javascript through a single global.
 */
(function () {
    'use strict';

    window.Alpha = {};
    window.Alpha.Game = require('./framework/Game');
    window.Alpha.Actor = require('./framework/Actor');
}());

