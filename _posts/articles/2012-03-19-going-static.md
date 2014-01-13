---
layout: post
title: "Going Static without a CMS using Jekyll"
description: "Migrating Made Mistakes from a Wordpress powered website back to its static file roots using Jekyll."
modified: 2014-01-03
image: 
  feature: going-static-feature.jpg
  small: going-static-340x100.jpg
  thumb: going-static-thumb.jpg
category: articles
tags: [Jekyll, web development, design, responsive, theme]
comments: true
---

If you follow the trends in modern web design and development, it's hard to ignore the work being done around responsive design. Seems like every other week there is an awesome article about media queries, fluid grids, mobile first, or responsive images on websites like [*A List Apart*](http://www.alistapart.com/) and [Smashing Magazine](http://www.smashingmagazine.com/).

Which got me thinking *"Shit. I don't know anything about these new technologies or techniques, I better learn fast."* And the only real way I was going to pickup all this was to create a project for myself. So began the process of evaluating how to build my personal website and how I'd like it to function.

## Why Go Static

For the last ten years I've used a <abbr title="Content Management System">CMS</abbr> to hold and present personal blogs and portfolios of my design work. These websites were all dynamically driven by a database (usually MySQL) and generally had more features I almost never needed. For example, the convenience of being able update my Wordpress powered website from an iPhone application. As much as that feature sounds awesome, I never once found myself away from a computer wanting to post something in long form.

A common problem facing Wordpress sites are their speed, due to a number of reasons. To be honest I never really had issues with *Made Mistakes* because it was relatively small and low on the traffic. But worrying about security exploits, constantly upgrading to the core and plugins, or if I had [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/) configured correctly started to get old fast.

### Designers Are Control Freaks

But the real reason that prompted me to look at going back to my web roots was *control*. Trying to tame content inside of a CMS filled with loops, functions, and code I didn't need or know how they worked became an exercise in wasting time. And for what? In six months I'd abandon a site and cease updating even though I had the tools to update from *anywhere* and at *anytime*. Which lead to this conclusion --- I'd much rather build something from the ground up than strip away a bunch of useless bells & whistles I didn't need.

## The Journey to a Static Website

And so began the process of building a blog-portfolio hybrid using static pages that I could control from `<p>` tag out. But where to start? *Do I build a few disconnected pages in a text editor like TextMate and upload via FTP?* Or is there a better way using a static-site generator like [Jekyll][1], [nanoc][2], [Middleman][3], [StaticMatic][4], [Bonsai][5], [subDimension][6], or [Octopress][7]?

[1]: http://jekyllrb.com/
[2]: http://nanoc.stoneship.org/
[3]: http://middlemanapp.com/
[4]: http://staticmatic.rubyforge.org/
[5]: https://github.com/benschwarz/bonsai
[6]: http://subdimension.co.uk/pages/projects.html
[7]: http://octopress.org/

### Generating the Site with Jekyll

