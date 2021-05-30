var gulp = require('gulp');
var browserify = require('browserify');
var exorcist = require('exorcist');
var path = require('path');
var vinylSrc = require('vinyl-source-stream');

// bundle output directory
var dist = path.join(__dirname,'dist');

/**
 * This task concatenates all JS source modules to a single bundle.js file for browsers.
 */
gulp.task('bundle-js', function () {
    // output file
    var outFile = 'bundle.js';

    // main source file
    var mainFile = path.join(__dirname,'js','main.js');

    // pack and generate source maps as well
    return browserify([mainFile],{debug: true})
        .bundle()
        .pipe(exorcist(path.join(dist,outFile+'.map')))
        .pipe(vinylSrc(outFile))
        .pipe(gulp.dest(dist));
});


/**
 * Default task. Packages sources.
 */
gulp.task('default', gulp.series('bundle-js'));