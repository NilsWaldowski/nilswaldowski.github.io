var dirs = require('./config/dirs.json');

module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('', {read: false})

            .pipe(plugins.shell([
                'php core/builder.php -g'
            ]))
    };
};