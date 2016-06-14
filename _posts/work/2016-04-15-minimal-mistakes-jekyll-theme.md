---
title: "Minimal Mistakes, a Jekyll Theme"
headline: "Minimal Mistakes Theme"
excerpt: "A flexible two-column Jekyll theme. Perfect for hosting your personal site, blog, or portfolio on GitHub or your own server."
modified:
image: 
  feature: minimal-mistakes-3-feature.jpg
  teaser: minimal-mistakes-3-teaser.jpg
tags: [Jekyll, web development, open source, GitHub]
work: "Design &amp; Development"
comments: true
featured: true
---

Minimal Mistakes is a flexible two-column Jekyll theme. Perfect for hosting your personal site, blog, or portfolio on GitHub or your own server. 

As the name implies --- styling is purposely minimalistic to be enhanced and customized by you :smile:.

{% capture layouts_caption %}
The theme includes responsive layouts (`single`, `archive`, and `splash` pages) that look great on mobile and desktop browsers.
{% endcapture %}

<figure class="third">
  <a href="{{ site.url }}/images/mm-layout-splash.png"><img src="{{ site.url }}/images/mm-layout-splash.png" alt="splash layout example"></a>
  <a href="{{ site.url }}/images/mm-layout-single-meta.png"><img src="{{ site.url }}/images/mm-layout-single-meta.png" alt="single layout with comments and related posts"></a>
  <a href="{{ site.url }}/images/mm-layout-archive.png"><img src="{{ site.url }}/images/mm-layout-archive.png" alt="archive layout example"></a>
  <figcaption>{{ layouts_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

<p markdown="0">
  <a href="https://mmistakes.github.io/minimal-mistakes/" onclick="ga('send', 'event', 'link', 'click', 'Preview Minimal Mistakes');" class="btn">Live Preview</a>
</p>

## Theme Features:

- 100% Compatible with GitHub Pages
- Several layout options (single, archive, splash pages)
- SEO optimized with support for [Twitter Cards](https://dev.twitter.com/cards/overview) and [Open Graph](http://ogp.me/) data
- Optional header images, sidebars, table of contents, galleries, related posts, breadcrumb links, and more.
- Optional comments ([Disqus](https://disqus.com/), [Facebook](https://developers.facebook.com/docs/plugins/comments), Google+, and custom)
- Optional analytics ([Google Analytics](https://www.google.com/analytics/) and custom)

## Usage

To learn more about how to customize this theme, include feature images in posts, modify the look and feel, create new posts, and some other junk, [read up here](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/).

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub issue](https://github.com/mmistakes/minimal-mistakes/issues/new). And if you make something cool with this theme feel free to let me know.

## License

This theme is free and open source software, distributed under the [MIT License](https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE).
