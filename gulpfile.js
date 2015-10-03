var gulp = require('gulp');
var browserify = require('browserify');
var exorcist = require('exorcist');
var path = require('path');
var vinylSrc = require('vinyl-source-stream');

var dist = path.join(__dirname,'dist');

gulp.task('bundle-js', function () {
    var outFile = 'bundle.js';
    var mainFile = path.join(__dirname,'js','main.js');

    return browserify([mainFile],{debug: true})
        .bundle()
        .pipe(exorcist(path.join(dist,outFile+'.map')))
        .pipe(vinylSrc(outFile))
        .pipe(gulp.dest(dist));
});



gulp.task('default', ['bundle-js'], function (done) {
    done();
});