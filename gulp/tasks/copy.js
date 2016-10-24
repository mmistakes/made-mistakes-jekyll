'use strict';
var gulp  = require('gulp');

// include paths file
var paths = require('../paths');

// 'gulp assets:copy' -- copies assets into the /dist/ to avoid
// Jekyll overwriting the whole directory
gulp.task('copy:assets', () =>
  gulp.src(paths.assetFilesTemp + '/**/*')
    .pipe(gulp.dest(paths.assetFilesSite))
);

// 'gulp jekyll:copy' -- copies processed Jekyll site to /dist/
gulp.task('copy:site', () =>
  gulp.src([paths.tempDir + paths.siteFolderName + '/**/*', paths.tempDir + paths.siteFolderName + '/**/.*'])
    .pipe(gulp.dest(paths.siteFolderName))
);

