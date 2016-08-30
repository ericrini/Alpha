var gulp = require('gulp');
var webserver = require('gulp-webserver');
var jasmine = require('gulp-jasmine');
var order = require('gulp-order');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sequence = require('run-sequence');
var clean = require('gulp-clean');
var watch = require('gulp-watch');

var TEST_GLOB = './source/**/*.spec';
var OUTPUT_PATH = './distribution';

gulp.task('default', function (callback) {
    sequence('test', 'build', callback);
});

gulp.task('test', function() {
    return gulp.src(TEST_GLOB)
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true,
            timeout: 100,
            errorOnFail: true
        }))
});

gulp.task('build', function (callback) {
    sequence('build:clean', ['build:bundle', 'build:copy'], callback);
});

gulp.task('build:clean', function () {
    return gulp.src(OUTPUT_PATH)
        .pipe(clean());
});

gulp.task('build:copy', function () {
    return gulp.src('./source/demos/**')
        .pipe(gulp.dest('./distribution/demos'));
});


gulp.task('build:bundle', function () {
    var definition = browserify({
        entries: './source/global.js',
        debug: true
    });

    return definition.bundle()
        .pipe(source('alpha.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(OUTPUT_PATH));
});

gulp.task('server', function() {
    sequence('default');

    watch('./source/**/*', function () {
        sequence('default');
    });

    watch(TEST_GLOB, function () {
        sequence('test');
    });

    return gulp.src('./distribution')
        .pipe(webserver({
            livereload: true,
            directoryListing: {
                path: OUTPUT_PATH,
                enable: true
            },
            host: '0.0.0.0',
            port: 8000
        }));
});