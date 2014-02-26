---
layout: page
permalink: /articles/
title: "Articles"
description: "Posts &amp; diatribes. A collection of Michael Rose&rsquo;s thoughts, inspiration, mistakes, and other minutia."
tags: [blog, articles, writing, thoughts]
ads: true
---

<ul class="post-index unstyled-list">
{% for post in site.categories.articles %}
{% assign readtime = post.content | number_of_words | divided_by:200 %}
	<li>
		<article itemscope itemtype="http://schema.org/Article">
			<a href="{{ site.url }}{{ post.url }}">
				<div class="list-image">
					{% if post.image.thumb %}
						<img src="{{ site.url }}/images/{{ post.image.thumb }}" class="preview" alt="preview image" itemprop="image">{% else %}<img src="{{ site.url }}/images/{{ site.logo }}" class="preview" alt="preview image" itemprop="image">
					{% endif %}
				</div><!-- /.list-image -->
				<div class="list-content">
					<h1 itemprop="name">{{ post.title }}</h1>
					<p itemprop="description">{{ post.description }}</p>
					<p class="entry-meta">
						<i class="fa fa-clock-o"></i> Reading time ~{% if readtime <= 1 %}1 min{% else %}{{ readtime }} min{% endif %} &#8901; <span class="entry-date date published"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time></span>
					</p><!-- /.entry-meta -->
				</div><!-- /.list-content -->
			</a>
		</article>
	</li>
{% endfor %}
</ul><!-- /.unstyled-list -->