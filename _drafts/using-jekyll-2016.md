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

I first started using Jekyll --- a static site generator, way back in 2012. In the four years since, Jekyll has became my gateway drug to a host of new tools, techniques, and ways of building websites. Hell, I wasn't even using version control when developing this site --- so you know a lot has changed.

{% include toc.html %}

## Types of Content

To learn the basics of Jekyll I tasked myself with trying to convert my then Wordpress powered site, into a static one. I read several Jekyll tutorials, learned [Liquid](https://docs.shopify.com/themes/liquid-documentation/basics) and [Kramdown](http://kramdown.gettalong.org/syntax.html), [blogged about the process]({{ site.url }}{% post_url 2012-03-19-going-static %})[^kramdown], and eventually ended up with a stripped down --- CMS and database free version of the site.

[^kramdown]: Kramdown is a Markdown converter that does some nice things like automatic table of contents generation.

### Posts for All the Things

As Jekyll has matured and added features, the complexity at which I use it has as well. In those early days content could either be a **post** or a **page**. I chose to make almost everything a post so I could reap the benefits of `site.tags`, `site.categories` for grouping content and surface "related posts" more easily.

This was an easy pill to swallow then because the only type of content I had on the site were blog posts. As I started incorporating things like portfolio pieces into the site I used `categories` to help build a structure. For example, [**Blog Articles**]({{ site.url }}/articles/) would get `categories: articles` added to their YAML Front Matter and `permalink: /:categories/:title/` in `_config.yml` to produce pretty URLs like `mademistakes.com/articles/jekyll-is-the-best/`.

A drawback I hit with this method was creating reliably pagination between posts. Jekyll provides the variables `page.previous` and `page.next` to help do previous/next style links on your posts. But because I broke posts out into categories, these links didn't always behave as expected.

For example, when reading a post in the `articles` category you'd expect the **NEXT →** link to show another article post. Instead you'd end up with something from the `portfolio` category because it was next in `site.posts`.

Details like this drive me bonkers, so I opted for a **You May Also Enjoy** module that displays 3 related posts[^related-posts] at the bottom of the page. In my eyes this provided a better reading experience even my site takes longer to generate now...

[^related-posts]: [**jekyll-tagging-related_posts**](https://github.com/toshimaru/jekyll-tagging-related_posts) - replaces Jekyll's `related_posts` function to use tags to calculate better post relationships.

|      | Jekyll version  | Build time | Posts |
|------|:---------------:|:----------:|:-----:|
| Then | 0.12.1          | < 1s       | 25    |
| Now  | 3.1.0           | 195s       | 980   |

It's no coincidence that my build times went from under a second to several minutes once I reached several hundred posts. Moving to solid-state drives and reducing the amount of Liquid `for` loops in my `_layouts` and `_includes` has helped --- but I still have a ways to go if I want to speed things up. 

The new **`--incremental` regeneration** feature will eventually play a big role in this for me. On a default `jekyll new` site it works really well, but unfortunately I haven't had much luck getting it to play nicely with the various plugins I use. The work currently being done seems like its [going in the right direction](https://github.com/jekyll/jekyll/pull/4269), so I'm sure in time things will sort out.

For now the best I can do is use the new **Liquid Profiler**[^profiler] to identify problematic bits and simplify where I can. I update the site so infrequently that it really isn't a bother waiting 2 minutes for a build to finish, but damn it would be nice to hit < 1s again!

[^profiler]: add `--profile` to a build or serve

### Posts, Meet Collections

When [collections](http://jekyllrb.com/docs/collections/) were introduced way back in v2.0, I decided to build out a [**Frequently Asked Questions**]({{ site.url }}/faqs/) section on my site. I could have easily done this as a set of static pages, but collections being more powerful seemed a better fit.

It couldn't haven been simpler to implement either. Create a `_faqs` folder filled with Markdown formatted text files (like any other post or page), add the following to `_config.yml`, create an [index page](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_pages/faqs/index.md) to display all of the collection's documents, and done!

{% highlight yaml %}
collections:
  faqs:
    output: true
    permalink: /:collection/:path/
    title: FAQs
{% endhighlight %}

As collections have gained status Jekyll Land they're increasingly becoming my preferred way of structuring content. In addition to the FAQs I've also created a collection to generate a "[living style guide]({{ site.url }}{% post_url 2015-02-10-jekyll-style-guide %})" of sorts --- documenting the look and feel of the site with visual representations and code samples. 

Eventually I plan to convert more posts into their own collection, but not exactly sure which. Posts categorized as `work` would likely be the first to transition over since it always felt like a hack to me placing them there. As far as the rest? I'm not sure yet. 

What I'd like to investigate more is adding taxonomies to collections and how they play with the tags and categories already set in `_posts`. I'm not exactly sure how collections treat them and if they're part of `site.tags` or siloed away or how [tag archives]({{ site.url }}/tag/) generated by [**Jekyll Archives**](https://github.com/jekyll/jekyll-archives) might look. A job best saved for a rainy day I suppose...

## Workflow Evolution

### Before/After

* Text post written in Markdown
* Manually add images to post using a combination of Markdown and HTML
* Run a grunt task that optimizes all new graphic assets added to /images/
* Start up a Jekyll server with --watch disabled and loading a dev friendly _config.yml file to use a dev Disqus account, disables Google Analytics
* I don't use --incremental or --watch because my site is much too large and takes a minute or 2 to build. Manually execute `bundle exec jekyll build` or a rake task to update locally and check my changes.
* When everything looks to my liking locally I deploy to Media Temple using rsync. Only files that have changed make the trip which is so much faster than the days of manually FTPing over the entirety of my _site folder.
* This rsync step is handled through another rake task which notifies Ping-O-Matic, Google, and Bing that my site has updated and to check out the new sitemap.xml and atom.xml feed.

## Introduced Complexities

### Asset Pipeline

jekyll-assets. In the beginning I used wrote my stylesheets in LESS and compiled with a grunt task. Then Jekyll grew up and started supporting .scss files natively. I'm a frequent tinker who pretty much constantly designs the site in the open. Browsers trying to do the right thing and cache my CSS and JavaScript assets often caused parts of the site to look and function wrong after pushing an update. To get around that I introduced the plugin jekyll-assets into my workflow to bust these caches as they change.

It also supports Autoprefixer which is nice for adding vendor prefixes (or ripping them out when not needed) making for a much cleaner set of .scss files. I hope for this plugin to one day also be the solution to responsive images more on that in a minute...

### Page Speed Optimizations

### Critical Path CSS

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
