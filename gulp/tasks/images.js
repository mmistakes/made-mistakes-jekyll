'use strict';
const cache       = require('gulp-cache');
const changed     = require("gulp-changed");
const glob        = require('glob');
const gulp        = require('gulp');
const gulpif      = require('gulp-if');
const imagemin    = require('gulp-imagemin');
const merge2      = require('merge2');
const newer       = require('gulp-newer');
const notify      = require('gulp-notify');
const rename      = require('gulp-rename');
const size        = require('gulp-size');
const util        = require('gulp-util');

// 'gulp images' -- resizes, optimizes, and caches images
gulp.task('images', () =>
  gulp.src(['src/assets/images/**/*', '!src/assets/images/{feature,feature/**}']) // do not process feature images
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng(),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ])))
    .pipe(gulp.dest('.tmp/assets/images'))
    .pipe(size({title: 'images'}))
);

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
