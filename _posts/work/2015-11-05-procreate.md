---
layout: archive
permalink: /procreate/
title: "Procreate Paintings"
subtitle: "Gallery of portraits painted digitally with Procreate on an iPad."
excerpt: "Gallery of portraits painted digitally with Procreate on an iPad."
modified:
image: 
  teaser: procreate-paintings-teaser.jpg
  thumb: procreate-paintings-150.jpg
category: work
tags: [procreate, painting, drawing, portrait, illustration]
fullwidth: true
featured: 
ads: false
work: "Illustration"
---

<ul class="th-grid">
{% for post in site.categories.procreate %}
  <li style="width: 200px;">
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
      <img class="load" src="{{ site.url }}/images/preload-150.png" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt="">
      <noscript><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></noscript>
    </a>
  </li>
{% endfor %}
</ul>
