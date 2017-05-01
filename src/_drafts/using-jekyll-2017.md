---
title: "How I'm Using Jekyll in 2017"
layout: page
category: articles
read_time: true
breadcrumbs:
  - label: "Blog Articles"
    url: /articles/
excerpt:
tags: [Jekyll, web development, GitHub, open source]
image:
  path:
  feature:
  teaser:
comments: true
last_modified_at:
---

Just shy of 1,000 posts, this Jekyll-based site takes longer than I'd like to build. What started as a few seconds has turned into a half an hour of optimizing assets, looping through Liquid and churning out thousands of HTML files.

Inspired by Anne Tomasevich's post [Optimizing Jekyll Performance with Gulp](http://savaslabs.com/2016/10/19/optimizing-jekyll-with-gulp.html), I set out determine what parts of my site's build process could use some love.

At the time of testing my site contained roughly:

- 1,014 images generated at different sizes.
- 991 posts / 14 pages / 3 sets of collections (1052 total documents).
- 535 comments stored as YAML data files.

And was built with the following Jekyll plugins: [jekyll-picture-tag][jekyll-picture-tag], [sort_name][sort_name], [jekyll-archives][jekyll-archives], [jekyll-assets][jekyll-assets], [jekyll/tagging][jekyll/tagging], [jekyll-tagging-related_posts][jekyll-tagging-related_posts], [jekyll-sitemap][jekyll-sitemap], and [jemoji][jemoji].

[jekyll-picture-tag]: https://github.com/robwierzbowski/jekyll-picture-tag
[sort_name]: https://github.com/mmistakes/made-mistakes-jekyll/blob/master/src/_plugins/sort_name.rb
[jekyll-archives]: https://github.com/jekyll/jekyll-archives
[jekyll-assets]: https://github.com/jekyll/jekyll-assets
[jekyll/tagging]: https://github.com/pattex/jekyll-tagging
[jekyll-tagging-related_posts]: https://github.com/toshimaru/jekyll-tagging-related_posts
[jekyll-sitemap]: https://github.com/jekyll/jekyll-sitemap
[jemoji]: https://github.com/jekyll/jemoji

Using Jekyll's profiler flag `--profile` I measured how long the following tasks took to complete[^3-trials]. Each time running `jekyll clean` prior to wipe `_site`, `.asset-cache` and any other `.tmp` folders.

[^3-trials]: Each task was run 3 times and averaged as the values produced by `jekyll build --profile` varied quite a bit.

| Task description | Windows | Mac |
| --- | ---: | ---: |
| Generate responsively sized `page.image.feature` images | 1288.29s | 1429.26s |
| Minify HTML with `layout: compress` | 39.35s | 11.18s |
| Read `/images/` and copy to `_site/` | 32.39s | 23.63s |
| Build tag pages with jekyll-archives | 17.40s | 9.99s |
| Build tag index page with `sort_tag` filter | 2.62s | 0.59s |
| List related posts with [jekyll-tagging-related_posts][jekyll-tagging-related_posts], [jekyll/tagging][jekyll/tagging], and `LSI: true` | 38.36s | 17.87s |
| List related posts with vanilla `related_posts` | 1.65s | 4.90s |
| Preprocess, concatenate, minify, and cache bust SCSS and JS with [jekyll-assets][jekyll-assets] | 78.75s | 25.03s |
| Display masthead and overlay menu from `_data` | 9.66s | 7.82s |
| List post comments from `_data` | 7.10s | 2.22s |
| Display colophon from `_data` | 0.20s | 0.49s |
| List post taxonomy metadata | 3.48s | 1.18s |
| List post breadcrumb links | 2.83s | 1.03s |
| List featured posts | 0.20s | 0.44s |
| Build style guide collection | 1.16s | 0.31s |
| List post social sharing links | 5.09s | 0.97s |

{% include notice type="info" content="
#### Is Jekyll faster on macOS or Windows?

For giggles I also tested my Windows and Mac development environments against each other. While not exactly an apples to apples comparison I thought it would be interesting to note any variations.

| Windows Environment | Mac Environment |
| --- | --- |
| Lenovo ThinkStation E30 | iMac 21.5-inch, Late 2013 |
| Processor 3.30 GHz Intel Xeon E31245 | Processor 2.7 GHz Intel Core i5 |
| Memory 16 GB | Memory 16 GB 1600 MHz DDR3 |
| Intel SSDSA2BW160G3L 137GB | 1.12 TB Fusion Drive |
| Windows 7 Professional Service Pack 1 | OS X El Capitan 10.11.6 |
| ruby 2.2.4p230 [x64-mingw32] | ruby 2.1.0p0 (2013-12-25 revision 44422) [x86_64-darwin12.0] |"
%}

