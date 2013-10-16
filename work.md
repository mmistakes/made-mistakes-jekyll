---
layout: page
permalink: /work/
title: "Work"
description: "Work. Designed, illustrated, or developed by Michael Rose."
category: work
tags: [design, illustration, work, portfolio]
---

Things I've designed, illustrated, developed, coded, and whatever.

<ul class="recent-grid unstyled-list">
{% for post in site.categories.work %}
	<li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
		<img class="load" src="{{ site.url }}/images/preload.gif" data-original="{{ site.url }}/images/{{ post.image.thumb }}" alt="">
		<noscript><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt=""></noscript>
	</a></li>
	{% endfor %}
</ul>