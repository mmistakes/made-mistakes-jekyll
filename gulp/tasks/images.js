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

// 'gulp images' -- resizes, optimizes, and caches images
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

// 'gulp images:feature' -- resizes, optimizes, and caches feature images
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

  // add original images
  streams.push(gulp.src(paths.imageFiles + '/feature' + paths.imagePattern)
    .pipe(newer(paths.imageFilesSite))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng()
    ], {verbose: true}))
    .pipe(gulp.dest(paths.imageFilesSite)))

  return merge2(streams);

});

// 'gulp images:feature' -- resizes, optimizes, and caches feature images
// var feature_src = 'src/assets/images/feature/*.jpg';
// var feature_dest = '.tmp/assets/images';
// var feature_formats = [
//   {suffix: '', width: null},
//   {suffix: '-big', width: 1600},
//   {suffix: '-large', width: 1024},
//   {suffix: '-medium', width: 768},
//   {suffix: '-small', width: 600},
//   {suffix: '-tiny', width: 320}
// ];
// var feature_imops = {progressive: true, optimizationLevel: 5};

// gulp.task('images:feature', function(callback) {
//   var path = require('path');
//   var files = glob.sync(feature_src);
//   var streams = [];

//   files.map(function(file) {
//     let oldname = path.basename(file, '.jpg');
//     feature_formats.map(function(format) {
//       streams.push(gulp.src(file)
//         .pipe(rename(function (path) {
//           path.basename = oldname + format.suffix;
//         }))
//         .pipe(changed(feature_dest)) // do not process already generated images
//         .pipe(gulpif(format.width !== null, imageResize({ width : format.width })))
//         .pipe(cache(imagemin(feature_imops)))
//         .pipe(gulp.dest(feature_dest))
//       );
//     });
//   });
//   return merge2(streams);
// });
// gulp.task('images:feature', function () {
//   gulp.src(feature_src)
//     .pipe(newer(feature_dest))
//     .pipe(responsive({
//       'delete-me.jpg': [{
//         width: 1600,
//         suffix: '-big'
//       }, {
//         width: 1024,
//         suffix: '-large'
//       }, {
//         width: 768,
//         suffix: '-medium'
//       }, {
//         width: 600,
//         suffix: '-small'
//       }, {
//         width: 320,
//         suffix: '-tiny'
//       }]
//     }))
//     .pipe(cache(imagemin([
//       imagemin.gifsicle({interlaced: true}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.optipng(),
//       imagemin.svgo({plugins: [{cleanupIDs: false}]})
//     ])))
//     .pipe(gulp.dest(feature_dest))
//     .pipe(size({title: 'feature images'}));
// });
