module.exports = function(gulp, plugins, options) {
    return function() {
        plugins.browserSync({
            server: {
                baseDir: options.dirs.patternlab.public
            },
            files: options.dirs.patternlab.public,
            ghostMode: true,
            open: "external"
        });
    };
};
