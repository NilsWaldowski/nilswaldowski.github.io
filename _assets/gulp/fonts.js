module.exports = function(gulp, plugins, options) {
    return function() {
        gulp.src(options.dirs.src.fonts + '/**/*')

            .pipe(gulp.dest(options.dirs.dest.fonts));
    };
};
