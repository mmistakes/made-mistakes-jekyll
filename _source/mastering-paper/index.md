---
layout: archive
title: "Mastering Paper by 53"
excerpt: "Tutorials and techniques to help master Paper."
modified: 2014-07-13T03:10:42.615376+00:00
image: 
  thumb: paper-53-expanded-guide-thumb.jpg
tags: [Paper by 53, tutorial, drawing, painting, iPad]
id: mastering-paper
---

In the spirit of openness I've decided to compile everything I've learned using [*Paper by FiftyThree*](http://www.fiftythree.com), into a multi-part series I'm dubbing Mastering Paper.
{:.shorten}

---

<div class="tiles">
{% for post in site.categories.mastering-paper %}
  <article class="tile" itemscope itemtype="http://schema.org/Article">
    <a href="{{ post.url }}" title="{{ post.title }}" class="post-teaser">{% if post.image.teaser %}<img src="/images/{{ site.teaser }}" data-original="/images/{{ post.image.teaser }}" class="load" alt="teaser" itemprop="image">
    <noscript><img src="/images/{{ post.image.teaser }}" alt="teaser" itemprop="image"></noscript>
        {% else %}<img src="/images/{{ site.teaser }}" alt="teaser" itemprop="image">{% endif %}</a>
    <h2 class="post-title" itemprop="name"><a href="{{ post.url }}">{{ post.title | remove: 'Mastering Paper by 53: ' | remove: ' with Paper by 53' }}</a></h2>
    {% if post.date %}<p class="entry-date date published"><time datetime="{{ post.date | date: "%Y-%m-%d" }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time></p>{% endif %}
    <p class="post-excerpt" itemprop="description">{{ post.excerpt | strip_html | truncate: 160 }}</p>
    </article><!-- /.tile -->
{% endfor %}