## Optimization

The numbers above don't lie. Relying on Jekyll and friends to do jobs more suited for task runner likes Gulp was slowing the build down. Time to fold Gulp into the build process and let Jekyll do what it was meant to --- convert Markdown into HTML files.

The added benefit being if this worked out to be faster I'd have a set of content that was more portable and not reliant on Jekyll. In the off-chance I wanted to swap it for another static-site generator like [**Hugo**](https://gohugo.io/) or [**Gatsby**](https://github.com/gatsbyjs/gatsby), I could.

### Image Assets

Resizing a thousand or so images and then optimizing them is no joke --- taking over 20 minutes to complete in my site's case. Up until now I was using the [Jekyll Picture Tag][jekyll-picture-tag] plugin to do this work for me. 

To try and see if Node and Gulp could do this faster I came up with a set of Gulp tasks to:

1. Generate thousands of feature images a 4 different sizes with [**gulp-responsive**](https://github.com/mahnunchik/gulp-responsive).
2. Optimize all images using [**gulp-imagemin**](https://github.com/sindresorhus/gulp-imagemin).
3. Save the optimized images directly to the destination folder, bypassing Jekyll completely.

This helped some, but it wasn't until I [dropped GraphicsMagick](https://github.com/mmistakes/made-mistakes-jekyll/commit/56bbd9bf5429a269047a41e045cc2ef0bf34e62b) for [Sharp](https://github.com/lovell/sharp)[^sharp-gif] did I see a real improvement...

[^sharp-gif]: Sharp is super fast, but only resizes JPEG, PNG, WebP, and TIFF images... no GIF. It's also a pain in the ass to install on Windows due to [`node-gyp`](https://github.com/nodejs/node-gyp).

| Task description | GraphicsMagick | Sharp |
| --- | ---: | ---: |
| Resize and optimize 1,014 source images into 5 target sizes | 1288.29s | 171.00s |

The other missing piece was generating the necessary markup for responsive images. Because I was no longer using `{% raw %}{% picture %}{% endraw %}` tag to output a fully formed [`<picture>` element](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), I had to roll my own responsive image markup. 

```html
{% raw %}{% if page.image.feature %}
  {% assign f = page.image.feature | split: '.' %}
  <img src="{{ site.url }}{{ f[0] }}-320.{{ f[1] }}"
       srcset="{{ site.url }}{{ f[0] }}-768.{{ f[1] }} 768w,
               {{ site.url }}{{ f[0] }}-1024.{{ f[1] }} 1024w,
               {{ site.url }}{{ f[0] }}.{{ f[1] }} 1920w"
       alt="{{ page.title }}">
{% endif %}{% endraw %}
```

This bit of Liquid takes the filename as defined by `page.image.feature`, splits it at the extension, appends suffixes that match those used in the gulp-responsive task, and adds them to the `srcset` attribute. :boom: resolution switching images!

{% include notice type="warning" content="
#### Liquid Limitations

This Gulp + Liquid hybrid isn't as nice as a plugin since there is no logic to actually verify if `-lq`, `-320`, `-768`, or `-1024` versions of the images exist. I'm willing to look passed that since it did shave 16 minutes off my build time :wink:."
%}

Redesign layouts with focus on simplicity and minimalism. [#81](https://github.com/mmistakes/made-mistakes-jekyll/issues/81)

Cut down JavaScript used and replace with smaller alternatives. [#84](https://github.com/mmistakes/made-mistakes-jekyll/issues/84)

(-) [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup) => 19.7kb
(+) [Lity](http://sorgalla.com/lity/) => 2.78kB
(-) [Lazyload](https://github.com/verlok/lazyload) => 5.04kb
(+) [Lazysizes](https://github.com/aFarkas/lazysizes) => 6.35kb
(+) [Lazysizes responsive images polyfill extension](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/respimg) => 4.27kb
(+) [SVG 4 Everybody](https://github.com/jonathantneal/svg4everybody) => 1.85kb
(-) [FitVids.JS](http://fitvidsjs.com/)

40.47kb => 43.511kb

Reduce amount of "responsive" images needed to speed up resize tasks. 

### Results

Decoupling asset generation tasks from main Jekyll build so they don't trigger a rebuild each time they are updated should help with development build times. [Browsersync](https://www.browsersync.io/) can also come to the rescue injecting updated CSS/JS to circumvent the entire Jekyll build process.



## Automation
