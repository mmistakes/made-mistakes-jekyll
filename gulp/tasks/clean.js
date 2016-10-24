'use strict';
var del   = require('del');
var gulp  = require('gulp');

// include paths file
var paths = require('../paths');

// 'gulp clean:assets' -- removes temporary and built CSS/JS assets
gulp.task('clean:assets', () => {
  return del([paths.tempFolderName + '/**/*', '!' + paths.assetFilesTemp, paths.assetFilesSite + '/**/*', '!' + paths.imageFilesSite, '!' + paths.imageFilesSite + '/**/*']);
});

// 'gulp clean:images' -- removes only image assets
gulp.task('clean:images', () => {
  return del([paths.imageFilesSite]);
});

// 'gulp clean:dist' -- removes built site but keep images
gulp.task('clean:dist', () => {
  return del([paths.siteFolderName + '/**/*', '!' + paths.assetFilesSite, '!' + paths.imageFilesSite, '!' + paths.imageFilesSite + '/**/*'], {'dot': true});
});

// 'gulp clean:gzip' -- removes gzip files
gulp.task('clean:gzip', () => {
  return del([paths.siteFolderName  + '/**/*.gz']);
});

// 'gulp clean:site' -- removes temporary source
gulp.task('clean:site', () => {
  return del([paths.tempDir  + paths.sourceFolderName]);
});
