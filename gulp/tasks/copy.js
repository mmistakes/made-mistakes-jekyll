'use strict';
const gulp = require('gulp');

// 'gulp assets:copy' -- copies assets into the /dist/ to avoid
// Jekyll overwriting the whole directory
gulp.task('copy:assets', () =>
  gulp.src('.tmp/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
);

// 'gulp jekyll:copy' -- copies processed Jekyll site to /dist/
gulp.task('copy:site', () =>
  gulp.src(['.tmp/dist/**/*', '.tmp/dist/**/.*'])
    .pipe(gulp.dest('dist'))
);

