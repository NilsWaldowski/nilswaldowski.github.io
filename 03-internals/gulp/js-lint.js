module.exports = function(gulp, plugins, options) {
    'use strict';

    return function(done) {

        gulp.src(options.dirs.src.js + '/**/*.js')

            /** ESLINT */
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failAfterError())

            /** Show notification when errors occur while linting */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'JS: ESLint error in Javascript!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Fail to build production ready files for deployment */
            .pipe(plugins.gulpif(
                options.deploy === true,
                plugins.eslint.failAfterError()
            ))

            /** Show notification when errors occur while linting */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'JS: ESLint error in Javascript!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Fail to build production ready files for testing in PL */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.eslint.failAfterError()
            ))

            /** Show notification when errors occur while linting */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'JS: ESLint error in Javascript!',
                    message: 'Please take a look at the console!'
                });
            });

        done();

    };
};
