'use strict';
const cache    = require('gulp-cache');
const changed  = require("gulp-changed");
const filter   = require('gulp-filter');
const glob     = require('glob');
const gulp     = require('gulp');
const gulpif   = require('gulp-if');
const imagemin = require('gulp-imagemin');
const merge2   = require('merge2');
const newer    = require('gulp-newer');
const notify   = require('gulp-notify');
const rename   = require('gulp-rename');
const resize   = require('./resize-images');
const size     = require('gulp-size');
const util     = require('gulp-util');

// 'gulp images' -- resizes, optimizes, and caches images
gulp.task('images', () =>
  gulp.src(['src/assets/images/**/*', '!src/assets/images/{feature,feature/**}']) // do not process feature images
    .pipe(newer('dist/assets/images'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng(),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ]))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(size({title: 'images'}))
);

// feature image resize values
var options = [
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
    return gulp.src(['src/assets/images/feature/**/*', '!src/assets/images/feature/**/*.svg'])
      .pipe(rename(function(file) {
        if(file.extname) {
          file.basename += '-' + el.width
        }
      }))
      .pipe(newer('dist/assets/images'))
      .pipe(resize(el))
      .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng()
      ]))
      .pipe(gulp.dest('dist/assets/images'))
  });

  // add original images
  streams.push(gulp.src('src/assets/images/feature/**/*')
    .pipe(newer('dist/assets/images'))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('dist/assets/images')))

  return merge2(streams);

});

// 'gulp images:feature' -- resizes, optimizes, and caches feature images
// const feature_src = 'src/assets/images/feature/*.jpg';
// const feature_dest = '.tmp/assets/images';
// const feature_formats = [
//   {suffix: '', width: null},
//   {suffix: '-big', width: 1600},
//   {suffix: '-large', width: 1024},
//   {suffix: '-medium', width: 768},
//   {suffix: '-small', width: 600},
//   {suffix: '-tiny', width: 320}
// ];
// const feature_imops = {progressive: true, optimizationLevel: 5};

// gulp.task('images:feature', function(callback) {
//   const path = require('path');
//   const files = glob.sync(feature_src);
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
