---
layout: page
permalink: /mastering-paper/
title: "Mastering Paper by 53  &#8212; A Reference Guide"
short-title: "Mastering Paper by 53"
description: "A collection of tutorials and techniques to help master Paper by 53 for iPad."
modified: 2013-11-21
image: 
  thumb: paper-53-expanded-guide-thumb.jpg
  homepage: paper-by-53-500x500.jpg
tags: [Paper by 53, tutorial, drawing, painting, iPad, stylus, guide]
homepage: true
---

<figure class="image-right">
	<img src="{{ site.url }}/images/mastering-paper-53-small-book.jpg" width="188" height="250" alt="Mastering Paper reference guide">
</figure>

In the spirit of openness I've decided to compile everything I've learned using [*Paper by FiftyThree*](http://www.fiftythree.com) into a multi-part series I'm calling **Mastering Paper**. As far as I'm concerned Paper doesn't really need a manual or instruction guide because it's fairly intuitive to use. So what you'll find in the following pages are techniques and time savers I've developed from creating exclusively with the app over the last year and a half.

{% assign count = '0' %}
{% assign idx = '0' %}
{% for post in site.posts reversed %}
	{% if post.series == 'mastering-paper' %}
		{% capture count %}{{ count | plus: '1' }}{% endcapture %}
		{% if post.url == page.url %}
			{% capture idx %}{{count}}{% endcapture %}
		{% endif %}
	{% endif %}
{% endfor %}

<hr />
<h2>Table of Contents</h2>
<ul class="unstyled-list">
{% assign count = '0' %}
{% for post in site.posts reversed %}
{% if post.series == 'mastering-paper' %}
{% capture count %}{{ count | plus: '1' }}{% endcapture %}
	<li>
		<a href="{{ site.url }}{{ post.url }}">
			<img src="{{ site.url }}/images/{{ post.image.thumb }}" class="preview" alt="preview image">
			<h4>Part {{ count }} &#8211; {{ post.title | remove: 'Mastering Paper by 53: ' }}</h4>
			<p>{{ post.description }}</p>
		</a>
	</li>
{% endif %}
{% endfor %}
	<li><h4><span class="badge">Coming Soon</span> Part 6 &#8211; Drawing Skin and Faces (revisited)</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 7 &#8211; Drawing Hair (revisited)</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 8 &#8211; Organizing Palettes and Colors</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 9 &#8211; Managing Journals and Pages</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 10 &#8211; Books and Printing</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 11 &#8211; Screen Capture Techniques and Animation</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 12 &#8211; Getting the Most Out of Pencil</h4></li>
</ul>