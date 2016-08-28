// https://gist.github.com/ddprrt/1b535c30374158837df89c0e7f65bcfc

const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const newer    = require('gulp-newer');
const filter   = require('gulp-filter');
const merge    = require('merge2');
const rename   = require('gulp-rename');
const resize   = require('./resize-images');

var options = [
  { width: 320, upscale: false },
  { width: 600, upscale: true },
  { width: 768, upscale: true },
  { width: 1024, upscale: true },
  { width: 1600, upscale: true }
]

// 'gulp images:feature' -- resizes, optimizes, and caches feature images
gulp.task('images:feature', function() {
  var streams =  options.map(function(el) {
    // resizing images
    return gulp.src(['src/assets/images/feature/**/*', '!src/assets/images/feature/**/*.svg'])
      .pipe(rename(function(file) {
        if(file.extname) {
          file.basename += '-' + el.width
        }
      }))
      .pipe(newer('.tmp/assets/images'))
      .pipe(resize(el))
      .pipe(imagemin())
      .pipe(gulp.dest('.tmp/assets/images'))
  });

  // original images
  streams.push(gulp.src('src/assets/images/feature/**/*')
    .pipe(newer('.tmp/assets/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('.tmp/assets/images')))

  return merge(streams);

});
