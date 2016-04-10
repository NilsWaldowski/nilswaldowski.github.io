module.exports = function(gulp, plugins, options) {
    return function() {
        gulp.src('', {read: false})

            .pipe(plugins.shell([
                'php core/builder.php -p -n -w'
            ]));
    };
};
