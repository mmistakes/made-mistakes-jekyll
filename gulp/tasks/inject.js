'use strict';
var gulp   = require('gulp');
var inject = require('gulp-inject');

// include paths file
var paths  = require('../paths');

// 'gulp inject:css' -- injects style.css
gulp.task('inject:css', () =>
  gulp.src(paths.tempDir + paths.sourceDir + paths.layoutsFolderName + '/default.html')
    .pipe(inject(gulp.src(paths.sassFilesTemp + '/*.css'), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: paths.tempFolderName,
      addRootSlash: false,
      addPrefix: '{{ site.url }}',
      removeTags: true
    }))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.layoutsFolderName))
);

// 'gulp inject:scripts' -- injects index.js
gulp.task('inject:scripts', () =>
  gulp.src(paths.tempDir + paths.sourceDir + paths.includesFolderName + '/scripts.html')
    .pipe(inject(gulp.src(paths.jsFilesTemp + '/*.js'), {
      transform: function (filepath, file, i, length) {
        return '<script async src="' + filepath + '"></script>';
      },
      ignorePath: paths.tempFolderName,
      addRootSlash: false,
      addPrefix: '{{ site.url }}',
      removeTags: true
    }))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.includesFolderName))
);
