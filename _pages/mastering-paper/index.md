---
layout: archive
permalink: /mastering-paper/
title: "Mastering Paper by FiftyThree"
excerpt: "A compilation of tutorials and learnings to help master Paper by FiftyThree."
modified: 2016-01-26T10:09:10-05:00
share: false
image: 
  feature: mastering-paper-feature-2016.jpg
  thumb: paper-by-fiftythree-icon175x175.png
  credit: '"Unfinished Except Nose" sketched with Pencil by FiftyThree'
  creditlink: https://mademistakes.com/paperfaces/myriam-j-portrait/
feature:
  visible: true
  headline: "Featured Tutorials"
  category: mastering-paper
---

{% for post in site.categories.mastering-paper %}
  {% if post.featured != true %}
  {% include archive__item.html %}
  {% endif %}
{% endfor %}
