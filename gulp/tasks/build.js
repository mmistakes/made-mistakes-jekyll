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
    if (shell.exec('bundle exec jekyll build --config _config.yml,_config.dev.yml').code !== 0) {
      shell.echo('Error: Build failed');
      //shell.exit(1);
    }
    done();
  } else if (argv.prod) {
    if (shell.exec('bundle exec jekyll build').code !== 0) {
      shell.echo('Error: Build failed');
      shell.exit(1);
    }
    done();
  }
});

// 'gulp site:check' -- runs Jekyll doctor
gulp.task('site:check', done => {
  shell.exec('bundle exec jekyll doctor');
  done();
});
