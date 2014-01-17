---
layout: page
permalink: /articles/
title: "Articles"
description: "Posts &amp; diatribes. A collection of Michael Rose&rsquo;s thoughts, inspiration, mistakes, and other minutia."
tags: [blog, articles, mistakes, inspiration, thoughts, design]
---

<ul class="post-index unstyled-list">
{% for post in site.categories.articles %}
{% assign readtime = post.content | number_of_words | divided_by:200 %}
	<li>
		<article itemscope itemtype="http://schema.org/Article">
			<a href="{{ site.url }}{{ post.url }}" itemprop="url">
				{% if post.image.thumb %}<img src="{{ site.url }}/images/{{ post.image.thumb }}" class="preview" alt="preview image" itemprop="image">{% else %}<img src="{{ site.url }}/images/{{ site.logo }}" class="preview" alt="preview image" itemprop="image">{% endif %}
				<h1 itemprop="name">{{ post.title }}</h1>
				<p itemprop="description">{{ post.description }}</p>
				<p class="entry-meta"><i class="fa fa-clock-o"></i> Reading time ~{% if readtime <= 1 %}1 min{% else %}{{ readtime }} min{% endif %} &#8901; Published <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished" class="published{% unless page.modified %} updated{% endunless %}">{{ post.date | date: "%B %d, %Y" }}</time></span>
				{% if post.modified %}<span class="entry-date">(Updated <time datetime="{{ post.modified }}" itemprop="dateModified" class="updated">{{ post.modified | date: "%m/%d/%Y" }}</time>)</span>{% endif %}
				</p><!-- /.entry-meta -->
			</a>
		</article>
	</li>
{% endfor %}
</ul><!-- /.unstyled-list -->