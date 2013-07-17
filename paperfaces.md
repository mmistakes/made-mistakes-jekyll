---
layout: page
permalink: /paperfaces/index.html
title: "PaperFaces Project Gallery"
headline: "PaperFaces Project"
description: "Complete image gallery of every PaperFaces portrait drawn by Michael Rose using Paper by 53."
modified: 2013-07-12
image: 
  thumb: paperfaces-gallery-thumb.jpg
category: paperfaces
tags: [PaperFaces, MadeWithPaper, Paper by 53, iPad, portrait, drawing, illustration, painting, Michael Rose]
---

PaperFaces is an illustration project by designer Michael Rose --- hey that's me! Each day I draw the face of a stranger using an iPad, a stylus, and the fabulous sketching app *Paper by 53*. If you're interested in becoming part of the experiment or just want to learn more, [jump on over here]({{ site.url }}/articles/paperfaces-ipad-portrait-project.html). 

**{{ site.categories.paperfaces | size }} portraits down**, a ton more to go...

<ul class="recent-grid unstyled-list">
{% for post in site.categories.paperfaces %}
	<li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
		<img class="load" src="{{ site.url }}/images/preload.gif" data-original="{{ site.url }}/images/{{ post.thumb }}" alt="" width="110" height="110">
		<noscript><img src="{{ site.url }}/images/{{ post.thumb }}" alt="" width="110" height="110"></noscript>
	</a></li>
	{% endfor %}
</ul>