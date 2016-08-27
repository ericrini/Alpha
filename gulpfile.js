var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('./source')
        .pipe(webserver({
            livereload: true,
            directoryListing: {
                path: './source',
                enable: true
            },
            open: 'http://localhost/index.html',
            port: 80
        }));
});