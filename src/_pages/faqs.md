---
layout: page
permalink: /faqs/
title: "Frequently asked questions"
date: 2016-08-26
last_modified_at: 2018-02-19T09:56:45-05:00
excerpt: "Because no one likes to repeat things here's a compilation of answers to questions I'm often asked."
---

Did I leave something out that you were looking for an answer to? Feel free to reach out and [ask me](/contact/).

{% assign other_faqs = site.faqs | where: "type", "other" | sort: "order" %}
{% assign paper_faqs = site.faqs | where: "type", "paper" | sort: "order" %}

<ul>
{% for faq in other_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>

## iPad Art

<ul>
{% for faq in paper_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>
