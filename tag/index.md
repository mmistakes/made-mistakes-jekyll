---
layout: article
title: "Tag Index"
modified:
excerpt: "An archive of pages sorted by tag name."
share: false  
---

### An archive of pages sorted by tag name.

<ul class="tag-box">
{% assign tags_list = site.tags | sort %}  
  {% for tag in tags_list %} 
    <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/">{{ tag[0] }} <span>{{ tag[1].size }}</span></a></li>
  {% endfor %}
</ul>