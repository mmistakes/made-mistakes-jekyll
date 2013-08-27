# [Made Mistakes](http://mademistakes.com) Source Code

This is the source code of Made Mistakes, a personal blog and portfolio on http://mademistakes.com, hosted by 
[Media Temple](http://mediatemple.net/#a_aid=51686252ceb4c). My overall goal with the site design was to create visually interesting pages that look great and are readable on mobile, tablet, and desktop viewports.

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

### [Sitemap.xml Generator](http://www.kinnetica.com/projects/jekyll-sitemap-generator/)

Generates a `sitemap.xml` file by traversing all of the available posts and pages.

### svg_mime_type

Serves SVG files with the correct MIME type when running `$ jekyll --server`.

## Layouts

There are three main content `_layouts` used on the site: `post.html`, `page.html`, and `paperfaces.html`.

### Text layouts

The `post.html` and `page.html` layouts are very similar: both pull in large feature images when specified, and both are meant for text heavy blog posts (or articles). Adding the tag *feature* to a posts' front matter activates an alternate post layout that stretches the feature image and overlays the main content some. Ideal for posts you want to give more attention to.

### Photo/Image Layout

Needs some love, but does work. There is some hard coding in `paperfaces.html` that is specific to the PaperFaces series of portraits I've been posting, but it can be easily adapted for photo galleries or portfolios.

## Home and Index Pages

Home page uses the `home.html` layout and is designed to pull in the 15 most recent posts that are tagged `feature`. Articles page uses the `post-index.html` layout and is designed to display all posts in the category `articles`. The images that display to the right of each post title are 340x100 px and designated as `image.main` in each post's front matter.

#### Videos

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

``` html
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
```

## Useful Commands

Compile site:
``` bash
$ jekyll build
```

Start a Jekyll server at <http://localhost:4000/>, (make sure to enable this url in `_config.yml` so all assets and images have correct absolute url's via the `{{ site.url }}` Liquid tag:
``` bash
$ jekyll serve
```

Minify all .html files in `_site` folder using HTML-compressor:
``` bash
$ rake minify
```

## Deployment

Nothing fancy here.

1. Enable correct `{{ site.url }}` in `_config.yml` (ie: http://mademistakes.com)
2. Run Jekyll `$ jekyll build`
3. Minify HTML `$ rake minify`
4. FTP the contents of the `_site` folder to your webserver

## License

The following directories and their contents are released under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.en_US) unless otherwise noted. 

```
_posts
_images
```

Basically this means you are free to share, transmit, distribute, alter, transform, and build on my work just as long as you don't sell it as a theme or pass it off as your own work. Don't be a dick please.