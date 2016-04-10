module.exports = function(gulp, plugins, options, envCondition) {
    return function() {

        /**
         * build js (main.js, config.js & /modules directory)
         */
        gulp.src([
            options.dirs.src.js + '/**/*.js',
            '!'+options.dirs.src.js + '/Build/*.js'
            ])

            // use jshint
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))

            // use jslint
            .pipe(plugins.jscs())
            .pipe(plugins.jscs.reporter())

            // fail if error found
            .pipe(plugins.gulpif(envCondition,
                plugins.jscs.reporter('fail')
                )
            )

            .pipe(gulp.dest(options.dirs.dest.js));

        /**
         * write /Build directory (not included in hint/lint process)
         */
        gulp.src([options.dirs.src.js + '/Build/*.js'])
            .pipe(gulp.dest(options.dirs.dest.js + '/Build'));

        /**
         * build enhancement js
         */
        gulp.src(options.dirs.src.js_enhance + '/**/*.js')
            .pipe(plugins.gulpif(envCondition,
                plugins.rename({suffix: '.min'})
                )
            )
            .pipe(plugins.gulpif(envCondition,
                plugins.uglify()
                )
            )
            .pipe(gulp.dest(options.dirs.dest.js_enhance));

        /**
         * venodr js (generated from bower)
         */
        gulp.src([options.dirs.src.js_vendor + '/**/*.js'])
            .pipe(gulp.dest(options.dirs.dest.js_vendor));

        /**
         * additional JS (which needs to be integrated inline through CMS)
         * todo: how to handle additional JS with a requireJS setup?xw
         */

    };
};
