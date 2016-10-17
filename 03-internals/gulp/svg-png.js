module.exports = function(gulp, plugins, options) {
    'use strict';

    return function(done) {

        gulp.src(options.dirs.src.icons + '/**/*.svg')

            /** Check for identical files and skip those */
            .pipe(plugins.gulpif(
                options.deploy === undefined,
                plugins.changed(options.dirs.dist.icons)
            ))

            .pipe(plugins.svg2png())

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
