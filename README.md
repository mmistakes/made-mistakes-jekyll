# [Made Mistakes](http://mademistakes.com) Source Code

This is the source code of Made Mistakes, a personal blog and portfolio built with [Jekyll](http://jekyllrb.com) and a starter I call [Skinny Bones](https://github.com/mmistakes/skinny-bones-jekyll).

*Please note: Made Mistakes hasn't been completely "themed" like some of my other [Jekyll repos](https://mademistakes.com/work/jekyll-themes/) and isn't GitHub Pages compatible. In some cases the Jekyll plugins may be safe to remove without breaking things while others may not fare as well.*

The two biggies likely to cause the most headaches are [Jekyll Archives](https://github.com/jekyll/jekyll-archives) and [Jekyll Assets](https://github.com/ixti/jekyll-assets). Archives auto-generates all of the tag pages so you'll need an alternative solution or just go without them if you turn that baby off.

Jekyll Assets is used to build, concatenate, and minify stylesheets and JavaScript. All of this can be done with Grunt or Gulp tasks instead if you prefer those workflows or you could simplify things and use Jekyll to pre-process your Sass partials. Either way it's doable with minor edits.

### Plugins Used

* [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap) (GitHub Pages supported)
* [Jekyll Archives](https://github.com/jekyll/jekyll-archives)
* [Jekyll Assets](https://github.com/ixti/jekyll-assets)
* [Jekyll Related Posts](https://github.com/jumanji27/related_posts-jekyll_plugin)
* [Jekyll Picture Tag](https://github.com/robwierzbowski/jekyll-picture-tag)
* SVG <use> Liquid Tag

### Images

[Made Mistakes](http://mademistakes.com) has a lot of image assets. `images/` has been split into its [own repo](https://github.com/mmistakes/made-mistakes-images) to reduce the size of this repo.

To generate responsively sized images and necessary `<picture>` element markup use the `{% picture %}` tag. These images should be placed in `images/_originals` along with a copy in `images`. The `_originals` will be converted into various sizes specified in `_config.yml` while the ones in `images` will remain untouched to be used in XML feeds, social sharing cards, etc. 

Make sure ImageMagick is installed for the Jekyll picture-tag plugin to work properly. Download the [Windows install binary](http://www.imagemagick.org/script/binary-releases.php#windows) or `brew install imagemagick` on Mac OS X.

### Local Development

1. Install dependencies `bundle install`
2. Run Jekyll server to preview in development mode `rake serve`.

To regenerate files `rake build-dev` and `rake drafts` to build posts in `_drafts` folder.

By default Jekyll's environment should be set to development but if not `JEKYLL_ENV=development bundle exec jekyll build` or `set JEKYLL_ENV=development` in `cmd.exe` on Windows.

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

To easily add inline SVG icons to a post or page use the following Liquid tag.

```
{% icon [name] %}
```

`{% icon smile %}` will output `<svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-smile"></use></svg>`

SVG assets are optimized and smashed together into `_includes/svg-icons.svg` and can be referenced by name (see table below).

To update or add new assets place appropriately named `.svg` files into the `_svg` folder and run `grunt svg` to optimize.

| Name                   | Description            | Example                                         |
| ---------------------- | ---------------------- | ------------------------------------------------|
| **amazon**             | Amazon logo            | ![Amazon](http://i.imgur.com/DLvnqFq.png)       |
| **bitcoin**            | BitCoin logo           | ![Bitcoin](http://i.imgur.com/2U2E8XP.png)      |
| **blank**              | blank face             | ![blank](http://i.imgur.com/xF6EwDn.png)        |
| **comments**           | chat bubble            | ![comments](http://i.imgur.com/vMK8dtw.png)     |
| **deal-with-it**       | sunglasses face        | ![deal with it](http://i.imgur.com/C67DMje.png) |
| **dollar-sign**        | dollar sign in circle  | ![dollar sign](http://i.imgur.com/bpUoSEi.png)  |
| **facebook**           | Facebook square logo   | ![Facebook](http://i.imgur.com/xUlOyEl.png)     |
| **github**             | GitHub octocat logo    | ![Github](http://i.imgur.com/vCaJrph.png)       |
| **google-plus**        | G+ logo                | ![Google+](http://i.imgur.com/ax3ygpb.png)      |
| **instagram**          | Instagram logo         | ![Instagram](http://i.imgur.com/jKceWJd.png)    |
| **meh**                | indifferent face       | ![indifferent](http://i.imgur.com/jhAWKKH.png)  |
| **paypal**             | PayPal logo            | ![PayPal](http://i.imgur.com/AaSzVUh.png)       |
| **rss**                | RSS icon               | ![RSS](http://i.imgur.com/EHD4YSc.png)          |
| **smile**              | smiley face            | ![smiley](http://i.imgur.com/Z0P08qm.png)       |
| **tumblr**             | Tumblr logo            | ![Tumblr](http://i.imgur.com/3OyG3Hk.png)       |
| **twitter**            | Twitter logo           | ![Twitter](http://i.imgur.com/mRmVsDI.png)      |
| **wink**               | wink face              | ![wink](http://i.imgur.com/Z9V5X5r.png)         |
| **youtube**            | YouTube logo           | ![YouTube](http://i.imgur.com/iQ1Z96T.png)      |
