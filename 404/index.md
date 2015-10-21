---
layout: article
title: "Your Pixels are on Another Canvas"
excerpt: "Page not found. Your pixels are on another canvas."
image:
  feature:
  teaser:
  thumb:
ads: false
share: false
sitemap: false
author: false
---

Sorry, but the page you were trying to view has moved or does not exist --- perhaps you can [find it here]({{ site.url }}/sitemap/ "Sitemap of Made Mistakes").

### Featured Posts

<ul>
{% assign features = site.posts | where:"featured", true %}
{% for post in features limit:5 %}
  <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

<script type="text/javascript">
  var GOOG_FIXURL_LANG = 'en';
  var GOOG_FIXURL_SITE = 'https://mademistakes.com'
</script>
<script type="text/javascript" src="https://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
