'use strict';

var ResourceLoader = function () {
    this.loading = 0;
    this.resources = {};
    this.ready = true;
};

ResourceLoader.prototype.add = function (name, url) {
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

    console.log('Added Resource ' + name + ' from ' + url + '.');

    this.ready = false;
};

ResourceLoader.prototype.load = function (callback) {
    var _this = this;

    if (this.ready) {
        if (typeof(callback) === 'function') {
            callback();
        }
        return;
    }

    console.log('Loading Resources...');

    this.loading = 0;

    function handleStatusChange() {
        _this.loading -= 1;

        if (_this.loading === 0) {
            _this.ready = true;

            if (typeof(callback) === 'function') {
                callback();
            }
        }
    }

    for (var key in this.resources) {
        if (this.resources.hasOwnProperty(key)) {
            var image = document.createElement('img');

            image.addEventListener('load', function (event) {
                console.log('Loaded Resource: ' + event.target.currentSrc);
                handleStatusChange();
            });

            image.addEventListener('error', function () {
                console.log('Failed to Load Resource: ' + event.target.currentSrc);
                handleStatusChange();
            });

            image.src = this.resources[key].url;
            this.resources[key].data = image;
            this.loading += 1;
        }
    }
};

ResourceLoader.prototype.get = function (name) {
    return this.resources[name] ? this.resources[name].data : null;
};

module.exports = ResourceLoader;