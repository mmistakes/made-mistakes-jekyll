---
title: "What tools do you use to build your website?"
type: other
date: 2014-12-07
last_modified_at: 2016-11-14T21:06:21-05:00
comments: true
comments_locked: true
order: 1
---

A variety of tools and software are used to build Made Mistakes --- the biggies being an 21.5-inch Apple iMac, [Jekyll](http://jekyllrb.com), [Sublime Text](http://www.sublimetext.com), and Adobe's Creative Suite.

I've been on a [static site generator]({{ site.url }}{% post_url /articles/2012-03-19-going-static %}) kick the last couple of years and use Jekyll to publish this page and everything else found on the site. The basic idea is I write a bunch of text in Markdown and Jekyll spits out a set of files[^files] that I upload to a webserver.

## As far as Jekyll plugins, I use the following:

- [**jekyll-sitemap**][sitemap]: silently generates a [sitemaps.org](http://www.sitemaps.org/) compliant sitemap.
- [**jekyll-archives**][archives]: generates tag archive pages.
- [**jemoji**][jemoji]: adds GitHub-flavored emoji to Jekyll with the use of Liquid tags.
- [**jekyll-seo-tag**][seo]: adds metadata tags for search engines and social networks to better index and display site content.

If you're really interested in the specifics of how the site is built I've made its [source available on GitHub](https://github.com/mmistakes/made-mistakes-jekyll) for anyone to fork and download. And because I'm such a cool dude I've also open sourced a couple of [Jekyll themes]({{ site.url }}{% post_url /work/2014-02-28-jekyll-themes %}) for you to use and abuse --- you're welcome!

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
