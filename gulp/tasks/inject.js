'use strict';
const gulp         = require('gulp');
const inject       = require('gulp-inject');

// 'gulp inject:css' -- injects style.css
gulp.task('inject:css', () =>
  gulp.src('.tmp/src/_includes/loadcss.html')
    .pipe(inject(gulp.src('.tmp/assets/stylesheets/*.css'), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: '.tmp',
      addRootSlash: false,
      addPrefix: '{{ site.url }}',
      removeTags: true
    }))
    .pipe(gulp.dest('.tmp/src/_includes'))
);

// 'gulp inject:scripts' -- injects index.js
gulp.task('inject:scripts', () =>
  gulp.src('.tmp/src/_includes/scripts.html')
    .pipe(inject(gulp.src('.tmp/assets/javascripts/*.js'), {
      transform: function (filepath, file, i, length) {
        return '<script async src="' + filepath + '"></script>';
      },
      ignorePath: '.tmp',
      addRootSlash: false,
      addPrefix: '{{ site.url }}',
      removeTags: true
    }))
    .pipe(gulp.dest('.tmp/src/_includes'))
);
