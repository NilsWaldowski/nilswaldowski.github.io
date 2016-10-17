module.exports = function(gulp, plugins, options) {
    'use strict';

    return function() {

        var stream = gulp.src([options.dirs.src.js_core + '/**/*.js'])

            .pipe(plugins.modernizr({

                // Avoid unnecessary builds
                'cache' : true,

                // Path to save out the built file
                'dest' : options.dirs.src.js_core + '/modules/modernizr.custom.js',

                'options' : [
                    'setClasses',
                    'addTest',
                    'testProp',
                    'fnBind'
                ],
                tests: [
                    'forms_placeholder',
                    'history',
                    'inlinesvg',
                    'svg',
                    'touchevents',
                    'csstransforms',
                    'csstransforms3d',
                    'cssvwunit',
                    'video'
                ],
                uglify: true
            }));

        return stream;
    };
};
