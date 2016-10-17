module.exports = function(gulp, plugins, options) {
    'use strict';

    return function(done) {
        done();

        gulp.src(options.dirs.src.js + '/**/main.js')

            .pipe(plugins.requirejsOptimize(function() {
                return {
                    name: '../Vendor/almond/almond',
                    optimize: 'uglify2',
                    insertRequire: ['main'],
                    mainConfigFile: options.dirs.dist.js + '/_config.js'
                };
            }))

            /** Show notification when errors occur while optimizing requirejs */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'RequireJS: Building error!',
                    message: 'Please take a look at the console!'
                });
            })

            .pipe(gulp.dest(options.dirs.dist.js + '/build'))

            /** Write minified files in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.js + '/build')
            ));
    };
};