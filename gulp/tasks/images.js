"use strict";
var assetCache = require("gulp-asset-cache");
var gulp = require("gulp");
var newer = require("gulp-newer");
var responsive = require("gulp-responsive");
var size = require("gulp-size");

// include paths file
var paths = require("../paths");

// 'gulp images:optimize' -- optimize images
gulp.task("images:optimize", () => {
  return gulp
    .src([
      paths.imageFilesGlob,
      "!src/assets/images/{feature,feature/**}"
    ]) // do not process feature images
    .pipe(newer(paths.imageFilesSite))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng(),
          imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest(paths.imageFilesSite))
    .pipe(size({ title: "images" }));
});

// 'gulp images:feature' -- resize images
gulp.task("images:feature", () => {
  return gulp
    .src([
      paths.imageFiles + "/feature" + paths.imagePattern,
      "!" + paths.imageFiles + "/feature/**/*.{gif,svg}"
    ])
    .pipe(assetCache.filter(paths.imageFilesCachePath + '/.feature-image-cache'))
    .pipe(
      responsive(
        {
          // resize all images
          "*.*": [
            {
              width: 20,
              rename: { suffix: "-lq" }
            },
            {
              width: 320,
              rename: { suffix: "-320" }
            },
            {
              width: 768,
              rename: { suffix: "-768" }
            },
            {
              width: 1024,
              rename: { suffix: "-1024" }
            },
            {
              width: 1920,
              rename: { suffix: "" }
            }
          ]
        },
        {
          // global configuration for all images
          errorOnEnlargement: false,
          withMetadata: false,
          errorOnUnusedConfig: false
        }
      )
    )
    .pipe(gulp.dest(paths.imageFilesCachePath)) // write to cache
    .pipe(assetCache.cache());
});
