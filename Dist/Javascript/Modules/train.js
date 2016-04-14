define([
    'jquery',
], function($) {
    'use strict';

    var obj = {

        /**
         * Initialize
         */
        init: function() {

            var topValue = 0,
                allHeighValue = 0,
                subheaderValue = 0,
                menuValue = 0,
                menuAllHeight = 0,
                subheaderHeroHeight = 0,
                $meta = $('.c-menu-meta'),
                $header = $('header'),
                $menu = $('.c-menu-main'),
                $menuListItems = $('.c-menu-main__lvl1 > li'),
                $menuSecondLevel = $('.c-menu-main__lvl2'),
                $subheader = $('.c-subheader'),
                $subheaderHero = $('.c-subheader--hero'),
                $requestQuick = $('.c-request--quick'),
                $menuHasTwoLevels = $('.js-second-is-visible'),
                stickyClass = 'js-is-sticky';

            // get scroll value from top
            function getCurrentScroll() {
                return window.pageYOffset || document.documentElement.scrollTop;
            }

            // get height of header
            topValue = $meta.outerHeight();

            // height auf 1st nav
            menuValue = $menu.outerHeight();

            // height of 2nd nav
            if ($menuHasTwoLevels.length) {
                subheaderValue = $menuSecondLevel.outerHeight();
            }

            // height of full menu
            menuAllHeight = menuValue + subheaderValue;

            // hero height
            subheaderHeroHeight = $subheaderHero.outerHeight();

            // get height of header and 2nd nav
            allHeighValue = menuAllHeight + subheaderHeroHeight;

            console.log('meta ' + topValue);
            console.log('menu ' + menuValue);
            console.log('subheader ' + subheaderValue);


            // set values if second level
            if ($menuHasTwoLevels.length) {
                $subheader.css('margin-top', subheaderValue);
                $subheaderHero.css('margin-top', subheaderValue);
            }

            var initEvents = function() {
                var scroll = getCurrentScroll();

                /**
                 * Scroll to fixed menu
                 */
                if (scroll >= topValue) {
                    $menu.addClass(stickyClass);

                    // subheader
                    $subheader.css('margin-top', 'auto');
                    $subheader.css('top', menuAllHeight);
                    $subheader.addClass(stickyClass);

                    // subheader hero
                    $subheaderHero.css('margin-top', menuValue);

                } else {
                    $menu.removeClass(stickyClass);

                    // subheader
                    $subheader.css('margin-top', subheaderValue);
                    $subheader.css('top', 'auto');
                    $subheader.removeClass(stickyClass);

                    // subheader hero
                    $subheaderHero.css('margin-top', 'auto');
                }

                /**
                 * Scroll to request form
                 */

                console.log('scrollAmount ' + scroll);
                console.log('allHeighValue ' + allHeighValue);
                console.log('hero ' + subheaderHeroHeight);

                if (scroll >= allHeighValue) {
                    $requestQuick.addClass('js-is-visible');
                    $subheader.addClass('js-is-colored');

                    console.log('allheightVallue ' + allHeighValue);

                } else {
                    $requestQuick.removeClass('js-is-visible');
                    $subheader.removeClass('js-is-colored');
                }

            };
            initEvents();

            $('.c-menu-main__lvl2__inner__scroller__icon').on('click', function() {
                $('.c-menu-main__list-lvl2').animate({ scrollLeft: '+=200' }, "fast");
            });

            // add/remove sticky-class
            $(window).scroll(function() {
                initEvents();
            });
        }
    };

    return obj;
});
