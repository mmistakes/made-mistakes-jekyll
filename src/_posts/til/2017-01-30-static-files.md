---
title: "Accessing Static Files in Jekyll"
excerpt:
image:
  path:
  teaser: /assets/images/jekyll-static-files-teaser.jpg
  cover: /assets/images/jekyll-static-files-cover.jpg
tags: [web development, Jekyll]
last_modified_at:
---

While investigating ways of using static files with Jekyll for a site prototype I was building, I learned that `site.static_files` was a thing. What is and why you should care? Let me share...

<blockquote>
  <p>&ldquo;A static file is a file that does not contain any YAML front matter. These include images, PDFs, and other un-rendered content.&rdquo;</p>
  <p><cite><a href="https://jekyllrb.com/docs/static-files/">Jekyll Documentation</a></cite></p>
</blockquote>

**The useful bit:** every one of these static files are accessible to Jekyll by looping through `site.static_files`. There aren't many reasons why you'd want to do this, but if building "plugin-free" image galleries is one of them --- here's how.

{% include toc.html %}

## Organize your Static Files in Folders

Let's say you have a folder (named `gallery-1`) of images you want to display together on a post or page.

```
├── assets/
│   └── images/
│       └── gallery-1/
│           ├── foo.jpg
│           ├── bar.gif
│           └── yaz.png
```

## Start a Loop

Using [Liquid](https://shopify.github.io/liquid/)[^liquid] you'd start by looping over `site.static_files` and then narrowing them down based on their paths. In this case we only want to show those images that live in `assets/images/gallery-1`.

[^liquid]: Liquid is an open-source template language created by Shopify and written in Ruby.

```liquid
{% raw%}{% for image in site.static_files %}
  {% if image.path contains 'assets/images/gallery-1' %}
    <img src="{{ image.path }}" alt="">
  {% endif %}
{% endfor %}{% endraw %}
```

Which will generate into the following HTML:

```html
<img src="assets/images/gallery-1/bar.gif" alt="">
<img src="assets/images/gallery-1/foo.jpg" alt="">
<img src="assets/images/gallery-1/yaz.png" alt="">
```

## Build an Image Gallery

Instead of showing them as full-size images, what if you'd rather spit out a group of thumbnail images that link to the larger versions? Completely achievable using this method --- if you carefully name your files.

Start by resizing/cropping images to create *thumbnail* versions of each image with the tool or batch script of your choice. The important part here is to be consistent with how you name these files. For the sake of this example I'll be adding the suffix `-th` to each filename like so:

```
├── assets/
│   └── images/
│       └── gallery-1/
│           ├── foo.jpg
│           ├── foo-th.jpg
│           ├── bar.gif
│           ├── bar-th.gif
│           ├── yaz.png
│           └── yaz-th.png
```

Assuming a thumbnail and full-size image share the same base name, we can construct the gallery's HTML with the following:

```liquid
{% raw %}{% for image in site.static_files %}
  {% if image.path contains 'assets/images/gallery-1' %}
    {% unless image.path contains '-th.' %}
      <a href="{{ image.path }}">
        <img src="{{ image.basename | append: '-th' | append: image.extname }}" alt="">
      </a>
    {% endunless %}
  {% endif %}
{% endfor %}{% endraw %}
```

Now you may be wondering where `basename` and `extname` came from... simple. Each static file contains metadata accessible via Liquid with the following variables:

| Variable             | Description |
| --------             | ----------- |
| `file.path`          | The relative path to the file, e.g. `/assets/img/image.jpg` |
| `file.modified_time` | The time the file was last modified, e.g. `2016-04-01 16:35:26 +0200` |
| `file.name`          | The string name of the file e.g. `image.jpg` for `image.jpg` |
| `file.basename`      | The string basename of the file e.g. `image` for `image.jpg` |
| `file.extname`       | The extension name for the file, e.g. `.jpg` for `image.jpg` |

{% include notice type="warning" content="
#### Note: Filename Consistency is Paramount

Using this method to build a gallery of thumbnail images is fragile. The `image` objects inside of these loops are not validated by Jekyll at all. If you call in paths that don't exist it will silently fail and leave you with missing images on the page."
%}

## Feedback and Improvements

In the end looping through `site.static_files` became an easy way spitting out a folder of files without having to hard code `<img>` elements.  Sure there are a million different ways to do this with Jekyll, but this served a need and was a quick hack.

Curious if others are using **static files** in cool and interesting ways. Feel free to let me know in the comment section below if you are :smile:.
