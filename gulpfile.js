/** Require gulp/node plugins for this project */
var notifier = require('node-notifier'),
    gulp = require('gulp'),
    minimist = require('minimist'),
    del = require('del'),
    fs = require('fs'),
    plugins = require('gulp-load-plugins')({
        // load every plugin, not just "gulp-" plugins
        pattern: [
            '*'
        ],
        rename: {
            'gulp-if': 'gulpif',
            'gulp-sass-lint': 'sasslint',
            'postcss-image-inliner': 'imageinliner',
            'node-notifier': 'notifier'
        }
    }),
    knownOptions;


/** Options */
knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'development'}
}, options = minimist(process.argv.slice(2), knownOptions);


/**
 * Load configuration and directory files
 * -> Change dirs file in order to match project
 */
options.dirs = JSON.parse(fs.readFileSync('./03-internals/gulp/config/dirs.json'));
options.config = JSON.parse(fs.readFileSync('./03-internals/gulp/config/config.json'));


/** require tasks from gulp directory */
function getTask(task) {
    'use strict';

    return require('./03-internals/gulp/' + task)(gulp, plugins, options);
}


/** Clean */
gulp.task('clean', function() {
    'use strict';
    return del([options.dirs.dist.base + '/**/*'], {force: true});
});

gulp.task('clean-deploy', function() {
    'use strict';
    return del([options.dirs.dist.deploy.base + '/**/*'], {force: true});
});


/** CSS */
gulp.task('css-project', getTask('css-project'));
gulp.task('css-lint', getTask('css-lint'));
gulp.task('css', gulp.series('css-lint', 'css-project'));

gulp.task('css-framework-compile', getTask('css-framework'));
gulp.task('css-framework', gulp.series('css-lint', 'css-framework-compile'));


/** Misc */
gulp.task('misc', getTask('misc'));


/** Misc */
gulp.task('vendor', getTask('vendor'));


/** Images */
gulp.task('images', getTask('images'));


/** SVG Icons */
gulp.task('svg-min', getTask('svg-min'));
gulp.task('svg-png', getTask('svg-png'));
gulp.task('svg-sprite', getTask('svg-sprite'));

gulp.task('icons', gulp.series('svg-min','svg-sprite'));
// if you need PNG Fallbacks use this one and comment the above
//gulp.task('icons', gulp.series('svg-min','svg-sprite', 'svg-png'));


/** Modernizr */
gulp.task('modernizr', getTask('modernizr'));


/** JS */
gulp.task('js-compile', getTask('js-compile'));
gulp.task('js-lint', getTask('js-lint'));
gulp.task('js', gulp.series('js-lint', 'js-compile'));
gulp.task('js-core', getTask('js-core'));
gulp.task('js-inline', getTask('js-inline'));


/** RequireJS */
gulp.task('js-require', getTask('js-require'));


/** Notification */
gulp.task('notification', function(done) {
    'use strict';

    if (options.deploy === true) {
        notifier.notify({
            title: 'Deployment Task Complete My Master!',
            message: 'Have A Nice Day!'
        });

    } else {
        notifier.notify({
            title: 'Init Task Complete My Master!',
            message: 'Have A Nice Day!'
        });
    }
    done();
});


/* ==========================================================================
 WATCH
 ========================================================================== */
gulp.task('watch', function() {
    'use strict';

    gulp.watch(options.dirs.src.scss + '/**/*.scss',
        { awaitWriteFinish: {stabilityThreshold: 50} })
    .on('change', gulp.series('css'));

    gulp.watch([
        options.dirs.src.scss_framework + '/**/*.scss',
        options.dirs.src.scss + '/0-settings/**/*.scss',
        options.dirs.src.scss + '/1-tools/**/*.scss'],
        {awaitWriteFinish: {stabilityThreshold: 50}})
    .on('change', gulp.series('css-framework'));

    gulp.watch(options.dirs.src.js + '/**/*.js', {awaitWriteFinish: {stabilityThreshold: 50}})
    .on('change', gulp.series('js'));

    gulp.watch(options.dirs.src.js_core + '/**/*.js', {awaitWriteFinish: {stabilityThreshold: 50}})
    .on('change', gulp.series('js-core'));

    gulp.watch(options.dirs.src.js_inline + '/**/*.js', {awaitWriteFinish: {stabilityThreshold: 50}})
    .on('change', gulp.series('js-inline'));

    // doesn't seem to work
    //gulp.watch([
    //    options.dirs.src.images + '/**/*',
    //    options.dirs.src.imagesEditorial + '/**/*'],
    //    { awaitWriteFinish: {stabilityThreshold: 500} })
    //.on('change', gulp.series('images'));

    //gulp.watch(options.dirs.src.icons + '/**/*.svg',
    //    { awaitWriteFinish: {stabilityThreshold: 500} })
    //.on('change', gulp.series('icons'));
});


/* ==========================================================================
 INIT
 ========================================================================== */
gulp.task('init-jscore', gulp.series('modernizr', 'js-core'));
gulp.task('init-assets', gulp.series('vendor', 'js', 'js-inline', 'js-require', 'css', 'css-framework', 'misc', 'images', 'icons'));
gulp.task('init', gulp.series('init-jscore', 'init-assets', 'notification'));


/* ==========================================================================
 DEPLOY
 ========================================================================== */
gulp.task('deploy', gulp.series(function(done) {
    'use strict';
    options.env = 'production';
    options.deploy = true;
    done();
}, 'init'));


/* ==========================================================================
 WATCH DEPLOY (if you need to work directly in your local TYPO3 environment
 ========================================================================== */
gulp.task('watch-deploy', gulp.series(function(done) {
    'use strict';
    options.env = 'production';
    options.deploy = true;
    done();
}, 'watch'));


/* ==========================================================================
 DEFAULT TASK
 ========================================================================== */
gulp.task('default', gulp.series('init', 'watch'));
