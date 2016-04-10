define([
    'jquery',
    'magnific-popup.core',
    'magnific-popup.inline',
    'magnific-popup.gallery',
    'magnific-popup.image'
], function($) {
    'use strict';

    var obj = {

        /**
         * Initialize
         */
        init: function() {

            var $JsLightboxImage = $('.js-b-content-textmedia--lightbox');

            $JsLightboxImage.magnificPopup({
                type: 'image',
                image: {
                    titleSrc: function(item) {
                        return item.el.attr('data-description');
                    }
                }
            });
        }
    };

    return obj;
});
