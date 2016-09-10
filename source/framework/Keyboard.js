'use strict';

var KEY_MAP = {
    16: 'shift',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    192: '`'
};

var Keyboard = function (game) {
    var _this = this;

    for (var keyCode in KEY_MAP) {
        _this[KEY_MAP[keyCode]] = false;
    }

    document.addEventListener('keydown', function (event) {
        var key = KEY_MAP[event.keyCode];

        if (key) {
            _this[key] = true;
            console.log('keydown ' + key);
        }
    });

    document.addEventListener('keyup', function () {
        var key = KEY_MAP[event.keyCode];

        if (key) {
            _this[key] = false;
            console.log('keyup ' + key);
        }
    });
};

Keyboard.prototype.update = function () {};

module.exports = Keyboard;