---
layout: archive
permalink: /paperfaces/
category: paperfaces
title: "PaperFaces iPad Project"
excerpt: "Gallery of hundreds of PaperFaces portrait painted digitally with Paper by FiftyThree on an iPad. Find time lapse videos, in-process screenshots, and more."
last_modified_at: 2017-04-08T22:45:44-04:00
image: 
  path: &image /assets/images/paperfaces-project-feature.jpg
  feature: *image
  thumbnail: /assets/images/paperfaces-project-th.jpg
  teaser: /assets/images/paperfaces-asja-k-teaser.jpg
tags: [Paper by 53, portrait, drawing, painting, iPad, illustration, 365 project]
ads: false
work: "Illustration"
order: 2
---

PaperFaces was an [illustration project](/articles/paperfaces-ipad-portrait-project/) by designer Michael Rose --- hey that's me! For two years I drew the faces of strangers everyday using an iPad, a stylus, and **Paper by FiftyThree**. I occasionally post new portraits here, but certainly not as frequently as I used to.

If you scroll down far enough you can see how my technique evolved from faceless gestures into realistic portraits[^procreate].

<ul class="gallery-thumbnails">
{% for post in site.categories.paperfaces %}
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

[^procreate]: If you like these be sure to check out what I'm [painting with another iPad app](/procreate-paintings/), **Procreate**.
