---
layout: archive
permalink: /
title: "A Designer’s Faux Pas"
excerpt: "Making stuff one mmistake at a time."
image:
  feature: 
id: home
---

Made Mistakes is the personal website of [Michael Rose]({{ site.url }}/about/). A boring, tattooed, time traveling designer from Buffalo, New York who enjoys eating chicken wings and [sketching on an iPad]({{ site.url }}/tag/paper-by-53/) --- *not necessarily at the same time*.
{:.shorten}

---

### [Paper for iPad Tips & Tricks]({{ site.url }}/mastering-paper/)

<div class="tiles">
{% for post in site.categories.mastering-paper limit:4 %}
	{% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

---

### [Words I've Written]({{ site.url }}/articles/)

<div class="tiles">
{% for post in site.categories.articles limit:4 %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

---

### [Faces I've Drawn]({{ site.url }}/paperfaces/)

<ul class="th-grid-full">
{% for post in site.categories.paperfaces limit:8 %}
  <li><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}"><img src="{{ site.url }}/images/{{ post.image.thumb }}" alt="thumbnail image"></a></li>
{% endfor %}
</ul>