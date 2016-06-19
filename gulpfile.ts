import * as gulp from 'gulp';

var source = 'app';
var dest = 'dist';

gulp.task('build.dev', () =>
  gulp.src('app/**/*.js')
    .pipe(gulp.dest('${dest}/')));

gulp.task('build.prod', () =>
  gulp.src('app/**/*.js')
    .pipe()
    .pipe(gulp.dest('${dest}/')));

