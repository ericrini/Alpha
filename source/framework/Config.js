window.Alpha = window.Alpha || {};

(function (Alpha) {
    'use strict';

    Alpha.Config = function () {
        this.properties = {};
        this.element = null;
        this.waitingForRelease = false;
    };

    Alpha.Config.prototype.define = function (name, type, value, options) {
        this.properties[name] = {
            name: name,
            type: type,
            options: options,
            value: value
        }
    };

    Alpha.Config.prototype.get = function (name) {
        return this.properties[name].value;
    };

    Alpha.Config.prototype.initialize = function () {

    };

    Alpha.Config.prototype.update = function (game) {
        if (game.keyboard['`'] && !this.waitingForRelease) {
            this.waitingForRelease = true;
        }

        if (!game.keyboard['`'] && this.waitingForRelease) {
            this.waitingForRelease = false;

            if (this.element === null) {
                console.log('show configuration');
                this.element = this.getElement();
                document.body.appendChild(this.element);
            }
            else {
                console.log('hide configuration');
                document.body.removeChild(this.element);
                this.element = null;
            }
        }
    };

    Alpha.Config.prototype.getElement = function () {
        var container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = 0;
        container.style.left = 0;
        container.style.backgroundColor = 'gray';
        container.style.padding = '20px';
        container.style.opacity = '0.4';

        for (var name in this.properties) {
            var property = this.properties[name];
            var element = createField(property);
            container.appendChild(element);
        }

        return container;
    };

    function createField(property) {
        var label = document.createElement('label');
        label.style.display = 'block';

        var text = document.createElement('span');
        text.style.verticalAlign = 'middle';
        text.style.marginRight = '10px';
        text.innerText = property.name;
        label.appendChild(text);

        var input;

        if ('range' === property.type) {
            input = createRange(property);
        }

        label.appendChild(input);
        return label;
    }

    function createRange(property) {
        var input = document.createElement('input');
        input.style.verticalAlign = 'middle';
        input.setAttribute('type', 'range');
        input.setAttribute('value', property.value);
        input.setAttribute('min', property.options.min);
        input.setAttribute('max', property.options.max);
        input.addEventListener('change', function (event) {
            console.log('Changed "' + property.name + '" from "' + property.value + '" to "' + event.target.value + '".');
            property.value = event.target.value;
        });
        return input;
    }

}(Alpha));