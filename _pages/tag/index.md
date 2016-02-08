---
layout: archive
permalink: /tag/
title: "Tag Index"
modified: 2016-02-08T16:17:58-05:00
excerpt: "An archive of posts sorted by tag frequency."
share: false
---

{% assign tags_max = 0 %}
{% for tag in site.tags %}
  {% if tag[1].size > tags_max %}
    {% assign tags_max = tag[1].size %}
  {% endif %}
{% endfor %}

<ul class="tag__list">
{% for i in (1..tags_max) reversed %}
  {% for tag in site.tags %}
    {% if tag[1].size == i %}
    <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/" class="tag__item"><span class="tag__name">{{ tag[0] }}</span> <span class="tag__count">{{ tag[1].size }}</span></a></li>
    {% endif %}
  {% endfor %}
{% endfor %}
</ul>
