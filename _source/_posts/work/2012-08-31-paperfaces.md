---
layout: work
permalink: /paperfaces/
title: "PaperFaces Project Gallery"
short-title: "PaperFaces Project"
headline: "PaperFaces 365 Project"
description: "Gallery of every PaperFaces portrait drawn by Michael Rose with Paper by 53 for iPad."
modified: 2014-02-28
image: 
  thumb: paperfaces-project-250x250.jpg
  homepage: paperfaces-project-250x250.jpg
category: work
homepage: true
tags: [PaperFaces, Paper by 53, portrait, illustration, 365 project]
change_frequency: daily
---

PaperFaces is an [illustration project]({{ site.url }}/articles/paperfaces-ipad-portrait-project/) by designer Michael Rose --- hey that's me! Each day I draw the face of a stranger using an iPad, a stylus, and the fabulous sketching app *Paper by 53*. 

Curious how I use Paper to draw these? Check out my set of [Mastering Paper by 53 Guides]({{ site.url }}/mastering-paper/).

<div markdown="0" class="center-block"><a href="{{ site.url }}/portraits/" class="btn">Order a PaperFaces Portrait</a></div>

<ul class="oversized-recent-grid">
{% for post in site.categories.paperfaces %}
	<li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
		<img class="load" src="{{ site.url }}/images/preload.gif" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></a>
		<noscript><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}"><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></a></noscript>
	</li>
{% endfor %}
</ul>