---
title: "CSS Blur Effect"
layout: page
category: til
excerpt:
tags: [web development, CSS]
modified:
---

Playing with the new **Depth Effect** on my iPhone 7 Plus got me thinking about Gaussian blurs, and how to improve their use on this site.

In this [last redesign](https://github.com/mmistakes/made-mistakes-jekyll/tree/11.0.0), I applied a blurred effect to images in a few key locations[^locations]. To keep page speed in check I shrunk images down to `~20px` wide, optimized them with [**imagemin**](https://github.com/imagemin/imagemin), and then scaled them up with `background-size: cover` to fill their parent containers.

The browser does of good job of enlarging and smoothing out these tiny images --- creating a blurred effect of sorts. For the most part they look good, but I've noticed ugly patterns and artifacts on devices that display `@2x` or higher.

{% capture upscale_caption %}
Look hard enough and you'll notice a "blockiness" to these upscaled images, :stuck_out_tongue_closed_eyes: yuck!
{% endcapture %}

<figure>
  <a href="{{ site.url }}/assets/images/mm-upscaled-image-blur-ipad.jpg">
    <img src="{{ site.url }}/assets/images/mm-upscaled-image-blur-ipad-800.jpg" alt="ugly upscaled images on a high resolution display">
  </a>
  <figcaption>{{ upscale_caption | markdownify | remove: '<p>' | remove: '</p>' }}</figcaption>
</figure>

This is where [CSS filter functions](https://css-tricks.com/almanac/properties/f/filter/) like `blur` come into play. By adding a single line to my stylesheet I was able to blur these images just enough to overcome this ugliness.

```css
filter: blur(15px);
```

The best part is browsers that show these upscaled images as an ugly mess tend to [support CSS filter effects](http://caniuse.com/#search=filter). Win win.

[^locations]: Page cover with stripped overlay and as background images in previous/next teaser links.
