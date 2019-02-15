---
layout: page
permalink: /style-guide/
title: "Style guide"
date: 2016-08-26
last_modified_at: 2015-02-05T10:32:14-05:00
excerpt: "A handy collection of all the colors, typography, UI patterns, and components used on Made Mistakes."
---

A handy collection of all the colors, typography, UI patterns, and components used on Made Mistakes.

Where applicable links to a component's Sass partial[^sass] and/or Jekyll include are provided, along with short descriptions of typical usage.

[^sass]: Sass partials are written using the Sassy SCSS syntax (or SCSS) and can be found in [`src/assets/stylesheets/`](https://github.com/{{ site.repository }}/tree/master/src/assets/stylesheets).

{% assign entries = site.colors %}
{% assign componentsByType = site.components | group_by:"type" %}

<div markdown="0">
<select name="newurl" id="component-select" onChange="window.location.replace(this.options[this.selectedIndex].value)" aria-label="Select a Component" markdown="0">
  <option selected markdown="0">Select a component</option>
  <option value="#guide-color-palettes" markdown="0">Colors</option>
  {% for type in componentsByType %}
  <option value="#guide-{{ type.name }}" markdown="0">{{ type.name | capitalize }}</option>
  {% for entry in type.items %}
  <option value="#guide-{{ entry.title | slugify }}" markdown="0">&nbsp;&nbsp;&nbsp;{{ entry.title }}</option>
  {% endfor %}
  {% endfor %}
</select>
</div>

<h2 id="guide-color-palettes" class="cf">Colors</h2>
{% for entry in entries %}
  {% include component-color.html %}
{% endfor %}
{% for type in componentsByType %}
<h2 id="guide-{{ type.name }}" class="cf">{{ type.name | capitalize }}</h2>
{% for entry in type.items %}
{% include component.html %}
{% endfor %}
{% endfor %}
