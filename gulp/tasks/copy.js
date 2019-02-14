"use strict";
var gulp = require("gulp");
var newer = require("gulp-newer");

// include paths file
var paths = require("../paths");

if (process.env.NODE_ENV === "production") {
  var imageFilesSitePath = "/opt/build/cache/dist/assets/images/";
} else {
  var imageFilesSitePath = paths.imageFilesSite;
}

// 'gulp copy:assets' -- copies assets to /dist/
//   to avoid Jekyll overwriting the whole directory
gulp.task("copy:assets", () => {
  return gulp
    .src([paths.assetFilesTemp + "/**/*", paths.imageFiles + "/*.ico"])
    .pipe(gulp.dest(paths.assetFilesSite));
});

// 'gulp copy:images' -- copies unoptimized images to /dist/
gulp.task("copy:images", () => {
  return gulp
    .src([
      paths.imageFilesGlob,
      "!src/assets/images/{feature,feature/**,lazyload,lazyload/**}"
    ]) // do not process feature images
    .pipe(newer(imageFilesSitePath))
    .pipe(gulp.dest(imageFilesSitePath));
});

// 'gulp copy:icons' -- copies .ico assets to /dist/
gulp.task("copy:icons", () => {
  return gulp
    .src(paths.imageFiles + "/*.ico")
    .pipe(newer(paths.imageFilesSite))
    .pipe(gulp.dest(paths.imageFilesSite));
});

// 'gulp copy:manifest' -- copies image json to /dist/
gulp.task("copy:manifest", () => {
  return gulp
    .src(paths.imageFiles + "/*.json")
    .pipe(newer(paths.imageFilesSite))
    .pipe(gulp.dest(paths.imageFilesSite));
});

// 'gulp copy:site' -- copies processed Jekyll site to /dist/
gulp.task("copy:site", () => {
  return gulp
    .src([
      paths.tempDir + paths.siteFolderName + "/**/*",
      paths.tempDir + paths.siteFolderName + "/**/.*"
    ])
    .pipe(gulp.dest(paths.siteFolderName));
});
