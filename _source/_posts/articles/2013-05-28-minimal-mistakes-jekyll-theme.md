---
layout: article
title: "Minimal Mistakes, a Jekyll Theme"
headline: "Minimal Mistakes Theme"
subheadline: "Built for Jekyll"
excerpt: "A responsive Jekyll theme with a minimal design for text heavy sites by designer Michael Rose."
modified: 2014-02-28
image: 
  feature: minimal-mistakes-theme-feature.jpg
  teaser: minimal-mistakes-theme-teaser.jpg
  thumb: minimal-mistakes-250x250.png
category: articles
tags: [Jekyll, web development, open source, GitHub]
comments: true
toc: true
---

Jekyll is pretty rad and figured releasing a cleaned up version of [my site](http://mademistakes.com) as a theme for others to hack and build on would be fun. So here be that theme --- I call it **[Minimal Mistakes](http://mmistakes.github.io/minimal-mistakes)**, a responsive Jekyll theme focused on great typography for text heavy sites. 

## Features

* Responsive layouts. Looks good on mobile, tablets, and desktop devices.
* Full compatibility with [GitHub Pages](http://pages.github.com/).
* Minimal design. 
* Author sidebar with optional links to social media profiles.
* Support for large images to call out your favorite posts.
* Tags for [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) for a better social sharing experience.
* Stylesheets for Pygments and Coderay [syntax highlighting](http://mmistakes.github.io/minimal-mistakes/articles/code-highlighting-post/).
* Grunt and Rake tasks for easier site development.

<figure>
	<a href="http://mmistakes.github.io/minimal-mistakes/"><img src="{{ site.url }}/images/mm-theme-post-750.jpg" alt="Screenshot of Minimal Mistakes theme"></a>
</figure>

<div markdown="0"><a href="http://mmistakes.github.io/minimal-mistakes/" class="btn">Demo the Theme</a></div>

## Basic Setup

1. [Install Bundler](http://bundler.io) `gem install bundler` and then install [Jekyll](http://jekyllrb.com) and all dependencies `bundle install`.
2. Fork the [Minimal Mistakes repo](http://github.com/mmistakes/minimal-mistakes/fork).
3. Clone the repo you just forked and rename it.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for pulling in large feature images, assigning categories and tags, and other YAML data.

<i class="fa fa-star"></i> **ProTip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you don't want on your site.
{: .notice}

---

## More Theme Setup Goodness

To learn more about how customize this theme, include feature images in posts, use the Grunt build scripts, and some other junk, [read up here](http://mmistakes.github.io/minimal-mistakes-theme/theme-setup/).

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub issue](https://github.com/mmistakes/minimal-mistakes/issues/new). And if you make something cool with this theme feel free to let me know.

## License

This theme is free and open source software, distributed under the [GNU General Public License](https://www.gnu.org/copyleft/gpl.html). So feel free to use it on your site without linking back to me or including a disclaimer.