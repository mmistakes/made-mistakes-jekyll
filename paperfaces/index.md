---
layout: page
title: "PaperFaces Project Gallery"
headline: "PaperFaces Project Gallery"
subheadline: "Daily iPad Portraits with Paper by FiftyThree"
description: "Complete image gallery of every PaperFaces portrait drawn by Michael Rose using Paper by 53."
image: paperfaces-gallery-featured
thumb: paperfaces-gallery-thumb.jpg
category: paperfaces
tags: 
- PaperFaces
- MadeWithPaper
- Paper by 53
- iPad
- portrait
- drawing
- illustration
- painting
- Michael Rose
- graphic design
---

<ul class="recent-grid unstyled-list">
{% for post in site.categories.paperfaces %}
  <li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}"><img src="{{ site.url }}/images/{{ post.thumb }}" alt="thumb" /></a></li>
{% endfor %}
</ul>

{% include paperfaces-boilerplate.html %}