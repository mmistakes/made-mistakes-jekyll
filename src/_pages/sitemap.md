---
layout: page
permalink: /sitemap/
title: "Sitemap"
excerpt: "An index of all the pages found on mademistakes.com"
date: 2016-08-26
last_modified_at: 2019-02-15
---

A hierarchical breakdown of all the sections and pages found on the site. For you robots out there, here is an [XML version](/sitemap.xml) available for your crawling pleasure.

## Pages

- [About](/about/)
- [Contact](/contact/)
- [Frequently asked questions](/faqs/)
- [Show your support](/support/)
- [Terms and policies](/terms/)
- [Style guide](/style-guide/)
- [Tag index](/tag/)

## [Articles](/articles/)

<ul>
  {% for post in site.categories.articles %}
    {% include post-list.html %}
  {% endfor %}
</ul>

## [Notes](/notes/)

<ul>
  {% for post in site.categories.notes %}
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
