---
layout: gallery
permalink: /paperfaces/
title: "PaperFaces Project Gallery"
excerpt: "Gallery of every PaperFaces portrait drawn by Michael Rose with Paper by 53."
modified: 2014-08-29T10:11:50-04:00
image: 
  thumb: paperfaces-project-250x250.jpg
  teaser: paperfaces-project-teaser.jpg
category: work
tags: [PaperFaces, Paper by 53, portrait, drawing, painting, iPad, illustration, 365 project]
---

PaperFaces was an [illustration project]({{ site.url }}/articles/paperfaces-ipad-portrait-project/) by designer Michael Rose --- hey that's me! Each day I'd draw the face of a stranger using an iPad, a stylus, and the fabulous sketching app *Paper by 53*.
{:.shorten}

If you scroll down far enough you can see how my technique evolved from creepy faceless faces to something more realistic and true to life.
{:.shorten}

<ul class="th-grid-full">
{% for post in site.categories.paperfaces %}
  <li>
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
      <img class="load" src="{{ site.url }}/images/preload-150.png" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt="">
      <noscript><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></noscript>
    </a>
  </li>
{% endfor %}
</ul>