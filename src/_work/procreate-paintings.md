---
layout: archive
permalink: /procreate-paintings/
category: procreate-paintings
title: "Procreate iPad paintings"
excerpt: &excerpt "Gallery of digital paintings created with [Procreate](http://procreate.si/) on an iPad. Find time lapse videos, in-process screenshots, and more."
subtitle: *excerpt
date: 2017-05-01
last_modified_at: 2017-05-07T17:26:15-04:00
image: 
  path: &image /assets/images/procreate-paintings-feature.jpg
  width: 1600
  height: 748
  feature: *image
tags: [Procreate, painting, drawing, portrait, illustration]
ads: false
work: "Illustration"
order: 1
---

Digital paintings created on an iPad using the iOS app [**Procreate** by Savage Interactive](http://procreate.si/).

<ul class="gallery-thumbnails">
{% for post in site.categories.procreate-paintings %}
  <li>
    <a href="{{ post.url }}" title="{{ post.title }}">
      <noscript>
        <img src="{{ post.image.thumbnail }}">
      </noscript>
      <img class="lazyload fade-in" src="/assets/images/preload-150.png" data-src="{{ post.image.thumbnail }}" alt="">
    </a>
  </li>
{% endfor %}
</ul>
