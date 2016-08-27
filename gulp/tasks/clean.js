'use strict';
const del  = require('del');
const gulp = require('gulp');

// 'gulp clean:assets' -- removes temporary and built CSS and JS assets
gulp.task('clean:assets', () => {
  return del(['.tmp/**/*', '!.tmp/assets', '!.tmp/assets/images', '!.tmp/assets/images/**/*', 'dist/assets']);
});

// 'gulp clean:images' -- removes image assets
gulp.task('clean:images', () => {
  return del(['.tmp/assets/images', 'dist/assets/images']);
});

// 'gulp clean:dist' -- removes built site
gulp.task('clean:dist', () => {
  return del(['dist/', '.tmp/dist']);
});

// 'gulp clean:gzip' -- removes gzip files
gulp.task('clean:gzip', () => {
  return del(['dist/**/*.gz']);
});

// 'gulp clean:site' -- removes temporary source
gulp.task('clean:site', () => {
  return del(['.tmp/src']);
});