I eventually settled on Jekyll as my static-site generator of choice --- mostly because it seemed actively developed and [Liquid](http://liquidmarkup.org/) appeared to do everything I needed to do with my templates. Publishing a new post goes something like this:

1.	Create a text file written in Markdown for a new post.
2.	Add a <abbr>YAML</abbr> front-matter block to the top of these files to indicate which layout to use, the post's meta data, feature image, category, and tags.
3.	Run `jekyll` from the <abbr title="Command line">CLI</abbr> to spit out the compiled site.
4.	Deploy `/_site` to my web server using a rake task that minifies all .html files, rsyncs the changes, and pings Google and Bing notifying them that `sitemap.xml` has updated.

There can be a few more steps to the process, but for the most part it's fairly straight forward after you've built all the necessary `_layouts` and `_includes`. What made this process appealing to me over Wordpress or another CMS was --- total control. I can set how I want the folder & file structures to look like, how the pages are constructed, use [Grunt](http://gruntjs.com/) and other build scripts to optimize everything, etc etc etc. Sure it's possible to do all this in a CMS, but sometimes it's not as transparent and obvious and you often have to strip out a bunch of code bloat.

I will say this about using Jekyll --- it's not for everyone. I had to get my hands dirty and figure out (or research) ways of creating XML sitemaps, <abbr title="Really Simple Syndication">RSS</abbr>/Atom feeds, including social media buttons on article pages, and numerous other things Wordpress powered sites take for granted. But if you ask me, digging into those details and crafting something from scratch was way more rewarding than installing a plugin to do it for you.

Jekyll made it possible for me to realize the following goals: familiarize myself with the basics of HTML5 and CSS3 transitions, be able to *"art direct"* every page without hacks, get nice with CSS preprocessors like [Less](http://lesscss.org/) to create more powerful and efficient stylesheets, and plant the seeds of a responsive design that was optimized for mobile, tablet, and desktop screens.

## Inspirational Frameworks

### HTML5 Boilerplate

One of the most beneficial things I did to familiarize myself with the HTML5 spec was download the [*HTML5 Boilerplate*](http://html5boilerplate.com/) and read through the source code. All of the files are heavily commented and explain what is going on and why. Often with links to the source material to get more context behind a specific technique or approach. When this wasn't enough I'd hit up [*HTML5 Doctor*](http://html5doctor.com/) to learn more about the `header`, `article`, `section`, `nav`, `footer`, `figure` tags.

### Art Directed Blog Posts are So Passé

Back when I still had a website powered by Wordpress, I toyed with the idea of designing art directed blog posts. Essentially posts that deviated from the blog's theme and became something unique based on the posts content. Think of the editorial design work done in print magazines and you'll get the idea.

To achieve this you could install any number of art direction [Wordpress plugins](http://wordpress.org/extend/plugins/art-direction/) to include custom CSS styles into a post's layout overriding the defaults. If you ask me, using [Liquid If statement](http://wiki.shopify.com/UsingLiquid#If_.2F_Else_.2F_Unless) tags in a templates seems less hacky and way more customizable. Loading custom CSS for specific pages becomes an almost trivial exercise once you wrap your head around Liquid and <abbr title="YAML Ain't Markup Language">YAML</abbr>.

### Less is More

When I first heard about [Less](http://lesscss.org/) and [Sass](http://sass-lang.com/about/) I rejected the idea of using a <abbr>CSS</abbr> preprocessor. Feeling like I've sharpened my <abbr>CSS</abbr> skills to a razor sharp edge, I in no way wanted to add another layer of complexity to my workflow. With a second look I decided it made a lot of sense to at least experiment with writing Less and see how I could utilize it in my next project.

Bare minimum I figured I could use global variables for the site's color palette and default typography and maybe a mixin or two. The beauty of Less is that you don't have to alter your current .css files. Just changed the .css extension to .less and you're done. Then use as little or *as less* that you want.

Using variables and mixins helped to quickly prototype page styles. It also allowed me to think more modularly about how to best reuse my code throughout a project. And I didn't even have to worry about using JavaScript or a separate app to convert compiled .css files. I simply installed the [Jekyll-less](http://rubygems.org/gems/jekyll-less) Ruby Gem and any time I run `jekyll` or `jekyll-server`, the .less to .css conversion is handled automatically.

### But What About the Grid System?

Another added benefit of using Less are the many user created mixins. I knew I wanted an easy way to establish a grid system in my layouts, but really didn't want to go the semantically unfriendly route of using classes like `.grid_x`, `.push_x`, or `col_x`. Instead I stumbled upon [The Semantic Grid System](http://semantic.gs/) from an [article on Smashing Magazine](http://coding.smashingmagazine.com/2011/08/23/the-semantic-grid-system-page-layout-for-tomorrow/ "The Semantic Grid System Page Layout for Tomorrow") about semantics in grid frameworks.

Using The Semantic Grid System allowed me to define fluid grids for each of my site's major page layouts with a few lines of Less. Top that off with a few carefully thought out `@media` queries and my grids were now responsive and adapted well mobile phones, tablets, desktops, and beyond.

## What's Left to Do?

So now that I finally got around to migrating my Wordpress website, developed a process for publishing content, redesigned everything from the ground up, tinkered with responsive web design, and learned some new tricks... what's next? Well for starters, I need to finish cleaning-up and re-publishing around fifty old blog posts. Many of these originated from Tumblr and Wordpress, and when I migrated them over to Jekyll the outputted files were a mess. Plus I'd like to design some of these pages to make them visually interesting.

### Portfolio Layout

You might have noticed in the main navigation up top *(or maybe you didn't)* a coming soon line next to the portfolio link. Still thinking about how I want to showcase my design and illustration work that fits in well with the rest of the website. I did some tests on the [Work page]({{ site.url }}/work/) using a grid of thumbnails to represent each post that I think will work better as a portfolio. Either that or combination of a [responsive slider](http://www.woothemes.com/flexslider/) for featured work and smaller thumbnails below for the rest. We'll see...

### Responsive Images

I think I have a solid handle on how to serve mobile optimized pages using `@media` queries and page widths. But what I don't have figured out are the images. Sure they scale and look decent at various breakpoints, but I didn't exactly follow a mobile first methodology with them. I started big and scaled down, which means the iPhone and other mobile devices download large images regardless. Something tells me [cracking this nut](http://www.alistapart.com/articles/responsive-images-how-they-almost-worked-and-what-we-need/ "Responsive Images How They Almost Worked and What We Need") is going to be hard.

### Version Control

With a 1.0 release under my belt, I think now is the time to take a look at starting a [repository on GitHub](https://github.com/mmistakes/made-mistakes). Maybe to bring sanity to the project allowing me to version control each update. Also think it would be wise to learn how to utilize rsync and rake tasks to make deploying smoother instead of manually FTPing my `_site` folder.

**Update:** I've added the [sourcecode for mademistakes.com](https://github.com/mmistakes/made-mistakes) to GitHub if you want to see how I use Jekyll. Feel free to fork my repo, use my design, or point out how bad all my code is ;-) Just don't be a dick and make a carbon copy of my content and pass it off as your own.
{: .notice}

## Jekyll Themes

Getting more comfortable using Jekyll I wanted to give back to the community, so I've released a few themes on GitHub. I've taken the numerous redesigns this site has gone through and packaged them up into something I hope is a good starting point for launching a Jekyll powered blog. And they're all 100% supported by [GitHub Pages](http://pages.github.com/) if you want to host your site or blog there for free.

* **Minimal Mistakes:** [Theme preview](http://mmistakes.github.io/minimal-mistakes), [documentation]({{ site.url }}{% post_url /articles/2013-05-28-minimal-mistakes-jekyll-theme %})
* **So Simple:** [Theme preview](http://mmistakes.github.io/so-simple-theme), [documentation]({{ site.url }}{% post_url /articles/2013-06-26-so-simple-jekyll-theme %})
* **HPSTR RDX:** [Theme preview](http://mmistakes.github.io/hpstr-jekyll-theme), [documentation]({{ site.url }}{% post_url /articles/2013-08-26-hpstr-jekyll-theme %})