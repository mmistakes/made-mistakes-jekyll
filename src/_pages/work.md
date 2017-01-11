---
layout: archive
permalink: /work/
title: "Work Portfolio"
date: 2014-06-02T15:05:16-04:00
last_modified_at: 2016-01-04T16:38:17-05:00
excerpt: "A selection of things I've designed, illustrated, and developed."
ads: false
---

{% assign sorted_work = site.work | sort: 'order' %}
{% for post in sorted_work %}
  {% include archive__item.html %}
{% endfor %}
