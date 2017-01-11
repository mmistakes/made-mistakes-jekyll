---
title: "Jekyll Themes"
headline: "Jekyll Themes"
excerpt: "Minimally designed open source Jekyll themes to get you started with hosting a site with GitHub Pages --- for free!"
last_modified_at: 2016-10-27T11:22:29-04:00
image: 
  path: &image /assets/images/jekyll-themes-feature.jpg
  cover: /assets/images/jekyll-logo-20.jpg
  thumb: /assets/images/jekyll-themes-thumb-250x250.png
  teaser: /assets/images/jekyll-themes-teaser.png
tags: [Jekyll, web development, open source, GitHub]
work: "Design & Development"
order: 4
comments: true
comments_locked: true
---

As I continue to hack away at the design of Made Mistakes and improve on things, I try to release simplified Jekyll starters and themes after each major site revision.

The goal is to make things easier to build a Jekyll site using mine as a starter. Rather than having to sift through [my main repository](https://github.com/mmistakes/made-mistakes-jekyll) and strip out the cruft before making it your own.

{% include toc.html %}

Below are all of the Jekyll starters I've open sourced thus far. Each "theme" contains all of the `_layouts`, `_includes`, Sass/CSS, JavaScript, and other sample files needed to build a site or blog. There are a lot of similarities between how they work and the file organization --- which should make switching and updating between them easier.

## Setup

The basic setup for each of my theme's is roughly the same:

  1. Fork the Jekyll theme repository you'd like to use.
  2. Clone the repository you just forked and rename it appropriately[^github-pages].
  3. [Install Bundler](http://bundler.io) `gem install bundler` and run `bundle install` to install all dependencies (Jekyll, [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), etc)
  4. Update `_config.yml`, navigation data files (found in `_data`), and replace sample posts and pages with your own.

[^github-pages]: [Follow these steps](http://jekyllrb.com/docs/github-pages/) if you're going to host your site on GitHub Pages to get the repo name and branches setup correctly.

For more specifics, review each themes' documentation by clicking on the **Theme Setup** buttons below.

## [Minimal Mistakes Theme]({{ site.url }}{% post_url /work/2016-04-15-minimal-mistakes-jekyll-theme %})

<figure>
  <img src="{{ site.url }}/assets/images/minimal-mistakes-3-feature.jpg" alt="Minimal Mistakes Jekyll theme screenshot">
  <figcaption>A minimal design to let your content shine.</figcaption>
</figure>

A flexible two-column Jekyll theme with a minimalistic aesthetic.

  - Compatible with GitHub Pages.
  - Available as a [Ruby Gem theme](https://rubygems.org/gems/minimal-mistakes-jekyll).
  - Several layout options (single, archive, splash pages).
  - SEO optimized with support for [Twitter Cards](https://dev.twitter.com/cards/overview) and [Open Graph](http://ogp.me/) data.
  - Optional header images, sidebars, table of contents, galleries, related posts, breadcrumb links, and more.
  - Optional comments ([Disqus](https://disqus.com/), [Facebook](https://developers.facebook.com/docs/plugins/comments), Google+, [Staticman](https://staticman.net/), and more).
  - Optional analytics ([Google Analytics](https://www.google.com/analytics/) and custom).

<div markdown="0">
  <a href="https://github.com/mmistakes/minimal-mistakes/archive/master.zip" class="btn btn--info">Download</a>
  <a href="https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/minimal-mistakes" class="btn">Demo</a>
</div>

## [HPSTR Theme]({{ site.url }}{% post_url /work/2013-08-26-hpstr-jekyll-theme %})

<figure>
  <img src="{{ site.url }}/assets/images/hpstr-preview-feature-2015.jpg" alt="HPSTR Jekyll theme screenshot">
  <figcaption>A traditional blog approach with a modern style</figcaption>
</figure>

A responsive Jekyll blog theme designed to give your site a modern and somewhat cliché feel.

  - Compatible with GitHub Pages.
  - Modern design with rounded rectangles and subtle gradients.
  - Animated main menu.
  - Built-in support for Sass and data files (requires Jekyll 2.x).

<div markdown="0">
  <a href="https://github.com/mmistakes/hpstr-jekyll-theme/archive/master.zip" class="btn btn--info">Download</a>
  <a href="https://mmistakes.github.io/hpstr-jekyll-theme/theme-setup/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/hpstr-jekyll-theme/" class="btn">Demo</a>
</div>

## [So Simple Theme]({{ site.url }}{% post_url /work/2013-06-26-so-simple-jekyll-theme %})

<figure>
  <img src="{{ site.url }}/assets/images/so-simple-theme-feature-2015.jpg" alt="So Simple Jekyll theme screenshot">
  <figcaption>Large images and site logo if that's your thing</figcaption>
</figure>

A simple and clean responsive Jekyll theme for words and large photographs.

  - Compatible with GitHub Pages.
  - Minimal design with subtle animations.
  - Simple search (searches by post title)
  - Built-in support for Sass and data files (requires Jekyll 2.x)

<div markdown="0">
  <a href="https://github.com/mmistakes/so-simple-theme/archive/master.zip" class="btn btn--info">Download</a>
  <a href="https://mmistakes.github.io/so-simple-theme/theme-setup/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/so-simple-theme" class="btn">Demo</a>
</div>

## [Skinny Bones Theme]({{ site.url }}{% post_url /work/2014-09-02-skinny-bones-jekyll %})

<figure>
	<img src="{{ site.url }}/assets/images/skinny-bones-preview-feature.jpg" alt="Skinny Bones Jekyll theme screenshot">
	<figcaption>Includes a fun off canvas menu</figcaption> 
</figure>

A Jekyll starter based off of an older incarnation of Made Mistakes.

  - Compatible with GitHub Pages.
  - Built-in support for Sass and data files (requires Jekyll 2.x).
  - Off canvas menu.
  - Tile based archives.
  - Optional table of contents, share links, Disqus comments modules, and more.

<div markdown="0">
	<a href="https://github.com/mmistakes/skinny-bones-jekyll/archive/master.zip" class="btn btn--info">Download</a>
	<a href="https://mmistakes.github.io/skinny-bones-jekyll/getting-started/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/skinny-bones-jekyll/" class="btn">Demo</a>
</div>

## License

These themes are free and open source software, distributed under the [MIT License]({{ site.url }}/LICENSE). Feel free to modify them to suit your needs.
