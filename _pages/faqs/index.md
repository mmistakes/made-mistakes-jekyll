---
layout: archive
permalink: /faqs/
title: "Frequently Asked Questions"
date: 2015-09-23T14:11:44-04:00
modified: 2016-01-21T16:33:17-05:00
excerpt: "Because no one likes to repeat things here's a compilation of answers to questions I'm often asked."
---

{% assign other_faqs = site.faqs | where: "type", "other" | sort: "order" %}
{% assign paper_faqs = site.faqs | where: "type", "paper" | sort: "order" %}

<h3>Other</h3>

<ul class="fl">
{% for faq in other_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>

<h3>Paper by FiftyThree</h3>

<ul class="fl">
{% for faq in paper_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>
