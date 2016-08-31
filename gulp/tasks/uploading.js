'use strict';
const fs            = require('fs');
const gulp          = require('gulp');
const rsync         = require('gulp-rsync');

// 'gulp upload' -- reads rsync credentials file and incrementally uploads site to server
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
      clean: true,
      chmod: "Du=rwx,Dgo=rx,Fu=rw,Fgo=r"
    }));
});

// 'gulp submit:sitemap` -- submit sitemap XML file to Google and Bing
gulp.task('submit:sitemap', function(cb) {
  var SitemapUrl = "https://mademistakes.com/sitemap.xml";

  require('submit-sitemap').submitSitemap(SitemapUrl, function(err) {
    if (err)
      console.warn(err);

    cb();
  });
});
