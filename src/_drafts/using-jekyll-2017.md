---
title: "How I'm Using Jekyll in 2017"
layout: page
category: articles
read_time: true
breadcrumbs:
  - label: "Blog Articles"
    url: /articles/
excerpt:
tags: [Jekyll, web development, GitHub, open source]
image:
  path:
  feature:
  teaser:
comments: true
last_modified_at:
---

Just shy of 1,000 posts, this Jekyll-based site takes longer than I'd like to build. What started as a few seconds has turned into a half an hour of optimizing assets, looping through Liquid and churning out thousands of HTML files.

Inspired by Anne Tomasevich's post [Optimizing Jekyll Performance with Gulp](http://savaslabs.com/2016/10/19/optimizing-jekyll-with-gulp.html), I set out determine what parts of my site's build process could use some love.

At the time of testing my site contained roughly:

- 1,014 images generated at different sizes.
- 6,986 total images.
- 1052 total documents (991 posts / 14 pages / 3 sets of collections).
- 535 comments stored as YAML data files.

And was built with the following Jekyll plugins: [jekyll-picture-tag][jekyll-picture-tag], [sort_name][sort_name], [jekyll-archives][jekyll-archives], [jekyll-assets][jekyll-assets], [jekyll/tagging][jekyll/tagging], [jekyll-tagging-related_posts][jekyll-tagging-related_posts], [jekyll-sitemap][jekyll-sitemap], and [jemoji][jemoji].

Using Jekyll's profiler flag `--profile` I measured how long the following tasks took to complete[^3-trials]. Each time running `jekyll clean` prior to wipe `_site`, `.asset-cache` and any other `.tmp` folders.

[^3-trials]: Each task was run 3 times and averaged as the values produced by `jekyll build --profile` varied quite a bit.

| Task description | Windows | Mac |
| --- | ---: | ---: |
| Generate responsively sized `page.image.feature` images | 1288.29s | 1429.26s |
| Minify HTML with `layout: compress` | 39.35s | 11.18s |
| Read `/images/` and copy to `_site/` | 32.39s | 23.63s |
| Build tag pages with jekyll-archives | 17.40s | 9.99s |
| Build tag index page with `sort_tag` filter | 2.62s | 0.59s |
| List related posts with [jekyll-tagging-related_posts][jekyll-tagging-related_posts], [jekyll/tagging][jekyll/tagging], and `LSI: true` | 38.36s | 17.87s |
| List related posts with vanilla `related_posts` | 1.65s | 4.90s |
| Preprocess, concatenate, minify, and cache bust SCSS and JS with [jekyll-assets][jekyll-assets] | 78.75s | 25.03s |
| Display masthead and overlay menu from `_data` | 9.66s | 7.82s |
| List post comments from `_data` | 7.10s | 2.22s |
| Display colophon from `_data` | 0.20s | 0.49s |
| List post taxonomy metadata | 3.48s | 1.18s |
| List post breadcrumb links | 2.83s | 1.03s |
| List featured posts | 0.20s | 0.44s |
| Build style guide collection | 1.16s | 0.31s |
| List post social sharing links | 5.09s | 0.97s |

{% include notice type="info" content="
#### Is Jekyll faster on macOS or Windows?

For giggles I also tested my Windows and Mac development environments against each other. While not exactly an apples to apples comparison I thought it would be interesting to note any variations.

| Windows Environment | Mac Environment |
| --- | --- |
| Lenovo ThinkStation E30 | iMac 21.5-inch, Late 2013 |
| Processor 3.30 GHz Intel Xeon E31245 | Processor 2.7 GHz Intel Core i5 |
| Memory 16 GB | Memory 16 GB 1600 MHz DDR3 |
| Intel SSDSA2BW160G3L 137GB | 1.12 TB Fusion Drive |
| Windows 7 Professional Service Pack 1 | OS X El Capitan 10.11.6 |
| ruby 2.2.4p230 [x64-mingw32] | ruby 2.1.0p0 (2013-12-25 revision 44422) [x86_64-darwin12.0] |"
%}

## Optimization

The numbers above don't lie. Relying on Jekyll and friends to do jobs more suited for a task runner like [**Gulp**][gulpjs] was slowing the build down. Time to fold [Gulp][gulpjs] into the build process and let Jekyll do what it was meant to --- convert Markdown into HTML files.

The added benefit being if this worked out to be faster I'd have a set of content that was more portable and not reliant on Jekyll. In the off-chance I wanted to swap it for another static-site generator like [**Hugo**](https://gohugo.io/) or [**Gatsby**](https://github.com/gatsbyjs/gatsby), I could.

### CSS and JavaScript Assets

[**Jekyll Assets**][jekyll-assets] is a great plugin that served me well for a long time by. It's also painfully slow when you have a site of my size and are trying to iterate on CSS changes quickly.

