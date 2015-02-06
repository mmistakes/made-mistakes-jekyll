---
layout: article
title: "Building a Style Guide With Jekyll"
date: 2015-02-05T15:09:19-05:00
modified:
categories: articles
excerpt:
tags: [jekyll, style guide, open source, web development, github]
image:
  feature:
  teaser:
  thumb:
---

[Style Guides](http://bradfrost.com/blog/post/style-guides/ "Brad Frost on style guides") and "pattern libraries" have become quite popular as of late. Building a living document that detailed all of the colors, typographic elements, UI patterns, and components I used on Made Mistakes has been on my todo list for quite some time.

As sole designer, developer, and writer for Made Mistakes, I decided to focus on the pattern library portion of the style guide first. Manly as a way of helping me maintain visual consistency throughout the site as I constantly iterate on things. Writing and code style guides are less important since I'm not sharing those responsibilities with anyone else, but that's not to say they shouldn't be documented at some point.

## Keep it Simple

With the attention style guides have gotten this last year, a nice selection of [generators and tools](http://styleguides.io/tools.html "style guide tools") have popped up in the open source community. Because I'm [using Jekyll to publish my site]({{ site.url }}{% post_url /articles/2012-03-19-going-static %}) I felt it would be silly to use another tool to generate a style guide even if it meant giving up the ease of setup by having to build it out myself. Finding a way to do it all with Jekyll was an important consideration for me since I wanted to keep the dependencies low avoid having to maintain a component in multiple places to keep markup and styles in sync.

So with that I bumped around GitHub and Google to see what sort of solutions existed and found these:

* [Jekyll CSS Styleguide](http://davidhund.nl/jekyll-styleguide/)
* [Boilerplate for Jekyll Styleguide](https://github.com/jeromecoupe/jekyllstyleguide)

Out of the two, I liked [Jérôme Coupé's](http://www.webstoemp.com/) approach the best since it seemed to mesh well with how I had the rest of my site setup. By leveraging **collections**[^collections] I could avoid littering my `_posts` folder with components, color palettes, and other snippets.

[^collections]: A feature added to Jekyll in [version 2.0.0](http://jekyllrb.com/docs/history/#v2-0-0) allowing you to define new types of documents that behave like Pages or Posts, while also having their own unique properties and name-spaces.

## Building the Style Guide

To start I took a quick survey of all the Sass partials in my `_asseets/stylesheets`[^jekyll-assets] folder to determine how I might want to organize the guide. The biggies for me were:

[^jekyll-assets]: I'm using the excellent [Jekyll::AssetsPlugin](https://github.com/ixti/jekyll-assets) to add a Rails-like asset pipeline to run [AutoPrefixer](https://github.com/postcss/autoprefixer), minify and MD5 fingerprint CSS/JavaScript assets, and some other useful stuff.

* Color palettes
* Typography (headings, paragraphs, lists, and inline elements)
* Media elements (images, figures, videos, etc.)
* Patterns (buttons, badges, table of contents, etc.)

### Configure Collections

With the structure of the style guide determined next came [configuring the collections](http://jekyllrb.com/docs/collections/) that would contain each component. Originally I planned to have a single collection named `components` but decided to go with a second to group the various color palettes used on the site.

Because I had worked with collections when I built the [FAQ section]({{ site.url }}/faqs/) of my site I had a good idea of what I was doing. To start I added the following to my `_config.yml` and created `_colors` and `_components` folders in the root of my project.

{% highlight yaml %}
collections:
  components:
    output: false
  colors:
    output: false
{% endhighlight %}

I choose not to output a file for each color and component since I'm going to display them all grouped on a single page. But if I wanted break them out later into separate pages (something I did for my [FAQ section]({{ site.owner.github-repo }}_faqs/)) I would simply change `output: false` to `true` and add `permalink: /style-guide/:collection/:path/` to customize the document URL to something like `<dest>/style-guide/components/some_doc/index.html`.

### Display Components and Color Palettes

With collections configured I created a new layout that stripped away most of the fluff found in my article and media layouts. It's basically a wide wrapper with a page title and a `{% raw %}{{ content }}{% endraw %}` block.

{% highlight html %}
{% raw %}
---
layout: default
---

<div id="main" class="wrap" role="main">
  <h1>{{ page.title }}</h1>
  {{ content }}
</div><!-- /#main -->
{% endraw %}
{% endhighlight %}

And then started creating Markdown files for each component and color palette I wanted to include in the style guide. For components I went with the following YAML Front Matter followed by the bare minimum of HTML needed to create each.

{% highlight html %}
---
title: "Main Content Default Notice"
type: notices
scss: _assets/stylesheets/_notices.scss
module:
usage: "Emphasize post text."
---

<div id="content" class="page-content">
  <div class="notice">
    <h4>Default Notice Headline</h4>
    <p>Donec sed tellus eget <a href="#">sapien fringilla nonummy</a>. Mauris a ante. Suspendisse quam sem, consequat at.</p>
  </div>
</div>
{% endhighlight %}

<div class="notice-info" markdown="1">
#### ProTip: Descriptive filenames
Be smart about your filenames if you're trying to sort components in a logical way. The default behavior is for them to be arranged alphabetically by filename. Adding a variable to the YAML Front Matter of each component and sorting on that is option if you want to override this behavior.
</div>

#### Liquid for loops

#### Layout and stylesheet tweaks

#### Component selector nav
