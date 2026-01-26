---
layout: layouts/blog.njk
title: Blogs
description: Update blog articles
pagination:
  data: collections.posts
  size: 6
permalink: /articles/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}{% endif %}/index.html
---
