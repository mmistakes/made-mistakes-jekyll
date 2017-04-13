'use strict';
var filter      = require('gulp-filter');
var glob        = require('glob');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var merge2      = require('merge2');
var newer       = require('gulp-newer');
var notify      = require('gulp-notify');
var rename      = require('gulp-rename');
var size        = require('gulp-size');
var util        = require('gulp-util');

// include paths file
var paths       = require('../paths');

// lazyload image resize values
var lazyloadImages = [
  { width: 20, suffix: '-lq', upscale: false },
  { percentage: 100, suffix: '', upscale: false }
]

// responsive image resize values
var responsiveImages = [
  { width: 20, suffix: '-lq', upscale: false },
  { width: 320, suffix: '-320', upscale: false },
  { width: 768, suffix: '-768', upscale: false },
  { width: 1024, suffix: '-1024', upscale: false },
  { width: 1920, suffix: '', upscale: false }
]

// 'gulp images:optimize' -- optimize images
gulp.task('images:optimize', () =>
  gulp.src([paths.imageFilesGlob, '!src/assets/images/{feature,feature/**,lazyload,lazyload/**}']) // do not process feature images
    .pipe(newer(paths.imageFilesSite))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng(),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ], {verbose: true}))
    .pipe(gulp.dest(paths.imageFilesSite))
    .pipe(size({title: 'images'}))
);

// 'gulp images:lazyload' -- resize and optimize lazyload images
gulp.task('images:lazyload', function() {
  var lazyloads = lazyloadImages.map(function(el) {
    // resizing images
    return gulp.src([paths.imageFiles + '/lazyload' + paths.imagePattern, '!' + paths.imageFiles + '/lazyload/**/*.svg'])
      .pipe(rename(function(file) {
        if(file.extname) {
          file.basename += el.suffix
        }
      }))
      .pipe(newer(paths.imageFilesSite))
      .pipe(imageResize(el))
      .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng()
      ], {verbose: true}))
      .pipe(gulp.dest(paths.imageFilesSite))
  });

  return merge2(lazyloads);
});

// 'gulp images:feature' -- resize and optimize feature images
gulp.task('images:feature', function() {
  var features = responsiveImages.map(function(el) {
    // resizing images
    return gulp.src([paths.imageFiles + '/feature' + paths.imagePattern, '!' + paths.imageFiles + '/feature/**/*.svg'])
      .pipe(rename(function(file) {
        if(file.extname) {
          file.basename += el.suffix
        }
      }))
      .pipe(newer(paths.imageFilesSite))
      .pipe(imageResize(el))
      .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng()
      ], {verbose: true}))
      .pipe(gulp.dest(paths.imageFilesSite))
  });

  return merge2(features);
});
