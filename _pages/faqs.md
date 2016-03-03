---
layout: archive
permalink: /faqs/
title: "Frequently Asked Questions"
date: 2015-09-23T14:11:44-04:00
modified: 2016-03-02
excerpt: "Because no one likes to repeat things here's a compilation of answers to questions I'm often asked."
---

{{ page.excerpt | markdownify }}

Did I forget something you expect an answer for? If you don't find it below feel free to [reach out and ask]({{ site.url }}/contact).

{% assign other_faqs = site.faqs | where: "type", "other" | sort: "order" %}
{% assign paper_faqs = site.faqs | where: "type", "paper" | sort: "order" %}

## Other

<ul class="fl">
{% for faq in other_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>

## Paper by FiftyThree

<ul class="fl">
{% for faq in paper_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
</ul>