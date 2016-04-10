module.exports = function(gulp, plugins, options) {
    return function() {
        gulp.src(options.dirs.src.icons + '/**/*.svg')

            .pipe(plugins.svg2png())

            .pipe(gulp.dest(options.dirs.dest.icons));
    };
};
