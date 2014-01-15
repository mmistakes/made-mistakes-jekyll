---
layout: page
permalink: /mastering-paper/
title: "Mastering Paper by 53"
short-title: "Mastering Paper by 53"
description: "A collection of tutorials and techniques to help master Paper by 53 for iPad."
modified: 2014-01-15
image: 
  thumb: paper-53-expanded-guide-thumb.jpg
  homepage: paper-by-53-500x500.jpg
tags: [Paper by 53, tutorial, drawing, painting, iPad, stylus, guide]
homepage: true
---

In the spirit of openness I've decided to compile everything I've learned using [*Paper by FiftyThree*](http://www.fiftythree.com), into a multi-part series I'm dubbing Mastering Paper.

The guide is broken up into several parts explaining how the tools work, specific drawing and painting techniques, shortcuts, and workflows I use everyday when creating with 53's Paper app. Hoping you find them helpful and inspiring <i class="fa fa-smile-o"></i>.

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
			<h4>Part {{ count }} &#8211; {% if post.short-title %}{{ post.short-title }}{% else %}{{ post.title | remove: 'Mastering Paper by 53: ' }}{% endif %}</h4>
			<p>{{ post.description }}</p>
		</a>
	</li>
{% endif %}
{% endfor %}
	<li>
		<i class="preview" style="background-color:#ccc;"></i>
		<h4>Part 7 &#8211; Drawing Skin and Faces (revisited) <span class="badge">Coming Soon</span></h4>
		<p>Learn techniques for drawing skin and realistic portraits using the watercolor and pencil tools.</p>
	</li>
	<li>
		<i class="preview" style="background-color:#ccc;"></i>
		<h4>Part 8 &#8211; Drawing Hair (revisited) <span class="badge">Coming Soon</span></h4>
		<p>One of my favorite things to draw is long flowing hair. Learn how I create realistic renders in a matter of minutes.</p>
	</li>
	<li>
		<i class="preview" style="background-color:#ccc;"></i>
		<h4>Part 9 &#8211; Managing Journals and Pages <span class="badge">Coming Soon</span></h4>
		<p>Learn how to create templates by duplicating pages across journals &#8212; perfect for building consistency in a <em>drawing project</em>.</p>
	</li>
	<li>
		<i class="preview" style="background-color:#ccc;"></i>
		<h4>Part 10 &#8211; Screen Capture Techniques and Animation <span class="badge">Coming Soon</span></h4>
		<p>Workflows for recording time lapse videos of Paper creations without jailbreaking an iPad.</p>
	</li>
	<li>
		<i class="preview" style="background-color:#ccc;"></i>
		<h4>Part 11 &#8211; Getting the Most Out of Pencil <span class="badge">Coming Soon</span></h4>
		<p>Pencil is a great stylus built exclusively for Paper. Learn drawing techniques that only it can perform.</p>
	</li>
</ul>

---

{% include support.html %}