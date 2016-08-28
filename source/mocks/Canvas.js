'use strict';

module.exports = function () {
    return {
        getContext: function () {
            return {
                fillRect: function () {},
                clearRect: function () {},
                getImageData: function () {},
                putImageData: function () {},
                createImageData: function () {},
                setTransform: function () {},
                transform: function () {},
                drawImage: function () {},
                save: function () {},
                fillText: function () {},
                restore: function () {},
                beginPath: function () {},
                moveTo: function () {},
                lineTo: function () {},
                closePath: function () {},
                stroke: function () {},
                translate: function () {},
                scale: function () {},
                rotate: function () {},
                arc: function () {},
                fill: function () {}
            };
        }
    }
};