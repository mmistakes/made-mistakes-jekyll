---
layout: archive
title: "Work"
date: 2014-06-02T15:05:16-04:00
modified: 2014-12-04T15:49:58-05:00
excerpt: "A small selection of things I’ve designed, illustrated, or developed."
---

<div class="tiles">
{% for post in site.categories.work %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

