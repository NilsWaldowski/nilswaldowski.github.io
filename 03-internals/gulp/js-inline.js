module.exports = function(gulp, plugins, options) {
    'use strict';

    /** Rename */
    var renameConf = options.config.rename;

    return function(done) {

        gulp.src(options.dirs.src.js_inline + '/**/*')

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.js_inline))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js_inline)
            ))

            /** Rename for Production */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.rename(renameConf)
            ))

            /** Minify JS */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.uglify()
            ))

            /** Write minified files */
            .pipe(gulp.dest(options.dirs.dist.js_inline))

            /** Write minified files in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js_inline)
            ));

        done();
    };
};
