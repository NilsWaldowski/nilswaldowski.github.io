define([
    'svg4everybody'
], function() {
    'use strict';

    var obj = {

        init: function() {
            svg4everybody({
                nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
                polyfill: true // polyfill <use> elements for External Content
            });
        }
    };

    return obj;
});
