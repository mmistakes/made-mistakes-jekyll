---
layout: page
permalink: /tag/
title: "Tag Index"
last_modified_at: 2017-06-19T09:19:44-04:00
excerpt: "An archive of posts sorted by tag frequency."
share: false
---

{{ page.excerpt | markdownify }}

<ul>
  {% assign sorted_tags = site.tags | sort_tags_by_posts_count %}
  {% for tag in sorted_tags %}
    <li><a href="/tag/{{ tag[0] | replace:' ','-' | downcase }}/">{{ tag[0] }}</a> ({{ tag[1] }})</li>
  {% endfor %}
</ul>
