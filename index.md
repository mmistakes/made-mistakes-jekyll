---
layout: archive
permalink: /
title: "A Designer’s Faux Pas"
excerpt: "Making stuff one mistake at a time."
image:
  feature: support-feature.jpg
id: home
---

Made Mistakes is the personal website of [Michael Rose]({{ site.url }}/about/). I'm a boring, tattooed, time traveling designer from Buffalo, New York who enjoys eating chicken wings and [sketching on an iPad]({{ site.url }}/tag/paper-by-53/) --- *not necessarily at the same time*.
{:.shorten}

<nav class="toc toc-left">
  <ul>
    <li><h6>iPad Portrait Art</h6></li>
    {% for post in site.categories.paperfaces limit:6 %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
  <a href="{{ site.url }}/paperfaces/" class="btn">More Drawings <i class="fa fa-long-arrow-right"></i></a>
</nav><!-- /.toc-left -->

<div class="tiles tiles-3-4 tile-spacer">
{% for post in site.categories.paperfaces limit:12 %}
  <article class="tile tile-equal" itemscope itemtype="http://schema.org/Article">
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}" class="post-teaser">
      <img src="{{ site.url }}/images/preload-400.png" data-original="{{ site.url }}/images/{% if post.image.teaser %}{{ post.image.teaser }}{% else %}{{ site.teaser }}{% endif %}" class="load" alt="teaser" itemprop="image">
      <noscript><img src="{{ site.url }}/images/{% if post.image.teaser %}{{ post.image.teaser }}{% else %}{{ site.teaser }}{% endif %}" alt="teaser" itemprop="image"></noscript>
    </a>
  </article><!-- /.tile -->
  {% endfor %}
</div><!-- /.tiles-3-4 -->


<nav class="toc toc-left">
  <ul>
    <li><h6>Paper by FiftyThree</h6></li>
    {% for post in site.categories.mastering-paper limit:10 %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title | remove: 'Mastering Paper by FiftyThree: ' | remove: 'Mastering Paper by 53: ' | remove: ' with Paper by 53' }}</a></li>
    {% endfor %}
  </ul>
  <a href="{{ site.url }}/mastering-paper/" class="btn">More Tutorials <i class="fa fa-long-arrow-right"></i></a>
</nav><!-- /.toc-left -->

<div class="tiles tiles-3-4">
{% for post in site.categories.mastering-paper limit:8 %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles-3-4 -->


<nav class="toc toc-left">
  <ul>
    <li><h6>A Blog of Sorts</h6></li>
    <li><a href="{{ site.url }}/tag/">Tag Archive</a></li>
    <li><a href="{{ site.url }}/2015/">2015 Archive</a></li>
    <li><a href="{{ site.url }}/2014/">2014 Archive</a></li>
  </ul>
  <a href="{{ site.url }}/articles/" class="btn">More Articles <i class="fa fa-long-arrow-right"></i></a>
</nav><!-- /.toc-left -->

<div class="tiles tiles-3-4">
{% for post in site.categories.articles limit:4 %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles-3-4 -->
