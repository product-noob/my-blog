---
published: false
title: github pages setup
classes: wide
categories:
  - Tools
tags:
  - ROS
  - Programming
---

How

md setup for book chapters and manuscripts
```liquid
## Book Chapters

{% bibliography -q @inbook %}

## Manuscripts

{% bibliography -q @phdthesis %}
```



{% include group-by-array collection=site.posts field="categories" %}

{% for category in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ category | slugify }}" class="archive__subtitle">{{ category }}</h2>
  {% for post in posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}


https://mademistakes.com/articles/using-jekyll-2017/
