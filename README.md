# [Made Mistakes](https://mademistakes.com) Source Code

This is the source code of Made Mistakes, a personal blog and portfolio built 
with [Jekyll](http://jekyllrb.com) [Gulp](http://gulpjs.com/), and 
[Netlify](https://www.netlify.com/).

*Please note: Made Mistakes hasn't been "themed" like some of my other 
[Jekyll repos](https://mademistakes.com/work/jekyll-themes/) and isn't compatible 
with the "default" GitHub Pages workflow without substantial alterations.*

### Plugins used

- [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap) (GitHub Pages supported)
- [Jemoji](https://github.com/jekyll/jemoji)
- [Jekyll Paginate v2](https://github.com/sverrirs/jekyll-paginate-v2)
- [Jekyll TOC](https://github.com/toshimaru/jekyll-toc)

### Images

[Made Mistakes](https://mademistakes.com) has a lot of image assets. 
`src/assets/images/` has been split into its [own repo](https://github.com/mmistakes/made-mistakes-images) and included as a Git submodule.

`page.image.feature` should be placed in `src/assets/images/feature`. These 
`feature` images will be converted into various sizes to be responsively served 
by browsers that support the [`srcset` attribute](https://responsiveimages.org/).

### Content helpers

#### Notices

Call-out text. Accepts the following types: `info`, `danger`, `warning`, and `success`. See [style guide](https://mademistakes.com/style-guide/) for visual examples.

**Default notice example:**

```liquid
{% notice %}
Call out some text. **Markdown** is acceptable.
{% endnotice %}
```

**Danger notice example:**

```liquid
{% notice danger %}
**Danger! Danger!** Use caution.
{% endnotice %}
```

#### Figure

Easily generate `figure` elements with optional `caption` and `class` parameters.

**Examples:**

In simplest usage:

```liquid
{% figure %}
![Image](/path/to/image.jpg)
{% endfigure %}
```

```html
<figure>
  <img src="/path/to/image.jpg" alt="Image" />
</figure>
```

If a figure contains an image (or multiple images), the surrounding `<p>` will be stripped:

```liquid
{% figure %}
![Image](/path/to/image.jpg)
{% endfigure %}
```

```html
<figure>
  <img src="/path/to/image.jpg" alt="Image" />
</figure>
```

You can provide a caption. Any markdown will be rendered:

```liquid
{% figure caption:"*Markdown* caption" %}
![Image](/path/to/image.jpg)
{% endfigure %}
```

```html
<figure>
  <img src="/path/to/image.jpg" alt="Image" />
  <figcaption><em>Markdown</em> caption</figcaption>
</figure>
```

You can also provide a class name(es) for CSS styling:

```liquid
{% figure caption:"A caption" class:"classname" %}
![Image](/path/to/image.jpg)
{% endfigure %}
```

```html
<figure class="classname">
  <img src="/path/to/image.jpg" alt="Image" />
  <figcaption>A caption</figcaption>
</figure>
```

Finally, the caption parameter will accept liquid output markup:

```liquid
{% figure caption:"{{ page.title }}" %}
![Image](/path/to/image.jpg)
{% endfigure %}
```

```html
<figure>
  <img src="/path/to/image.jpg" alt="Image" />
  <figcaption>The title of my post</figcaption>
</figure>
```

#### Lazyload

Lazyload images using [**lazysizes**](https://github.com/aFarkas/lazysizes) 
until they're actually needed for improved page performance.

| Attribute  | Required     | Description                                                                                                                                             |
|------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-src` | **Required** | Full path to image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally.                                                    |
| `src`      | Optional     | Full path to low-quality image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally. Defaults to inline transparent `.gif`. |
| `alt`      | Optional     | Image alternate text.                                                                                                                                   |

**Example:**

```liquid
{% lazyload data-src="/assets/images/my-image.jpg" src="/assets/images/my-image-low-quality.jpg" alt="my lazyloaded image" %}
```

#### Responsive video embed

Embed a video from YouTube or Vimeo that responsively sizes to fit the width of 
its parent using [`/_plugins/video_embed.rb`](src/_plugins.video_embed.rb).

##### YouTube

To embed the following YouTube video at url `https://www.youtube.com/watch?v=XsxDH4HcOWA` 
(long version) or `https://youtu.be/XsxDH4HcOWA` (short version) into a post or 
page's main content you'd use: 

```liquid
{% youtube XsxDH4HcOWA %}
```

##### Vimeo

To embed the following Vimeo video at url `https://vimeo.com/97649261` into a 
post or page's main content you'd use: 

```liquid
{% vimeo 97649261 %}
```

### Local development

Let Jekyll do what it does best and transform your content into HTML. Asset 
management is handled by Gulp:

- build `style.css` (preprocess SCSS, add vendor prefixes, concatenate, minify, 
  hash, and gzip)
- build critical path CSS
- build `index.js` (concatenate, minify, hash, and gzip)
- optimize images
- optimize and resize `feature` images
- optimize and combine SVG icon set
- serve site locally for testing with Browser Sync
- deploy site to production server via Rsync
- submit XML sitemap to Google & Bing

Default structure (paths can be modified in `gulpfile.js` and `_config.yml`):

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

## Getting started

### Dependencies:

- **Ruby**: >2.1 with Bundler >1.10
- **Node**: >4.2 and Yo >1.7.0
- **Yarn**
- **Gulp**: Since the release candidate is running Gulp 4.0 you need to install 
  `gulp-cli`: `npm install gulp-cli -g`

**Step 1:** Install [Bundler](http://bundler.io/), then run `bundle install`.

**Step 2.** Install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/docs/install),
then run `yarn install`.

**Step 3:** Install [node-gyp](https://github.com/nodejs/node-gyp#installation).

**Step 4.** To start run `gulp`. A development version of the site should be 
generated and opened in a browser with Browser Sync at `http://localhost:4000`.

## Usage

### `gulp [--prod]`

This is the default command, and probably the one you'll use the most. This
command will build your assets and site with development settings. You'll get
sourcemaps, your drafts will be generated. As you are changing your posts, pages 
and assets they will automatically update and inject into your browser via 
[BrowserSync][browsersync].

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

> `gulp images:optimize`

Optimizes standard images and copies to `/dist` folder.

> `gulp images:feature`

Similar to the previous task but for images in `src/assets/images/feature`. 
Resizes each image into various sizes to be served responsively with `<img>` 
`srcset` or `<picture>` elements, optimizes, and then copies to `/dist` folder.

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

SVG assets are optimized and smashed together into `assets/icons/icons.svg` and can 
be referenced by name. To update or add new assets place appropriately named 
`.svg` files into the `src/assets/icons` folder.

### `gulp deploy`

When you're done developing and have built your site with either `gulp --prod`
or `gulp build --prod` you can deploy your site with Rsync.

If you need any help with configuring it, checkout the [`gulp-rsync`][rsync] repo.

> `gulp submit:sitemap`

Submit sitemap XML file to Google and Bing.

### `gulp check`

Builds site with production settings then tests HTML for broken links with 
[html-proofer][htmlproofer].

### `gulp clean`

Deletes your assets from their `.tmp` directory as well as in `dist` and deletes
any gzipped files. **NOTE:** Does not delete your images from `.tmp` to reduce
the time to build your site due to image optimizations.

### `gulp rebuild`

Only use this if you want to regenerate everything, this will delete everything 
(images, assets, your generated Jekyll site). You really shouldn't need to do
this unless you have phantom image assets floating around you want to clear.

### `gulp critical`

Extract critical path CSS from `home`, `archive`, `post`, and `page` layouts 
to inline via Jekyll `_includes`.

**Note:** Clear `critical-<layout>.css` includes, run `gulp build`, then `gulp critical`.

## Subtasks

All of the subtasks lives in their own files in the `gulp` directory and are
named after what they do. You can edit or look at any of them to see how they
actually work. They're all commented.

## Inject more than one JavaScript file

If you want to split up your JavaScript files into say a `index.js` and a
`vendor.js` file with files from [Bower][https://bower.io/] you can do this 
quite easily. Create a copy of the `scripts` gulp task and rename it to 
`scripts:vendor` and change the
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

Notice the `scripts:vendor` task that has been added. Also be aware that things
are injected in alphabetical order, so if you need your vendor scripts before
the `index.js` file you have to either rename the `index.js` file or rename the
`vendor.js` file. When you now run `gulp` or `gulp build` it will create a
`vendor.js` file and automatically inject it at the bottom of your HTML. When
running with `--prod` it'll automatically optimize as well.

For more advanced uses, refer to the [`gulp-inject`][inject] documentation on
how to create individual inject tags and inject specific files into them.

**Gulp tasks inspired by [generator-jekyllized](https://github.com/sondr3/generator-jekyllized) by [Sondre Nilsen](https://github.com/sondr3).**

[browsersync]: https://github.com/shakyShane/browser-sync
[browsersync-open]: https://browsersync.io/docs/options/#option-open
[gulp]: http://gulpjs.com/
[inject]: https://github.com/klei/gulp-inject
[jekyll-url]: http://jekyllrb.com/docs/github-pages/#project-page-url-structure
[jekyll]: https://jekyllrb.com
[localtunnel]: http://localtunnel.me/
[rsync]: https://github.com/jerrysu/gulp-rsync
[htmlproofer]: https://github.com/gjtorikian/html-proofer

---

### Posts and Pages

Comments are disabled by default. To enable add `comments: true` to the YAML 
Front Matter. Preferred method is to enable via YAML Front Matter defaults in `_config.yml`.

## License

The MIT License (MIT)

Copyright (c) 2004-2019 Michael Rose

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Made Mistakes incorporates icons from [The Noun Project](https://thenounproject.com/).
Icons are distributed under Creative Commons Attribution 3.0 United States (CC BY 3.0 US).
Home by Mahmure Alp from the Noun Project

Made Mistakes incorporates photographs from [Unsplash](https://unsplash.com).

Made Mistakes incorporates [Breakpoint](http://breakpoint-sass.com/).
Breakpoint is distributed under the terms of the [MIT/GPL Licenses](http://opensource.org/licenses/MIT).

Made Mistakes incorporates [Bigfoot](http://bigfootjs.com/),
Copyright (c) 2013-2014, Chris Sauve.
Bigfoot is distributed under the terms of the MIT License](http://opensource.org/licenses/MIT).

Made Mistakes incorporates [Lity](http://sorgalla.com/lity/),
Copyright (c) 2015-2016, Jan Sorgalla.
Lity is distributed under the terms of the MIT License](http://opensource.org/licenses/MIT).

Made Mistakes incorporates [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll),
Copyright (c) 2019, Chris Ferdinandi.
Smooth Scroll is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Made Mistakes incorporates [Lazysizes](https://github.com/aFarkas/lazysizes),
Copyright (c) 2015, Alexander Farkas.
Lazysizes is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Made Mistakes incorporates [SVG for Everybody](https://jonathantneal.github.io/svg4everybody/),
Copyright (c) Jonathan Neal.
SVG for Everybody is distributed under the terms of the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).
