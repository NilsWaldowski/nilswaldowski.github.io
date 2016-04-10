module.exports = function(gulp, plugins, options) {
    return function() {
        gulp.src(options.dirs.src.icons + '/**/*.svg')

            .pipe(plugins.size({
                showFiles: true
            }))

            .pipe(plugins.svgmin())

            .pipe(plugins.size({
                showFiles: true
            }))

            .pipe(gulp.dest(options.dirs.dest.icons));
    };
};
