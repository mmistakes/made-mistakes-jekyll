---
layout: page
permalink: /paperfaces/
category: paperfaces
title: "PaperFaces iPad Project"
excerpt: "Gallery of hundreds of PaperFaces portrait painted digitally with Paper by FiftyThree on an iPad. Find time lapse videos, in-process screenshots, and more."
last_modified_at: 2016-10-27T11:16:12-04:00
image: 
  cover: /assets/images/fiftythree-color-20.jpg
  thumb: /assets/images/paperfaces-project-250x250.jpg
  teaser: &image /assets/images/paperfaces-asja-k-teaser.jpg
  path: *image
tags: [Paper by 53, portrait, drawing, painting, iPad, illustration, 365 project]
ads: false
work: "Illustration"
order: 2
---

PaperFaces was an [illustration project]({{ site.url }}/articles/paperfaces-iPad-portrait-project/) by designer Michael Rose --- hey that's me! For two years I drew the faces of strangers everyday using an iPad, a stylus, and **Paper by FiftyThree**. I occasionally post new portraits here, but certainly not as frequently as I used to.

If you scroll down far enough you can see how my technique evolved from faceless gestures into realistic portraits[^procreate].

{% include popular-tags.html %}

<ul class="th-grid">
{% for post in site.categories.paperfaces %}
  <li>
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
      <img class="load" src="{{ site.url }}/assets/images/preload-150.png" data-original="{{ site.url }}{{ post.image.thumb }}" alt="">
      <noscript><img src="{{ site.url }}{{ post.image.thumb }}" alt=""></noscript>
    </a>
  </li>
{% endfor %}
</ul>

[^procreate]: If you like these be sure to check out what I'm [painting with another iPad app]({{ site.url }}/procreate-paintings/), **Procreate**.
