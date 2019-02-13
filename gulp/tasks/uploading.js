"use strict";
var fs = require("fs");
var gulp = require("gulp");
var rsync = require("gulp-rsync");

// include paths file
var paths = require("../paths");

// 'gulp upload' -- reads rsync credentials file and incrementally uploads site to server
gulp.task("upload", () => {
  var credentials = JSON.parse(
    fs.readFileSync("rsync-credentials.json", "utf8")
  );

  return gulp.src(paths.siteFolderName).pipe(
    rsync({
      // dryrun: true,
      root: paths.siteDir,
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
      incremental: true,
      recursive: true,
      compress: true,
      clean: false,
      chmod: "Du=rwx,Dgo=rx,Fu=rw,Fgo=r",
      silent: true
    })
  );
});

// 'gulp submit:sitemap` -- submit sitemap XML file to Google and Bing
gulp.task("submit:sitemap", cb => {
  var SitemapUrl = paths.prodUrl + "/sitemap.xml";

  require("submit-sitemap").submitSitemap(SitemapUrl, function(err) {
    if (err) console.warn(err);
    cb();
  });
});
