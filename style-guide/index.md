---
layout: style_guide
title: "Style Guide"
date: 2015-01-28T12:05:57-05:00
modified: 2015-02-04T15:54:12-05:00
excerpt: "A handy collection of all the colors, typography, UI patterns, and components used on Made Mistakes."
image:
  feature:
  teaser:
  thumb:
ads: false
---

This is the style guide for Made Mistakes --- a living document of code detailing all the various colors, typographic elements, UI patterns, and components used on the website.
{: .shorten}

Where applicable links to a component's Sass partial[^sass] and/or `_include` are provided along with short descriptions of typical usage.
{: .shorten}

[^sass]: Sass partials are written using the Sassy SCSS syntax (or SCSS) and can be found in [`_assets/stylesheets/`]({{ site.owner.github-repo }}_assets/stylesheets/).

{% assign entries = site.colors %}
{% assign componentsByType = site.components | group_by:"type" %}

<!-- <nav class="toc cf">
  <ul id="markdown-toc">
    <li><a href="#guide-color-palettes">Color Palettes</a></li>
    {% for type in componentsByType %}
      <li><a href="#guide-{{ type.name }}">{{ type.name | capitalize }}</a></li>
    {% endfor %}
  </ul>
</nav> -->

<h2 id="guide-color-palettes" class="cf">Color Palettes</h2>
{% for entry in entries %}
  {% include component-color.html %}
{% endfor %}
{% for type in componentsByType %}
<h2 id="guide-{{ type.name }}" class="cf">{{ type.name | capitalize }}</h2>
{% for entry in type.items %}
{% include component.html %}
{% endfor %}
{% endfor %}
