---
layout: page
permalink: /procreate-paintings/
category: procreate-paintings
title: "Procreate iPad Paintings"
excerpt: &excerpt "Gallery of digital paintings created with [Procreate](http://procreate.si/) on an iPad. Find time lapse videos, in-process screenshots, and more."
subtitle: *excerpt
last_modified_at: 2016-10-17T11:36:34-04:00
image: 
  cover: /assets/images/procreate-logo-20.jpg
  thumb: /assets/images/procreate-paintings-150.jpg
  teaser: &image /assets/images/procreate-paintings-teaser.jpg
  path: *image
tags: [Procreate, painting, drawing, portrait, illustration]
ads: false
work: "Illustration"
order: 1
---

Digital paintings created on an iPad using the iOS app [**Procreate** by Savage Interactive](http://procreate.si/).

{% include popular-tags.html %}

<ul class="th-grid">
{% for post in site.categories.procreate-paintings %}
  <li>
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
      <img class="load" src="{{ site.url }}/assets/images/preload-150.png" data-original="{{ site.url }}{{ post.image.thumb }}" alt="">
      <noscript><img src="{{ site.url }}{{ post.image.thumb }}" alt=""></noscript>
    </a>
  </li>
{% endfor %}
</ul>
