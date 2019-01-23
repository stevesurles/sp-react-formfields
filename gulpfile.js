let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var run = require('gulp-run-command').default

gulp.task('copyassets', function(){
  gulp.src(['src/**/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('lib/'));
  return gulp.src(['src/**/*.json']).pipe(gulp.dest('lib/') );
});

gulp.task('watch', function () {
  // watch the src folder for any changes of the files
  gulp.watch(['./src/**/*'], ['npmbuild']);
});

gulp.task('npmbuild', run('npm run build'));