var dirs = require('./config/dirs.json');

module.exports = function(gulp, plugins, options) {
    return function() {
        gulp.src(options.dirs.src.js + '/**/*.js')
            .pipe(plugins.requirejsOptimize(function(file) {

                if (options.env === 'production') {
                    return {
                        name: '../Vendor/almond/almond',
                        insertRequire: ['main'],
                        mainConfigFile: options.dirs.src.js + '/config.js',
                        findNestedDependencies: true,
                        useStrict: true,
                        baseUrl: options.dirs.src.js,
                        out: "javascript.min.js"
                    };
                } else {
                    return {
                        name: '../Vendor/almond/almond',
                        insertRequire: ['main'],
                        mainConfigFile: options.dirs.src.js + '/config.js',
                        optimize: 'none',
                        findNestedDependencies: true,
                        useStrict: true,
                        baseUrl: options.dirs.src.js,
                        out: "javascript.js"
                    };
                }

            }))
            .pipe(gulp.dest(options.dirs.dest.js_build));
    };
};