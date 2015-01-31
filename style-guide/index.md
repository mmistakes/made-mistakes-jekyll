---
layout: style_guide
title: "Style Guide"
date: 2015-01-28T12:05:57-05:00
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Style guide for Made Mistakes.

{% assign entries = site.colors %}
<h2>Color Palettes</h2>
{% for entry in entries %}
  {% include component-color.html %}
{% endfor %}

{% assign componentsByType = site.components | group_by:"type" %}
{% for type in componentsByType %}
<h2>{{ type.name | capitalize }}</h2>
{% for entry in type.items %}
{% include component.html %}
{% endfor %}
{% endfor %}
