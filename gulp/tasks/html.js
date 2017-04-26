'use strict';
var argv       = require('yargs').argv;
var critical   = require('critical').stream;
var gulp       = require('gulp');
var gzip       = require('gulp-gzip');
var htmlmin    = require('gulp-htmlmin');
var prettyData = require('gulp-pretty-data');
var size       = require('gulp-size');
var when       = require('gulp-if');

// include paths file
var paths      = require('../paths');

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
gulp.task('html', () => {
  return gulp.src(paths.siteFolderName + paths.htmlPattern)
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, size({title: 'optimized HTML'})))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
    .pipe(when(argv.prod, gzip({append: true})))
    .pipe(when(argv.prod, size({
      title: 'gzipped HTML',
      gzip: true
    })))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
});

// 'gulp xml' -- does nothing
// 'gulp xml' --prod'  -- minifies XML and JSON files for production
gulp.task('xml', () => {
  return gulp.src(paths.siteFolderName + paths.xmlPattern)
    .pipe(when(argv.prod, prettyData({
      type: 'minify',
      preserveComments: true
    })))
    .pipe(when(argv.prod, size({title: 'optimized XML'})))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
});

// Page dimensions for critical CSS
var pageDimensions = [{
                        width: 320,
                        height: 480
                      }, {
                        width: 768,
                        height: 1024
                      }, {
                        width: 1440,
                        height: 960
                      }];

// 'gulp styles:critical:page' -- extract layout.page critical CSS
//   into /_includes/critical-page.css
gulp.task('styles:critical:page', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'articles/ipad-pro/index.html')
    .pipe(critical({
      base: paths.tempDir,
      inline: false,
      css: [paths.sassFilesTemp + '/style.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-page.css',
      minify: true,
      extract: false,
      ignore: ['@font-face',/url\(/] // defer loading of webfonts and background images
    }))
});

// 'gulp styles:critical:archive' -- extract layout.archive critical CSS
//   into /_includes/critical-archive.css
gulp.task('styles:critical:archive', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'mastering-paper/index.html')
    .pipe(critical({
      base: paths.tempDir,
      inline: false,
      css: [paths.sassFilesTemp + '/style.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-archive.css',
      minify: true,
      extract: false,
      ignore: ['@font-face',/url\(/] // defer loading of webfonts and background images
    }))
});

// 'gulp styles:critical:work' -- extract layout.work critical CSS
//   into /_includes/critical-work.css
gulp.task('styles:critical:work', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'paperfaces/asja-k-portrait/index.html')
    .pipe(critical({
      base: paths.tempDir,
      inline: false,
      css: [paths.sassFilesTemp + '/style.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-work.css',
      minify: true,
      extract: false,
      ignore: ['@font-face',/url\(/] // defer loading of webfonts and background images
    }))
});

// 'gulp styles:critical:splash' -- extract layout.splash critical CSS
//   into /_includes/critical-splash.css
gulp.task('styles:critical:splash', () => {
  return gulp.src(paths.tempDir  + paths.siteDir + 'index.html')
    .pipe(critical({
      base: paths.tempDir,
      css: [paths.sassFilesTemp + '/style.css'],
      dimensions: pageDimensions,
      dest: paths.sourceDir + paths.includesFolderName + '/critical-splash.css',
      minify: true,
      extract: false,
      ignore: ['@font-face',/url\(/] // defer loading of webfonts and background images
    }))
});
