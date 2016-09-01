'use strict';
const del  = require('del');
const gulp = require('gulp');

// 'gulp clean:assets' -- removes temporary and built CSS/JS assets
gulp.task('clean:assets', () => {
  return del(['.tmp/**/*', '!.tmp/assets', 'dist/assets/**/*', '!dist/assets/images', '!dist/assets/images/**/*']);
});

// 'gulp clean:images' -- removes only image assets
gulp.task('clean:images', () => {
  return del(['dist/assets/images']);
});

// 'gulp clean:dist' -- removes built site but keep images
gulp.task('clean:dist', () => {
  return del(['dist/**/*', '!dist/assets', '!dist/assets/images', '!dist/assets/images/**/*'], {'dot': true});
});

// 'gulp clean:gzip' -- removes gzip files
gulp.task('clean:gzip', () => {
  return del(['dist/**/*.gz']);
});

// 'gulp clean:site' -- removes temporary source
gulp.task('clean:site', () => {
  return del(['.tmp/src']);
});
