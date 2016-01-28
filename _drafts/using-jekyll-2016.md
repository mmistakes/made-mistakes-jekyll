---
layout: article
title: "How I'm Using Jekyll in 2016"
excerpt:
categories: articles
tags: [jekyll, web development, style guide, github, open source]
image:
  feature:
  teaser:
comments: true
featured:
modified:
---

I first started using Jekyll --- a static site generator, way back in 2012. In the four years since, Jekyll has became my gateway drug to a host of new tools, techniques, and ways of building websites. Hell, I wasn't even using Git to version control this sit, so you know a lot has changed {% icon wink %}.

{% include toc.html %}

## Types of Content

To learn the basics of Jekyll I tasked myself with converting my then Wordpress powered site into a static one. I read Jekyll tutorials, [blogged about the process]({{ site.url }}{% post_url 2012-03-19-going-static %}), and eventually ended up with a stripped down --- CMS and database free version.

As Jekyll has matured and added features so has the complexity at which I use it. In those early days content could either be a **post** or a **page**. I chose to make almost everything a post so I could reap the benefits of `site.tags`, `site.categories`, and surface "related posts" more easily.

This was an easy pill to swallow then because the only type of content I had on the site was blog posts. As I started incorporating new content types into the site I used `categories:` to structure things. For example **Blog Articles** have `categories: articles` in their YAML Front Matter and by adding `permalink: /:categories/:title/` to my `_config.yml` you pretty URLs like `mademistakes.com/articles/jekyll-is-the-best/`.

|      | Jekyll version | Plugins | Build time | Posts | Pages | Collections |
| ---- | -------------- | ------- | ---------- | ----- | ----- | ----------- |
| Then | 0.12.1         | 2       | <1s        | 25    | 6     | 0           |
| Now  | 3.1.0          | 6       | 195s       | 980   | 14    | 3           |

It's no coincidence that my build times went from under a second to several minutes once posts counts got into the hundreds. Moving to solid-state drives and reducing the amount of Liquid `for` loops in my `_layouts` and `_includes` has helped speed builds up, but its still a drag working with such a large site[^large-site].

