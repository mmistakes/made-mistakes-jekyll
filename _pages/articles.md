---
layout: archive
permalink: /articles/
title: "Blog Articles"
date: 2014-06-02T12:26:34-04:00
modified: 2016-02-26T10:36:43-05:00
excerpt: "A collection of thoughts, inspiration, mistakes, and other minutia I've written."
image:
  feature: articles-feature.jpg
  credit: Photography courtesy of Unsplash
  creditlink: https://unsplash.com/photos/EPppwcVTZEo
feature:
  visible: true
  headline: "Featured Articles"
  category: articles
---

{% for post in site.categories.articles %}
  {% if post.featured != true %}
  {% include archive__item.html %}
  {% endif %}
{% endfor %}
