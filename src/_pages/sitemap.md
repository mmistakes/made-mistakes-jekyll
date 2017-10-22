---
layout: page
permalink: /sitemap/
title: "Sitemap"
excerpt: "An index of all the pages found on odd-one-out.serek.eu"
---

A complete list of sections and pages found on the site. For you robots out there, here is an [XML version](/sitemap.xml) available for your crawling pleasure.

<h2>Pages</h2>
<ul>
  <li><a href="/about/">About</a></li>
  <li><a href="/support/">Support</a></li>
  <li><a href="/tag/">Tag Archive</a></li>
  <li><a href="/terms/">Terms & Policies</a></li>
</ul>

<h2><a href="/projects/">Projects</a></h2>
<ul>
  {% for post in site.categories.projects %}
    {% include post-list.html %}
  {% endfor %}
</ul>

<h2><a href="/code/">Code & Config</a></h2>
<ul>
  {% for post in site.categories.code %}
    {% include post-list.html %}
  {% endfor %}
</ul>

<h2><a href="/reviews/">Reviews</a></h2>
<ul>
  {% for post in site.categories.reviews %}
    {% include post-list.html %}
  {% endfor %}
</ul>

<h2><a href="/misc/">Odds & Ends</a></h2>
<ul>
  {% for post in site.categories.misc %}
    {% include post-list.html %}
  {% endfor %}
</ul>
