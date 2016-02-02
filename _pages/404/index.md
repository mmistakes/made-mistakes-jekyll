---
permalink: /404/
title: "Your Pixels are on Another Canvas"
layout: glitch
excerpt: "Page not found. Your pixels are on another canvas."
ads: false
share: false
sitemap: false
author: false
---

<div class="typed__source">
  <h1 class="glitch__title">Your Pixels are on Another Canvas</h1>
  <div class="glitch__excerpt">
    <p>Sorry, but the page you were trying to view has moved or does not exist &8212; perhaps you can <a href="{{ site.url }}/sitemap/" title="sitemap of Made Mistakes">find it here</a>.</p>
  </div>
</div>

<span id="js-404-typed" class="typed__dest glitch__excerpt"></span>

<div class="glitch__secondary">
  <ul>
    <li><a href="#0" class="overlay__menu-trigger">Main Menu</a></li>
  {% assign features = site.posts | where:"featured", true %}
  {% for post in features limit:3 %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title | remove: "Mastering Paper by FiftyThree: " }}</a></li>
  {% endfor %}
  </ul>
  
  <script type="text/javascript">
    var GOOG_FIXURL_LANG = 'en';
    var GOOG_FIXURL_SITE = '{{ site.url }}'
  </script>
  <script type="text/javascript" src="https://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
</div>
