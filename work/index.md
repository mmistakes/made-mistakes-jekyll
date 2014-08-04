---
layout: archive
title: "Work"
date: 2014-06-02T15:05:16-04:00
modified:
excerpt: "Things I’ve designed, illustrated, or developed."
image:
  feature:
  teaser:
  thumb:
body-id: work
---

<div class="tiles">
{% for post in site.categories.work %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

