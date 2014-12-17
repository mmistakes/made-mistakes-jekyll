---
layout: article
title: "Minimal Mistakes, a Jekyll Theme"
headline: "Minimal Mistakes Theme"
subheadline: "Built for Jekyll"
excerpt: "A responsive Jekyll theme with a minimal design for text heavy sites by designer Michael Rose."
modified: 2014-10-31T09:14:21-04:00
image: 
  feature: minimal-mistakes-theme-feature.jpg
  teaser: minimal-mistakes-theme-teaser.jpg
  thumb: minimal-mistakes-250x250.png
category: articles
tags: [jekyll, web development, open source, github]
comments: true
---

Jekyll is pretty rad and figured releasing an older version of [my site](http://mademistakes.com) as a theme for others to hack and build on would be fun. So here be that theme --- I call it **[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes)**, a responsive Jekyll theme focused on great typography for text heavy sites. 

<i class="fa fa-info-circle"></i> **Update:** Minimal Mistakes makes use of Sass and data files as part of Jekyll 2.x. Updating your site's look and feel just got easier!
{: .notice}

{% include toc.html %}

## Features

* Responsive layouts. Looks good on mobile, tablets, and desktop devices.
* Full compatibility with [GitHub Pages](http://pages.github.com/).
* Minimal design. 
* Author sidebar with optional links to social media profiles.
* Support for large images to call out your favorite posts.
* Tags for [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) for a better social sharing experience.
* Stylesheets for Pygments and Coderay [syntax highlighting](http://mmistakes.github.io/minimal-mistakes/articles/code-highlighting-post/).

<figure>
	<a href="https://mmistakes.github.io/minimal-mistakes/"><img src="{{ site.url }}/images/mm-theme-post-750.jpg" alt="Screenshot of Minimal Mistakes theme"></a>
</figure>

<div markdown="0">
  <a href="https://mmistakes.github.io/minimal-mistakes/" class="btn">Demo the Theme</a>
  <a href="https://github.com/mmistakes/minimal-mistakes" class="btn">Install the Theme</a>
</div>

## Installation

Minimal Mistakes now requires [Jekyll](http://jekyllrb.com/) 2.x. Make sure to run `gem update jekyll` if you aren't on the latest version or `gem install jekyll` if this is your first time installing it.

**If you are creating a new Jekyll site using Minimal Mistakes follow these steps:**

1. Fork the [Minimal Mistakes repo](http://github.com/mmistakes/minimal-mistakes/fork).
2. Clone the repo you just forked and rename it.
3. [Install Bundler](http://bundler.io) `gem install bundler` and Run `bundle install` to install all dependencies (Jekyll, [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), [Octopress](https://github.com/octopress/octopress), [Bourbon](http://bourbon.io), etc)
4. Update `config.yml`, add navigation, and replace demo posts and pages with your own. [Full details here](https://mmistakes.github.io/minimal-mistakes/theme-setup/).

**If you want to use Minimal Mistakes with an existing Jekyll site follow these steps:**

1. [Download Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes/archive/master.zip) and unzip.
2. Rename `minimal-mistakes-master` to something meaningful ie: `new-site`
3. Run `bundle install` to install all dependencies (Jekyll, [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), [Octopress](https://github.com/octopress/octopress), [Bourbon](http://bourbon.io), etc)
4. Remove demo posts and pages add replace with your own posts, pages, and any other content you want to move over.
5. Update posts and pages YAML to match variables used by Minimal Mistakes.
6. Update `config.yml` and add navigation links. [Full details here](https://mmistakes.github.io/minimal-mistakes/theme-setup/). 

<i class="fa fa-star"></i> **ProTip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you won't want.
{: .notice}

---

## Usage

To learn more about how to customize this theme, include feature images in posts, modify the look and feel, create new posts, and some other junk, [read up here](https://mmistakes.github.io/minimal-mistakes/theme-setup/).

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub issue](https://github.com/mmistakes/minimal-mistakes/issues/new). And if you make something cool with this theme feel free to let me know.

## License

This theme is free and open source software, distributed under the [MIT License]({{ site.url }}/LICENSE). So feel free to modify it however you'd like without linking back to me or including a disclaimer.