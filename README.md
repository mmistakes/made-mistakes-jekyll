# [Made Mistakes](http://mademistakes.com) Source Code

This is the source code of Made Mistakes, a personal blog and portfolio built with [Jekyll](http://jekyllrb.com) and a starter I call [Skinny Bones](https://github.com/mmistakes/skinny-bones-jekyll).

*Please note: Made Mistakes hasn't been "themed" like some of my other [Jekyll repos](https://mademistakes.com/work/jekyll-themes/) and isn't compatible with the "default" GitHub Pages workflow without substantial alterations.*

### Plugins Used

- [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap) (GitHub Pages supported)
- [Jekyll Archives](https://github.com/jekyll/jekyll-archives)
- [Jemoji](https://github.com/jekyll/jemoji)
- [Jekyll Paginate v2](https://github.com/sverrirs/jekyll-paginate-v2)

### Images

[Made Mistakes](https://mademistakes.com) has a lot of image assets. `src/assets/images/` has been split into its [own repo](https://github.com/mmistakes/made-mistakes-images) and included as a Git submodule.

`page.feature.images` should be placed in `src/assets/images/feature`. These `feature` images will be converted into various sizes to be responsively served by browsers that support [`srcset` attribute](https://responsiveimages.org/).

### Local Development

Let Jekyll do what it does best and transform your content into HTML. Asset management is handled by Gulp:

- build `style.css` (preprocess SCSS, add vendor prefixes, concatenate, minify, hash, and gzip)
- build critical path CSS
- build `index.js` (concatenate, minify, hash, and gzip)
- optimize images
- optimize and resize `feature` images
- optimize and combine SVG icon set
- serve site with Browser Sync
- deploy site to production via Rsync
- submit XML sitemap to Google & Bing

Default structure (modify paths in `gulpfile.js` and `_config.yml` if altered):

```bash
├── gulp                      # => gulp tasks
├── src                       # => source Jekyll files and assets
|  ├── _includes
|  ├── _layouts
|  ├── _plugins
|  ├── ...
|  ├── _posts
|  ├── assets
|  |  ├── icons
|  |  ├── images
|  |  |   └── feature
|  |  ├── javascript
|  |  |   ├── plugins
|  |  |   ├── vendor
|  |  |   └── main.js
|  |  ├── stylesheets
|  |  |   ├── vendor
|  |  |   ├── ...
|  |  |   └── style.scss
├── .editorconfig
├── .gitignore
├── _config.dev.yml
├── _config.yml
├── Gemfile
├── gulpfile.js
├── package.json
├── rsync-credentials.json
├── ...
```

## Getting Started

### Dependencies:

- **Ruby**: >2.0 with Bundler >1.10
- **Node**: >4.2 and Yo >1.7.0
- **Gulp**: Since the release candidate is running Gulp 4.0 you need to install `gulp-cli`: `npm install gulp-cli -g`

**Step 1:** Install [Bundler](http://bundler.io/), then run `bundle install`.

**Step 2:** Install **GraphicsMagick**.

### Ubuntu:

```
apt-get install graphicsmagick
```

### macOS (using Homebrew):

```
brew install graphicsmagick
```

### Windows (XP, Vista, 7, 8, and 10) 32- or 64-bit:

Decide upon [Q8 or Q16](http://www.graphicsmagick.org/INSTALL-windows.html#retrieve-install-package):

> A Q8 version is fine for processing typical photos intended for viewing on a computer screen. If you are dealing with film, scientific, or medical images, use ICC color profiles, or deal with images that have limited contrast, then the Q16 version is recommended.

[Download](http://www.graphicsmagick.org/download.html/) and Install, be sure that "Update executable search path" is checked during installation.

**Step 3.** Install [Node.js](https://nodejs.org/en/), then run `npm install`.

**Step 4.** To start run `gulp`. A development version of the site should be generated and opened in a browser with Browser Sync at `http://localhost:4000`.

## Usage

### `gulp [--prod]`

This is the default command, and probably the one you'll use the most. This
command will build your assets and site with development settings. You'll get
sourcemaps, your drafts will be generated. As you are changing your posts, pages and assets they will
automatically update and inject into your browser via [BrowserSync][browsersync].

> `--prod`

Once you are done and want to verify that everything works with production
settings you add the flag `--prod` and your assets will be optimized. Your CSS,
JS and HTML will be minified and gzipped, plus the CSS and JS will be cache
busted. The images will be compressed and Jekyll will generate a site with all
your posts and no drafts.

### `gulp build [--prod]`

This command is identical to the normal `gulp [--prod]` however it will not
create a BrowserSync session in your browser.

### `gulp (build) [--prod]` main subtasks

> `gulp jekyll [--prod]`

Without production settings Jekyll will only create both future posts and drafts. 
With `--prod` none of that is true and it will generate all your posts.

> `gulp styles|scripts [--prod]`

Both your CSS and JS will have sourcemaps generated for them under development
settings. Once you generate them with production settings sourcemap generation
is disabled. Both will be minified, gzipped and cache busted with production
settings.

> `gulp images`

Optimizes and caches your images. This is a set it and forget it command for the
most part.

> `gulp images:feature`

Similar to the previous task but for `feature` images. Resizes each image into various
sizes to be served responsively with `<img>` `srcset` or `<picture>` elements.

> `gulp html --prod`

**Does nothing without `--prod`.** Minifies and gzips your HTML files.

> `gulp serve`

If you just want to watch your site you can run this command. If wanted you can
also edit the `serve` task to allow it to tunnel via [localtunnel][localtunnel]
so people outside your local network can view it as well:

```js
  // tunnel: true,
```

You can also change the behavior for how it opens the URL when you run `gulp
[--prod]`, you can see the options [here][browsersync-open]:

```js
  // open: false,
```

### `gulp icons`

SVG assets are optimized and smashed together into `_includes/icons.svg` and can be referenced by name. 
To update or add new assets place appropriately named `.svg` files into the `src/assets/svg` folder.

### `gulp deploy`

When you're done developing and have built your site with either `gulp --prod`
or `gulp build --prod` you can deploy your site with Rsync.

If you need any help with configuring it, checkout the [`gulp-rsync`][rsync] repo.

> `gulp submit:sitemap`

Submit sitemap XML file to Google and Bing.

### `gulp check`

Runs `bundle exec jekyll doctor` to look for potential errors.

### `gulp clean`

Deletes your assets from their `.tmp` directory as well as in `dist` and deletes
any gzipped files. **NOTE:** Does not delete your images from `.tmp` to reduce
the time to build your site due to image optimizations.

### `gulp rebuild`

Only use this if you want to regenerate everything, this will delete everything 
(images, assets, your generated Jekyll site). You really shouldn't need to do
this unless you have phantom image assets floating around you want to clear.

### `gulp critical`

Extract critical path CSS from `article`, `glitch`, and `archive` pages to inline 
via Jekyll `_includes`.

**Note:** Clear `critical-<layout>.css` includes, run `gulp build`, then `gulp critical`.

## Subtasks

All of the subtasks lives in their own files in the `gulp` directory and are
named after what they do. You can edit or look at any of them to see how they
actually work. They're all commented.

## Inject more than one JavaScript file

If you want to split up your JavaScript files into say a `index.js` and a
`vendor.js` file with files from [Bower][bower] you can do this quite easily. Create a
copy of the `scripts` gulp task and rename it to `scripts:vendor` and change the
`gulp.src` files you need:

```js
gulp.src([
  'bower_components/somelibrary.js/dist/somelibrary.js',
  'bower_components/otherthing.js/dist/otherthing.js'
])
```

and then change `.pipe(concat('index.js'))` into
`.pipe(concat('vendor.js'))`. Then you go to the bottom of the gulpfile and
change the `assets` task:

```js
gulp.task('assets', gulp.series(
  gulp.series('clean:assets'),
  gulp.parallel('styles', 'scripts:vendor', 'scripts', 'fonts', 'images')
));
```

Notice the `scripts:vendor` task that has been added. Also be ware that things
are injected in alphabetical order, so if you need your vendor scripts before
the `index.js` file you have to either rename the `index.js` file or rename the
`vendor.js` file. When you now run `gulp` or `gulp build` it will create a
`vendor.js` file and automatically inject it at the bottom of your HTML. When
running with `--prod` it'll automatically optimize as well.

For more advanced uses, refer to the [`gulp-inject`][inject] documentation on
how to create individual inject tags and inject specific files into them.

**Gulp tasks inspired by [generator-jekyllized](https://github.com/sondr3/generator-jekyllized) by [Sondre Nilsen](https://github.com/sondr3).**

[awspublish]: https://github.com/pgherveou/gulp-awspublish
[browsersync]: https://github.com/shakyShane/browser-sync
[browsersync-open]: https://browsersync.io/docs/options/#option-open
[contribute]: https://github.com/sondr3/generator-jekyllized/blob/master/CONTRIBUTING.md
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
[frequentlyasked]: https://github.com/sondr3/generator-jekyllized#frequently-asked-questions
[gulp]: http://gulpjs.com/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/master/generators/gulp/templates/gulpfile.js
[inject]: https://github.com/klei/gulp-inject
[jekyll-url]: http://jekyllrb.com/docs/github-pages/#project-page-url-structure
[jekyll]: https://jekyllrb.com
[libsass]: https://github.com/hcatlin/libsass
[localtunnel]: http://localtunnel.me/
[rsync]: https://github.com/jerrysu/gulp-rsync
[yeoman]: http://yeoman.io
[npm-image]: https://badge.fury.io/js/generator-jekyllized.svg
[npm-url]: https://npmjs.org/package/generator-jekyllized
[travis-image]: https://travis-ci.org/sondr3/generator-jekyllized.svg?branch=master
[travis-url]: https://travis-ci.org/sondr3/generator-jekyllized
[coveralls-image]: https://coveralls.io/repos/sondr3/generator-jekyllized/badge.svg
[coveralls-url]: https://coveralls.io/r/sondr3/generator-jekyllized

---

### Posts and Pages

By default Google AdSense is enabled on all posts and pages. To disable add `ads: false` to the YAML Front Matter.

Comments are disabled by default. To enable add `comments: true` to the YAML Front Matter.

Preferred method is to add as YAML Front Matter defaults to `_config.yml`.
