// https://gist.github.com/ddprrt/1b535c30374158837df89c0e7f65bcfc

var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var newer      = require('gulp-newer');
var filter     = require('gulp-filter');
var merge      = require('merge2');
var rename     = require('gulp-rename');
var resize     = require('./resize-images')

var options = [
  { width: 320, upscale: false },
  { width: 600, upscale: false },
  { width: 768, upscale: false },
  { width: 1024, upscale: false },
  { width: 1600, upscale: false }
]

// 'gulp images:feature' -- resizes, optimizes, and caches feature images
gulp.task('images:feature', function() {
  var streams =  options.map(function(el) {
    return gulp.src(['src/assets/images/feature/**/*', '!src/assets/images/feature/**/*.svg'])
      .pipe(rename(function(file) {
        if(file.extname) {
          file.basename += '-' + el.width
        }
      }))
      .pipe(newer('.tmp/assets/images'))
      .pipe(resize(el))
      .pipe(imagemin())
      .pipe(gulp.dest('.tmp/assets/images'));
  });

  streams.push(gulp.src('src/assets/images/feature/**/*')
    .pipe(newer('.tmp/assets/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('.tmp/assets/images')));

  return merge(streams);

});
