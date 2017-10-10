---
title: "Template"
excerpt: "Template"
image:
  path: &image "/assets/images/template-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/template-th.jpg"
  teaser: *image
tags: 
  - tag 1
  - tag 2
comments: true
comments_locked: false
published: true
last_modified_at: 2014-07-26T22:24:00-04:00
redirect_from: "/old/url/to/post/"
---
Some markdown content

{% include figure
  image_path="/assets/images/diy-ambilight-without-pc-effect.jpg"
  caption="Example of my DIY Ambilight setup"
%}

{% lazyload data-src="/assets/images/external-graphics-card-experiment-part-1-eGPU-setup-overview-feature.png" src="/assets/images/external-graphics-card-experiment-part-1-eGPU-setup-overview-feature-low-quality.png" alt="my lazyloaded image" %}
