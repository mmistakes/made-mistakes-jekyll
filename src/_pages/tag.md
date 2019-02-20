---
layout: archive
permalink: /tag/
title: "Tag index"
date: 2016-08-26
last_modified_at: 2019-02-20T14:30:19-05:00
excerpt: "An archive of posts organized by topic."
---

An archive of {{ site.posts | size }} posts, organized by the following {{ site.tags | size }} topics.

<div class="entries__columns">
  <h2 class="title">Browse by topic</h2>
  <ul>
    {% assign sorted_tags = site.tags | sort_tags_by_name %}
    {% for tag in sorted_tags %}
      <li>
        <a href="/tag/{{ tag[0] | replace:' ','-' | downcase }}/">
          <strong>{{ tag[0] }}</strong> <span class="count">{{ tag[1] }}</span>
        </a>
      </li>
    {% endfor %}
  </ul>
</div>
