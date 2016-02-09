---
layout: archive
permalink: /tag/
title: "Tag Index"
modified: 2016-02-08T16:17:58-05:00
excerpt: "An archive of posts sorted by tag frequency."
share: false
---

{% assign sorted_tags = site.tags | sort_casecmp %}

<ul class="tag__list">
  {% for tag in sorted_tags %}
    <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/" class="tag__item"><span class="tag__name">{{ tag[0] }}</span> <span class="tag__count">{{ tag[1].size }}</span></a></li>
  {% endfor %}
</ul>
