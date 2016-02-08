---
layout: article
title: "How I'm Using Jekyll in 2016"
excerpt:
categories: articles
tags: [Jekyll, web development, style guide, GitHub, open source]
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

[^related-posts]: [**jekyll-tagging-related_posts**][related-posts] - replaces Jekyll's `related_posts` function to use tags to calculate better post relationships.

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

What I'd like to investigate more is adding taxonomies to collections and how they play with the tags and categories already set in `_posts`. I'm not exactly sure how collections treat them and if they're part of `site.tags` or siloed away or how [tag archives]({{ site.url }}/tag/) generated by [**Jekyll Archives**][archives] might look. A job best saved for a rainy day I suppose...

## An Evolution

From a workflow perspective the basic "write a post in Markdown", run `jekyll build`, and push the contents of the `_site` folder to a web server has stayed the same. On the development side of things however, a lot of complexity has been introduced in an effort to optimize and improve web performance of the pages served.

* Manually add images to post using a combination of Markdown and HTML
* Run a grunt task that optimizes all new graphic assets added to /images/
* Start up a Jekyll server with --watch disabled and loading a dev friendly _config.yml file to use a dev Disqus account, disables Google Analytics
* When everything looks to my liking locally I deploy to Media Temple using rsync. Only files that have changed make the trip which is so much faster than the days of manually FTPing over the entirety of my _site folder.
* This rsync step is handled through another rake task which notifies Ping-O-Matic, Google, and Bing that my site has updated and to check out the new sitemap.xml and atom.xml feed.

I do a lot of tinkering and adjusting with the visual bits of Made Mistakes. To me it will forever be a "work in progress" where I'm essentially redesigning it in the open. To make development I do locally across Mac OS X and Windows easier I use the following configurations, tools, and Jekyll plugins.

### Bundler

The first time I entered the `jekyll build` command I had no idea what I was doing. Installing Ruby, Bundler, and Ruby Gems, were all new to me. A setup that worked one day would break another when I updated the Jekyll gem or tried to work on a Windows machine.

I eventually learned to embrace [Bundler](http://bundler.io/) from the advice of numerous Jekyll's issues on GitHub and Stack Overflow posts. Since I was already using Bundler to install Jekyll it wasn't that hard to run `bundle init` to create an empty `Gemfile` and at the following gems:

{% highlight ruby %}
source 'https://rubygems.org'

gem 'breakpoint'
gem 'wdm', '~> 0.1.0' if Gem.win_platform?
gem 'mini_magick'
gem 'autoprefixer-rails'
gem 'uglifier'

# Jekyll
gem 'jekyll'
gem 'jekyll-archives'
gem 'jekyll-tagging-related_posts'
group :jekyll_plugins do
  gem 'jekyll-assets', github: 'jekyll/jekyll-assets'
  gem 'jekyll-sitemap', github: 'jekyll/jekyll-sitemap'
end
{% endhighlight %}

Then by running `bundle install` each of the gems are installed and a `Gemfile.lock` is created listing all of the dependencies. Prepending all Jekyll commands with `bundle exec` ensures only the versions in   `Gemfile.lock` are executed and getting me out of dependency conflict hell.

Committing both of these Gemfiles to my git repository also makes it easy to revert back if a `gem update` goes bad. Sure it's a few more characters to type, but the headaches it solves are more than worth it. And with things like Rakefiles you can even write shortcut tasks to eliminate the extra keystrokes (more on that below).

### Environments and Configurations

With the introduction of asset related plugins and various other build steps I eventually settled on creating two Jekyll configuration files. The default `_config.yml` with production settings and `_config.dev.yml` which you guessed it --- contains development specific settings.

The cool thing is you can chain together config files, overriding settings in the previous one. For example when building locally I want {% raw %}`{{ site.url }}`{% endraw %} to default to `http://localhost:4000` instead of `https://mademistakes.com` and I'd rather not use my production Disqus account either. Setting the following in `_config.dev.yml` overrides the values in `_config.yml`:

{% highlight yaml %}
url: http://localhost:4000
disqus-shortname: mmistakes-dev
{% endhighlight %}

I can then fire up a development server with the relevant settings using...

{% highlight bash %}
bundle exec jekyll serve --config _config.yml,_config.dev.yml
{% endhighlight %}

Going one step further a Jekyll environment can be specified as well. By default Jekyll runs in development with a value of `JEKYLL_ENV=development`. Right now the only place leveraging environment values are to trigger CSS and JavaScript compression with the following command:

{% highlight bash %}
JEKYLL_ENV=production bundle exec jekyll build
{% endhighlight %}

<div class="notice--warning" markdown="1">
#### Windows Environment Gotcha
For whatever goofy reason `JEKYLL_ENV=production bundle exec jekyll build` doesn't work on Windows. Instead you have to use the [`SET`](http://ss64.com/nt/set.html) command to assign environment variables.
</div>

{% highlight bash %}
set JEKYLL_ENV=production
{% endhighlight %}

#### Other Configurations

* I don't use --incremental or --watch because my site is much too large and takes a minute or 2 to build. Manually execute `bundle exec jekyll build` or a rake task to update locally and check my changes.

### Task Runners

### Asset Pipeline

Originally I wrote my stylesheets in [Less](http://lesscss.org/)[^less], compiling and minifying them with a Grunt task. Then Jekyll grew up and started supporting Sass files natively so I converted everything over and dropped an external dependency.

[^less]: Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions to make it more maintainable.

Taking things one step further I incorporated the [**Jekyll Assets**][assets] plugin to add an asset pipeline using Sprockets 3. It's a powerful plugin with an assortment of tags that makes cache busting and inlining assets (something I'll get to in a minute) a lot easier.

It also supports [Autoprefixer](https://github.com/postcss/autoprefixer) which is nice for automatically adding vendor prefixes (or ripping them out) to CSS rules. I can write style declarations like this in my SCSS partials:

{% highlight scss %}
.post__content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-top: 1em;
}
{% endhighlight %}

And get a properly prefixed set without any additional effort on my part. 

{% highlight css %}
.post__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  margin-top: 1em;
}
{% endhighlight %}

Even better, when browsers don't need this extra prefixed nonsense --- Autoprefixer will leave it out based on the `browsers:` set in my Jekyll config.

For this site I target the last 2 versions of each major browser, browsers that have a global usage of over 5%, or are Internet Explorer 9+.

{% highlight yaml %}
# _config.yml

assets:
  autoprefixer:
    browsers: ["last 2 versions","> 5%","IE 9"]
{% endhighlight %}

### Page Speed Optimizations

### Critical Path CSS

To combat page load drags I've gone one step further and inlined the critical amount of CSS needed to render a page. I didn't use any fancy tools to determine what was critical, but instead structured my SASS partials in a way that the important visual stuff comes first. This way I can create a critical.css and non-critical.css by just @import-ing the bits needed for each. Then using a jekyll-assets tag I output the contents of critical.css into the <head></head> of ever page which dramatically improves the speed at which pages load.

The same method can be used with a standard Jekyll _include and some Liquid filters to inline the stylesheet. Great for those of you who host with GitHub Pages and can't utilize Jekyll plugins that haven't been white listed.

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

[sitemap]: https://github.com/jekyll/jekyll-sitemap
[archives]: https://github.com/jekyll/jekyll-archives
[assets]: https://github.com/jekyll/jekyll-assets
[related-posts]: https://github.com/toshimaru/jekyll-tagging-related_posts
[picture-tag]: https://github.com/robwierzbowski/jekyll-picture-tag

*[SCSS]: Sassy CSS
