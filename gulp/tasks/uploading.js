'use strict';
const fs    = require('fs');
const gulp  = require('gulp');
const rsync = require('gulp-rsync');

// 'gulp deploy' -- reads rsync credentials file and incrementally uploads site to server
gulp.task('upload', () => {
  var credentials = JSON.parse(fs.readFileSync('rsync-credentials.json', 'utf8'));

  return gulp.src('dist')
    .pipe(rsync({
      // dryrun: true
      root: 'dist/',
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
      incremental: true,
      recursive: true,
      compress: true,
      progress: true,
      clean: true,
      chmod: "Du=rwx,Dgo=rx,Fu=rw,Fgo=r",
    }));
});
