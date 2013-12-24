---
layout: work
permalink: /paperfaces/
title: "PaperFaces Project Gallery"
short-title: "PaperFaces Project"
headline: "PaperFaces Project"
description: "An entire gallery of PaperFaces portraits drawn by Michael Rose using Paper by 53 and an iPad."
modified: 2013-07-12
image: 
  thumb: paperfaces-project-250x250.jpg
  homepage: paperfaces-project-250x250.jpg
category: work
homepage: true
tags: [PaperFaces, MadeWithPaper, Paper by 53, iPad, portrait, drawing, illustration, painting, Michael Rose]
---

PaperFaces is an [illustration project]({{ site.url }}/articles/paperfaces-ipad-portrait-project/) by designer Michael Rose --- hey that's me! Each day I draw the face of a stranger using an iPad, a stylus, and the fabulous sketching app *Paper by 53*. 

Curious how I use Paper to draw these? Check out my set of [Mastering Paper by 53 Guides]({{ site.url }}/mastering-paper/).

<div markdown="0" style="text-align:center"><a href="{{ site.url }}/portraits/" class="btn btn-inverse" style="margin-bottom:0;">Order a Custom PaperFaces Portrait</a></div>

<ul class="oversized-recent-grid unstyled-list">
{% for post in site.categories.paperfaces %}
	<li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
		<img class="load" src="{{ site.url }}/images/preload.gif" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt="" width="110" height="110">
		<noscript><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt="" width="110" height="110"></noscript>
	</a></li>
{% endfor %}
</ul>