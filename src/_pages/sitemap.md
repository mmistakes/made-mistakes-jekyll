---
layout: archive
permalink: /sitemap/
title: "Sitemap"
date: 2014-12-26
modified: 2016-02-19
excerpt: "A visual sitemap of all the pages on mademistakes.com"
fullwidth: true
share: false
ads: false
---

A hierarchical breakdown of all the sections and pages found on the site. For you robots out there is an [XML version]({{ site.url }}/sitemap.xml) available for digesting.

<div class="sitemap">
  <ul id="primaryNav" class="col5">
    <li id="home"><a href="{{ site.url }}/">Home</a></li>
    <li><a href="{{ site.url }}/about/">About</a>
      <ul>
        <li><a href="{{ site.url }}/faqs/">Frequently Asked Questions</a></li>
        <li><a href="{{ site.url }}/contact/">Contact</a></li>
        <li><a href="{{ site.url }}/support/">Support</a></li>
        <li><a href="{{ site.url }}/terms/">Terms</a></li>
        <li><a href="{{ site.url }}/style-guide/">Style Guide</a></li>
      </ul>
    </li>
    <li><a href="{{ site.url }}/tag/">Archives by Tag</a>
      <ul>
        {% assign tags_list = site.tags | sort %}  
        {% for tag in tags_list %} 
          <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/">{{ tag[0] }}</a></li>
        {% endfor %}
      </ul>
    </li>
    <li><a href="{{ site.url }}/articles/">Blog Articles</a>
      <ul>
        {% for post in site.categories.articles %}
          {% include post-list.html %}
        {% endfor %}
      </ul>
    </li>
    <li><a href="{{ site.url }}/mastering-paper/">Mastering Paper</a>
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
  </ul><!-- /.col5 -->
</div><!-- /.sitemap -->

