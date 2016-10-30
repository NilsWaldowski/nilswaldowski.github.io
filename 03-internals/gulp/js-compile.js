module.exports = function(gulp, plugins, options) {
    'use strict';

    /** Rename */
    var renameConf = options.config.rename;

    return function(done) {

        gulp.src(options.dirs.src.js + '/**/*.js')

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.js))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js)
            ))

            /**
             * Rename for Production
             * todo:
             *      no rename for the moment --> we can't handle both file names
             *      (with and without .min effectively with main.js)
             */
            //.pipe(plugins.gulpif(
            //    options.env === 'production',
            //    plugins.rename(renameConf)
            //))

            /** Minify JS */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.uglify()
            ))

            /** Write minified files */
            .pipe(plugins.gulpif(
                options.env === 'production',
                gulp.dest(options.dirs.dist.js)
            ))

            /** Write minified files in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js)
            ));

        done();

    };
};
