'use strict';
var gulp  = require('gulp');
var size  = require('gulp-size');

// include paths file
var paths = require('../paths');

// 'gulp fonts' -- copies fonts to temporary assets directory
gulp.task('fonts', () => {
  return gulp.src(paths.fontFiles + '/**/*')
    .pipe(gulp.dest(paths.fontFilesTemp))
    .pipe(size({title: 'fonts'}))
});
