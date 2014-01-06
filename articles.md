---
layout: page
permalink: /articles/
title: "Articles"
description: "Posts &amp; diatribes. A collection of Michael Rose&rsquo;s thoughts, inspiration, mistakes, and other minutia."
tags: [blog, articles, mistakes, inspiration, thoughts, design]
---

<ul class="post-index unstyled-list">
{% for post in site.categories.articles %}
	<li>
		<article itemscope itemtype="http://schema.org/BlogPosting">
			<a href="{{ site.url }}{{ post.url }}" itemprop="url">
				{% if post.image.thumb %}<img src="{{ site.url }}/images/{{ post.image.thumb }}" class="preview" alt="preview image" itemprop="image">{% else %}<img src="{{ site.url }}/images/{{ site.logo }}" class="preview" alt="preview image" itemprop="image">{% endif %}
				<h1 itemprop="name">{{ post.title }}</h1>
				<p itemprop="description">{{ post.description }}</p>
				<p class="entry-meta">Published on <span class="entry-date date published"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time></span>
				{% if post.modified %}<span class="entry-date date updated">(Updated <time datetime="{{ post.modified }}" itemprop="dateModified">{{ post.modified | date: "%m/%d/%Y" }}</time>)</span>{% endif %}
				</p><!-- /.entry-meta -->
			</a>
		</article>
	</li>
{% endfor %}
</ul><!-- /.unstyled-list -->