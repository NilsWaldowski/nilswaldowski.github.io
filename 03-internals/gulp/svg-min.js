module.exports = function(gulp, plugins, options) {
    'use strict';

    var imageminConf,
        sizeConf;

    imageminConf = options.config.imagemin;

    sizeConf = options.config.size;

    return function(done) {

        gulp.src(options.dirs.src.icons + '/**/*.svg')

            /** Check for identical files and skip those */
            .pipe(plugins.gulpif(
                options.deploy === undefined,
                plugins.changed(options.dirs.dist.icons)
            ))

            /** File size before optimization */
            .pipe(plugins.size(sizeConf))

            /** Optimize SVGs */
            .pipe(plugins.imagemin(imageminConf))

            .on('error', function() {
                plugins.notifier.notify({
                    title: 'SVG Image min error!',
                    message: 'Please take a look at the console!'
                });
            })

            /** File size after optimization */
            .pipe(plugins.size(sizeConf))

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.icons))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.icons)
            ));

        done();
    };
};