Making a change to a Sass partial would trigger a full site rebuild, which meant waiting at least 2 minutes before I could preview it. There has to be a better way... [Gulp][gulpjs] + [Browsersync][browsersync].

The goal was to have CSS or JavaScript changes pushed instantly to the browser without forcing a rebuild. To do this I configured a set of tasks to preprocess, vendor prefix, and concatenate these assets into a temporary location that Browsersync would watch.

Everything the [Jekyll Assets][jekyll-assets] plugin did, could be replaced with faster Gulp tasks:

- [**node-sass**][node-sass] and [**gulp-sass**][gulp-sass]: natively compile SCSS files to CSS.
- [**gulp-autoprefixer**][gulp-autoprefixer]: vendor prefix CSS.
- [**gulp-cssnano**][gulp-cssnano]: minify CSS.
- [**gulp-concat**][gulp-concat]: concatenate JavaScript.
- [**gulp-uglify**][gulp-uglify]: minify JavaScript with UglifyJS.
- [**gulp-sourcemaps**][gulp-sourcemaps]: add source maps for CSS and JS.
- [**gulp-gzip**][gulp-gzip]: gzip CSS and JS.
- [**gulp-rev**][gulp-rev]: append hash to CSS and JS filenames for cache busting.

| Task description | Jekyll Assets | Gulp |
| --- | ---: | ---: |
| CSS and JavaScript asset pipeline | 25.031s | 1.577s |

Here's a small taste of the [Gulp file](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulp/tasks/assets.js) I'm using for the site's styles:

```javascript
// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes,
//   minifies, and cache busts it (does not create a Sourcemap)
gulp.task('styles', () => {
  return gulp.src([paths.sassFiles + '/style.scss'])
    .pipe(when(!argv.prod, sourcemaps.init()))
    // preprocess Sass
    .pipe(sass({precision: 10}).on('error', sass.logError))
    // add vendor prefixes
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions', '> 5%', 'IE 9']})]))
    // minify for production
    .pipe(when(argv.prod, when('*.css', cssnano({autoprefixer: false}))))
    .pipe(size({showFiles: true}))
    // output sourcemap for development
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest(paths.sassFilesTemp)))
    // hash CSS for production
    .pipe(when(argv.prod, rev()))
    .pipe(when(argv.prod, size({showFiles: true})))
    // output hashed files
    .pipe(gulp.dest(paths.sassFilesTemp))
    // generate manifest of hashed CSS files
    .pipe(rev.manifest('css-manifest.json'))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.dataFolderName))
    .pipe(when(argv.prod, size({showFiles: true})))
    .pipe(when(!argv.prod, browserSync.stream()))
});

// function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open site in browser and watch for changes
//   in source files and update them when needed
gulp.task('serve', (done) => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    port: 4000, // change port to match default Jekyll
    ui: {
      port: 4001
    },
    server: [paths.tempFolderName, paths.siteFolderName]
  });
  done();

  // watch various files for changes
  gulp.watch(paths.sassFilesGlob, gulp.series('styles', reload));
});
```

### Image Assets

Resizing a thousand or so images just to serve them responsively is no joke --- taking over 20 minutes to complete in my site's case. Up until now I was using the [Jekyll Picture Tag][jekyll-picture-tag] plugin to do this work for me.

To try and see if [Node][nodejs] and [Gulp][gulpjs] could do this faster I came up with a set of Gulp tasks to:

