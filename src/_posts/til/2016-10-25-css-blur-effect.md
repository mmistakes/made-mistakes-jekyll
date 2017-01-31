---
title: "CSS Blur Effect"
excerpt:
tags: [web development, CSS]
last_modified_at: 2016-11-04T16:13:05-04:00
image:
  path: &image /assets/images/gradient-01-teaser.jpg
  teaser: *image
  cover: /assets/images/gradient-01-20.jpg
---

Playing with the new **Depth Effect** (aka [*fauxkeh*](https://www.instagram.com/explore/tags/fauxkeh/)) on my iPhone 7 Plus got me thinking about Gaussian blurs, and how to improve their use on this site.

In this [last redesign](https://github.com/mmistakes/made-mistakes-jekyll/tree/11.0.0), I applied a blurred effect to images in a few key locations[^locations]. To keep page speed in check I shrunk images down to `~20px` wide, optimized them with [**imagemin**](https://github.com/imagemin/imagemin), and then scaled them up with `background-size: cover` to fill their parent containers.

The browser does the rest, enlarging and smoothing out these tiny images --- creating a blurred effect of sorts. For the most part they look good. On devices that display `@2x` or higher, blotchy patterns and artifacts begin to show their ugly faces.

{% capture upscale_caption %}
These upscaled images sure do look awful on an iPad with retina display, :stuck_out_tongue_closed_eyes: yuck!
{% endcapture %}

<figure>
  <a href="{{ site.url }}/assets/images/mm-upscaled-image-blur-ipad.jpg">
    <img src="{{ site.url }}/assets/images/mm-upscaled-image-blur-ipad-1124.jpg" alt="ugly upscaled images on a high resolution display">
  </a>
  <figcaption>{{ upscale_caption | markdownify | remove: '<p>' | remove: '</p>' }}</figcaption>
</figure>

This is where [CSS filter functions](https://css-tricks.com/almanac/properties/f/filter/) like `blur` come into play. By adding a single line to my stylesheet I was able to smoothen out these images just enough to overcome the ugly.

```diff
.teaser__bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
+ filter: blur(15px);
  background-repeat: no-repeat;
  background-size: cover;
}
```

{% capture filter_blur_caption %}
Smoothed things out nicely with `filter: blur()`.
{% endcapture %}

<figure>
  <img src="{{ site.url }}/assets/images/mm-image-filter-blur-ipad-1124.jpg" alt="blur filtered background images">
  <figcaption>{{ filter_blur_caption | markdownify | remove: '<p>' | remove: '</p>' }}</figcaption>
</figure>

The best part, browser [support for CSS filter effects](http://caniuse.com/#search=filter) is quite good.

[^locations]: **Cover images** with a striped pattern overlay. **Background images** in the post pagination links found at the bottom of each page.
