module.exports = function(gulp, plugins, options) {
    'use strict';

    return function(done) {

        gulp.src([
            options.dirs.src.scss + '/**/*.scss'])

            /** Lint SCSS */
            .pipe(plugins.sasslint().on('error', plugins.util.log))
            .pipe(plugins.sasslint.format())
            .pipe(plugins.sasslint.failOnError())

            /** Show notification when errors occur while linting */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'SCSS: SASSLint error!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Fail to build production ready files for deployment */
            .pipe(plugins.gulpif(
                options.deploy === true,
                plugins.sasslint.failOnError()
            ))

            /** Show notification when errors occur while linting */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'SCSS: SASSLint error!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Fail to build production ready files for testing purpose in PL */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.sasslint.failOnError()
            ))

            /** Show notification when errors occur while linting */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'SCSS: SASSLint error!',
                    message: 'Please take a look at the console!'
                });
            });

        done();

    };
};