[^large-site]: I have high hopes that these [issues will be addressed](https://github.com/jekyll/jekyll/pull/4269) once the kinks of **`--incremental` regeneration** are sorted out to help cache pages that haven't changed.

Another negative I encountered was not being able to reliably do pagination in categories. The plugins I tried to get around this never worked well or increased build times so significantly that it wasn't worth the effort in the end.

Portfolio pieces came next. Used /category/ taxonomy to break up major sections of site. Everything is a `_post` to benefit from tagging, and related posts. Cons: not easy to paginate between posts in a category and causes some other navigation headaches that have to be fixed with manual overrides like setting `permalink:` in YAML Front Matter.

Collections are used to build the site's Style Guide

Will eventually migrate portfolio and non-blog type articles to collections once they have full feature parity with `_posts`. Still unsure of how tagging and categorization works with a collection. Pagination in collections will be nice too so I can avoid pages that are way to long and should be broken up eg: PaperFaces gallery (thou this could probably benefit from some sort of AJAX solution)

## Workflow Evolution

### Before/After

* Text post written in Markdown
* Manually add images to post using a combination of Markdown and HTML
* Run a grunt task that optimizes all new graphic assets added to /images/
* Start up a Jekyll server with --watch disabled and loading a dev friendly _config.yml file to use a dev Disqus account, disables Google Analytics
* I don't use --incremental or --watch because my site is much too large and takes a minute or 2 to build. Manually execute `bundle exec jekyll build` or a rake task to update locally and check my changes.
* When everything looks to my liking locally I deploy to Media Temple using rsync. Only files that have changed make the trip which is so much faster than the days of manually FTPing over the entirety of my _site folder.
* This rsync step is handled through another rake task which notifies Pingomatic, Google, and Bing that my site has updated and to check out the new sitemap.xml and atom.xml feed.

## Introduced Complexities

### Asset Pipeline

jekyll-assets. In the beginning I used wrote my stylesheets in LESS and compiled with a grunt task. Then Jekyll grew up and started supporting .scss files natively. I'm a frequent tinker who pretty much constantly designs the site in the open. Browsers trying to do the right thing and cache my CSS and JavaScript assets often caused parts of the site to look and function wrong after pushing an update. To get around that I introduced the plugin jekyll-assets into my workflow to bust these caches as they change.

It also supports Autoprefixer which is nice for adding vendor prefixes (or ripping them out when not needed) making for a much cleaner set of .scss files. I hope for this plugin to one day also be the solution to responsive images more on that in a minute...

### Page Speed Optimizations

### Critical CSS

To combat page load drags I've gone one step further and inlined the critical amount of CSS needed to render a page. I didn't use any fancy tools to determine what was critical, but instead structured my SASS partials in a way that the important visual stuff comes first. This way I can create a critical.css and non-critical.css by just @import-ing the bits needed for each. Then using a jekyll-assets tag I output the contents of critical.css into the <head></head> of ever page which dramatically improves the speed at which pages load.

The same method can be used with a standard Jekyll _include and some Liquid filters to inline the stylesheet. Great for those of you who host with GitHub Pages and can't utilize Jekyll plugins that haven't been whitelisted.

#### Responsive Images Revisited

Responsive images is a nut I've been trying to crack with my Jekyll setup since day one. My dream is to have something like what the newest version of Wordpress does by automatically taking an image, generating all of the necessary sizes specified by the theme being used, and outputting the appropriate <img srcset> markup in the HTML. Doing this for every image on my site just isn't feasible yet since it would require me touching every one of my 1,000+ posts. As a test instead I went with the Jekyll Picture Tag plugin and pipe through the hero images found on many of my pages.

Workflow goes something like this. Place a high resolution image in /images/_originals/ add the filename to YAML Front Matter and build the site. The plugin takes the original image and generates the various other sizes as specified in my _config.yml and places them in /images/. By default the plugin hashes the filenames, but I took that out since it was getting hard to manage between Mac OS X and Windows environments (each created their own hashed version of the file even when visually the same).

Right now this plugin only supports the <picture> element which is great for art directed responsive images, but since I'm not doing that it is bit overkill. Having the option to use <img srcset> instead would be preferred, but since I'm not a Rubyist making that change to the plugin is out of my hands until someone else tackles it.

The bump in page speed has been create and my score in Google Page Speed Insights has gone up considerably since I'm not loading the same huge image for every screen size.

The drawback to this plugin is build time. If I don't instruct Jekyll to keep_files: ["images"] then every time I `jekyll build` the featured images used in over 1,000 posts will go through the process of being resized and spit out into 4 smaller files. This can take a long time and even longer to upload to my web server (another reason I stopped using MD5 hashed filenames).

### Focus on Content

Surfacing content in posts using Jekyll Related Posts plugin and Featured Posts. The first likely adds some compilation time to the build process (test it to make sure) while the later is a nice way to manually call attention to "top/popular" posts. They `_include` I use to build them is flexible enough that I can add the module to posts or pages by adding some YAML Front Matter.

## Introduced Flexibility

### Data Files

`_data` files have been another area of benefit for the site. Now I can build more dynamic navigations for the site that can be easily updated and modified from a single file instead of hard coding links in `_layouts` and `_includes`. Previously I did something similar by setting some variables in my _config.yml but that always felt messy to me.

For navigation I have 3 sets: home page main, home page secondary, site masthead, site overlay menu, and footer. Each has a title and url. Then using a few lines of Liquid I'm able to loop through the array and in the case of the masthead do some logic to apply an `.active` class if it matches the current page.

Going a step further I use a _data file to generate alternate titles for pages as used in the site's breadcrumb navigation. By determining the page.url I match that to key set in `slugs.yml` and then output the alternative title which is often a longer string or has title case capitalization which would have been tricky to do.
