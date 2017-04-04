'use strict';
var cache    = require('gulp-cache');
var changed  = require("gulp-changed");
var filter   = require('gulp-filter');
var glob     = require('glob');
var gulp     = require('gulp');
var gulpif   = require('gulp-if');
var imagemin = require('gulp-imagemin');
var merge2   = require('merge2');
var newer    = require('gulp-newer');
var notify   = require('gulp-notify');
var rename   = require('gulp-rename');
var resize   = require('./resize-images');
var size     = require('gulp-size');
var util     = require('gulp-util');

// include paths file
var paths    = require('../paths');

// 'gulp images' -- optimize newer images
gulp.task('images', () =>
  gulp.src([paths.imageFilesGlob, '!src/assets/images/{feature,feature/**}']) // do not process feature images
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

// feature image resize values
var options = [
  { width: 20, upscale: false },
  { width: 320, upscale: false },
  { width: 768, upscale: true },
  { width: 1024, upscale: true },
  { width: 1600, upscale: true }
]

// 'gulp images:feature' -- resize and optimize newer feature images
// https://gist.github.com/ddprrt/1b535c30374158837df89c0e7f65bcfc
gulp.task('images:feature', function() {
  var streams = options.map(function(el) {
    // resizing images
    return gulp.src([paths.imageFiles + '/feature' + paths.imagePattern, '!' + paths.imageFiles + '/feature/**/*.svg'])
      .pipe(rename(function(file) {
        if(file.extname) {
          file.basename += '-' + el.width
        }
      }))
      .pipe(newer(paths.imageFilesSite))
      .pipe(resize(el))
      .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng()
      ], {verbose: true}))
      .pipe(gulp.dest(paths.imageFilesSite))
  });

  // add original feature images + optimize
  streams.push(gulp.src(paths.imageFiles + '/feature' + paths.imagePattern)
    .pipe(newer(paths.imageFilesSite))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng()
    ], {verbose: true}))
    .pipe(gulp.dest(paths.imageFilesSite)))

  return merge2(streams);
});
