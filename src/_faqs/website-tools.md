---
title: "What tools do you use to build your website?"
type: other
date: 2014-12-07
last_modified_at: 2017-01-17T12:24:24-05:00
comments: true
comments_locked: true
order: 1
---

A variety of tools and software are used to build Made Mistakes --- the biggies being an 21.5-inch Apple iMac, [Jekyll](http://jekyllrb.com), [Sublime Text](http://www.sublimetext.com), Adobe's Creative Suite, and [SourceTree](https://www.sourcetreeapp.com/).

I've been on a [static site generator]({{ site.url }}{% post_url /articles/2012-03-19-going-static %}) kick the last couple of years and use Jekyll to publish this page and everything else found on the site. The basic idea is I write a bunch of text in Markdown and Jekyll spits out a set of files[^files] that I upload to a webserver.

## As far as Jekyll plugins, I use the following:

- [**jekyll-sitemap**][sitemap]: silently generates a [sitemaps.org](http://www.sitemaps.org/) compliant sitemap.
- [**jekyll-archives**][archives]: generates tag archive pages.
- [**jemoji**][jemoji]: adds GitHub-flavored emoji to Jekyll with the use of Liquid tags.
- [**jekyll-seo-tag**][seo]: adds metadata tags for search engines and social networks to better index and display site content.
- [**jekyll-paginate-v2**][jekyll-paginate-v2]: pagination replacement for the old [official Jekyll paginate](https://github.com/jekyll/jekyll-paginate) plugin.

If you're really interested in the specifics of how the site is built I've made its [source available on GitHub](https://github.com/mmistakes/made-mistakes-jekyll) for anyone to fork and download. And because I'm such a cool dude I've also open sourced a couple of [Jekyll themes]({{ site.url }}{% link _work/jekyll-themes.md %}) for you to use and abuse --- you're welcome!

## Scripts and jQuery Plugins

- [**BigFoot.js**][bigfoot]: jQuery plugin for displaying footnotes inline.
- [**FitVids.JS**][fitvids]: jQuery plugin for fluid width video embeds.
- [**Lazy Load**][lazyload]: delays the loading of gallery images for improve page performance.
- [**Lity**][lity]: lightweight, accessible, and responsive lightbox plugin.
- [**jQuery Smooth Scroll**][smoothscroll]: automatically make same-page links scroll smoothly.
- [**comment-reply.js**][comment-reply] modified from [**Wordpress.org**][wordpress].

## Hosting and Other Stuff

- Web hosting provided by [**Media Temple**][media-temple] via their [Grid -- Shared Hosting][grid-plan] plan.
- Domain name registered with [**Hover**][hover]
- Icons from [**SimpleIcon**][simpleicon] and [**Noun Project**][nounproject]

[^files]: HTML, CSS, and JavaScript files along with images and other assets needed to render a web page.
[sitemap]: https://github.com/jekyll/jekyll-sitemap
[archives]: https://github.com/jekyll/jekyll-archives
[media-temple]: http://bit.ly/1Ugg7nN
[grid-plan]: https://mediatemple.net/webhosting/shared/
[hover]: https://hover.com/E4nZJYVH
[simpleicon]: http://www.flaticon.com
[nounproject]: https://thenounproject.com
[twitter-emoji]: https://github.com/twitter/twemoji
[jemoji]: https://github.com/jekyll/jemoji
[seo]: https://github.com/jekyll/jekyll-seo-tag
[wordpress]: https://wordpress.org/
[bigfoot]: http://www.bigfootjs.com/
[fitvids]: https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=fitvids
[lazyload]: http://www.appelsiini.net/projects/lazyload
[lity]: http://sorgalla.com/lity/
[smoothscroll]: https://github.com/kswedberg/jquery-smooth-scroll
[comment-reply]: https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
[jekyll-paginate-v2]: https://github.com/sverrirs/jekyll-paginate-v2
