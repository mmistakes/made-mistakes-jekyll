---
layout: archive
permalink: /articles/
title: "Blog Articles"
date: 2014-06-02T12:26:34-04:00
last_modified_at: 2016-10-27T09:31:17-04:00
excerpt: "A collection of thoughts, inspiration, mistakes, and other minutia I've written. For smaller, more regular tidbits --- peruse the [*Today I Learned*](/til/) section."
pagination: 
  enabled: true
  category: articles
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
