define([
    'domReady',
    'modules/module1'
], function(domReady, module1) {
    'use strict';

    require(['domReady!'], function() {

        module1.init();

    });
});
