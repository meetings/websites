var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('default', function() {
  return gulp.src('mtn.src.js')
    .pipe(uglify())
    .pipe(rename('mtn.js'))
    .pipe(gulp.dest(''));
});
