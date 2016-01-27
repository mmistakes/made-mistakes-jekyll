---
layout: archive
permalink: /tag/
title: "Tag Index"
modified:
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
    <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/" class="tag__item">{{ tag[0] }}</a></li>
    {% endif %}
  {% endfor %}
{% endfor %}
</ul>
