'use strict';

var util = require('util');
var Actor = require('./Actor');

var Constants = function () {
    Actor.call(this);
    this.z = 100;
    this.properties = {};
    this.element = null;
    this.waitingForRelease = false;
};

util.inherits(Constants, Actor);

Constants.prototype.define = function (name, type, value, options, hide) {
    this.properties[name] = {
        name: name,
        type: type,
        options: options,
        value: value,
        hide: !!hide
    };

    if (this.element) {
        this.element = this.getElement();
    }
};

Constants.prototype.get = function (name) {
    return this.properties[name].value;
};

Constants.prototype.init = function () {
    var _this = this;

    document.addEventListener('DOMContentLoaded', function () {
        _this.element = _this.getElement();
        document.body.appendChild(_this.element);
    });
};

Constants.prototype.update = function (game) {
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

Constants.prototype.getElement = function () {
    var tbody = document.createElement('tbody');

    for (var name in this.properties) {
        var property = this.properties[name];
        if (!property.hide) {
            tbody.appendChild(createTableRow(property))
        }
    }

    var table = document.createElement('table');
    table.appendChild(tbody);

    var footer = document.createElement('div');
    footer.innerText = 'Press "~" to hide.';
    footer.style.margin = '20px 0 0 0';
    footer.style.textAlign = 'right';

    var container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = 0;
    container.style.left = 0;
    container.style.backgroundColor = '#CCCCCC';
    container.style.padding = '20px';
    container.style.opacity = '0.5';
    container.appendChild(table);
    container.appendChild(footer);

    return container;
};

function createTableRow(property) {
    var label = document.createElement('td');
    label.id = property.name;
    label.innerText = property.name;

    var input;

    if ('boolean' === property.type) {
        input = createBoolean(property);
    }
    else if ('range' === property.type) {
        input = createRange(property);
    }

    var td = document.createElement('td');
    td.appendChild(input);

    var tr = document.createElement('tr');
    tr.appendChild(label);
    tr.appendChild(td);

    return tr;
}

function createBoolean(property) {
    var input = document.createElement('input');
    input.setAttribute('for', property.name);
    input.style.verticalAlign = 'middle';
    input.setAttribute('type', 'checkbox');
    if (property.value) {
        input.setAttribute('checked', 'checked');
    }
    input.addEventListener('change', function (event) {
        console.log('Changed "' + property.name + '" from "' + property.value + '" to "' + event.target.value + '".');
        property.value = Boolean(event.target.checked);
    });
    return input;
}

function createRange(property) {
    var input = document.createElement('input');
    input.setAttribute('for', property.name);
    input.style.verticalAlign = 'middle';
    input.setAttribute('type', 'range');
    input.setAttribute('value', property.value);
    input.setAttribute('min', property.options.min);
    input.setAttribute('max', property.options.max);
    input.addEventListener('input', function (event) {
        console.log('Changed "' + property.name + '" from "' + property.value + '" to "' + event.target.value + '".');
        property.value = Number(event.target.value);
    });
    return input;
}

module.exports = Constants;