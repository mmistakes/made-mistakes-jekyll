---
layout: archive
title: "Blog Articles"
date: 2014-06-02T12:26:34-04:00
modified: 2015-12-02T11:05:08-05:00
excerpt: "A collection of thoughts, inspiration, mistakes, and other minutia I’ve written."
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
