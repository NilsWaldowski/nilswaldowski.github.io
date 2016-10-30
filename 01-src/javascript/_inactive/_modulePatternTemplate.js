define([
    'jquery'
], function() {
    'use strict';

    var obj,
        _private;

    obj = {

        init: function() {
            this._cache();
            this._bind();

            _private.doSomething();
        },

        _cache: function() {

            // jQuery
            this.$container = $('body');

            // vanilla JS
            this.container = document.body;
        },

        _bind: function() {

            // jQuery
            this.$container.on('click', _private.doSomethingElse);

            // vanilla JS
            this.container.addEventListener('click', _private.doSomethingElse, false);
        }
    };

    _private = {

        _config: {},

        doSomething: function() {
            console.log('modulePatternTemplate loaded!');
        },

        doSomethingElse: function() {
            console.log('document.body was clicked!');
        }
    };

    return obj;
});
