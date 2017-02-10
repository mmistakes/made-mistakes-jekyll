'use strict';
var gulp  = require('gulp');

// include paths file
var paths = require('../paths');

// 'gulp copy:assets' -- copies assets into the /dist/
// to avoid Jekyll overwriting the whole directory
gulp.task('copy:assets', () =>
  gulp.src([paths.assetFilesTemp + '/**/*', paths.imageFiles + '/*.ico'])
    .pipe(gulp.dest(paths.assetFilesSite))
);

// 'gulp copy:icons' -- copies .ico assets to /dist/
gulp.task('copy:icons', () =>
  gulp.src(paths.imageFiles + '/*.ico')
    .pipe(gulp.dest(paths.imageFilesSite))
);

// 'gulp copy:site' -- copies processed Jekyll site to /dist/
gulp.task('copy:site', () =>
  gulp.src([paths.tempDir + paths.siteFolderName + '/**/*', paths.tempDir + paths.siteFolderName + '/**/.*'])
    .pipe(gulp.dest(paths.siteFolderName))
);

