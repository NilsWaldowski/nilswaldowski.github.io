module.exports = function(gulp, plugins, options) {
    'use strict';
    var pleaseConf,
        postCssConf,
        renameConf,
        sassConf;

    /**
     * Pleeease
     * Load defaults and dynamic data (production & development)
     */
    pleaseConf = options.config.pleeease;

    /** PostCSS */
    postCssConf = [
        plugins.imageinliner(options.config.postCss.imageinliner)
    ];

    /** Rename */
    renameConf = options.config.rename;

    /** SASS */
    sassConf = options.config.sass;

    return function(done) {

        gulp.src(options.dirs.src.scss + '/*.scss')

            /** Compile SCSS to CSS */
            .pipe(plugins.sass(sassConf))

            /** Show notification when errors occur while compiling */
            .on('error', function() {
                plugins.notifier.notify({
                    title: 'SCSS: Compiling Error!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Pleeease */
            .pipe(plugins.pleeease(pleaseConf))

            /** PostCss */
            .pipe(plugins.postcss(postCssConf))

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.css))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.css)
            ))

            /** Rename for Production */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.rename(renameConf)
            ))

            /** Minify CSS */
            .pipe(plugins.gulpif(
                options.env === 'production',
                plugins.cleanCss({
                    mediaMerging: false
                })
            ))

            /** Write minified files */
            .pipe(gulp.dest(options.dirs.dist.css))

            /** Write minified files in deployment path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.css)
            ));

        done();

    };
};
