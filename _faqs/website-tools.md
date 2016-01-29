---
title: "What tools do you use to build your website?"
type: other
date: 2014-12-07
modified: 2016-01-22T08:31:06-05:00
order: 1
---

A variety of tools and software are used to build Made Mistakes --- the biggies being an 21.5-inch Apple iMac, [Jekyll](http://jekyllrb.com), [Sublime Text](http://www.sublimetext.com), and Adobe's Creative Suite.

I've been on a [static site generator]({{ site.url }}{% post_url 2012-03-19-going-static %}) kick the last couple of years and use Jekyll to publish this page and everything else found on the site. The basic idea is I write a bunch of text in MarkDown and Jekyll spits out a set of files[^files] that I upload to a webserver.

## As far as Jekyll plugins, I use the following:

* [**jekyll-sitemap**][sitemap]: silently generates a [sitemaps.org](http://www.sitemaps.org/) compliant sitemap.
* [**jekyll-archives**][archives]: generates tag archive pages.
* [**jekyll-assets**][assets]: adds an asset pipeline using Sprockets 3 to optimize and cache bust CSS and JS.
* [**related-posts-jekyll-plugin**][related-posts] - replaces Jekyll's `related_posts` function to use tags to calculate better post relationships.
* [**jekyll-picture-tag**][picture-tag]: adds responsive images to Jekyll with the use a Liquid tag to generate appropriately sized images in a `<picture>` element.
* **SVG `<use>` Liquid Tag**: adds a Liquid tag for easily inserting inline SVG icons with the `<use>` element.
{:.fl}

If you're really interested in the specifics of how the site is built I've made its [source available on GitHub](https://github.com/mmistakes/made-mistakes-jekyll) for anyone to fork and download. And because I'm such a cool dude I've also open sourced a couple of [Jekyll themes]({{ site.url }}{% post_url 2014-02-28-jekyll-themes %}) for you to use and abuse --- you're welcome!

## Hosting and Other Stuff

* Web hosting provided by [**Media Temple**][media-temple] via their [Grid -- Shared Hosting][grid-plan] plan.
* Domain name registered with [**Hover**][hover]
* Icons from [**SimpleIcon**][simpleicon] and [**Twitter Emoji**][twitter-emoji]
* Type set with system fonts[^fonts] for a faster reading experience. 
{:.fl}

[^files]: HTML, CSS, and JavaScript files along with images and other assets needed to render a web page.
[^fonts]: Georgia and Arial to be more specific.

[sitemap]: https://github.com/jekyll/jekyll-sitemap
[archives]: https://github.com/jekyll/jekyll-archives
[assets]: https://github.com/jekyll/jekyll-assets
[related-posts]: https://github.com/toshimaru/jekyll-tagging-related_posts
[picture-tag]: https://github.com/robwierzbowski/jekyll-picture-tag
[media-temple]: http://bit.ly/1Ugg7nN
[grid-plan]: https://mediatemple.net/webhosting/shared/
[hover]: https://hover.com/E4nZJYVH
[simpleicon]: http://www.flaticon.com
[twitter-emoji]: https://github.com/twitter/twemoji
