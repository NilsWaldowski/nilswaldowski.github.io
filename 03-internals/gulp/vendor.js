module.exports = function(gulp, plugins, options) {
    'use strict';

    return function(done) {

        gulp.src(options.dirs.src.vendor + '/**/*.css' && options.dirs.src.vendor + '/**/*.js')

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.vendor))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.vendor)
            ));

        done();
    };
};
