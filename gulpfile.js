var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require("gulp-notify"),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect');

gulp.task('webserver', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('images', function () {
  console.log('called images');
  return gulp.src('src/img/**/*')
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({
            interlaced: true
          }),
          imagemin.jpegtran({
            progressive: true
          }),
          imagemin.optipng({
            optimizationlevel: 7
          }),
          imagemin.svgo({
            plugins: [{
              removeviewbox: true
            }, {
              cleanupids: false
            }]
          })
        ], {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest('img/'))
    .pipe(notify({
      message: "images done!",
      onLast: true
    }));
});

gulp.task('styles:dev', function () {
  return gulp.src([
      'src/sass/main.scss'
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
      'src/sass/main.scss'
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


gulp.task('scripts:dev', function () {
  console.log('called scripts-compile');
  return gulp.src([
      'node_modules/picturefill/dist/picturefill.min.js',
      'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
      'node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js',
      'src/js/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/'))
    .pipe(notify({
      message: "scripts done!",
      onlast: true
    }));
});
gulp.task('scripts:dist', function () {
  console.log('called scripts-compile');
  return gulp.src([
      'node_modules/picturefill/dist/picturefill.min.js',
      'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
      'src/js/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(notify({
      message: "scripts done!",
      onlast: true
    }));
});


// when you run npm run dev
gulp.task('dev', ['scripts:dev', 'styles:dev', 'images']);

// when you run npm run dist
gulp.task('dist', ['scripts:dist', 'styles:dist', 'images']);

// when you run npm run watch
gulp.task('default', ['dev', 'webserver'], function () {


      gulp.watch('src/sass/**/*.scss', function () {
        setTimeout(function () {
          gulp.start('styles:dev')
        }, 100)
      });

      //  gulp.watch('src/img/**', ['images']);
      gulp.watch('src/js/**/*.js', function () {
        setTimeout(function () {
          gulp.start('scripts:dev')
        }, 100)
      });

      // livereload.listen();

      gulp.watch(['index.html']).on('change', livereload.changed);
      gulp.watch(['css/**']).on('change', livereload.changed);
      gulp.watch(['js/**']).on('change', livereload.changed);

    });
