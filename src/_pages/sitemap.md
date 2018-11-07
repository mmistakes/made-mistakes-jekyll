---
layout: page
permalink: /sitemap/
title: "Sitemap"
excerpt: "An index of all the pages found on mademistakes.com"
---

A hierarchical breakdown of all the sections and pages found on the site. For you robots out there, here is an [XML version](/sitemap.xml) available for your crawling pleasure.

## Pages

<ul>
  <li><a href="/about/">About</a></li>
  <li><a href="/contact/">Contact</a></li>
  <li><a href="/faqs/">Frequently Asked Questions</a></li>
  <li><a href="/support/">Support</a></li>
  <li><a href="/tag/">Tag Archive</a></li>
  <li><a href="/terms/">Terms and Policies</a></li>
</ul>

## [Blog articles](/articles/)

<ul>
  {% for post in site.categories.articles %}
    {% include post-list.html %}
  {% endfor %}
</ul>

## [Today I learned](/til/)

<ul>
  {% for post in site.categories.til %}
    {% include post-list.html %}
  {% endfor %}
</ul>

## [Mastering Paper for iOS](/mastering-paper/)

<ul>
  {% for post in site.categories.mastering-paper %}
    {% include post-list.html %}
  {% endfor %}
</ul>

## [Portfolio work](/work/)

<ul>
  {% for post in site.work %}
    {% include post-list.html %}
  {% endfor %}
</ul>
