---
layout: archive
title: "Mastering Paper by 53"
excerpt: "Tutorials and techniques to help master Paper."
modified: 2014-06-06T12:22:52.691000-04:00
image: 
  thumb: paper-53-expanded-guide-thumb.jpg
tags: [Paper by 53, tutorial, drawing, painting, iPad, stylus]
---

In the spirit of openness I've decided to compile everything I've learned using [*Paper by FiftyThree*](http://www.fiftythree.com), into a multi-part series I'm dubbing Mastering Paper.
{:.shorten}

---

<div class="tiles">
{% for post in site.categories.mastering-paper reversed %}
  <article class="tile" itemscope itemtype="http://schema.org/Article">
    <a href="{{ post.url }}" title="{{ post.title }}" class="post-teaser">{% if post.image.teaser %}<img src="/images/{{ site.teaser }}" data-original="/images/{{ post.image.teaser }}" class="load" alt="teaser" itemprop="image">
    <noscript><img src="/images/{{ post.image.teaser }}" alt="teaser" itemprop="image"></noscript>
        {% else %}<img src="/images/{{ site.teaser }}" alt="teaser" itemprop="image">{% endif %}</a>
    {% if post.date %}<p class="entry-date date published"><time datetime="{{ post.date | date: "%Y-%m-%d" }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time></p>{% endif %}
    <h2 class="post-title" itemprop="name"><a href="{{ post.url }}">{{ post.title | remove: 'Mastering Paper by 53: ' | remove: ' with Paper by 53' }}</a></h2>
    <p class="post-excerpt" itemprop="description">{{ post.excerpt | strip_html | truncate: 160 }}</p>
    </article><!-- /.tile -->
{% endfor %}
  <article class="tile">
    <span class="post-teaser"><img src="/images/{{ site.teaser }}" alt="teaser"></span>
    <p class="entry-date">Coming Soon!</p>
    <h2 class="post-title">Drawing Hair (revisited)</h2>
    <p class="post-excerpt">One of my favorite things to draw is long flowing hair. Learn how I create realistic renders in a matter of minutes.</p>
  </article><!-- /.tile -->
  <article class="tile">
    <span class="post-teaser"><img src="/images/{{ site.teaser }}" alt="teaser"></span>
    <p class="entry-date">Coming Soon!</p>
    <h2 class="post-title">Managing Journals and Pages</h2>
    <p class="post-excerpt">Learn how to create templates by duplicating pages across journals &#8212; perfect for building consistency in a drawing project.</p>
  </article><!-- /.tile -->
  <article class="tile">
    <span class="post-teaser"><img src="/images/{{ site.teaser }}" alt="teaser"></span>
    <p class="entry-date">Coming Soon!</p>
    <h2 class="post-title">Screen Capture Techniques and Animation</h2>
    <p class="post-excerpt">Workflows for recording time lapse videos of Paper creations without jailbreaking an iPad.</p>
  </article><!-- /.tile -->
  <article class="tile">
    <span class="post-teaser"><img src="/images/{{ site.teaser }}" alt="teaser"></span>
    <p class="entry-date">Coming Soon!</p>
    <h2 class="post-title">Getting the Most Out of Pencil</h2>
    <p class="post-excerpt">Pencil is a great stylus built exclusively for Paper. Learn drawing techniques that only it can perform.</p>
  </article><!-- /.tile -->
</div><!-- /.tiles -->