// node-sass gulp-sass gulp-autoprefixer gulp-clean-css gulp-concat gulp-rename gulp-uglify

// Includes
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

function compileSass() {
  return gulp.src('public/_dev/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('>0.1%'))
    .pipe(gulp.dest('public/_dev/css/'));
}

function cssConcatMin() {
  return gulp.src(['public/_dev/css/styles.css'])
  .pipe(concat('main.css'))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/'));
}

function jsConcatMin() {
    return gulp.src([
      'public/_dev/js/static.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/'));
}

function watchFiles() {
  gulp.watch("public/_dev/scss/**/*.scss", gulp.series(compileSass, cssConcatMin));
  gulp.watch("public/_dev/js/*.js", gulp.series(jsConcatMin));
}

gulp.task('cssConcatMin', cssConcatMin);
gulp.task('jsConcatMin', jsConcatMin);
gulp.task('sass', compileSass);
gulp.task('default', gulp.parallel(gulp.series('sass', 'cssConcatMin'), jsConcatMin, watchFiles));
