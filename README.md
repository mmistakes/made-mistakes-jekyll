Source Code of Made Mistakes at [mademistakes.com](http://mademistakes.com)
===========================================================================

This is the source code of Made Mistakes, a personal blog and portfolio on http://mademistakes.com, hosted by 
[Media Temple](http://mediatemple.net/#a_aid=51686252ceb4c).

Setup
-----

## Jekyll

The following terminal command will also install Jekyll and any required RubyGems if you have [Bundler](http://gembundler.com/) installed.

Or you can just install [Jekyll](http://jekyllrb.com/) via [RubyGems](http://rubygems.org/)

``` bash
$ gem install jekyll
```
## Jekyll Dependencies

Then you'll want to install the [Jekyll-minibundle](https://github.com/tkareine/jekyll-minibundle) RubyGem to do fun stuff like concatenate and cache-bust your CSS and JavaScript files. This plugin requires Ruby 1.9.3 so if you don't want to use it just remove the `{% ministamp %}` Liquid tags in `head.html` and `scripts.html`.


``` bash
$ bundle install
```

## Useful Commands

Run Jekyll:
``` bash
$ jekyll
```

Start a Jekyll server at <http://localhost:4000/>, (make sure to enable this url in `_config.yml` so all assets and images have correct absolute url's via the `{{ site.url }}` Liquid tag:
``` bash
$ jekyll --server

Minify all .html files in `_site` folder using HTML-compressor:
``` bash
$ rake minify
```

## Deploy

Nothing fancy here.

1. Enable correct `{{ site.url }}` in `_config.yml` (ie: http://mademistakes.com)
2. Run Jekyll `$ jekyll`
3. Minify HTML `$ rake minify`
4. FTP the contents of the `_site` folder to your webserver

License
-------

All original content (ie: articles, blog posts, illustrations, artwork, photographs, code) available on Made Mistakes is released under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.en_US) unless otherwise noted. Basically this means you are free to share, transmit, distribute, alter, transform, and build on my work just as long as you don't use it for commercial purposes $$$ or pass it off as your own though. So don't be a dick and clone my site please.