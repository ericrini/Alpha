var gulp = require('gulp');
var webserver = require('gulp-webserver');
var jasmine = require('gulp-jasmine-browser');
var order = require('gulp-order');

gulp.task('webserver', function() {
    gulp.src('./source')
        .pipe(webserver({
            livereload: true,
            directoryListing: {
                path: './source',
                enable: true
            },
            open: 'http://localhost/index.html',
            host: '0.0.0.0',
            port: 80
        }));
});

gulp.task('jasmine', function() {
    return gulp.src([
            'source/framework/math/Point.js',
            'source/framework/math/Matrix.js',
            'source/**/*_spec.js'
        ])
        .pipe(jasmine.specRunner())
        .pipe(jasmine.server({
            port: 8888
        }));
});