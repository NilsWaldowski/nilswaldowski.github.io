module.exports = function(gulp, plugins, options) {
    'use strict';

    var imageminConf = options.config.imagemin;

    return function(done) {

        /** Images for Dev */
        gulp.src(options.dirs.src.images + '/**/*')

            /** Check for identical files and skip those */
            .pipe(plugins.gulpif(
                options.deploy === undefined,
                plugins.changed(options.dirs.dist.images)
            ))

            /** Optimize Images */
            .pipe(plugins.imagemin(imageminConf))

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.images))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.images)
            ));

        /** Images for Editorials/CMS */
        gulp.src(options.dirs.src.imagesEditorial + '/**/*')

            /** Check for identical files and skip those */
            .pipe(plugins.gulpif(
                options.deploy === undefined,
                plugins.changed(options.dirs.dist.imagesEditorial)
            ))

            /** Optimize Images */
            .pipe(plugins.imagemin(imageminConf))

            //.pipe(plugins.count('<%= files %> assets read'))

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.imagesEditorial))

            //.pipe(plugins.count('<%= files %> assets copied'))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.imagesEditorial)
            ));

            //.pipe(plugins.count('<%= files %> assets copied'));

        done();
    };
};
