'use strict';
var argv    = require('yargs').argv;
var gulp    = require('gulp');
var replace = require('gulp-rev-replace');
var size    = require('gulp-size');
var when    = require('gulp-if');

// include paths file
var paths   = require('../paths');

if (!argv.prod) {
  replace = require('gulp-empty');
}

// asset manifests
var cssManifest = gulp.src(paths.sassFiles + '/css-manifest.json');
var jsManifest = gulp.src(paths.jsFiles + '/js-manifest.json');

// 'gulp replace:css' -- replace all CSS rev'd references
gulp.task('replace:css', () => {
  return gulp.src(paths.tempDir + paths.sourceDir + paths.layoutsFolderName + '/default.html')
    .pipe(when(argv.prod, replace({
      manifest: cssManifest,
      replaceInExtensions: ['.html']
    })))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.layoutsFolderName))
});

// 'gulp replace:js' -- replace all JS rev'd references
gulp.task('replace:js', () => {
  return gulp.src(paths.tempDir + paths.sourceDir + paths.includesFolderName + '/scripts.html')
    .pipe(when(argv.prod, replace({
      manifest: jsManifest,
      replaceInExtensions: ['.html']
    })))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.includesFolderName))
});
