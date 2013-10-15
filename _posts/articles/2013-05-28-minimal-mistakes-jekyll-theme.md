---
layout: post
title: "Minimal Mistakes, a Jekyll Theme"
headline: "Minimal Mistakes Theme"
subheadline: "Built for Jekyll"
description: "A responsive Jekyll theme featuring full width imagery and clean typography by designer Michael Rose."
modified: 2013-09-12
image: 
  feature: minimal-mistakes-theme-feature.jpg
  homepage: minimal-mistakes-500x500.png
category: articles
tags: [Jekyll, theme, responsive, blog]
comments: true
---

Jekyll is pretty rad and figured releasing a cleaned up version of [my site](http://mademistakes.com) as a theme for others to hack and build on would be fun. So here be that theme --- I call it **[Minimal Mistakes](http://mmistakes.github.io/minimal-mistakes)**, a responsive Jekyll theme with editorial tendencies. 

## Minimal Mistakes is all about:

* Responsive templates. Looking good on mobile, tablet, and desktop.
* Gracefully degrading in older browsers. Compatible with Internet Explorer 8+ and all modern browsers.
* Minimal embellishments. Content first; other widget nonsense never.
* Large feature images for posts and pages.
* Simple and clear permalink structure.
* [Custom 404 page](http://mmistakes.github.io/minimal-mistakes/404.html) to get you started.
* Stylesheets for Pygments and Coderay [syntax highlighting](http://mmistakes.github.io/minimal-mistakes/articles/code-highlighting-post/) to make your code examples look snazzy.
* Simple and clean permalink structure[^1].

<figure>
	<a href="http://mmistakes.github.io/minimal-mistakes" onClick="_gaq.push(['_trackEvent', 'Link', 'Minimal Mistakes - Theme Demo']);"><img src="{{ site.url }}/images/mm-theme-post-750.jpg" alt="Screenshot of Minimal Mistakes theme"></a>
	<figcaption>The post template in action.</figcaption>
</figure>

<div markdown="0"><a href="http://mmistakes.github.io/minimal-mistakes" onClick="_gaq.push(['_trackEvent', 'Link', 'Minimal Mistakes - Theme Demo']);" class="btn btn-inverse">Demo the Theme</a></div>

## Basic Setup

1. [Install Jekyll](http://jekyllrb.com) if you haven't already.
2. Fork the [Minimal Mistakes repo](http://github.com/mmistakes/minimal-mistakes/)
3. Clone the repo you just forked to your computer.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for pulling in large feature images, tags, and other YAML data.
6. Read the documentation below for further customization pointers and documentation.

**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you don't want on your site.
{: .notice}

---

## Setup for an Existing Jekyll site

1. Clone the following folders: `_includes`, `_layouts`, `assets`, and `images`.
2. Clone the following files and personalize content as need: `about.md`, `articles.html`, `index.md`, `feed.xml`, `sitemap.xml`
3. Set the following variables in your `config.yml` file:

{% highlight yaml %}
title:            Site Title
description:      Describe your website here.
disqus_shortname: shortname
url:              http://your-website.com

# Owner/author information
owner:
  name:           Your Name
  avatar:         avatar.jpg
  bio:            "Your bio goes here. It shouldn't be super long but a good two sentences or two should suffice."
  email:          you@email.com
  # Social networking links used in author sidebar. Update and remove as you like.
  twitter:        
  facebook:       
  github:         
  stackexchange:  
  linkedin:       
  instagram:      
  flickr:         
  tumblr:         
  # For Google Authorship https://plus.google.com/authorship
  google_plus:    

# Analytics and webmaster tools stuff goes here
google_analytics:   
google_verify:      
# https://ssl.bing.com/webmaster/configure/verify/ownership Option 2 content= goes here
bing_verify:         

# Links to include in top navigation
# For external links add external: true
links:
  - title: Theme Setup
    url: /theme-setup
  - title: External Link
    url: http://mademistakes.com
    external: true

# http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
timezone:    America/New_York
future:      true
pygments:    true
markdown:    kramdown
{% endhighlight %}

---

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub Issue](https://github.com/mmistakes/minima-mistakes/issues/new). And if you make something cool with this theme feel free to let me know.

---

## License

This theme is free and open source software, distributed under the [GNU General Public License](http://mmistakes.github.io/minimal-mistakes/LICENSE) version 2 or later. So feel free to use this Jekyll theme on your site without linking back to me or including a disclaimer. 

**Like this theme?** I just released another one for Jekyll, with a sweet animated drop down menu, social sharing plugins, and a Grunt build script for theme development. I'm calling it HPSTER Theme and you can [learn more about it here]({{ site.url }}/articles/hpstr-jekyll-theme.html).
{: .notice}

[^1]: Example: *domain.com/category-name/post-title*