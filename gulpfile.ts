import * as gulp from 'gulp'
import * as tslint from 'gulp-tslint'
import * as ts from 'gulp-typescript'
import * as concat from 'gulp-concat'
import * as sourcemaps from 'gulp-sourcemaps'
import * as uglify from 'gulp-uglify'
import * as del from 'del'

var source = 'app';
var dest = 'dist';
var tsfiles = 'app/**/*.ts';
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return del([dest]);
});

gulp.task("tslint", () =>
  gulp.src(tsfiles)
    .pipe(tslint({
      configuration: "tslint.json"
    }))
    .pipe(tslint.report("verbose"))
);

function bundleTs() {
  return gulp.src(tsfiles)
    .pipe(sourcemaps.init()) // This means sourcemaps will be generated
    .pipe(ts(tsProject)) // compile to javascript
    .js // Stream javascript
    .pipe(concat('app.js')) // Concatenate javascript
}

gulp.task('bundle.ts.dev', ['tslint'], () => {
  return bundleTs()
    .pipe(sourcemaps.write()) // Write the sourcemaps
    .pipe(gulp.dest(dest + '/js'));
});

gulp.task('bundle.ts.prod', ['tslint'], () => {
  return bundleTs()
    .pipe(uglify()) // Minify and uglify
    .pipe(sourcemaps.write()) // Write the sourcemaps
    .pipe(gulp.dest(dest + '/js'));
});

gulp.task('bundle.html', () => {
});

gulp.task('bundle.css.dev', () => {
});

gulp.task('bundle.css.prod', () => {
});

gulp.task('bundle.img', () => {
});

gulp.task('build.dev', ['clean', 'bundle.ts.dev'], () => {
});

gulp.task('build.prod', ['clean', 'bundle.ts.prod'], () => {
});
