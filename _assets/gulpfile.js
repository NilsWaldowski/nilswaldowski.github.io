/**
 * Require gulp/node plugins for this project
 */
var notifier = require('node-notifier'),
    gulp = require('gulp'),
    minimist = require('minimist'),
    del = require('del'),
    fs = require('fs'),
    plugins = require('gulp-load-plugins')({
        pattern: '*', // load every plugin, not just "gulp-" plugins
        rename: {
            'gulp-merge-media-queries': 'cmq',
            'gulp-minify-css': 'minifycss',
            'gulp-if': 'gulpif',
            'imagemin-pngquant': 'pngquant',
            'gulp-scss-lint': 'scsslint',
            'postcss-image-inliner': 'imageinliner'
        }
    }),
    knownOptions = {
        string: 'env',
        default: {env: process.env.NODE_ENV || 'development'}
    },
    options = minimist(process.argv.slice(2), knownOptions);

/**
 * Load Json files with directories
 */
options.dirs = JSON.parse(fs.readFileSync('./gulp/config/dirs.json'));
// set dest to environment (production or development) to get the specific path settings
options.dirs.dest = options.dirs[options.env].dest;

var envCondition = function(file) {
    if (options.env === 'production') {
        return true;
    }
};

/**
 * Clean up Task: delete everything in the dest folders
 */
gulp.task('clean-development', function(cb) {
    return del([
        // here we use a globbing pattern to match everything inside the `mobile` folder
        options.dirs.del.development + '/**/*'
    ], {force: true});
});

gulp.task('clean-production', function(cb) {
    return del([
        // here we use a globbing pattern to match everything inside the `mobile` folder
        options.dirs.del.production + '/**/*'
    ], {force: true});
});

/**
 * require tasks from gulp directory
 * http://macr.ae/article/splitting-gulpfile-multiple-files.html
 */
function getTask(task) {
    return require('./gulp/' + task)(gulp, plugins, options, envCondition);
}

/** Browser Sync */
gulp.task('browser-sync', getTask('browser-sync'));

/** Patternlab */
gulp.task('pl-watch', getTask('pl-watch'));
gulp.task('pl-generate', getTask('pl-generate'));

/** CSS */
gulp.task('css', getTask('css'));

/** JS */
gulp.task('js', getTask('js'));

/** RequireJS */
gulp.task('requirejs', getTask('requirejs'));

/** Modernizr */
gulp.task('modernizr', getTask('modernizr'));

/** Images */
gulp.task('img-dev', getTask('img-dev'));
gulp.task('img-edit', getTask('img-edit'));

/** SVG Icons */
gulp.task('svg-min', getTask('svg-min'));
gulp.task('svg-png', getTask('svg-png'));
gulp.task('svg-sprite', getTask('svg-sprite'));
gulp.task('icons', ['svg-min', 'svg-png', 'svg-sprite']);

/** Fonts */
gulp.task('fonts', getTask('fonts'));

/**
 * All Images combined
 */
gulp.task('images', function() {
    gulp.start(
        'icons',
        'img-dev',
        'img-edit'
    );
});

/**
 * Watch
 */
gulp.task('watch', 'default' ['css', 'js', 'pl-watch'], function() {
    gulp.watch(options.dirs.src.scss + '/**/*.scss', ['css']);
    gulp.watch(options.dirs.src.js + '/**/*.js', ['js', 'requirejs']);
    gulp.watch(options.dirs.src.js_additional + '/**/*.js', ['js']);
    gulp.watch(options.dirs.src.js_enhance + '/**/*.js', ['js']);
    gulp.watch(options.dirs.patternlab.files, ['pl-watch']);
});

/**
 * Init (no minifying / file optimization) - Commit to Patternlab Repository
 */
gulp.task('init', ['clean-development', 'modernizr'], function() {
    // set environment variable by hand
    options.env = 'development';

    gulp.start(
        'icons',
        'img-dev',
        'img-edit',
        'css',
        'js',
        'fonts',
        'requirejs'
    );

    notifier.notify({
        title: 'Init Task Complete My Master!',
        message: 'Have A Nice Day!'
    });
    console.log(
        '[Init Task Complete My Master!] ' +
        '[Have A Nice Day!]'
    );
});

/**
 * Deploy production ready for CMS Integration - Commit to CMS Repository
 */
gulp.task('deploy', ['clean-production', 'modernizr'], function() {
    // set environment variable by hand
    options.env = 'production';
    // set dir.dest to production
    // @see above where config is included
    options.dirs.dest = options.dirs[options.env].dest;

    gulp.start(
        'icons',
        'img-dev',
        'img-edit',
        'css',
        'js',
        'requirejs',
        'fonts'
    );

    notifier.notify({
        title: 'Deployment Task Complete My Master!',
        message: 'Have A Nice Day!'
    });

    console.log(
        '[Deploy Task Complete My Master!] ' +
        '[Have A Nice Day!]'
    );
});
