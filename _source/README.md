# [Made Mistakes](http://mademistakes.com) Source Code

This is the source code of Made Mistakes, a personal blog and portfolio on http://mademistakes.com.

---

## Install Jekyll

The following terminal command will install Jekyll and any required RubyGems if you have [Bundler](http://gembundler.com/) installed.

``` bash
$ bundle install
```

Or you can just install [Jekyll](http://jekyllrb.com/) via [RubyGems](http://rubygems.org/)

``` bash
$ gem install jekyll
```

---

## Jekyll Plugins

The only plugin that needs installing is the [Jekyll-minibundle](https://github.com/tkareine/jekyll-minibundle) RubyGem. The other plugins should be good to go and are located in the `_plugins` folder. 

### [Jekyll-minibundle](https://github.com/tkareine/jekyll-minibundle)

This plugin is used to cachebust static assets like the site's stylesheets and scripts. It requires Ruby 1.9.3 so if you don't want to use it just remove the `{% ministamp %}` Liquid tags in `head.html` and `scripts.html`.

To install Jekyll-minibundle use the following terminal command:
``` bash
$ gem install jekyll-minibundle
```

### [Sitemap.xml Generator](https://github.com/kinnetica/jekyll-plugins)

Generates a `sitemap.xml` file by traversing all of the available posts and pages. The same could be done with Jekyll natively but I like the extra layers of customization this plugin provides.

### svg_mime_type

Serves SVG files with the correct MIME type when running `$ jekyll --server`, avoiding any errors when previewing locally.

---

## Layouts

There are three main content `_layouts` used on the site: `post.html`, `page.html`, and `work.html` that are all based off of `default.html`.

### Post and Page Layouts

The `post.html` and `page.html` layouts are very similar: both pull in large feature images when specified, and both are meant for text heavy blog posts (or articles).

### Portfolio and Image Layout (Work in Progress)

Currently a work in progress. Very similar to the `page.html` with some minor simplifications to the layout.

### Home and Index Layouts

Home page uses the `home.html` layout and is designed to pull in 6 posts (thumbnail image and title) that are tagged `feature` along with the a recent posts from the `articles` category. Articles index uses the `post-index.html` layout and is designed to display all posts in the category `articles`.

`work-index.html` displays all posts from the `work` category in a similar manner as the featured items on the homepage.

---

## Videos

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

``` html
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
```

---

## Useful Commands

Compile site:
``` bash
$ jekyll build
```

Compile site and all `_draft` posts:
``` bash
$ jekyll build --drafts
```

Start a Jekyll server at <http://localhost:4000/>, (make sure to enable this url in `_config.yml` so static assets are served properly.
``` bash
$ jekyll serve
```

Minify all .html files in `_site` folder using HTML-compressor:
``` bash
$ rake minify
```

Ping Ping-o-matic, Google, and Bing of new content:
``` bash
$ rake notify
```

Minify, rsync files, and Ping services
``` bash
$ rake deploy
```

### Grunt Build Script

Grunt build script will compile/minify the LESS files into `main.min.css` and concatenate/minify all scripts into `main.min.js`. [Install Node.js](http://nodejs.org/), then [install Grunt](http://gruntjs.com/getting-started), and then finally install the dependencies for the theme contained in `package.json`:

``` bash
npm install
```

From the site's root, use `grunt` to rebuild the CSS, concatenate JavaScript files, and optimize .jpg, .png, and .svg found in the `images` folder.

For local development `grunt watch` used in combination with `jekyll build --watch` will look for updates to .less and .js files that Grunt will then automatically re-build which will in turn cause Jekyll to auto generate a new `_site` folder for testing.

---

## License

The following directories and their contents are released under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.en_US) unless otherwise noted. 

```
_posts/
_drafts/
images/
```

Basically this means you are free to share, transmit, distribute, alter, transform, and build on my work just as long as you don't sell or pass it off as your own work. When in doubt ask [@mmistakes](http://twitter.com/mmistakes). Don't be a dick please.