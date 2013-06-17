---
layout: page
permalink: /paperfaces/index.html
title: "PaperFaces Project Gallery"
headline: "PaperFaces Project Gallery"
subheadline: "Daily iPad Portraits with Paper by 53"
description: "Complete image gallery of every PaperFaces portrait drawn by Michael Rose using Paper by 53."
modified: 2013-06-12
image: 
  feature: paperfaces-gallery-featured-xl.jpg
  thumb: paperfaces-gallery-thumb.jpg
category: paperfaces
tags: [PaperFaces, MadeWithPaper, Paper by 53, iPad, portrait, drawing, illustration, painting, Michael Rose]
---

<ul class="recent-grid unstyled-list">
{% for post in site.categories.paperfaces %}
  <li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}"><img src="{{ site.url }}/images/{{ post.thumb }}" alt="" width="110" height="110" /></a></li>
{% endfor %}
</ul>

PaperFaces is an iPad drawing project by designer/illustrator Michael Rose --- that's me! If you're interested in becoming part of the experiment or just want to learn more, [jump on over here]({{ site.url }}/articles/paperfaces-ipad-portrait-project.html)
{: .notice}