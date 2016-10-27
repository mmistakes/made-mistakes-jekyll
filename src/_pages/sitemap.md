---
layout: archive
permalink: /sitemap/
title: "Sitemap"
date: 2014-12-26
modified: 2016-10-27T09:32:05-04:00
excerpt: "An index of all the pages found on mademistakes.com"
---

A hierarchical breakdown of all the sections and pages found on the site. For you robots out there, here is an [XML version]({{ site.url }}/sitemap.xml) available for indexing.

<ul>
  <li><a href="{{ site.url }}/">Home</a></li>
  <li><a href="{{ site.url }}/about/">About</a></li>
  <li><a href="{{ site.url }}/contact/">Contact</a></li>
  <li><a href="{{ site.url }}/faqs/">Frequently Asked Questions</a></li>
  <li><a href="{{ site.url }}/support/">Support</a></li>
  <li><a href="{{ site.url }}/terms/">Terms and Policies</a></li>
  <li><a href="{{ site.url }}/tag/">Archives by Tag</a></li>
  <li><a href="{{ site.url }}/articles/">Blog Articles</a>
    <ul>
      {% for post in site.categories.articles %}
        {% include post-list.html %}
      {% endfor %}
    </ul>
  </li>
  <li><a href="{{ site.url }}/til/">Today I Learned</a>
    <ul>
      {% for post in site.categories.til %}
        {% include post-list.html %}
      {% endfor %}
    </ul>
  </li>
  <li><a href="{{ site.url }}/mastering-paper/">Mastering Paper by FiftyThree</a>
    <ul>
      {% for post in site.categories.mastering-paper %}
        {% include post-list.html %}
      {% endfor %}
    </ul>
  </li>
  <li><a href="{{ site.url }}/work/">Work</a>
    <ul>
      {% for post in site.categories.work %}
        {% include post-list.html %}
      {% endfor %}
    </ul>
  </li>
</ul>
