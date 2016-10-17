module.exports = function(gulp, plugins, options) {
    'use strict';

    /** Rename */
    var renameConf = options.config.rename;

    return function(done) {

        /**
         * build core js
         */
        gulp.src(options.dirs.src.js_core + '/core.js')

            /** Include required modules/node_modules */
            .pipe(plugins.include({
                hardFail: true
            })).on('error', plugins.util.log)

            /** Show notification when errors occur while including */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'JS: Include Error in javascropt-core!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.js_core))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js_core)
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
            .pipe(gulp.dest(options.dirs.dist.js_core))

            /** Write minified files in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js_core)
            ));

        done();
    };
};
