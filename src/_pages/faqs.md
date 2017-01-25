---
layout: page
permalink: /faqs/
title: "Frequently Asked Questions"
date: 2015-09-23T14:11:44-04:00
last_modified_at: 2016-03-03T10:29:27-05:00
excerpt: "Because no one likes to repeat things here's a compilation of answers to questions I'm often asked."
---

Did I leave something out that you were looking for an answer to? Feel free to reach out and [ask me]({{ site.url }}/contact).

{% assign other_faqs = site.faqs | where: "type", "other" | sort: "order" %}
{% assign paper_faqs = site.faqs | where: "type", "paper" | sort: "order" %}

## Other

<ul>
{% for faq in other_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>

## Paper by FiftyThree

<ul>
{% for faq in paper_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>
