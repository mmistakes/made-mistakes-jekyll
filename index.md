---
layout: archive
permalink: /
title: "A Designer’s Faux Pas"
excerpt: "Making stuff one mistake at a time."
---

Made Mistakes is the personal website of Michael Rose. I'm a boring, tattooed, time traveling designer from Buffalo, New York who enjoys eating chicken wings and [sketching on an iPad]({{ site.url }}/tag/paper-by-53/) --- *not necessarily at the same time*.
{: .squish}

## iPad Portrait Art
{: .squish .center}

<div class="tiles">
{% for post in site.categories.paperfaces limit:5 %}
  {% include archive-tiles.html %}
{% endfor %}
</div><!-- /.tiles -->

## Paper Tutorials
{: .squish .center}

<div class="tiles">
{% for post in site.categories.mastering-paper limit:3 %}
  {% include mastering-paper-tiles.html %}
{% endfor %}
</div><!-- /.tiles -->

## Blog Articles
{: .squish .center}

<div class="tiles">
{% for post in site.categories.articles limit:3 %}
  {% include archive-tiles.html %}
{% endfor %}
</div><!-- /.tiles -->
