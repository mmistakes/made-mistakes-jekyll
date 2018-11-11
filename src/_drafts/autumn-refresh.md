---
title: "Autumn refresh"
excerpt:
layout: post
image:
  path: &image /assets/images/autumn-refresh-feature.jpg
  width: 1920
  height: 1059
  feature: *image
  caption: "[Photo by **Aaron Burden** on Unsplash](https://unsplash.com/photos/Ndc6FS9v_hw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)"
categories: [articles]
tags: [Jekyll, Gatsby, web development, Netlify]
comments: true
last_modified_at:
read_time: true
support: true
toc: true
breadcrumbs:
  - label: "Blog articles"
    url: /articles/
---

Been toying with the idea of migrating from **Jekyll** to [**GatsbyJS**](https://www.gatsbyjs.org/) (more on that in a future post). Initial tests look promising, but there are a [some issues](https://github.com/mmistakes/gatsby-test/issues/1) I'm still working through.

## Design changes

In the meantime I've taken the new visual cues I originally built into [React components](https://reactjs.org/docs/react-component.html), and adapted them here as standard HTML/CSS.

Since majority of the visitors to my site use modern browsers, I had a good excuse to play with `display: grid`. Dropping the `float` nonsense and having actual tools to build a "real" grid based layout has been refreshing.

## Accessibility improvements

A good excuse to test how accessible the site is and fix any glaring issues.

### Buttons have an accessible name

Discovered [**bigfoot.js**](http://bigfootjs.com/) a jQuery plugin used to make footnotes less visually distracting, didn't name `<button>` elements. Thankfully the button markup is configurable so I was able replace a set of presentational-only `<svg>` elements with unique names instead.

```javascript
{% raw %}var bigfoot = $.bigfoot({
    actionOriginalFN: 'delete',
    buttonMarkup: (
      '<div class="bigfoot-footnote__container">' +
      ' <button href="#" class="bigfoot-footnote__button" rel="footnote"' +
      ' id="{{SUP:data-footnote-backlink-ref}}"' +
      ' data-footnote-number="{{FOOTNOTENUM}}"' +
      ' data-footnote-identifier="{{FOOTNOTEID}}"' +
      ' alt="See Footnote {{FOOTNOTENUM}}"' +
      ' data-bigfoot-footnote="{{FOOTNOTECONTENT}}">' +
      ' <span class="visually-hidden">{{FOOTNOTENUM}}</span>' +
      ' </button>' +
      '</div>'
    )
  });{% endraw %}
```

### Color contrast is satisfactory

The color of some elements like captions and footer text were too light, so I darkened them just enough. I did the same for links giving them a contrast ratio of `4.77`.

![link color contrast ratio screenshot](/assets/images/mm-link-color-contrast-raio.png)

## Performance improvements

Stuff with the biggest impact (minifying, concatenating, inlining critical CSS) I was already doing, but there was still room for improvement.

### Defer offscreen images

Large feature images were already lazy-loaded and served responsively using `srcset` and a handful of sized images. But all of the images in the body `{% raw %}{{ content }}{% endraw %}` of my Markdown files were not.

Taking a cue from Gatsby's playbook, I wrote a small plugin to convert Markdown image syntax into an `<img>` element with synatactically sugar for lazy-loading. To my surprise this actually worked.

```ruby
# Description: Jekyll plugin to replace Markdown image syntax with lazy-load HTML markup

Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  docExt = post.extname.tr('.', '')
  # only process Markdown files
  if payload['site']['markdown_ext'].include? docExt
    newContent = post.content.gsub(/(?:!\[(.*?)\]\((.*?)\))/, '<noscript><img src="\2"></noscript><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="\2" alt="\1" class="lazyload fade-in">')
    post.content = newContent
  end
end
```

### Avoids an excessive DOM size

Trimming `<div>` fat where I could helped cut page weight down. A few hefty pages remain, I'm looking at your PaperFaces gallery. But this is something I hope to fix with a [gallery pagination component](https://awesome-lewin-0d1356.netlify.com/grid-example/) when I switch to Gatsby.
