"use strict";
var changed = require("gulp-changed");
var gulp = require("gulp");
var newer = require("gulp-newer");
var responsive = require("gulp-responsive");
var size = require("gulp-size");

// include paths file
var paths = require("../paths");
// var imageFilesCachePath;

// if (process.env.CONTEXT === "production") {
//   imageFilesCachePath = "/opt/build/cache/assets/images";
// } else {
//   imageFilesCachePath = paths.imageFilesSite;
// }

// 'gulp images:optimize' -- optimize images
gulp.task("images:optimize", () => {
  return gulp
    .src([
      paths.imageFilesGlob,
      "!src/assets/images/{feature,feature/**,lazyload,lazyload/**}"
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

// 'gulp images:lazyload' -- resize and optimize lazyload images
gulp.task("images:lazyload", () => {
  return gulp
    .src([
      paths.imageFiles + "/lazyload" + paths.imagePattern,
      "!" + paths.imageFiles + "/lazyload/**/*.{gif,svg}"
    ])
    .pipe(changed(paths.imageFilesCachePath))
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
              // copy original image
              width: "100%",
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
    .pipe(gulp.dest(paths.imageFilesCachePath));
});

// 'gulp images:feature' -- resize images
gulp.task("images:feature", () => {
  return gulp
    .src([
      paths.imageFiles + "/feature" + paths.imagePattern,
      "!" + paths.imageFiles + "/feature/**/*.{gif,svg}"
    ])
    .pipe(changed(paths.imageFilesCachePath))
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
    .pipe(gulp.dest(paths.imageFilesCachePath));
});
