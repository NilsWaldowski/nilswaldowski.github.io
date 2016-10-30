define([

], function() {
    'use strict';

    var obj,
        _private;

    obj = {

        /**
         * Initialize
         */
        init: function() {
            var el = document.querySelector('html');

            if (!_private.hasClass(el, 'is-loading')) {
                _private.addClass(el, 'is-loading')
            }

            setTimeout(function() {
                if (!_private.hasClass(el, 'has-loaded')) {
                    _private.addClass(el, 'has-loaded')
                }
            }, 300);

            setTimeout(function() {
                if (!_private.hasClass(el, 'has-loading-completed')) {
                    _private.addClass(el, 'has-loading-completed')
                }
            }, 1450);
        }
    };

    _private = {

        hasClass: function(el, className) {
            return el.classList ? el.classList.contains(className) :
                new RegExp('\\b'+ className+'\\b').test(el.className);
        },

        addClass: function(el, className) {
            if (el.classList) {
                el.classList.add(className)
            } else if (!_private.hasClass(el, className)) {
                el.className += ' ' + className
            }
        },

        removeClass: function(el, className) {
            if (el.classList) {
                el.classList.remove(className)
            } else {
                el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '')
            }
        }

    };

    return obj;
});
