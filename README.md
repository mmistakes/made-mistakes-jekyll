Source Code of [Made Mistakes](http://mademistakes.com)
===========================================================================

This is the source code of Made Mistakes, a personal blog and portfolio on http://mademistakes.com, hosted by 
[Media Temple](http://mediatemple.net/#a_aid=51686252ceb4c). My overall goal with the site design was to create visually interesting pages that look great and readable on mobile, tablet, and desktop viewports.

The article layouts are the most fleshed out and *finished*. Everything else works and get's the job done, but could use some more love.

## Install Jekyll

The following terminal command will install Jekyll and any required RubyGems if you have [Bundler](http://gembundler.com/) installed.

``` bash
$ bundle install
```

Or you can just install [Jekyll](http://jekyllrb.com/) via [RubyGems](http://rubygems.org/)

``` bash
$ gem install jekyll
```
## Jekyll Plugins

The only plugin that needs installing is the [Jekyll-minibundle](https://github.com/tkareine/jekyll-minibundle) RubyGem.The other plugins are already installed in the `_plugins` folder and should be set to go. 

### [Jekyll-minibundle](https://github.com/tkareine/jekyll-minibundle)

This plugin requires Ruby 1.9.3 so if you don't want to use it just remove the `{% ministamp %}` Liquid tags in `head.html` and `scripts.html`.

To install Jekyll-minibundle use the following terminal command:
``` bash
$ gem install jekyll-minibundle
```

### [related_posts](https://github.com/LawrenceWoodman/related_posts-jekyll_plugin)

Overrides the built in related_posts function to calculate related posts based on a posts’ tags. Used in `article.html` layout.

### [Sitemap.xml Generator](http://www.kinnetica.com/projects/jekyll-sitemap-generator/)

Generates a `sitemap.xml` file by traversing all of the available posts and pages.

### svg_mime_type

Serves SVG files with the correct MIME type when running `$ jekyll --server`.

## Adding Posts and Pages

There are three main content `_layouts` used on the site: `article.html`, `page.html`, and `paperfaces.html`.

### Articles and Pages

The `article.html` and `page.html` layouts are very similar --- both have large *feature* images that span the full-width of the screen, and both are meant for text heavy blog posts (or articles). They use [Picturefill](https://github.com/scottjehl/picturefill) to serve appropriately sized images for the feature area. For this to work you need your image saved in 4 different sizes (don't have to be these exact dimensions, just a guideline) with the following naming convention:

*	`feature-image-name-**s**.jpg` 320px x 160xp
*	`feature-image-name-**m**.jpg` 768px x 384px
*	`feature-image-name-**l**.jpg` 1024px x 512px
*	`feature-image-name-**xl**.jpg` 1280px x 640px

If you're lazy just replace the `picturefill.js` specific code in the article and page `_layouts`:

``` html
<div class="image-wrap">
  <div data-picture data-alt="{{ page.title }} article image">
        <div data-src="{{ site.url }}/images/{{ page.image }}-s.jpg"></div>
        <div data-src="{{ site.url }}/images/{{ page.image }}-m.jpg" data-media="(min-width: 480px)"></div>
        <div data-src="{{ site.url }}/images/{{ page.image }}-l.jpg" data-media="(min-width: 768px)"></div>
        <div data-src="{{ site.url }}/images/{{ page.image }}-xl.jpg" data-media="(min-width: 992px)"></div>
        <!--[if (lt IE 9) & (!IEMobile)]>
          <div data-src="{{ site.url }}/images/{{ page.image }}-l.jpg""></div>
        <![endif]-->
        <!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
        <noscript>
            <img src="{{ site.url }}/images/{{ page.image }}-m.jpg" alt="{{ page.title }} article image">
        </noscript>
    </div>
</div><!-- /.image-wrap -->
```

With something like this: 
``` html
<div class="image-wrap">
    <img src="{{ site.url }}/images/{{ page.image }}.jpg" alt="{{ page.title }} article image">
</div><!-- /.image-wrap -->
```

### Photo/Image Layout

Needs some love, but does work. There is some hard coding that will eventually need cleanup in `paperfaces.html` that are specific to the PaperFaces series of portraits I've been posting, but it can be easily adapted for photo galleries or portfolios.

## Useful Commands

Run Jekyll:
``` bash
$ jekyll
```

Start a Jekyll server at <http://localhost:4000/>, (make sure to enable this url in `_config.yml` so all assets and images have correct absolute url's via the `{{ site.url }}` Liquid tag:
``` bash
$ jekyll --server
```

Minify all .html files in `_site` folder using HTML-compressor:
``` bash
$ rake minify
```

## Deployment

Nothing fancy here.

1. Enable correct `{{ site.url }}` in `_config.yml` (ie: http://mademistakes.com)
2. Run Jekyll `$ jekyll`
3. Minify HTML `$ rake minify`
4. FTP the contents of the `_site` folder to your webserver

## License

All original content (ie: articles, blog posts, illustrations, artwork, photographs, code) available on Made Mistakes is released under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.en_US) unless otherwise noted. Basically this means you are free to share, transmit, distribute, alter, transform, and build on my work just as long as you don't use it for commercial purposes $$$ or pass it off as your own thing. So don't be a dick and make a carbon copy of my site please.
