---
layout: archive
permalink: /sitemap/
title: "Sitemap"
date: 2014-12-26
modified: 2016-09-27T23:23:32-04:00
excerpt: "A visual sitemap of all the pages on mademistakes.com"
share: false
ads: false
---

A hierarchical breakdown of all the sections and pages found on the site. For you robots out there, here is an [XML version]({{ site.url }}/sitemap.xml) available for digesting.

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
