---
layout: archive
title: "Frequently Asked Questions"
date: 2015-09-23T14:11:44-04:00
modified: 2014-11-25
excerpt: "Because no one likes to repeat things here's a compilation of answers to questions I'm often asked."
---

{% assign other_faqs = site.faqs | where: "type", "other" | sort: "order" %}
{% assign paper_faqs = site.faqs | where: "type", "paper" | sort: "order" %}

<nav class="js-toc toc">
<h4 class="toc__title"><span>Other</span></h4>
  <ul class="toc__menu">
{% for faq in other_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
  </ul>
<h4 class="toc__title">Paper by FiftyThree</h4>
  <ul class="toc__menu">
{% for faq in paper_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
  </ul>
</nav>

{% for faq in other_faqs %}
<h2><a href="{{ faq.url }}">{{ faq.title }}</a></h2>
{{ faq.content }}
<hr />
{% endfor %}

{% for faq in paper_faqs %}
<h2><a href="{{ faq.url }}">{{ faq.title }}</a></h2>
{{ faq.content }}
<hr />
{% endfor %}

{% include affiliate-disclosure.html %}
