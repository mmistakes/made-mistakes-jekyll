---
layout: article
title: "How I'm Using Jekyll in 2016"
excerpt:
categories: articles
tags: [Jekyll, web development, style guide, GitHub, open source]
image:
  feature: using-jekyll-2016-feature.jpg
  teaser: using-jekyll-2016-teaser.jpg
comments: true
featured:
modified:
---

I first started using [**Jekyll**](http://jekyllrb.com/) --- a static site generator, back in 2012. In the four years since, Jekyll has indirectly introduced me to a host of new tools and ways of building websites. Hell, I wasn't even using version control when developing this site --- so you know a lot has changed.

What follows is a brain dump documenting my approach to using Jekyll, how that's evolved over the years, and any other learnings I've picked up along the way. This is mostly an excuse for me to capture and reflect on things, but maybe you'll find some useful nuggets in the mess that's sure to follow.

{% include toc.html %}

## Content is King

To learn the basics of Jekyll I turned a Wordpress powered site into the static version you see now. I read several Jekyll tutorials, learned [Liquid](https://docs.shopify.com/themes/liquid-documentation/basics) and [Kramdown](http://kramdown.gettalong.org/syntax.html), [blogged about the process]({{ site.url }}{% post_url 2012-03-19-going-static %})[^kramdown], and eventually ended up with something I was happy with --- all without a database or CMS.

[^kramdown]: Kramdown is a Markdown converter that does some nice things like automatically generating table of contents from headlines.

### Posts for All the Things

As Jekyll has matured and added features, the complexity at which I use it has too. In those early days content could only be considered a **post** or **page**. I chose to make most things a post so I could reap the benefits of `site.tags` and `site.categories` for creating meaningful archive pages and as way to surface "related posts" easily.

This made a lot of sense then because the only type of content I had on the site were date based blog posts. As I started incorporating things like portfolio pieces into the site I used `categories` as a way to structure content by "post type." For example, [**Blog Articles**]({{ site.url }}/articles/) would get `categories: articles` added to their YAML Front Matter and `permalink: /:categories/:title/` in `_config.yml` to produce pretty URLs like `mademistakes.com/articles/jekyll-is-the-best/`.

A drawback I hit with this method was creating reliable pagination between posts. Jekyll provides the variables `page.previous` and `page.next` to help create previous/next style links on your posts. But because I broke posts out into categories, these links didn't always behave as expected.

For example, when reading a post in the `articles` category you'd expect the **NEXT →** link to show the next article post. Instead you'd end up with something from the `portfolio` category because it was the next item in the `site.posts` array. With plugins or a messy bit of Liquid you could probably filter on the current `category`, but I never took it that far.

Details like this drive me bonkers, so instead I opted for a **You May Also Enjoy** module that displays three related posts[^related-posts] at the bottom of the page. In my eyes this provided a better reading experience even if my site took longer to generate at build...

[^related-posts]: [**jekyll-tagging-related_posts**][related-posts] - replaces Jekyll's `related_posts` function to use tags to calculate better post relationships.

|      | Jekyll version  | Build time | Posts |
|------|:---------------:|:----------:|:-----:|
| Then | 0.12.1          | < 1s       | 25    |
| Now  | 3.1.1           | 121.62s    | 980   |

It's no coincidence that my build times went from under a second to a few minutes once I reached several hundred posts. Moving to solid-state drives and reducing the amount of Liquid `for` loops in my `_layouts` and `_includes` has helped --- but I still have a ways to go if I want to speed things up further. 

The new **`--incremental` regeneration** feature will eventually play a big role in this for me. On a default `jekyll new` site it works really well, but unfortunately I haven't had much luck getting it to play nicely with the various plugins I use. The work on this feature currently being done seems like its [going in the right direction](https://github.com/jekyll/jekyll/pull/4269), so I'm sure in time things will sort out.

For now the best I can do is use the new **Liquid Profiler**[^profiler] to identify problematic bits and simplify where I can. I update the site so infrequently that it really isn't a bother waiting 2 minutes for a build to finish, but damn it would be nice to hit < 1s again!

[^profiler]: add `--profile` to a build or serve

{% capture jekyll_profile_caption %}
Running Jekyll `--profile` in Mac OS X Terminal.app
{% endcapture %}

<figure>
  <img src="{{ site.url }}/images/mm-terminal-jekyll-profiler.png" alt="running Jekyll --profile in Mac OS X Terminal.app">
  <figcaption>{{ jekyll_profile_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

### Posts Become Collections

When [collections](http://jekyllrb.com/docs/collections/) were introduced back in v2.0, I decided to build out a [**Frequently Asked Questions**]({{ site.url }}/faqs/) section on my site to familiarize myself with the feature.

Creating a collection of FAQ items turned out to be easier than expected. Make a `_faqs` directory populated with Markdown formatted text files (like any other post or page), configure the collection in `_config.yml`, build an [index page](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_pages/faqs/index.md) to display all of the collection's documents, and done!

{% highlight yaml %}
# _config.yml
collections:
  faqs:
    output: true
    permalink: /:collection/:path/
    title: FAQs
{% endhighlight %}

As collections have elevated in status they're increasingly becoming my preferred way of structuring content. In addition to the FAQs collection I've also created one to build a "[living style guide]({{ site.url }}{% post_url 2015-02-10-jekyll-style-guide %})" of sorts --- documenting the look and feel of the site with visual representations and code samples. 

Eventually I plan to convert more posts into their own collection, but not exactly sure which. Posts currently categorized as `work` would likely be the first to transition over since it's always felt funny grouping them that way. As far as the rest? I'm not sure yet. 

What I'd like to investigate deeper is adding taxonomies to collections and how they mingle with the tags and categories already set in `_posts`. I'm not exactly sure if they coexist with `site.tags` or how [tag archives]({{ site.url }}/tag/) generated by [**Jekyll Archives**][archives] might see them. A job best saved for a rainy day I suppose...

## An Evolution

From a workflow perspective things have stayed the same. I still "write in Markdown", run `jekyll build`, and push the contents of the `_site` directory to a web server. On the development side of things however, a lot of complexity has been introduced in an effort to optimize how content is displayed and loaded to improve website performance.

Tinkering and experimenting with the visual design of Made Mistakes is important to me. Since I work on both Mac OS X and Windows based devices I need tooling that plays with each. Below are some of those tools, configurations, and Jekyll plugins that help things work across development environments.

### Bundler

Installing Ruby, Bundler, and Ruby Gems, were all new to me four years ago. Running `jekyll build` on different operating systems was always a crap shoot. A setup that worked one day would most certainly break the next after updating Jekyll on a Windows machine.

I eventually learned to embrace [Bundler](http://bundler.io/) from the advice of numerous filed issues on GitHub and Stack Overflow posts. Since Bundler is the official way to install Jekyll it wasn't that big of a leap to start using a `Gemfile` to manage all dependencies. To do that:

1. Run `bundle init` to create an empty `Gemfile`
2. Add `gem 'jekyll' and any other gems.

{% highlight ruby %}
# Made Mistakes example Gemfile

source 'https://rubygems.org'

gem 'breakpoint'
gem 'wdm', '~> 0.1.0' if Gem.win_platform?
gem 'mini_magick'
gem 'autoprefixer-rails'
gem 'uglifier'

# Jekyll and Plugins
gem 'jekyll'
gem 'jekyll-archives'
gem 'jekyll-tagging-related_posts'
group :jekyll_plugins do
  gem 'jekyll-assets', github: 'jekyll/jekyll-assets'
  gem 'jekyll-sitemap', github: 'jekyll/jekyll-sitemap'
end
{% endhighlight %}

Now when running `bundle install` each of the gems specified above are installed and a `Gemfile.lock` is created listing all of the dependencies. Prepending all Jekyll commands with `bundle exec` ensures only the versions in `Gemfile.lock` are executed helping to solve conflicts.

Committing both of these Gemfiles to a git repository also makes it easy to revert back if a `gem update` goes bad. Sure it's a few more characters to type, but the headaches it solves are more than worth it. You can even write shortcut tasks with Rakefiles to eliminate the extra keystrokes if that's your thing (more on that below).

### Environments and Configurations

With the introduction of asset related plugins and various other build steps I eventually settled on creating two Jekyll configuration files. A default `_config.yml` with all production settings and `_config.dev.yml` for development specific ones.

The cool thing is you can chain together Jekyll configuration files, overriding settings from the previous. For example when building locally I want {% raw %}`{{ site.url }}`{% endraw %} to default to `http://localhost:4000` instead of `https://mademistakes.com` and set my Disqus account to a development one for testing. Adding the following in values `_config.dev.yml` overrides the ones in `_config.yml`:

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

Changing environments on Windows gave me some trouble until I discovered `JEKYLL_ENV=production bundle exec jekyll build` doesn't work for whatever goofy reason. Instead you have to use the [`SET`](http://ss64.com/nt/set.html) command to assign environment variables.
{% endcapture %}

<div class="notice--warning">
  {{ info_windows_env | markdownify }}
</div>

{% highlight bash %}
> set JEKYLL_ENV=production
{% endhighlight %}

#### Other Configurations

As mentioned earlier I have a moderately sized Jekyll site at {{ site.posts.size }} posts. Combine that fact with an `/images/` directory that is close to 2 GB, a liberal use of Liquid `for` loops, and generator plugins like [**Jekyll Archives**][archives] --- you get site builds that are far from instant. And in the rare cases when I run `jekyll clean` to flush caches and everything in `/_site/`, builds can take over 15 minutes as the [**Jekyll Picture Tag**][picture-tag] plugin regenerates appropriately sized hero images for every posts. Yikes!

So as you might have guessed, I sure as hell never start up a server with *auto-regeneration* enabled. Instead I start with `bundle exec jekyll serve --no-watch` and then run a rake task to manually build every time I want to check changes locally.

When working on the site's design it can be cumbersome to sit through a 2 minute build just to check a CSS change. But until `--incremental` works reliably its something I have to suffer through or use plugins to isolate posts at build. Its a good thing I do a lot of my 'designing' and tinkering in-browser with [Chrome's DevTools](https://developer.chrome.com/devtools) before editing the actual source as this hasn't been too annoying.

### Automation Tools and Shortcuts

To save time (and my sanity) when working on the site locally, I employee a few tools to perform common development related tasks.

#### Grunt

[**Grunt**](http://gruntjs.com/) describes itself as "the JavaScript task runner." Grunt has a fairly large set of plugins that can handle pretty much any mundane task you need.

Prior to Jekyll natively supporting Sass I used Grunt plugins to pre-process `.less` files, concatenate a set of JavaScript files, and optimize image assets. Now that I'm running Jekyll 3.1 and the Jekyll-Assets plugin I no longer need Grunt to mess with my scripts and stylesheets.

These days I use Grunt solely for optimizing images and SVGs with the following plugins:

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

When I add new JPEG or PNG assets to `/images/` I use the following command to optimize them. This reduces their file size which ultimately speeds up page loads.

{% highlight bash %}
$ grunt images
{% endhighlight %}

On the SVG side of things any files added to `/_svg/` are optimized and merged into a [single sprite map](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) with the following command:

{% highlight bash %}
$ grunt svg
{% endhighlight %}

In combination with both of these tasks I use the [**grunt-newer**](https://www.npmjs.com/package/grunt-newer) plugin. This dramatically speeds up things as only new and modified files are processed.

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

Since I self-host my site I need a way of pushing the contents of the `/_site/` directory after a production build. Years ago I'd use [**Cyberduck**](https://cyberduck.io/) or [**FileZilla**](https://filezilla-project.org/) to transfer everything over slowly to [Media Temple](http://bit.ly/1Ugg7nN) via FTP.

These days I use **rsync** to speed that transfer way the hell up, by only sending over new and modified files. It's also a task that I can automate by adding the following to my [`Rakefile.rb`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/Rakefile.rb) file.

{% highlight ruby %}
# Usage: rake rsync
desc "rsync the contents of ./_site to the server"
task :rsync do
  puts "* rsyncing the contents of ./_site to the server"
  system "rsync --perms --recursive --verbose --compress --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r _site/ SSHuser@mydomain.com"
end
{% endhighlight %}

As part of my deployments I also run tasks that notify [Ping-O-Matic](http://pingomatic.com/), Google, and Bing that the site has updated and to check out the new [`sitemap.xml`]({{ site.url }}/sitemap.xml) and [`atom.xml`]({{ site.url }}/atom.xml) feeds. These tasks look something like this:

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

Originally I wrote my stylesheets in [Less](http://lesscss.org/)[^less] and squished them down with a Grunt task. Then one day Jekyll grew up and started supporting Sass files natively so I converted everything over and was able to remove a dependency. Hooray!

[^less]: Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions to make it more maintainable.

Not content with that workflow I eventually leveled-up by incorporating the [**Jekyll-Assets**][assets] plugin into the mix. It's a powerful gem with an assortment of tags that make cache busting and inlining assets (something I'll get to in a minute) so much easier.

It also supports the wonderful [PostCSS](http://postcss.org/) plugin [Autoprefixer](https://github.com/postcss/autoprefixer), for automatically adding vendor prefixes to CSS rules using values from [Can I Use](http://caniuse.com/). I can then write style declarations like this in my SCSS partials:

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

For this site I target the *last 2 versions* of each major browser, browsers that have a *global usage of over 5%*, or are *Internet Explorer 9+*.

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
  <figcaption>{{ pagespeed_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

{% capture protip_critical_css %}
#### ProTip: Plugin-Free Inlined Critical CSS

The same method can be achieved by placing your SCSS stylesheet inside the `/_includes/` directory and applying the `scssify` filter. Fully compatible with GitHub Pages without the use of a plugin.
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

All it took was changing {% raw %}`<img src="{{ page.image.feature }}" alt="">`{% endraw %} to {% raw %}`{% picture hero {{ page.image.feature }} alt="" %}`{% endraw %} and settling on this configuration.

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
  <figcaption>{{ pagespeed_media_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

The one big drawback I've experienced using this plugin has been the increased build times. If I don't instruct Jekyll to `keep_files: ["images"]` then every time I run Jekyll the featured images used in over 1,000 posts will go through the process of being resized and spit out into 4 smaller files. This can take a really long time and even longer to upload to my web server if names changed (another reason I disabled MD5 hashed filenames).

### A Focus on Content

Showcasing a post or page's content is still the primary job of the layouts I designed years ago. It's been a balancing act as I've tried to incorporate navigation systems (*main menu*, *table of contents*, *page breadcrumbs*, *tag archives*), reader submitted comments, related posts, and social sharing links in a complimenting way.

<figure class="half">
  <img src="{{ site.url }}/images/mm-jekyll-post-then.jpg" alt="Jekyll post layout then">
  <img src="{{ site.url }}/images/mm-jekyll-post-now.jpg" alt="Jekyll post layout now">
  <figcaption>(Left) post layout then, (right) post layout now.</figcaption>
</figure>

The core elements have remained unchanged since I originally launched the site:

1. A neutral design to avoid competing with page content (text and image).
2. Well defined site structure, way points, and taxonomies to encourage browsing additional pages.
3. Readable typography to help showcase long form articles and tutorials.

Building everything from scratch has really given me the chance to focus in on all of those things. And avoid the trap of adding useless widgets and *other cruft* just because its trivial to install --- I'm looking at you Wordpress plugin junkies. 

Finding ways to surface related content in an attractive way has been a challenge for me. I wanted to take the simple bullet list of posts most Jekyll user's start out with and make it more visual since no one is going to sift through a bunch of boring text.

#### Listing Posts

Both of these types of content modules have gone through various incarnations over the years. I went from plain text lists, to thumbnail images, to listings with a short excerpt, to something that combined them all.

<figure class="half">
  <img src="{{ site.url }}/images/mm-text-teasers.png" alt="plain text post list">
  <img src="{{ site.url }}/images/mm-visual-teasers.png" alt="visual post list">
  <figcaption>Title/excerpt versus image/date/title/excerpt post lists.</figcaption>
</figure>

What I've settled on is a tile based design for the related/featured post module and a more traditional list design for the archives.

<figure>
  <img src="{{ site.url }}/images/mm-archive-listing-example.jpg" alt="current archive listing design">
  <figcaption>Archive listing with teaser image, headline, published date, estimated reading time, and excerpt.</figcaption>
</figure>

Related posts are dynamically determined with `site.related_posts` and augmented with a [Jekyll plugin][related-posts] for tag based matches. The following tile logic is placed in an `_include` file and ready to be used in layouts or anywhere else.

{% highlight html %}
{% raw %}
<!-- /_includes/related.html -->
<h3 class="tile__header">You May Also Enjoy</h3>
<div class="tiles">
  {% for post in site.related_posts limit:3 %}
    <article class="tile__item" itemscope itemtype="http://schema.org/CreativeWork">
      <meta itemprop="text" content="{{ post.excerpt | strip_html }}">
      <a href="{{ post.url }}">
        <img src="{% if post.image.teaser %}{{ post.image.teaser }}{% else %}{{ site.teaser }}{% endif %}" itemprop="image" alt="{{ post.title }}">
        <h3 class="tile__title" itemprop="headline">{{ post.title | markdownify | remove: '<p>' | remove: '</p>' }}</h3>
      </a>
      {% if post.categories %}
        {% assign category_slug = post.categories | first %}
        {% assign category = site.data.slugs[category_slug] %}
        <a href="/{{ post.categories | first }}/" class="tile__category">{{ category.name }}</a>
      {% endif %}
    </article>
  {% endfor %}
</div>
{% endraw %}
{% endhighlight %}

{% capture related_posts_caption %}
Related posts only appear if there are three or more matches based on `post.tags`.
{% endcapture %}

<figure>
  <img src="{{ site.url }}/images/mm-related-posts-example.jpg" alt="related posts example screenshot">
  <figcaption>{{ related_posts_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

Similar in design to **related posts**, I also utilize a set of tiles for featuring posts. Visually they look the same but instead of being dynamically determined by `post.tags` they're grouped by category and a sprinkling of YAML.

##### Adding Featured Posts

The first step is to flag a featured post. To do this I add `featured: true` to its YAML Front Matter.

Next I create an variation of the related posts `_include` from earlier but with some additional Liquid conditionals to control headlines and other variable data.

{% highlight html %}
{% raw %}
<!-- /_includes/featured.html -->
<h3 class="tile__header">{% if page.feature.headline %}{{ page.feature.headline }}{% else %}Featured Posts{% endif %}</h3>
  <div class="tiles">
    {% assign features = site.categories[page.feature.category] | where:"featured", true %}
    {% for post in features limit:3 %}
      <article class="tile__item" itemscope itemtype="http://schema.org/CreativeWork">
        <meta itemprop="text" content="{{ post.excerpt | strip_html }}">
        <a href="{{ post.url }}">
          <img src="{% if post.image.teaser %}{{ post.image.teaser }}{% else %}{{ site.teaser }}{% endif %}" itemprop="image" alt="{{ post.title }}">
          <h3 class="tile__title" itemprop="headline">{{ post.title | markdownify | remove: '<p>' | remove: '</p>' }}</h3>
          {% assign readtime = post.content | strip_html | number_of_words | divided_by:site.words_per_minute %}
          <span class="tile__item-time">{% if readtime <= 1 %}1{% else %}{{ readtime }}{% endif %} min read</span>
        </a>
        {% if post.work %}
          <span class="tile__category">{{ post.work }}</span>
        {% endif %}
      </article>
    {% endfor %}
  </div>
{% endraw %}
{% endhighlight %}

To display on a page the following YAML Front Matter is added to customize the headline and assign a `site.categories` category to pull features from.

{% highlight yaml %}
feature:
  visible: true
  headline: "Featured Tutorials"
  category: mastering-paper
{% endhighlight %}

In combination with this Liquid in the relevant `_layouts` to pull everything together:

{% highlight liquid %}
{% raw %}
{% if page.feature.visible == true %}
  {% include featured.html %}
{% endif %}
{% endraw %}
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/images/mm-featured-posts-example.jpg" alt="featured posts module example">
  <figcaption>How featured posts look when included on a page.</figcaption>
</figure>

## Introducing Flexibility

My configuration files used to be a dumping ground for all kinds of site, navigation, and author data. This always felt messy to me and when support for data files was added I immediately took advantage of it in my Jekyll themes and personal site.

### Data Files

So what exactly are [data files](http://jekyllrb.com/docs/datafiles/)? I like to think them of custom variables that Liquid can play with in all the ways you'd expect --- `for` loops, `capture`s, filters, you name it. Data files can be YAML, JSON, or CSV, are placed in `/_data/`, and are accessible with `site.data.<filename>`[^data-file].

[^data-file]: **Example:** Data file `/_data/foo.yml` is accessible via `site.data.foo`.

#### Easily Editable Navigation Menus

Before discovering data files I was hard-coding nav links directly into my layouts or junking up `_config.yml` with them. It was with my first set of Jekyll themes that I begun to see the benefit of pulling this data out into their own little world.

In an effort to build a DRY navigation menu for this site I created [`/_data/navigation.yml`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_data/navigation.yml) and added the following four links:

{% highlight yaml %}
# Masthead navigation links

masthead:
  - title: "About"
    url: /about/
  - title: "Work"
    url: /work/
  - title: "Blog"
    url: /articles/
  - title: "Mastering Paper"
    url: /mastering-paper/
{% endhighlight %}

As you can guess, `title` corresponds to the page title and `url`... well the URL. With these values I can loop over the `home-primary` key and auto-generate list elements with the appropriate titles and links from this one file.

{% highlight html %}
<!-- excerpt from /_includes/masthead.html -->
<header class="masthead">
  <div class="container">
    <a class="masthead__title" href="{{ site.url }}/">{{ site.title }}</a>
    <nav id="nav-primary" class="masthead__menu-wrapper">
      <ul class="masthead__menu">
        <li><a href="{{ site.url }}" class="masthead__menu-item">← Home</a></li>
        {% raw %}{% for link in site.data.navigation.masthead %}
          <li><a href="{{ site.url }}{{ link.url }}" class="masthead__menu-item">{{ link.title }}</a></li>
        {% endfor %}{% endraw %}
        <li><a href="#0" class="overlay__menu-trigger masthead__menu-item" aria-label="Navigation Menu" title="Navigation Menu">•&nbsp;•&nbsp;•</a></li>
      </ul>
    </nav>
  </div>
</header>
{% endhighlight %}

What's going on here is I'm looping through `site.data.navigation.masthead` to pull out a `title` and `url` variable for each. If I ever need to update the masthead navigation I just edit `navigation.yml` and the rest is handled for me at build instead making for more DRY and maintainable code.

To improve the navigation's UI I added the following Liquid to check the current page URL and assign an active class if true.

{% highlight html %}
{% raw %}{% for link in site.data.navigation.masthead %}
<ul class="masthead__menu">
  {% assign class = nil %}
  {% if page.url contains link.url %}
    {% assign class = 'is--active' %}
  {% endif %}
  <li><a href="{{ site.url }}{{ link.url }}" class="masthead__menu-item {{ class }}">{{ link.title }}</a></li>
</ul>
{% endfor %}{% endraw %}
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/images/mm-masthead-example.jpg" alt="masthead screenshot">
  <figcaption>Masthead end-result after some styling.</figcaption>
</figure>

I've also used a similar technique to build drop-down navigations with nested lists. An example of how that played out...

##### Drop-Down Navigation Data File

{% highlight yaml %}
# example /_data/navigation.yml

- title: "About"
  href: "/about/"
  children:
    - childtitle: "Biography"
      childhref: "/about/bio/"
    - childtitle: "Resume"
      childhref: "/about/resume/"

- title: "Portfolio"
  href: "/portfolio/"
  children:
    - childtitle: "Design"
      childhref: "/portfolio/design/"
    - childtitle: "Illustration"
      childhref: "/portfolio/illustration/"
    - childtitle: "Development"
      childhref: "/portfolio/development/"
{% endhighlight %}

##### Drop-Down Navigation HTML and Liquid

{% highlight html %}
<ul>
  {% raw %}{% for nav in site.data.navigation %}
    {% if nav.children != null %}
      <li><a href="{{ nav.href }}">{{ nav.title }}</a>
        <ul class="child">
        {% for child in nav.children %}
          <li><a href="{{ child.childhref }}">{{ child.childtitle }}</a></li>
        {% endfor %}
        </ul>
        {% else %}
      <li><a href="{{ nav.href }}">{{ nav.title }}</a>{% endif %}</li>
  {% endfor %}{% endraw %}
</ul>
{% endhighlight %}

Which will produce the following HTML:

{% highlight html %}
<ul>
  <li><a href="/about/">About</a>
    <ul class="child">
      <li><a href="/about/bio/">Biography</a></li>
      <li><a href="/about/resume/">Resume</a></li>
    </ul>
  </li>
  <li><a href="/portfolio/">Portfolio</a>
    <ul class="child">
      <li><a href="/portfolio/design/">Design</a></li>
      <li><a href="/portfolio/illustration/">Illustration</a></li>
      <li><a href="/portfolio/development/">Development</a></li>
    </ul>
  </li>
</ul>
{% endhighlight %}

#### Author Overrides

Made Mistakes has a singular voice, namely mine --- as I'm the only person writing and producing content here. For some of [my Jekyll themes]({{ site.url }}{% post_url 2014-02-28-jekyll-themes %}) I added support for overriding the "site" with one specified in an `authors.yml` data file. Like the navigation example we create a YAML file and place in the `_data` directory.

{% highlight yaml %}
# /_data/authors.yml

billy_rick:
  name: Billy Rick
  web: http://
  email: billy@rick.com
  bio: "I am a very extravagant man."
  avatar: billy-rick-photo.jpg

cornelius_fiddlebone:
  name: Cornelius Fiddlebone
  email: cornelius@fiddlebone.com
  bio: "Jewel miner."
  avatar: cornelius-fiddlebone-photo.jpg
{% endhighlight %}

To override the author on any given post or page `author: ` is added to its YAML Front Matter with a key that matches one set in `authors.yml`. For example to assign Billy Rick as the author of a post I'd add `author: billy_rick`.

Then with this small layout addition I can use Liquid to assign all of the author variables with the `billy_rick` ones in the data file. In the case an author isn't set in a post/page's YAML Front Matter {% raw %}`{{ author }}`{% endraw %} defaults to the variables set in `_config.yml` under {% raw %}`{{ site.owner }}`{% endraw %}.

{% highlight html %}
{% raw %}{% if page.author %}
  {% assign author = site.data.authors[page.author] %}{% else %}{% assign author = site.owner %}
{% endif %}
{% if author.avatar contains 'http' %}
  <img src="{{ author.avatar }}" class="bio-photo" alt="{{ author.name }} bio photo"></a>
{% elsif author.avatar %}
  <img src="{{ site.url }}/images/{{ author.avatar }}" alt="{{ author.name }} bio photo"></a>
{% endif %}
<h3 class="author-name">{{ author.name }}</h3>
{% if author.bio %}<p class="author-bio">{{ author.bio }}</p>{% endif %}{% endraw %}
{% endhighlight %}

#### Slug Names

This next has limited use and is probably overkill and inefficient in most scenarios, but for me it has a use. The hacky way I'm going about creating breadcrumb navigation imposes some limitations on the crumb titles.

Through some Liquid I'm taking `page.url` and then grabbing the first bit of text before `/`. Since I'm fairly consistent in how I organize posts and incorporate categories into my permalink format this works reliably. The problem I run into is some of these "slug" names aren't all that descriptive or properly title cased.

By using a `slugs.yml` data file as a definition list I can replace these "simple slugs" with whatever I want. Let's use the "[What tools do you use to build your website?]({{ site.url }}/faqs/website-tools/)" FAQ page from my site as an example. If I were to output breadcrumbs for this page, I'd filter down a `page.url` of `https://mademistakes.com/faqs/website-tools/` down to `faqs` and end with the following breadcrumbs: `Home > faqs`

Which isn't the worst thing in the world, but ideally **faqs** would be properly capitalized (eg. FAQs) or spelled out as "**Frequently Asked Questions**."

To fix this I'd add a `faqs` slug to `slugs.yml` and assign it a nice descriptive name to use as the title.

{% highlight yaml %}
faqs:
  name: "Frequently Asked Questions"
{% endhighlight %}

Then modify my [`breadcrumbs.html`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_includes/breadcrumbs.html) include to output the `slug.name` variable instead of what was filtered out its `page.url`.

{% highlight html %}
{% raw %}{% assign page_slug = page.url | remove_first: '/' | split: '/' %}
{% assign slug_first = page_slug[0] %}
{% assign slug = site.data.slugs[slug_first] %}

<nav class="breadcrumbs">
  <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
    <a href="{{ site.url }}" class="breadcrumb__item" itemprop="url">
      <span itemprop="title">Home</span>
    </a> <span class="breadcrumb__sep">×</span>
  </span>
  <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
    <a href="/{{ page_slug[0] }}/" class="breadcrumb__item" itemprop="url">
      <span itemprop="title">{{ slug.name }}</span>
    </a>
  </span>
</nav>{% endraw %}
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/images/mm-breadcrumb-example.jpg" alt="breadcrumb screenshot">
  <figcaption>Tada! Properly capitalized and descriptive breadcrumb titles.</figcaption>
</figure>

#### Translation Keys

Localizing my themes is an idea I've only started to flirt with. The idea of using [data tiles as translation keys](https://tuananh.org/2014/08/13/localization-with-jekyll/) for localizing text into different languages was brought to my attention in a [pull request](https://github.com/mmistakes/skinny-bones-jekyll/commit/b08024fcd4815e61eb3c9a0c60c0bc793f195db2) by [@yonojoy](https://github.com/yonojoy). This is by no means a full on i18n solution, but it does help ease for theme developers looking support multiple languages.

There's three pieces to pulling this off.

##### 1. Languages data file

In the case of my [**Skinny Bones**](https://mmistakes.github.io/skinny-bones-jekyll/) starter theme, German and [French](https://github.com/mmistakes/skinny-bones-jekyll/commit/bd4c02bbf29ffbc0194fa6d871f9fefcb8979ed5) translations have been added via hashes in a YAML file (eg. `/_data/languages.yml`).

{% highlight yaml %}
locales:
  # English ---------------------------------------------
  en: &DEFAULT_EN
    overview: "Overview"
    toc: "Table of Contents"
    written_by: "Written by"
    updated: "Updated"
    share: "Share on"
  en_US:
    <<: *DEFAULT_EN     # use en for en_US
  en_UK:
    <<: *DEFAULT_EN     # use en for en_UK

  # German translations ---------------------------------
  de: &DEFAULT_DE
    <<: *DEFAULT_EN     # load English values as default
    overview: "&Uuml;bersicht"
    toc: "Inhalt"
    written_by: "Verfasst von"
    updated: "Zuletzt aktualisiert:"
    share: ""
  de_DE:
    <<: *DEFAULT_DE     # use de translation for de_DE

  # French translations ---------------------------------
  fr: &DEFAULT_FR
    <<: *DEFAULT_EN     # load English values as default
    overview: "Aperçu"
    toc: "Table des matières"
    written_by: "Écrit par"
    updated: "Mis à jour"
    share: "Partager sur"
  fr_FR:
    <<: *DEFAULT_FR     # use fr translation for fr_FR
{% endhighlight %}

##### 2. Set locale in _config.yml

To change the default language, a locale variable is set in `_config.yml`. For example to switch from English to French you'd add `locale: fr_FR` or `locale: fr`. 

##### 3. Call in the correct language hashes

The last step is dropping in long variables like this `{% raw %}{{ site.data.languages.locales[site.locale].updated }}{% endraw %}` into the appropriate layouts and includes --- replacing any text you want to localize. If done correctly this variable should output with the French `updated` string, `Mis à jour`.

If you want to learn more about this technique be sure to check out Tuan Anh's [blog post](https://tuananh.org/2014/08/13/localization-with-jekyll/). Or if you're looking for a plugin to do the heavy lifting [Jekyll-Multiple-Languages][multiple-languages] might be a good place to start.

---

Maybe not 100% complete, but this is certainly the a big majority of the techniques and learnings related to Jekyll I've picked up. What keeps me coming back to Jekyll is its flexibility. It always feels like there are multiple right ways to approach something and always new things to learn. Browse the threads on [Jekyll Talk](https://talk.jekyllrb.com/) on any given day and you'll see what I mean {% icon smile %}.

[sitemap]: https://github.com/jekyll/jekyll-sitemap
[archives]: https://github.com/jekyll/jekyll-archives
[assets]: https://github.com/jekyll/jekyll-assets
[related-posts]: https://github.com/toshimaru/jekyll-tagging-related_posts
[picture-tag]: https://github.com/robwierzbowski/jekyll-picture-tag
[multiple-languages]: https://github.com/screeninteraction/jekyll-multiple-languages-plugin

*[SCSS]: Sassy CSS
*[CMS]: Content Management System
*[YAML]: YAML Ain't Markup Language
*[JSON]: JavaScript Object Notation
*[CSV]: Comma-separated values
*[DRY]: Don't Repeat Yourself is a principle of software development, aimed at reducing repetition.
*[UI]: User Interface
