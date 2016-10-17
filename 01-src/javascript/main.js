define([
    'domReady',
    'modules/module1',
    'modules/svg4everybody'
], function(domReady,
    module1,
    svg4everybody) {
    'use strict';

    require(['domReady!'], function() {

        module1.init();
        svg4everybody.init();

    });
});
