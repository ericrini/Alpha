'use strict';

var ResourceLoader = function () {
    this.loading = 0;
    this.resources = {};
};

ResourceLoader.prototype.addUrl = function (name, url) {
    if (!name) {
        throw new Error('ResourceLoader.addUrl requires a name argument.');
    }

    if (!url) {
        throw new Error('ResourceLoader.addUrl requires a url argument.');
    }

    this.resources[name] = {
        url: url,
        data: null
    };
};

ResourceLoader.prototype.load = function (callback) {
    var _this = this;
    this.loading = 0;

    for (var key in this.resources) {
        if (this.resources.hasOwnProperty(key)) {
            this.resources[key].data = document.createElement('img');
            this.resources[key].data.addEventListener('load', function () {
                _this.loading -= 1;

                if (_this.loading === 0 && typeof(callback) === 'function') {
                    callback();
                }
            });
            this.resources[key].data.source = this.resources[i];
            this.loading += 1;
        }
    }
};

ResourceLoader.prototype.getResource = function (name) {
    return this.resources[name] ? this.resources[name].data : null;
};