// modified from generator-jekyllized 1.0.0-rc.6
'use strict';
var gulp       = require('gulp');
var requireDir = require('require-dir');
var tasks      = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line

// include paths file
var paths      = require('./gulp/paths');

// 'gulp inject' -- injects CSS and JS into includes
gulp.task('inject', gulp.parallel('inject:css', 'inject:scripts'));

// 'gulp build:site' -- copies, builds, and then copies it again
gulp.task('build:site', gulp.series('site:tmp', 'inject', 'site', 'copy:site'));

// 'gulp assets' -- removes assets and rebuilds them
// 'gulp assets --prod' -- same as above but with production settings
gulp.task('assets', gulp.series(
  gulp.parallel('styles', 'scripts', 'fonts'),
  gulp.series('images', 'images:feature', 'copy:assets', 'copy:icons')
));

// 'gulp clean' -- removes assets and gzipped files
gulp.task('clean', gulp.parallel('clean:assets', 'clean:gzip', 'clean:dist', 'clean:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html', 'xml'));

// 'gulp critical' -- builds critical path CSS includes
// WARNING: run this after substantial CSS changes
// WARNING: .html files referenced need to exist, run after `gulp build` to ensure.
gulp.task('critical', gulp.series('styles:critical:page', 'styles:critical:work', 'styles:critical:archive', 'styles:critical:splash'));

// 'gulp deploy' -- deploy site to production and submit sitemap XML
gulp.task('deploy', gulp.series('upload', 'submit:sitemap'));

// 'gulp rebuild' -- WARNING: removes all assets, images, and built site
gulp.task('rebuild', gulp.series('clean', 'clean:images'));

// 'gulp check' -- checks your Jekyll site for errors
gulp.task('check', gulp.series('site:check'));

// 'gulp' -- removes assets and gzipped files, creates assets and injects
// them into includes or layouts, builds site, serves site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));
