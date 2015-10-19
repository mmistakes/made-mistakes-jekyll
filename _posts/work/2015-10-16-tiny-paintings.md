---
layout: archive
permalink: /tiny-paintings/
title: "Tiny Paintings"
subtitle: "Gallery of mini watercolor portraits painted at really small sizes."
excerpt: "Gallery of mini watercolor portraits painted at really small sizes."
modified:
image: 
  teaser: tiny-paintings-teaser.jpg
  thumb: tiny-paintings-150.jpg
category: work
tags: [watercolor, painting, drawing, portrait, illustration]
fullwidth: true
featured: 
ads: false
work: "Illustration"
---

Trying to emulate the look and feel of [watercolor on the iPad]({{ site.url }}/paperfaces/) has inspired me to revisit painting traditionally. I've gone mini in an effort to fit some painting in amongst family and work obligations. 

My plan was to complete a miniature 1.5\" painting a day, but the challenge of painting so small is eating up way too much time. Instead I'm going to keep things casual and let images happen as they happen.

<ul class="th-grid">
{% for post in site.categories.tiny-paintings %}
  <li style="width: 200px;">
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
      <img class="load" src="{{ site.url }}/images/preload-150.png" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt="">
      <noscript><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></noscript>
    </a>
  </li>
{% endfor %}
</ul>
