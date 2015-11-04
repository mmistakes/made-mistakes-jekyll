# [Made Mistakes](http://mademistakes.com) Source Code

This is the source code of Made Mistakes, a personal blog and portfolio built with [Jekyll](http://jekyllrb.com) and a starter I call [Skinny Bones](https://github.com/mmistakes/skinny-bones-jekyll).

*Please note: Made Mistakes hasn't been completely "themed" like some of my other [Jekyll repos](https://mademistakes.com/work/jekyll-themes/) and isn't GitHub Pages compatible. In some cases the Jekyll plugins may be safe to remove without breaking things while others may not fare as well.*

The two biggies likely to cause the most headaches are [Jekyll Archives](https://github.com/jekyll/jekyll-archives) and [Jekyll Assets](https://github.com/ixti/jekyll-assets). Archives auto-generates all of the tag pages so you'll need an alternative solution or just go without them if you turn that baby off.

Jekyll Assets is used to build, concatenate, MD5 fingerprint, and minify stylesheets and JavaScript. All of this can be done with Grunt/Gulp instead if you prefer that workflow or you could simplify things and use Jekyll to preprocess your Sass partials. Either way it's doable with minor edits.

### Plugins Used

* [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap) (GitHub Pages supported)
* [Jekyll Archives](https://github.com/jekyll/jekyll-archives)
* [Jekyll Assets](https://github.com/ixti/jekyll-assets)
* [Jekyll Related Posts](https://github.com/jumanji27/related_posts-jekyll_plugin)
* [Jekyll Picture Tag](https://github.com/robwierzbowski/jekyll-picture-tag)

### Images

[Made Mistakes](http://mademistakes.com) has a lot of image assets. `images/` has been split into its [own repo](https://github.com/mmistakes/made-mistakes-images) to reduce the size of this repo.

To generate responsively sized images and necessary `<picture>` element markup use the `{% picture %}` tag. 

Original images should be placed in `images/_originals` to be converted into various sizes specified in `_config.yml`. Make sure ImageMagick is properly install for the Jekyll picture-tag plugin to work properly. Download the [Windows install binary](http://www.imagemagick.org/script/binary-releases.php#windows) or for Max OS X run `brew install imagemagick`.

### Local Development

1. Install dependencies `bundle install`
2. Run Jekyll server to preview `bundle exec jekyll serve --config _config.dev.yml --no-watch`. Good idea to disable auto-regeneration since the site is quite large and takes a few minutes to compile.

#### Home Page

The home page is made up of three parts:

`<root>/index.md`: here you will find the content that makes up the home page. It's 99% HTML to get the desired markup but the same result could probably be achieved with Kramdown if you add `{: .class-name}` to each of the required elements.

The *word slide* effect is achieved with some JavaScript and wrapping each of the adjectives in `<b></b>` elements inside of `.home__words-wrapper`. When JavaScript is disabled only the first word is visible.

`_layouts/home.html`: stripped down version of the default layout with the `.masthead` and `.colophon` removed.

`_sass/_home.scss`: home page specific styles.

#### Archives

To include the *Featured Posts* widget at the top of an archive page add the following to its YAML Front Matter and customize as necessary. 

```
feature:
  visible: true
  headline: "Featured Articles"
  category: articles
```

#### Posts and Pages

By default social sharing and Google AdSense are enabled on all posts and pages. To disable add `share: false` or `ads: false` to the YAML Front Matter.

Comments are disabled by default. To enable add `comments: true` to the YAML Front Matter.

#### SVG Icons

To easily add inline SVG icons to a post or page use the following include being sure to specify the icon by name.

```
{% include icon.html name="wink" %}
```

##### SVG Icons

| Name                   | Description            |
| ---------------------- | ---------------------- |
| **amazon**             | Amazon logo            |
| **bitcoin**            | BitCoin logo           |
| **blank**              | blank face             |
| **comments**           | chat bubble            |
| **deal-with-it**       | sunglasses face        |
| **dollar-sign**        | dollar sign in circle  |
| **facebook**           | Facebook square logo   |
| **github**             | GitHub octocat logo    |
| **google-plus**        | G+ logo                |
| **instagram**          | Instagram logo         |
| **meh**                | indifferent face       |
| **paypal**             | PayPal logo            |
| **rss**                | RSS icon               |
| **smile**              | smiley face            |
| **tumblr**             | Tumblr logo            |
| **twitter**            | Twitter logo           |
| **wink**               | wink face              |
| **youtube**            | YouTube logo           |
