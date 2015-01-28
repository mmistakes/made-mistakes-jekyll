---
layout: default
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

{% include toc.html %}

{% assign componentsByType = site.components | group_by:"type" %}
{% for type in componentsByType %}

## {{ type.name | capitalize }}

{% for entry in type.items %}
{% include component.html %}
{% endfor %}
{% endfor %}