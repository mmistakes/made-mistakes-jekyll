---
title: "Building a style guide with Jekyll"
last_modified_at: 2017-12-13T10:40:39-05:00
excerpt: "How I used collections with Jekyll to build a style guide and pattern library for Made Mistakes."
categories: [articles]
tags: [Jekyll, open source, web development, GitHub, tutorial]
image:
  path: &image /assets/images/jekyll-style-guide-feature.jpg
  width: 1280
  height: 450
  feature: *image
twitter:
  card: summary_large_image
comments: true
toc: true
---

Building a living style guide that details all of the colors, typographic elements, UI patterns, and components used on Made Mistakes has been at the top of my to-do list for some time.

As sole designer, developer, and writer for the site, having one probably isn't all that crucial. Yet when iterating on the site's design I've found that some of my patterns don't always "speak the same visual language." Having a document I can refer back to and quickly spot check for visual inconsistencies could be very helpful.

## Keep it simple

With the attention style guides have gotten as of late, a nice selection of [generators and tools](http://styleguides.io/tools.html "style guide tools") have also matured in the open source community. Because I'm [using Jekyll to publish the site]({% post_url /articles/2012-03-19-going-static %}), I felt it would be silly to use another tool to generate a living style guide. Even if that meant giving up the ease of setup these other tools provide by having to build out something myself.

Finding a way to do it all from within Jekyll was an important consideration since I wanted to "set it and forget it" as much as possible. Maintaining stylesheets and `includes` in two separate projects was a thought I didn't really want to entertain...

So with that I bumped around GitHub and Google to see what sort of solutions existed already and found these:

* [Jekyll CSS Styleguide](https://github.com/davidhund/jekyll-styleguide)
* [Boilerplate for Jekyll Styleguide](https://github.com/jeromecoupe/jekyllstyleguide)
* [Pattern Lab Jekyll Port](https://github.com/karissademi/patternlab-jekyll)
* [Pattern Primer Jekyll](https://github.com/opattison/Pattern-Primer-Jekyll)
{:.fl}

Out of the bunch, [Jérôme Coupé's](http://www.webstoemp.com/) approach resonated with me the most since it meshed well with my current Jekyll site setup. By leveraging **collections**[^collections] I could avoid littering my `_posts` folder with components, color palettes, and other snippets while being able to iterate over them and output individual pages if needed.

[^collections]: A feature added to Jekyll in [version 2.0.0](http://jekyllrb.com/docs/history/#v2-0-0) allowing you to define new types of documents that behave like [Pages](http://jekyllrb.com/docs/pages/) or [Posts](http://jekyllrb.com/docs/posts/), while also having their own unique properties and name-spaces.

## Building the style guide

To start I took a quick survey of all the Sass partials in my `_assets/stylesheets`[^jekyll-assets] folder to determine how I might want to organize the style guide. The biggies for me were:

* **Color palettes**
* **Typography** (headings, paragraphs, lists, and inline elements)
* **Media elements** (images, figures, videos, etc.)
* **Patterns** (buttons, badges, table of contents, etc.)
{:.fl}

[^jekyll-assets]: I'm using the excellent [Jekyll 3 Assets](https://github.com/jekyll/jekyll-assets) plugin for a Rails-like asset pipeline to run [AutoPrefixer](https://github.com/postcss/autoprefixer), minify and MD5 fingerprint CSS/JavaScript assets, and some other useful stuff.

### Configure collections

With the structure of the style guide determined next came [configuring the collections](http://jekyllrb.com/docs/collections/) that would contain each component. Originally I planned to have a single collection named `components` but decided to go with a second to group together all of the color palettes used on the site.

Because I had worked with collections when I built the [FAQ section](/faqs/) of my site I had a good idea of what I was doing. To start I added the following to my `_config.yml` and created `_colors` and `_components` folders in the root of my project.

```yaml
collections:
  components:
    output: false
  colors:
    output: false
```

I choose not to output a file for each color/component since I planned on grouping them together on a single page. But if I later wanted to break them out into separate pages (something I did for my [FAQ section](https://github.com/mmistakes/made-mistakes-jekyll/tree/master/src/_faqs) I would simply change `output: false` to `true` and add permalinks to the YAML Front Matter.

{% notice %}
#### Looking to the future

For version 2.0 of the style guide I may investigate taking it to the next level by constructing a complete [atomic design system](http://atomicdesign.bradfrost.com/). Instead of collections for just `components` and `colors` I could create `atoms`, `molecules`, `organisms`, and `templates` to flush out the entire system. 

I've seen [some examples](https://github.com/karissademi/patternlab-jekyll "Pattern Lab Jekyll port") of trying to do this in Jekyll with just `includes`, but I think leveraging components, setting `output: true` on them, and getting creative with Liquid would make this a better option.
{% endnotice %}

### Display components and color palettes

With my two style guide collections configured I created a new layout (`_layouts/style_guide.html`) to strip away most of the fluff found in my `article` and `media` layouts. It's basically a wide wrapper with just a page title and `{% raw %}{{ content }}{% endraw %}` block.

```html
{% raw %}---
layout: default
---

<div id="main" class="wrap" role="main">
  <h1>{{ page.title }}</h1>
  {{ content }}
</div><!-- /#main -->{% endraw %}
```

The bulk of the content for the style guide is going to come from creating Markdown files for each component and color palette --- so I started on that next. For components I went with the following YAML Front Matter followed by the bare minimum of HTML needed to create each. `title` and `type` are the only required bits with `scss`, `module`, and `usage` being optional to describe a component and/or link back to their source code.

```html
---
title: "Main Content Default Notice"
type: notices
scss: assets/stylesheets/_notices.scss
module:
usage: "Emphasize post text."
---

<div id="content" class="page-content">
  <div class="notice">
    <h4>Default Notice Headline</h4>
    <p>Donec sed tellus eget <a href="#">sapien fringilla nonummy</a>. Mauris a ante. Suspendisse quam sem, consequat at.</p>
  </div>
</div>
```

{% notice %}
#### ProTip: descriptive filenames

Be smart with your filenames if you're trying to sort components in a logical way. The default behavior is for them to be arranged alphabetically by filename. Adding a variable to the YAML Front Matter of each component and sorting on that is one way of overriding this behavior.

Or you could hack the order sequence by doing something like this with your filenames: `01-ui-colors.md`, `02-component-one.md`, `03-component-two.md`, etc.
{% endnotice %}

#### Collection loops

After creating a handful of components, I started to refine the [Liquid](https://github.com/Shopify/liquid/wiki) needed to display them. Mostly to make sure things were shaping up how I envisioned them before getting too deep into things.

{% figure caption:"Screenshot of my components collection." %}
![Sublime Text _components screenshot](/assets/images/jekyll-style-guide-components.png)
{% endfigure %}

There's not much magic going on here. Basically what I did was:

1. Create a new page [`/style-guide/index.md`](https://github.com/mmistakes/made-mistakes-jekyll/blob/10.0.0/style-guide/index.md) to act as the style guide's main page.
2. Added YAML Front Matter to this page --- assigning a title, `layout: style_guide` to utilize the `_layout` I created earlier, and an excerpt description for SEO purposes.
3. Added a short introduction to the style guide.
4. Used some Liquid to create `for` loops to output all documents found in the `colors` and `components` collections.

Here's the Liquid I came up with to fill the page with content from the `components` collection.

```html
{% raw %}{% assign componentsByType = site.components | group_by:"type" %}
{% for type in componentsByType %}
<h2 id="guide-{{ type.name }}" class="cf">{{ type.name | capitalize }}</h2>
{% for entry in type.items %}
{% include component.html %}
{% endfor %}
{% endfor %}{% endraw %}
```

What's going on here is I'm iterating over the `components` collection, grouping the documents by type[^component-type], and displaying each document's content twice (rendered HTML and syntax highlighted un-rendered HTML).

[^component-type]: Component type is set in the YAML Front Matter. eg: buttons, notices, media, typography, etc.

{% notice %}
#### Beware the Markdown

I had some trouble getting the Liquid above, Markdown, and syntax highlighting to all play nicely. I suppose I could have just crafted a `.html` document instead, but I wanted to use Markdown with some HTML mixed in. I eventually gave up trying to make my code more readable with indents, which seemed to eliminate the formatting issues.
{% endnotice %}

Sandwiched between the `entry` loop is an include that takes care of spitting out the rendered and syntax highlighted HTML along with an optional short description and links to Sass and `include` sources.

```html
{% raw %}<article class="component">
  <header class="component-header">
    <h3 id="guide-{{ entry.title | slugify }}">{{ entry.title }}</h3>
      {% if entry.usage %}<p><strong>Usage:</strong> {{ entry.usage }}</p>{% endif %}
      {% if entry.module %}<p><strong>Include file:</strong> <a href="{{ site.owner.github-repo }}{{ entry.module }}">{{ entry.module }}</a></p>{% endif %}
      {% if entry.scss %}<p class="header-entry-last"><strong>SCSS file:</strong> <a href="{{ site.owner.github-repo }}{{ entry.scss }}">{{ entry.scss }}</a></p>{% endif %}
  </header><!-- /.component-header -->
  <div class="component-content">
    <div class="component-rendered">
      {{ entry.content }}
    </div><!-- /.component-rendered -->
    <div class="component-code">
      
      {% highlight html %}
        {{ entry.content }}
      {% endhighlight %}
      
    </div><!-- /.component-code -->
  </div><!-- /.component-content -->
</article><!-- /.component -->{% endraw %}
```

#### Component selector navigation

To help expose components that may be buried towards the bottom of the page I came up with this to create an option list nav.

```html
{% raw %}
<nav id="component-selector" class="wrap">
  <select name="section" id="component-select">
    <option value>Jump to component...</option>
    <option value="#guide-color-palettes">Colors</option>
    {% for type in componentsByType %}
    <option value="#guide-{{ type.name }}">{{ type.name | capitalize }}</option>
    {% for entry in type.items %}
    <option value="#guide-{{ entry.title | slugify }}">&nbsp;&nbsp;&nbsp;{{ entry.title }}</option>
    {% endfor %}
    {% endfor %}
  </select>
</nav>

<!-- component selector option list -->
<script>    
  (function (document, undefined) {
    // component selector
    document.getElementById('component-select').onchange = function() {
      //document.location=this.options[this.selectedIndex].value;
      var val = this.value;
      if (val !== "") {
        window.location = val;
      }
    }
  })(document);
</script>{% endraw %}
```

{% figure caption:"Style guide component selector." %}
![style guide component selector](/assets/images/style-guide-component-selector.jpg)
{% endfigure %}

With the help of some CSS and JavaScript I was able to position a drop down list in the lower right corner as a way of quickly jumping around the page. If and when I get to going full atomic design on the style guide, I may have to rethink this sort of navigation by giving it more precedence in the layout. But for now it does the trick...

#### Stylesheet tweaks

For the most part all of my components displayed correctly on the page. One of the benefits of building the style guide was that it quickly pointed out components that weren't as modular as I initial thought. Meaning some were bound to specific class names that when placed in different contexts lost all of their styling.

There were also a few cases where I needed to add styles specific for the style guide in order for things to display correctly. The `colors` collection is a good example of that.

{% figure caption:"Screenshot of UI color palette." %}
![UI colors screenshot](/assets/images/style-guide-ui-colors.png)
{% endfigure %}

My goal here was to avoid hard coding color values into each document, and instead leverage the color variables already set in `/assets/stylesheets/_variables.scss` to keep things [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

To achieve this I used a [SassScript map](https://github.com/sass/sass/blob/master/doc-src/SASS_CHANGELOG.md#sassscript-maps) of all the color variables found on the site along with some additional CSS to build the swatch tiles. 

```scss
/*
   Color swatches
   ========================================================================== */

.color-tile {
  @include span-columns(4);
  @include omega(3n);
  margin-bottom: $gutter;
  padding: $gutter 0;
  text-align: center;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  code {
    @include font-size(16,no);
    color: $text-color;
    white-space: nowrap;
    margin: 0 2px;
    padding: 0 5px;
    border: 1px solid $code-border-color;
    background-color: $inline-code-background;
    border-radius: $code-border-radius;
    white-space: normal;
  }
}
```

## Maintaining the style guide

Updating and adding components to the [style guide](/style-guide/) should be as simple as creating a new Markdown file and placing it in the `_components` folder. In a perfect world I would never have to touch the `.md` files of existing components. Cosmetic changes made to Sass files should ripple throughout the site without my intervention. Unfortunately, for those components that undergo markup changes, I'll have repeat myself and edit two files... something that shouldn't happen too frequently.

As always [my code is available on GitHub](https://github.com/mmistakes/made-mistakes-jekyll/) for download and forking. The Style Guide is integrated with the rest of Made Mistakes so you may have to rip out some stuff if you end up using it. 

Be sure and let me know if this has been useful. If I get enough feedback I'll consider breaking it out into its own repository for easier forking.
