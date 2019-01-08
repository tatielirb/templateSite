var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");

gulp.task('styles:dev', function () {
  return gulp.src([
      'sass/style.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(notify({
      message: 'styles task complete'
    }));
});

gulp.task('styles:dist', function () {
  return gulp.src([
      'sass/style.scss'
    ])
    .pipe(sass({
      outputstyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('css/'))
    .pipe(notify({
      message: 'styles build task complete'
    }));
});

// when you run npm run dev
gulp.task('dev', ['styles:dev']);

// when you run npm run dist
gulp.task('dist', ['styles:dist']);

// when you run npm run watch
gulp.task('default', ['dev',], function () {
    gulp.watch('sass/**/*.scss', function () {
      setTimeout(function () {
        gulp.start('styles:dev');
      }, 100);
    });

    livereload.listen();

    gulp.watch(['css/**']).on('change', livereload.changed);
  });
