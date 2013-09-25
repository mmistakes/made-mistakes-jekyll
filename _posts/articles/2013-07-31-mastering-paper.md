---
layout: page
permalink: /mastering-paper/
title: Mastering Paper by 53 Guide
short-title: "Mastering Paper by 53"
description: "A collection of tutorials and techniques to help master Paper by FiftyThree for iPad."
image: 
  thumb: paper-53-expanded-guide-thumb.jpg
  homepage: paper-by-53-500x500.jpg
tags: [Paper by 53, tutorial, drawing, painting, iPad, stylus, guide]
homepage: true
---

In the spirit of being open I've decided to compile everything I've learned about [*Paper by FiftyThree*](http://www.fiftythree.com) into a multi-part guide I'm calling **Mastering Paper**. As far as I'm concerned Paper doesn't really need a manual or instruction guide because it's fairly intuitive to use. So what you'll find in the following pages are descriptions of techniques I've developed from creating with the app over the last year and a half.

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
			<h4>Part {{ count }} &ndash; {{ post.title | remove: 'Mastering Paper by 53: ' }}</h4>
			<p>{{ post.description }}</p>
		</a>
	</li>
{% endif %}
{% endfor %}
	<li><h4><span class="badge">Coming Soon</span> Part 4 &ndash; Drawing Water and Waves</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 5 &ndash; Drawing Textures</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 6 &ndash; Mixing Realistic Skin Tones</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 7 &ndash; Drawing Hair</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 8 &ndash; Glowing Lights and Blurs</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 9 &ndash; Organizing Palettes and Colors</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 10 &ndash; Managing Journals and Pages</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 11 &ndash; Printing</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 12 &ndash; Screen Capture Techniques and Animation</h4></li>
	<li><h4><span class="badge">Coming Soon</span> Part 13 &ndash; Everything Else&hellip;</h4></li>
</ul>