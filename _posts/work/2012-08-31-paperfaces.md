---
layout: archive
permalink: /paperfaces/
title: "PaperFaces iPad Project"
subtitle: "Gallery of portraits drawn with Paper by FiftyThree."
excerpt: "Gallery of every PaperFaces portrait drawn by Michael Rose with Paper by 53."
modified: 2015-11-30T13:04:16-05:00
image: 
  thumb: paperfaces-project-250x250.jpg
  teaser: paperfaces-project-teaser.jpg
category: work
tags: [paper by 53, portrait, drawing, painting, ipad, illustration, 365 project]
fullwidth: true
featured: true
ads: false
work: "Illustration"
---

PaperFaces was an [illustration project]({{ site.url }}/articles/paperfaces-ipad-portrait-project/) by designer Michael Rose --- hey that's me! For two years I drew the faces of strangers everyday using an iPad, a stylus, and **Paper by FiftyThree**. I occasionally post new portraits here, but certainly not as frequently as I used to.

If you scroll down far enough you can see how my technique evolved from faceless gestures into realistic portraits[^procreate].

<ul class="th-grid">
{% for post in site.categories.paperfaces %}
  <li>
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
      <img class="load" src="{{ site.url }}/images/preload-150.png" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt="">
      <noscript><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></noscript>
    </a>
  </li>
{% endfor %}
</ul>

[^procreate]: If you like these be sure to check out what I'm [painting with another iPad app]({{ site.url }}/procreate-paintings/), **Procreate**.
