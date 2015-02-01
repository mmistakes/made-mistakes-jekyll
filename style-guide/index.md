---
layout: style_guide
title: "Style Guide"
date: 2015-01-28T12:05:57-05:00
modified:
excerpt: "A handy collection of all the colors, typography, UI patterns, and components used on Made Mistakes."
image:
  feature:
  teaser:
  thumb:
ads: false
---

A handy collection of all the colors, typography, UI patterns, and components used on Made Mistakes.

{% assign entries = site.colors %}
{% assign componentsByType = site.components | group_by:"type" %}

<nav class="toc">
  <ul id="markdown-toc">
    <li><a href="#guide-color-palettes">Color Palettes</a></li>
    {% for type in componentsByType %}
      <li><a href="#guide-{{ type.name }}">{{ type.name | capitalize }}</a></li>
    {% endfor %}
  </ul>
</nav>

<h2 id="guide-color-palettes">Color Palettes</h2>
{% for entry in entries %}
  {% include component-color.html %}
{% endfor %}
{% for type in componentsByType %}
<h2 id="guide-{{ type.name }}">{{ type.name | capitalize }}</h2>
{% for entry in type.items %}
{% include component.html %}
{% endfor %}
{% endfor %}
