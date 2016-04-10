module.exports = function(gulp, plugins, options) {
    var conf = {
        shape               : {
            dimension       : {         // Set maximum dimensions
                maxWidth    : 32,
                maxHeight   : 32,
                attributes  : true
            }
        },
        mode                : {
            symbol          : {         // Activate the «symbol» mode
                dest        : '',
                sprite      : 'sprite.svg'
            }
        }
    };

    return function() {
        gulp.src(options.dirs.src.icons + '/**/*.svg')

            .pipe(plugins.svgSprite(conf))
            
            .pipe(gulp.dest(options.dirs.dest.icons + '/Sprite'));
    };
};
