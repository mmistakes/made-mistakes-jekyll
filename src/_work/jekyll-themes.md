---
layout: archive
title: "Jekyll Themes"
headline: "Jekyll Themes"
excerpt: "Open source Jekyll themes to get you started with hosting a site with GitHub Pages --- for free!"
last_modified_at: 2018-02-06T11:13:09-05:00
image: 
  path: &image /assets/images/jekyll-themes-feature.png
  feature: *image
  cover: /assets/images/jekyll-logo-lq.jpg
  thumbnail: /assets/images/jekyll-themes-thumb-250x250.png
  teaser: /assets/images/jekyll-themes-teaser.png
tags: [Jekyll, web development, open source, GitHub]
work: "Design & Development"
order: 4
comments: false
comments_locked: true
support: true
---

As I continue to hack away at the design of Made Mistakes and improve on things, I try to release simplified Jekyll starters and themes after each major site revision.

The goal is to make things easier to build a Jekyll site using mine as a starter. Rather than having to sift through [my main repository](https://github.com/mmistakes/made-mistakes-jekyll) and strip out the cruft before making it your own.

Below are all of the Jekyll starters I've open sourced thus far. Each "theme" contains all of the `_layouts`, `_includes`, Sass/CSS, JavaScript, and other sample files needed to build a site or blog. There are a lot of similarities between how they work and the file organization --- which should make switching and updating between them easier.

## Setup

The basic setup for each of my theme's is roughly the same:

  1. Install theme gem or fork the theme repository you'd like to use.
  2. [Install Bundler](http://bundler.io) `gem install bundler` and run `bundle install` to install all dependencies (Jekyll, [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), etc)
  3. Update `_config.yml`, data files (found in `_data`), and replace sample posts and pages with your own.

For more specifics, review each theme's documentation by clicking on the **Setup Guide** buttons below.

## [So Simple Theme]({% post_url /work/2013-06-26-so-simple-jekyll-theme %})

{% figure caption:"Large images and site logo if that's your thing" %}
 ![So Simple Jekyll theme screenshot](/assets/images/jekyll-theme-so-simple-feature-2018.jpg)
{% endfigure %}

So Simple is a simple Jekyll theme for your words and pictures. Features include:

- Compatible with GitHub Pages.
- Available as a [Ruby Gem theme](https://rubygems.org/gems/jekyll-theme-so-simple).
- A variety of layouts with clean and readable typography.
- [Microformats](http://microformats.org/wiki/microformats2) markup to make post content machine-readable and discoverable.
- Disqus Comments and Google Analytics support.
- SEO best practices via [Jekyll SEO Tag](https://github.com/jekyll/jekyll-seo-tag).
- Options to customize the theme and make it your own.

<div markdown="0" class="btn--group">
  <a href="https://github.com/mmistakes/so-simple-theme" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/so-simple-theme" class="btn">Demo</a>
</div>

## [Basically Basic Theme]({% post_url /work/2017-03-30-basically-basic-jekyll-theme %})

{% figure caption:"Your new Jekyll default theme." %}
![Basically Basic Jekyll theme screenshot](/assets/images/jekyll-theme-basically-basic-feature.jpg)
{% endfigure %}

Basically Basic is a [Jekyll theme](https://jekyllrb.com/docs/themes/) meant as a substitute for the default --- [Minima](https://github.com/jekyll/minima). Conventions and features found there are fully supported by **Basically Basic**, with a few enhancements thrown in for good measure:

- Compatible with GitHub Pages.
- Available as a [Ruby Gem theme](https://rubygems.org/gems/jekyll-theme-basically-basic).
- Clean responsive design with six customizable skins
- Curriculum Vitæ/Resume layout powered by [JSON data](http://registry.jsonresume.org/)
- About page layout
- Disqus Comments and Google Analytics support
- SEO best practices via [Jekyll SEO Tag](https://github.com/jekyll/jekyll-seo-tag/)

<div markdown="0" class="btn--group">
  <a href="https://github.com/mmistakes/jekyll-theme-basically-basic" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/jekyll-theme-basically-basic/" class="btn">Demo</a>
</div>

## [Minimal Mistakes Theme]({% post_url /work/2016-04-15-minimal-mistakes-jekyll-theme %})

{% figure caption:"A minimal design to let your content shine." %}
![Minimal Mistakes Jekyll theme screenshot](/assets/images/minimal-mistakes-3-feature.jpg)
{% endfigure %}

A flexible two-column Jekyll theme with a minimalist aesthetic.

  - Compatible with GitHub Pages.
  - Available as a [Ruby Gem theme](https://rubygems.org/gems/minimal-mistakes-jekyll).
  - Several layout options (single, archive, splash pages).
  - SEO optimized with support for [Twitter Cards](https://dev.twitter.com/cards/overview) and [Open Graph](http://ogp.me/) data.
  - Optional header images, sidebars, table of contents, galleries, related posts, breadcrumb links, and more.
  - Optional comments ([Disqus](https://disqus.com/), [Facebook](https://developers.facebook.com/docs/plugins/comments), Google+, [Staticman](https://staticman.net/), and more).
  - Optional analytics ([Google Analytics](https://www.google.com/analytics/) and custom).

<div markdown="0" class="btn--group">
  <a href="https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/minimal-mistakes" class="btn">Demo</a>
</div>

## [HPSTR Theme]({% post_url /work/2013-08-26-hpstr-jekyll-theme %})

{% figure caption:"A traditional blog approach with a modern style" %}
![HPSTR Jekyll theme screenshot](/assets/images/hpstr-preview-feature-2015.jpg)
{% endfigure %}

A responsive Jekyll blog theme designed to give your site a modern and somewhat cliché feel.

  - Compatible with GitHub Pages.
  - Modern design with rounded rectangles and subtle gradients.
  - Animated main menu.
  - Built-in support for Sass and data files (requires Jekyll 2.x).

<div markdown="0" class="btn--group">
  <a href="https://mmistakes.github.io/hpstr-jekyll-theme/theme-setup/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/hpstr-jekyll-theme/" class="btn">Demo</a>
</div>

## [Skinny Bones Theme]({% post_url /work/2014-09-02-skinny-bones-jekyll %})

{% figure caption:"Includes a fun off canvas menu" %}
![Skinny Bones Jekyll theme screenshot](/assets/images/skinny-bones-preview-feature.jpg)
{% endfigure %}

A Jekyll starter based off of an older incarnation of Made Mistakes.

  - Compatible with GitHub Pages.
  - Built-in support for Sass and data files (requires Jekyll 2.x).
  - Off canvas menu.
  - Tile based archives.
  - Optional table of contents, share links, Disqus comments modules, and more.

<div markdown="0" class="btn--group">
	<a href="https://mmistakes.github.io/skinny-bones-jekyll/getting-started/" class="btn">Setup Guide</a>
  <a href="https://mmistakes.github.io/skinny-bones-jekyll/" class="btn">Demo</a>
</div>

---

### License

These themes are free and open source software, distributed under the MIT License. Feel free to modify them to suit your needs.