1. Generate thousands of feature images a 4 different sizes with [**gulp-responsive**](https://github.com/mahnunchik/gulp-responsive).
2. Optimize all images using [**gulp-imagemin**](https://github.com/sindresorhus/gulp-imagemin).
3. Save the optimized images directly to the destination folder, bypassing Jekyll completely.

This helped some, but it wasn't until I [dropped GraphicsMagick](https://github.com/mmistakes/made-mistakes-jekyll/commit/56bbd9bf5429a269047a41e045cc2ef0bf34e62b) for [Sharp](https://github.com/lovell/sharp)[^sharp-gif] did I see a noticeable improvement...

[^sharp-gif]: Sharp is super fast, but only resizes JPEG, PNG, WebP, and TIFF images... no GIF. It's also a pain in the ass to install on Windows due to [`node-gyp`](https://github.com/nodejs/node-gyp).

{% include notice type="info" content="
#### Sharp Really is as Fast as they Say

I shaved 18 minutes off my build time using this high speed [Node.js](https://nodejs.org/en/) module!

| Task description | GraphicsMagick | Sharp |
| --- | ---: | ---: |
| Resize and optimize 1,014 source images into 5 target sizes | 1288.29s | 171.00s |"
%}

The other missing piece was generating the necessary markup for responsive images[^rwd-images]. Because I was no longer using `{% raw %}{% picture %}{% endraw %}` tag to output a fully formed [`<picture>` element](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), I had to roll my own responsive image markup. 

[^rwd-images]: In the last couple of years several "cloud" solutions have emerged to make serving responsively sized images easier. [**Cloudinary**](http://cloudinary.com/)(free plan), [**imgix**](https://www.imgix.com/)(paid plans), and [**ImageEngine**](free plan) just to name a few.

```html
{% raw %}{% if page.image.feature %}
  {% assign f = page.image.feature | split: '.' %}
  <img src="{{ site.url }}{{ f[0] }}-320.{{ f[1] }}"
       srcset="{{ site.url }}{{ f[0] }}-768.{{ f[1] }} 768w,
               {{ site.url }}{{ f[0] }}-1024.{{ f[1] }} 1024w,
               {{ site.url }}{{ f[0] }}.{{ f[1] }} 1920w"
       alt="{{ page.title }}">
{% endif %}{% endraw %}
```

This bit of Liquid takes the filename as defined by `page.image.feature`, splits it at the extension, appends suffixes that match those used in the gulp-responsive task, and adds them to the `srcset` attribute. :boom: resolution switching images!

{% include notice type="warning" content="
#### Liquid Limitations

This Gulp + Liquid hybrid isn't as nice as a plugin since there is no logic to actually verify if `-lq`, `-320`, `-768`, or `-1024` versions of the images exist. I'm willing to look passed that since it did shave 16 minutes off my build time :wink:."
%}

### Simplify Layouts

With the bulk of the time savings coming from faster image resizing tasks, I went after some low-hanging fruit next by [decluttering my layouts](https://github.com/mmistakes/made-mistakes-jekyll/issues/81). Anything that detracted from the main content or added visual noise to the page was fair game for removal.

#### Remove Social Sharing Module

Including buttons at the bottom (or top of post) didn't really boost my content on Twitter or Facebook, so I dropped them. If someone really wants to share it on social media they'll use the built-in methods of iOS/Android or copy/paste the old fashioned way.

#### Replace `layout: compress`

On occasion things on the site would break if inline JavaScript with `//` comments was used. This was due to how the [`compress` layout](http://jch.penibelst.de/) was reducing whitespace with a complex set of Liquid filters.

The fix is easy, just surround inline JavaScript comments with `/* */` instead. Even better, switch to [**gulp-htmlmin**][gulp-htmlmin] and [**gulp-gzip**][gulp-gzip] to knock file sizes even more.

```javascript
// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
gulp.task('html', () => {
  return gulp.src(paths.siteFolderName + paths.htmlPattern)
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, size({title: 'optimized HTML'})))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
    .pipe(when(argv.prod, gzip({append: true})))
    .pipe(when(argv.prod, size({
      title: 'gzipped HTML',
      gzip: true
    })))
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
});
```

{% include notice type="warning" content="
#### Minifying HTML with Gulp

In my tests replacing Liquid filters found in `layout: compress` with Gulp tasks to minify and gzip every HTML file ended up being slower. The extra 30 seconds of build time were worth it for me though...

| Task description | compress layout | gulp-html and gulp-gzip |
| --- | | ---: | ---: | ---: |
| Minify HTML files | 39.348s | 47.00s |"
%}

#### Reduce and Refactor JavaScript

I'm close to ditching jQuery and going vanilla, but I'm not there yet. Where possible I ditched jQuery plugins and [replaced with "lighter" alternatives](https://github.com/mmistakes/made-mistakes-jekyll/issues/84). Here's a few highlights:

- Replaced [**Magnific Popup**](https://github.com/dimsemenov/Magnific-Popup) with [**Lity**](http://sorgalla.com/lity/).
- Replaced [**Lazyload**](https://github.com/verlok/lazyload) with [**Lazysizes**](https://github.com/aFarkas/lazysizes) + [Lazysizes responsive images polyfill extension](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/respimg).
- Added [**SVG 4 Everybody**](https://github.com/jonathantneal/svg4everybody) for external SVG spritemap support.
- Replaced [**FitVids.JS**](http://fitvidsjs.com/) with responsive embed CSS and a custom Jekyll [video embed tag](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/src/_plugins/video_embed.rb).

### Results

Decoupling the asset pipeline from Jekyll and Gulp-ifying it was the biggest improvement made. Updates to CSS, JavaScript, images and icons could be previewed almost instantly now with [Browsersync](browsersync). Greatly speeding up the time it took to redesign and develop the site.

{% include notice type="info" content="
#### Made Mistakes Gulpfiles

Set of Gulp tasks were heavily inspired by Sondre Nilsen's [**Jekyllized Yeoman generator**](https://github.com/sondr3/generator-jekyllized). The main [`gulpfile.js`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulpfile.js) is broken down into [smaller bits](https://github.com/mmistakes/made-mistakes-jekyll/tree/master/gulp/tasks): assets, build, clean, copy, html, images, and uploading.

With [`paths.js`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulp/paths.js) assigning all of the various paths used throughout the files to DRY things up."
%}

*[DRY]: Don't Repeat Yourself is a principle of software development, aimed at reducing repetition of information of all kinds, especially useful in multi-tier architectures.

## Automation

Describe rationale for integrating Travis CI into build/deployment process.

## Other Jekyll Related Housekeeping

### Pagination Upgrades

Describe rational for pagination and the benefits of using jekyll-paginate-v2 over the stock Jekyll pagination plugin.

### Post Navigation Restricted by Category

### Lazyload Tag

Custom Jekyll plugin to defer the loading of images and video embeds using [**lazysizes**](https://github.com/aFarkas/lazysizes) for improved page performance.

| Attribute  | Required     | Description |
| ----       | --------     | ----------- |
| `data-src` | **Required** | Full path to image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally. |
| `src`      | Optional     | Full path to low-quality image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally. Defaults to inline transparent `.gif`. |
| `alt`      | Optional     | Image alternate text. |

**Example:**

```liquid
{% raw %}{% lazyload data-src="/assets/images/my-image.jpg" src="/assets/images/my-image-low-quality.jpg" alt="my lazyloaded image" %}{% endraw %}
```

### Responsive Video Embed Tag

Custom Jekyll plugin to embed a video from YouTube or Vimeo that responsively sizes to fit the width of its parent using [`/_plugins/video_embed.rb`](src/_plugins.video_embed.rb).

Embeds are also lazyloaded to improve page performance.

#### YouTube Embed

To embed the following YouTube video at url `https://www.youtube.com/watch?v=fFX1CUO472U` (long version) or `https://youtu.be/fFX1CUO472U` (short version) into a post or page's main content you'd use: 

```liquid
{% raw %}{% youtube fFX1CUO472U %}{% endraw %}
```

#### Vimeo Embed

To embed the following Vimeo video at url `https://vimeo.com/97649261` into a post or page's main content you'd use: 

```liquid
{% raw %}{% vimeo 34948855 %}{% endraw %}
```

### Simplified Breadcrumbs

YAML Front Matter example:

```yaml
breadcrumbs:
  - label: "Blog Articles"
    url: /articles/
```

Pulled in on the page like so:

```html
{% raw %}{% if page.breadcrumbs %}
  {% assign crumb = page.breadcrumbs[0] %}
  <a href="{{ crumb.url }}"><strong>{{ crumb.label }}</strong></a>
{% endif %}{% endraw %}
```

Which could be modified to something like this if your breadcrumbs went deeper than a single level:

```yaml
breadcrumbs:
  - label: "Level 1"
    url: /level-1/
  - label: "Level 2"
    url: /level-2/
```

Sample `for` loop that you'll want to markup and style accordingly:

```html
{% raw %}{% if page.breadcrumbs %}
  <ul class="breadcrumbs">
    {% for crumb in page.breadcrumbs %}
      <li><a href="{{ crumb.url }}">{{ crumb.label }}</a></li>
    {% endfor %}
  </div>
{% endif %}{% endraw %}
```

[jekyll-picture-tag]: https://github.com/robwierzbowski/jekyll-picture-tag
[sort_name]: https://github.com/mmistakes/made-mistakes-jekyll/blob/master/src/_plugins/sort_name.rb
[jekyll-archives]: https://github.com/jekyll/jekyll-archives
[jekyll-assets]: https://github.com/jekyll/jekyll-assets
[jekyll/tagging]: https://github.com/pattex/jekyll-tagging
[jekyll-tagging-related_posts]: https://github.com/toshimaru/jekyll-tagging-related_posts
[jekyll-sitemap]: https://github.com/jekyll/jekyll-sitemap
[jemoji]: https://github.com/jekyll/jemoji
[nodejs]: https://nodejs.org/en/
[gulpjs]: http://gulpjs.com/
[browsersync]: https://www.browsersync.io/
[node-sass]: https://github.com/sass/node-sass
[gulp-sass]: https://github.com/dlmanning/gulp-sass
[gulp-cssnano]: https://github.com/ben-eb/gulp-cssnano
[gulp-autoprefixer]: https://github.com/sindresorhus/gulp-autoprefixer
[gulp-concat]: https://github.com/contra/gulp-concat
[gulp-sourcemaps]: https://github.com/gulp-sourcemaps/gulp-sourcemaps
[gulp-uglify]: https://github.com/terinjokes/gulp-uglify
[gulp-gzip]: https://github.com/jstuckey/gulp-gzip
[gulp-rev]: https://github.com/sindresorhus/gulp-rev
[gulp-htmlmin]: https://github.com/jonschlinkert/gulp-htmlmin
