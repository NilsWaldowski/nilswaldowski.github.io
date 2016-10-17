module.exports = function(gulp, plugins, options) {
    'use strict';

    var svgSpriteConf,
        imageminConf;

    svgSpriteConf = options.config.svgSprite;

    imageminConf = options.config.imagemin;

    return function(done) {

        gulp.src(options.dirs.src.icons + '/**/*.svg')

            /** Optimize SVGs */
            .pipe(plugins.imagemin(imageminConf))

            /** create sprite file */
            .pipe(plugins.svgSprite(svgSpriteConf))

            .on('error', function() {
                plugins.notifier.notify({
                    title: 'SVG Sprite error!',
                    message: 'Please take a look at the console!'
                });
            })

            /** Write */
            .pipe(gulp.dest(options.dirs.dist.icons + '/sprite'))

            /** Write in deploy path */
            .pipe(plugins.gulpif(
                options.deploy === true,
                gulp.dest(options.dirs.dist.deploy.icons + '/sprite')
            ));

        done();
    };
};
