---
layout: article
title: "Frequently Asked Questions"
date: 2014-09-10T14:46:57-04:00
modified: 2014-11-25
excerpt: "Because no one likes to repeat things here's a compilation of answers to questions I'm asked often."
image:
  feature: faq-feature.jpg
---

Because no one likes to repeat things here's a compilation of answers to questions I'm often asked. For the most part they're related to my experience drawing on an iPad with the app [**Paper by FiftyThree**](http://www.fiftythree.com/paper).

{% assign paper_faqs = site.faqs | where: "type", "paper" | sort: "order" %}
{% assign other_faqs = site.faqs | where: "type", "other" | sort: "order" %}

<div class="sidebar-left top">
<nav class="toc">
  <h6 class="toc-title">Paper by FiftyThree</h6>
	<ul>
{% for faq in paper_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
  </ul>
	<h6 class="toc-title">Other</h6>
  <ul>
{% for faq in other_faqs %}
<li><a href="{{ faq.url }}">{{ faq.title }}</a></li>
{% endfor %}
	</ul>
</nav><!-- /.toc-left -->
</div><!-- /.sidebar-left -->

{% for faq in paper_faqs %}
<h2><a href="{{ faq.url }}">{{ faq.title }}</a></h2>
{{ faq.content }}
<hr />
{% endfor %}

{% for faq in other_faqs %}
<h2><a href="{{ faq.url }}">{{ faq.title }}</a></h2>
{{ faq.content }}
<hr />
{% endfor %}

{% include affiliate-disclosure.html %}
