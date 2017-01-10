---
layout: archive
permalink: /til/
title: "Today I Learned"
date: 2016-10-21T12:12:10-04:00
modified:
excerpt: "Learnings (sometimes daily) captured for posterity and educational purposes."
pagination: 
  enabled: true
  category: til
  per_page: 10
---

{% for post in paginator.posts %}
  {% include archive__item.html %}
{% endfor %}

{% if paginator.total_pages > 1 %}
  <div class="pager">
    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | absolute_url }}" class="btn">Show me more &rarr;</a>
    {% endif %}
  </div>
{% endif %}
