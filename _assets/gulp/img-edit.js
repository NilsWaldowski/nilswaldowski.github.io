module.exports = function(gulp, plugins, options, envCondition) {
    return function() {
        gulp.src(options.dirs.src.img_edit + '/**/*')

            // optimize only on production
            .pipe(plugins.gulpif(envCondition,
                plugins.imagemin({
                    optimizationLevel: 3,
                    interlaced: true,
                    progressive: true,
                    use: [plugins.pngquant({
                        quality: '80-85',
                        speed: 6
                    })]
                })
                )
            )

            .pipe(gulp.dest(options.dirs.dest.images_edit));
    };
};
