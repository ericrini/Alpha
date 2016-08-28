window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    var LOG_LEVELS = {
        'trace': 1,
        'info': 2,
        'error': 3
    };

    Alpha.Log = function () {
        this.buffer = [];
    };

    Alpha.Log.prototype.trace = function () {
        this.buffer.push({
            message: arguments,
            level: 'trace'
        });
    };

    Alpha.Log.prototype.info = function () {
        this.buffer.push({
            message: arguments,
            level: 'info'
        });
    };

    Alpha.Log.prototype.error = function () {
        this.buffer.push({
            message: arguments,
            level: 'error'
        });
    };

    Alpha.Console = function () {
        this.components = [];
    };

    Alpha.Console.prototype.defineComponent = function (name, level) {
        level = level || 'trace';
        var log = new Alpha.Log();
        this.components.push({
            log: log,
            level: level
        });
        return log;
    };

    Alpha.Console.prototype.setLogLevel = function (name, level) {
        if (this.components[name]) {
            this.components[name].level = level;
        }
    };

    Alpha.Console.prototype.update = function () {
        for (var i = 0; i < this.components.length; i++) {
            for (var j = 0; j < this.components[i].buffer.length; j++) {
                if (this.components[i].buffer[j].level > this.components[i].level) {
                    console[this.components[i].buffer[j].level](format(this.components[i].buffer[j].message));
                }
            }
            this.components[i].log.buffer = [];
        }
    };

    Alpha.Console.prototype.format = function () {
        var message = arguments[0];
        var args = new Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            var index = message.indexOf('?');
            if (index > -1) {
                message.splice(index, 1, args[i]);
            }
        }

        return message;
    };

}(Alpha));