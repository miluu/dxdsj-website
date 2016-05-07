var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCss = require('gulp-clean-css');
var base64 = require('gulp-base64');
var spriter = require('gulp-css-spriter');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var uglify = require('gulp-uglify');

var webpackConfig = require('./webpack.config');

var ASSET_PATH = 'bin/assets/static/theme/default';
var IMG_PATH = path.resolve(ASSET_PATH, 'img');
var JS_PATH = path.resolve(ASSET_PATH, 'js');
var CSS_PATH = path.resolve(ASSET_PATH, 'css');
var BASE64_PATH = path.resolve(IMG_PATH, 'base64');
var PIC_PATH = path.resolve(IMG_PATH, 'pic');
var SPRITE_PATH = path.resolve(IMG_PATH, 'sprite');

gulp.task('img', function() {
  gulp.src(['fd-src/img/**/*'])
    .pipe(gulp.dest(IMG_PATH));
});

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 version']})
  ];
  var timestamp = +new Date();

  return gulp.src(['fd-src/css/index.less', 'fd-src/css/calendar.less'])
    .pipe(less())
    .pipe(base64({
      extensions: [/__inline/, /\/base64\//]
    }))
    .pipe(spriter({
      includeMode: 'explicit',
      spriteSheet: path.resolve(SPRITE_PATH, 'sprite.png'),
      pathToSpriteSheetFromCSS: '../img/sprite/sprite.png?' + timestamp,
      spritesmithOptions: {
        padding: 10
      }
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(CSS_PATH))
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest(CSS_PATH));
});

gulp.task('js', function() {
  return gulp.src([
      'fd-src/js/index.js',
      'fd-src/js/data-detail.js',
      'fd-src/js/calendar.js',
      'fd-src/js/calendar-detail.js'
    ])
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(JS_PATH))
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(uglify())
    .pipe(gulp.dest(JS_PATH));
});

gulp.task('clean', function() {
  return gulp.src([JS_PATH, CSS_PATH, BASE64_PATH, PIC_PATH, SPRITE_PATH], {read: false})
    .pipe(clean());
});

gulp.task('default', ['img', 'css', 'js']);

gulp.task('watch', ['default'], function() {
  gulp.watch('fd-src/img/**/*', ['img']);
  gulp.watch('fd-src/css/**/*', ['css']);
  gulp.watch('fd-src/js/**/*', ['js']);
});
