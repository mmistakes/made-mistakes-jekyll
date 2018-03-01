'use strict';
var argv  = require('yargs').argv;
var gulp  = require('gulp');
var shell = require('shelljs');
var size  = require('gulp-size');

// include paths file
var paths = require('../paths');

// 'gulp site:tmp' -- copies Jekyll site to a temporary directory to be processed
gulp.task('site:tmp', () => {
  return gulp.src([paths.sourceFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName], {dot: true})
    .pipe(gulp.dest(paths.tempDir + paths.sourceFolderName))
    .pipe(size({title: 'Jekyll'}))
});

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings
gulp.task('site', done => {
  if (!argv.prod) {
    shell.exec('bundle exec jekyll build --config _config.yml,_config.dev.yml');
    done();
  } else if (argv.prod) {
    shell.exec('bundle exec jekyll build');
    done();
  }
});

// 'gulp site:check' -- builds site with production settings then tests with html-proofer
gulp.task('site:check', done => {
  shell.exec('gulp build --prod');
  shell.exec('bundle exec rake test');
  done();
});
