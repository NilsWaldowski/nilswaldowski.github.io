module.exports = function(gulp, plugins, options) {
    'use strict';

    return function(done) {

        gulp.src(options.dirs.src.misc + '/**/*')

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.misc))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.misc)
            ));

        done();
    };
};
