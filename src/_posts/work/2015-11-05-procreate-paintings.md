---
layout: page
permalink: /procreate-paintings/
title: "Procreate Paintings"
excerpt: &excerpt "Gallery of digital paintings created with [Procreate](http://procreate.si/) on an iPad. Find time lapse videos, in-process screenshots, and more."
subtitle: *excerpt
modified: 2016-10-17T11:36:34-04:00
image: 
  cover: /assets/images/procreate-logo-20.jpg
  teaser: /assets/images/procreate-paintings-teaser.jpg
  thumb: /assets/images/procreate-paintings-150.jpg
tags: [Procreate, painting, drawing, portrait, illustration]
ads: false
work: "Illustration"
order: 1
---

Digital paintings created on an iPad using the iOS app [**Procreate** by Savage Interactive](http://procreate.si/).

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
