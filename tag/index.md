---
layout: archive
title: "Tag Index"
modified:
excerpt: "An archive of posts organized by tag."
share: false
ads: false
---

### An archive of posts sorted by tag name.

<ul class="tag__list">
{% assign tags_list = site.tags | sort %}  
  {% for tag in tags_list %} 
    <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/" class="tag__item">{{ tag[0] }} <span>{{ tag[1].size }}</span></a></li>
  {% endfor %}
</ul>
