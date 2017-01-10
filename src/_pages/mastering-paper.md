---
layout: archive
permalink: /mastering-paper/
title: "Mastering Paper by&#160;FiftyThree"
excerpt: "Collection of tutorials written by an avid iPad illustrator to help you master [Paper by FiftyThree](http://www.fiftythree.com/paper)."
last_modified_at: 2016-01-26T10:09:10-05:00
share: false
image: 
  path: &image /assets/images/mastering-paper-feature-2016.jpg
  credit: '"Unfinished Except Nose" sketched with Pencil by FiftyThree'
  creditlink: https://mademistakes.com/paperfaces/myriam-j-portrait/
pagination: 
  enabled: true
  category: mastering-paper
  per_page: 10
---

{% for post in paginator.posts %}
  {% include archive__item.html %}
{% endfor %}

{% if paginator.total_pages > 1 %}
  <div class="pager">
    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | absolute_url }}" class="btn">Show me more &rarr;</a>
    {% endif %}
  </div>
{% endif %}
