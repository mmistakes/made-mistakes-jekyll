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

### Posts Become Collections

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

I do a lot of tinkering and adjusting with the visual bits of Made Mistakes. To me it will forever be a "work in progress" where I'm essentially redesigning it in the open. To make the development across Mac OS X and Windows easier I've settled on the following configurations, tools, and Jekyll plugins.

### Bundler

Installing Ruby, Bundler, and Ruby Gems, were all new to me three years ago. Running `jekyll build` on the same repo on different operating systems was always a crap shoot. A setup that worked one day would most certainly break after updating Jekyll with `gem update jekyll` and running on a Windows machine.

I eventually learned to embrace [Bundler](http://bundler.io/) from the advice of numerous Jekyll's issues on GitHub and Stack Overflow posts. Bundler is used to install Jekyll so it wasn't that big of a leap to start using a `Gemfile` to manage dependencies.

1. Run `bundle init` to create an empty `Gemfile`
2. Add gems, in my case it's' the following:

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

Now when running `bundle install` each of the gems specified above are installed and a `Gemfile.lock` is created listing all of the dependencies. Prepending all Jekyll commands with `bundle exec` ensures only the versions in `Gemfile.lock` are executed helping to solve conflicts.

Committing both of these Gemfiles to a git repository also makes it easy to revert back if a `gem update` goes bad. Sure it's a few more characters to type, but the headaches it solves are more than worth it. You can even write shortcut tasks with Rakefiles to eliminate the extra keystrokes (more on that below).

### Environments and Configurations

With the introduction of asset related plugins and various other build steps I eventually settled on creating two Jekyll configuration files. The default `_config.yml` with production settings and `_config.dev.yml` which you guessed it --- contains development specific settings.

The cool thing is you can chain together Jekyll configuration files, overriding settings from the previous. For example when building locally I want {% raw %}`{{ site.url }}`{% endraw %} to default to `http://localhost:4000` instead of `https://mademistakes.com` and use a development Disqus account for testing. Setting the following in values `_config.dev.yml` overrides the ones in `_config.yml`:

{% highlight yaml %}
url: http://localhost:4000
disqus-shortname: mmistakes-dev
{% endhighlight %}

A development server can then be fired up with the relevant settings using...

{% highlight bash %}
$ bundle exec jekyll serve --config _config.yml,_config.dev.yml
{% endhighlight %}

Going one step further a Jekyll environment can be specified as well. By default Jekyll runs in development with a value of `JEKYLL_ENV=development`. The [`compress.html`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_layouts/compress.html) `_layout` and [**Jekyll-Assets**][assets] plugin both make use of this variable to trigger HTML, CSS, and JavaScript compression with the following command:

{% highlight bash %}
$ JEKYLL_ENV=production bundle exec jekyll build
{% endhighlight %}

{% capture info_windows_env %}
#### Windows Environment Gotcha

For whatever goofy reason `JEKYLL_ENV=production bundle exec jekyll build` doesn't work on Windows. Instead you have to use the [`SET`](http://ss64.com/nt/set.html) command to assign environment variables.
{% endcapture %}

<div class="notice--warning">
  {{ info_windows_env | markdownify }}
</div>

{% highlight bash %}
> set JEKYLL_ENV=production
{% endhighlight %}

#### Other Configurations

As mentioned earlier I have a moderately sized Jekyll site at {{ site.posts.size }} posts. Combine that fact with an `/images/` folder that is close to 2 GB, a liberal use of Liquid `for` loops, and generator plugins like [**Jekyll Archives**][archives] --- you get site builds that are far from instant. And in the rare cases when I run `jekyll clean` to flush caches and everything in `/_site/`, builds can take over 15 minutes as the [**Jekyll Picture Tag**][picture-tag] plugin regenerates appropriately sized hero images for all my posts. Yikes!

So as you might have guessed, I sure as hell never start up a server with *auto-regeneration* enabled. Instead I start with `bundle exec jekyll serve --no-watch` and then run a rake task to manually build every time I want to check a change locally.

When working on the site's design it can be cumbersome to sit through a 2 minute build just to check a CSS change. But until `--incremental` works reliably its something I have to suffer through. Its a good thing I do a lot of my 'designing' and tinkering in-browser with [Chrome's DevTools](https://developer.chrome.com/devtools) before editing the actual source.

### Automation Tools and Shortcuts

To save time (and my sanity) when working on the site locally, I employee a few tools to perform common dev tasks.

#### Grunt

[**Grunt**](http://gruntjs.com/) describes itself as "the JavaScript task runner." Grunt has a fairly large set of plugins that can pretty much do any mundane task you need with a bit of configurations.

Prior to Jekyll natively supporting Sass files I used Grunt plugins to pre-process `.less` files, concatenate a set of JavaScript files, and optimize image assets. Now that I'm running Jekyll 3.1 and the Jekyll-Assets plugin I no longer need Grunt to mess with my scripts and stylesheets.

Instead I use Grunt solely for optimizing images and SVGs with the following plugins:

{% highlight js %}
// Grunt plugins in package.json
"devDependencies": {
  "grunt": "~0.4.2",
  "grunt-newer": "^0.7.0",
  "grunt-imgcompress": "~0.1.1",
  "grunt-svgmin": "~0.3.1",
  "grunt-svgstore": "^0.5.0"
}
{% endhighlight %}

When I add new JPEG or PNG assets to the `/images/` folder for use in posts I use the following command to minify them. This reduces their file size which ultimately speeds up page loads.

{% highlight bash %}
$ grunt images
{% endhighlight %}

On the SVG side of things any files added to `/_svg/` are optimized and merged into a [single sprite map](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) with the following command:

{% highlight js %}
$ grunt svg
{% endhighlight %}

In combination with both of these tasks I use the [**grunt-newer**](https://www.npmjs.com/package/grunt-newer) plugin. This dramatically speeds up things as new and modified files are only processed.

#### Rake

On the build and deployment side of things I have a few shortcut tasks defined in `Rakefile.rb`. As mentioned earlier typing out `bundle exec` before Jekyll commands can get old fast. Instead I use the following:

##### Start up a Jekyll server

{% highlight bash %}
$ rake serve
{% endhighlight %}

##### Production Build, Development Build, and Build with Drafts

{% highlight bash %}
$ rake build
$ rake build:dev
$ rake build:drafts
{% endhighlight %}

##### Deployment

Since I self-host my site I need a way of pushing the contents of the `/_site/` folder after a production build. Years ago I'd use [**Cyberduck**](https://cyberduck.io/) or [**FileZilla**](https://filezilla-project.org/) to transfer everything over slowly to [Media Temple](http://bit.ly/1Ugg7nN) via FTP.

These days I use rsync to speed that transfer way the hell up, by only sending over new and modified files. It's also a task that I can automate with rake by adding the following to my [`Rakefile.rb`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/Rakefile.rb).

{% highlight ruby %}
# Usage: rake rsync
desc "rsync the contents of ./_site to the server"
task :rsync do
  puts "* rsyncing the contents of ./_site to the server"
  system "rsync --perms --recursive --verbose --compress --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r _site/ SSHuser@mydomain.com"
end
{% endhighlight %}

As part of my deployments I also run tasks that notify Ping-O-Matic, Google, and Bing that the site has updated and to check out the new [`sitemap.xml`]({{ site.url }}/sitemap.xml) and [`atom.xml`]({{ site.url }}/atom.xml) feeds. These tasks look something like this:

{% highlight ruby %}
# Usage: rake notify
task :notify => ["notify:pingomatic", "notify:google", "notify:bing"]
desc "Notify various services that the site has been updated"
namespace :notify do

  desc "Notify Ping-O-Matic"
  task :pingomatic do
    begin
      require 'xmlrpc/client'
      puts "* Notifying Ping-O-Matic that the site has updated"
      XMLRPC::Client.new('rpc.pingomatic.com', '/').call('weblogUpdates.extendedPing', 'mydomain.com' , '//mydomain.com', '//mydomain.com/atom.xml')
    rescue LoadError
      puts "! Could not ping ping-o-matic, because XMLRPC::Client could not be found."
    end
  end

  desc "Notify Google of updated sitemap"
  task :google do
    begin
      require 'net/http'
      require 'uri'
      puts "* Notifying Google that the site has updated"
      Net::HTTP.get('www.google.com', '/webmasters/tools/ping?sitemap=' + URI.escape('//mydomain.com/sitemap.xml'))
    rescue LoadError
      puts "! Could not ping Google about our sitemap, because Net::HTTP or URI could not be found."
    end
  end

  desc "Notify Bing of updated sitemap"
  task :bing do
    begin
      require 'net/http'
      require 'uri'
      puts '* Notifying Bing that the site has updated'
      Net::HTTP.get('www.bing.com', '/webmaster/ping.aspx?siteMap=' + URI.escape('//mydomain.com/sitemap.xml'))
    rescue LoadError
      puts "! Could not ping Bing about our sitemap, because Net::HTTP or URI could not be found."
    end
  end
end
{% endhighlight %}

And with a simple `rake deploy` I can build a production ready version of the site, rsync everything over to my web host, and notify search engines there's new content to crawl.

### Asset Pipeline

Originally I wrote my stylesheets in [Less](http://lesscss.org/)[^less], compiling and minifying them with a Grunt task. Then Jekyll grew up and started supporting Sass files natively so I converted everything over and dropped an external dependency.

[^less]: Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions to make it more maintainable.

Taking things one step further I incorporated the [**Jekyll-Assets**][assets] plugin to add an asset pipeline using Sprockets 3. It's a powerful plugin with an assortment of tags that makes cache busting and inlining assets (something I'll get to in a minute) a lot easier.

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

To speed up page loads I've gone to the trouble of [inlining the critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/) needed to render a page. I didn't use any fancy tools to determine what was critical, but instead structured my SASS partials in a way that the important visual stuff comes first. This way I can create [`critical.css.scss`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_assets/stylesheets/critical.css.scss) and [`non-critical.css.scss`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_assets/stylesheets/non-critical.css.scss) files by `@import`-ing the bits needed for each. Then using a Jekyll-Assets[^assets-tag-example] tag I output the contents of `critical.css` into the `<head>` of ever page.

[^assets-tag-example]: Output the source of an asset using `asset_source` Jekyll-Assets tag. Example: {% raw %}{% asset_source critical.css %}{% endraw %}

{% capture pagespeed_caption %}
Page speed analyzed with [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) tool.
{% endcapture %}

<figure>
  <img src="{{ site.url }}/images/mm-home-pagespeed-021116.jpg" alt="Made Mistakes analyzed with PageSpeed Insights">
  <figcaption>{{ pagespeed_caption | markdownify }}</figcaption>
</figure>

{% capture protip_critical_css %}
#### ProTip: Plugin-Free Inlined Critical CSS

The same method can be achieved by placing your SCSS stylesheet inside the `/_includes/` folder and applying the `scssify` filter. Fully compatible with GitHub Pages without the use of a plugin.
{% endcapture %}

<div class="notice--info">
  {{ protip_critical_css | markdownify }}
</div>

{% highlight liquid %}
<head>
  <style type="text/css">
    {% raw %}{% capture criticalcss %}
      {% include critical.scss %}
    {% endcapture %}
    {{ criticalcss | scssify }}{% endraw %}
  </style>
</head>
{% endhighlight %}

#### Responsive Images Revisited

Inlining the above the fold CSS and lazy loading the rest wasn't the only web performance improvement I've made. The biggest hurdle I've come across working with Jekyll is image management. Since Jekyll isn't a CMS and I have a bazillion images across pages, finding a solution to tackle [responsive images](http://alistapart.com/article/responsive-images-in-practice) has been challenging.

It's a nut [I've been trying to crack]({{ site.url }}{% post_url 2012-03-19-going-static %}#responsive-images) with my Jekyll setup since day one. My [responsive images dream scenario](https://github.com/jekyll/jekyll-assets/issues/172) would go something like this:

1. Link to an image in a post/page with Markdown (e.g. `![image](image-name.jpg)`).
2. Several sizes (specified in `_config.yml`) of said image would then be automatically created.
3. Image would include the correct `srcset` and `sizes` markup in the `<img>` element to serve it responsively and save on bandwidth.

To my knowledge a Jekyll plugin doesn't currently exist to do this, though there are some that are close like [Jekyll-Picture-Tag][picture-tag]. You have to use a tag like {% raw %}`{% picture image.jpg %}`{% endraw %} instead of Markdown but the other dream features are there (auto sized images and presets).

As a first step I focused in on the large hero images and decided to worry about the other images later. Replacing Markdown images with {% raw %}`{% picture %}`{% endraw %} tags over 1,000+ posts just isn't feasible yet. Since the hero images are `_layout` driven they proved easier to implement.

All it took was changing {% raw %}`<img src="{{ page.image.feature }}" alt="{{ page.title }}">`{% endraw %} to {% raw %}`{% picture hero {{ page.image.feature }} alt="{{ page.title }}" %}`{% endraw %} and settling on this configuration.

{% highlight yaml %}
picture:
  source: "images/_originals"
  output: "images"
  markup: "picture"
  presets:
    hero:
      attr:
        class: "page__hero-image"
        itemprop: "image"
      ppi: [1]
      source_1600:
        media: "(min-width: 1600px)"
        width: "1600"
      source_1024:
        media: "(min-width: 1024px)"
        width: "1024"
      source_768:
        media: "(min-width: 768px)"
        width: "768"
      source_600:
        media: "(min-width: 600px)"
        width: "600"
      source_default:
        width: "320"
{% endhighlight %}

Now when I place a high resolution image in `/images/_originals/` and add `feature: image.jpg` to the YAML Front Matter I get this markup after a build:

{% highlight html %}
<picture>
  <source srcset="image.jpg" media="(min-width: 1600px)">
  <source srcset="image.jpg" media="(min-width: 1024px)">
  <source srcset="image.jpg" media="(min-width: 768px)">
  <source srcset="image.jpg" media="(min-width: 600px)">
  <source srcset="image.jpg">
  <img src="image.jpg" class="page__hero-image" itemprop="image" alt="">
</picture>
{% endhighlight %}

By default the plugin hashes the filenames, but [I disabled that](https://github.com/mmistakes/made-mistakes-jekyll/commit/39fcf74b99d5fd6988eaff332ce90208c57ed840) since it was getting hard to manage between Mac OS X and Windows environments (each created their own hashed version of the file even when visually the same).

Right now this plugin only supports the `<picture>` element which is great for art directed responsive images, but since I'm not doing that it is bit overkill and needs a polyfill[^picture-polyfill]. Having the option to use `srcset` instead would be preferred, but since I'm not a Rubyist making that change is out of my hands until [someone else tackles it](https://github.com/robwierzbowski/jekyll-picture-tag/issues/68).

[^picture-polyfill]: [Picturefill](https://scottjehl.github.io/picturefill/) is responsive images polyfill that enables support for the picture element and associated features in browsers that do not yet support them.

{% capture pagespeed_media_caption %}
The bump in page speed has been great with a mobile score of `73/100` improving to `96/100`.
{% endcapture %}

<figure>
  <img src="{{ site.url }}/images/mm-media-pagespeed-021116.jpg" alt="Page speed before and after using Jekyll-Picture-Tag plugin">
  <figcaption>{{ pagespeed_media_caption | markdownify }}</figcaption>
</figure>

The one big drawback I've experienced using this plugin has been the increased build times. If I don't instruct Jekyll to `keep_files: ["images"]` then every time I run Jekyll the featured images used in over 1,000 posts will go through the process of being resized and spit out into 4 smaller files. This can take a really long time and even longer to upload to my web server if names changed (another reason I disabled MD5 hashed filenames).

### A Focus on Content

Content is still at the heart of the layouts I designed years ago with hero images and text taking center stage. It's been a balancing act as I've tried to incorporate navigation systems (*main menu*, *table of contents*, *page breadcrumbs*), comments, and social sharing links that are useful but not distracting.

I've tried to Surfacing content in posts using Jekyll Related Posts plugin and Featured Posts. The first likely adds some compilation time to the build process (test it to make sure) while the later is a nice way to manually call attention to "top/popular" posts. They `_include` I use to build them is flexible enough that I can add the module to posts or pages by adding some YAML Front Matter.

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
*[CMS]: Content Management System
