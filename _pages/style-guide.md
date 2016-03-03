---
layout: archive
permalink: /style-guide/
title: "Style Guide"
date: 2015-01-28T12:05:57-05:00
modified: 2015-02-05T10:32:14-05:00
excerpt: "A handy collection of all the colors, typography, UI patterns, and components used on Made Mistakes."
fullwidth: true
ads: false
share: false
---

{{ page.excerpt | markdownify }}

Where applicable links to a component's Sass partial[^sass] and/or `_include` are provided along with short descriptions of typical usage.

[^sass]: Sass partials are written using the Sassy SCSS syntax (or SCSS) and can be found in [`_assets/stylesheets/`]({{ site.owner.github-repo }}_assets/stylesheets/).

{% assign entries = site.colors %}
{% assign componentsByType = site.components | group_by:"type" %}

<nav id="component-selector" class="wrap">
  <form>
    <select name="newurl" id="component-select" onChange="window.location.replace(this.options[this.selectedIndex].value)">
      <option value="">Select a Component</option>
      <option value="#guide-color-palettes">Colors</option>
      {% for type in componentsByType %}
      <option value="#guide-{{ type.name }}">{{ type.name | capitalize }}</option>
      {% for entry in type.items %}
      <option value="#guide-{{ entry.title | slugify }}">&nbsp;&nbsp;&nbsp;{{ entry.title }}</option>
      {% endfor %}
      {% endfor %}
    </select>
  </form>
</nav>

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
