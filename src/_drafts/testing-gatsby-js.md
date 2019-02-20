---
title: "Testing Gatsby.js"
excerpt:
image:
  cover: false
  path: &image
  feature: *image
categories: [articles]
tags: [Jekyll, Wordpress, web development, GitHub, Netlify, open source]
comments: true
last_modified_at:
---

I find myself at a crossroads. Eight years ago I migrated way from a [**Wordpress**](https://wordpress.org/) (PHP + MySQL database) backend to a statically generated [**Jekyll**](https://jekyllrb.com/) site. Now I find myself considering migrating back to Wordpress, though not in the way you might expect. Wait what?

One of the main motivators for moving away from a database was the appeal of a single Git repository of flat Markdown files. That coupled with the simplicity of [**Liquid's** templating language](https://shopify.github.io/liquid/) meant I'd have a deeper understanding of how to build pages --- versus struggling with "[The Loop(https://codex.wordpress.org/The_Loop)]" and other bloat I didn't need at the time.

To do this it meant giving up on the benefits of having a CMS back your site. Markdown files are great for text heavy posts and pages, but when you want to drop in galleries or several images it becomes a chore. And don't get me started on responsive images...

*[CMS]: Content management system

## Enter Gatsby.js

If you follow the static-site generator scene at all, it's hard not to take notice of **Gatsby**. Since releasing v1.0, this project has been on fire --- quickly amassing a huge amount of contributors and stargazers.

As someone who struggles with JavaScript, Gatsby wasn't a tool I considered at all. I know React components are a big deal right now, but that world is something I've tried to avoid as HTML and CSS is my jam. That all changed after reading how Gatsby's architecture builds [performant websites by default](https://www.gatsbyjs.com/how-it-works/performance/) and [queries data from anywhere](https://www.gatsbyjs.com/how-it-works/data-from-anywhere/) with GraphQL.

### Gatsby first impressions

Getting started with Gatsby was painless compared to the hell that `gem install jekyll` can sometimes be. And with a variety of [starters](https://www.gatsbyjs.org/docs/gatsby-starters/) to get you ummm "started", I was able to quickly test out Gatsby's workflow.

Being able to store post assets alongside (or relative to) source `.md` files is great. Coming from Jekyll-land where you need to write paths relative to `_site/`, it's nice being able to preview Markdown locally and on services like GitHub.

![VS Code Markdown preview screenshot](/assets/images/vs-code-markdown-preview.jpg)

Also related to images is Gatsby's ability to size, optimize, and write HTML to display them responsively. By installing the [gatsby-remark-images](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images) package all images in your Markdown files are processed automatically and can even be lazy loaded using the "blur up" technique popularized by **Medium**.

This is something I've looked for in Jekyll plugins, but none work as seamless as Gatsby's solution. Most require you to add custom Liquid tags in your content, which sort of defeats the purpose. And even if you can get around that, the image processing and resize module[^sharp] Gatsby uses beats the pants off of anything available in Ruby in terms of build times.

[^sharp]: Sharp is a high performance Node.js image processing and fast resize module for JPEG, PNG, WebP and TIFF images. Uses the libvips library. <http://sharp.pixelplumbing.com/>

### Non-JS developers beware

As stated earlier, JavaScript is not my forte. I've never built a React component, written JSX, worked with CSS-in-JS, or any of the other things modern JavaScript frameworks tooling expect you to know. Coming from an experience using Jekyll with strong conventions on how to setup a site, there was a bit of culture shock with Gatsby.

With Jekyll there were usually prescribed and vetted ways of doing something, like setting permalinks. With Gatsby, there's a million different ways to do that because well it's JavaScript. And everyone has they preferred way of doing it.

Great to have all that flexibility, but for newbies it's a bit daunting to pickup. Especially when you deviate (or outgrow) the starters Gatsby and the community provide. Something I quickly found out when trying to migrate my 1,000+ page Jekyll site to Gatsby...

## Migration

So about that migration. Before looking at a headless-CMS to back a Gatsby powered site I figured migrating a Jekyll one made of flat Markdown files would be more sane.

### Build speed

- Building thousands of posts
- Resizing and optimizing thousands of images

### Markdown support

How well does Markdown (specifically the Kramdown variant) convert via [remark](https://github.com/remarkjs/remark).

- [Footnotes](https://kramdown.gettalong.org/converter/html.html#footnotes) ([gatsby-remark-numbered-footnotes](https://github.com/jlengstorf/gatsby-remark-numbered-footnotes))
- Reference links in footnotes
- [Auto-table of contents](https://kramdown.gettalong.org/converter/html.html#toc), gatsby-remark via `tableOfContents` in graphQL
- [Abbreviations](https://kramdown.gettalong.org/syntax.html#abbreviations) ([gatsby-remark-abbr](https://github.com/Calyhre/gatsby-remark-abbr))
- HTML, eg. `figure` and `figcaption` elements ([remark-captions](https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-captions)?)
- [Apply inline classes/ids](https://kramdown.gettalong.org/syntax.html#inline-attribute-lists)

### Other

- Match permalink structure
- Pagination (posts and taxonomy archives) ([gatsby-paginate](https://github.com/pixelstew/gatsby-paginate))
- Archive pages for categories/tags
- SEO/OpenGraph tags
- Sitemap ([gastby-plugin-sitemap](https://www.npmjs.com/package/gatsby-plugin-sitemap))
- RSS/Atom feeds ([gatsby-plugin-feed](https://www.npmjs.com/package/gatsby-plugin-feed))
- Static based comments - pull in YAML data files from [Staticman](http://staticman.net/)
- BigFoot.js or equivalent for cleaner footnote presentation
- Custom Jekyll tags (e.g. `{% raw %}{% figure %}{% endraw %}`, `{% raw %}{% notice %}{% endraw %}`, etc.) [remark-shortcodes](https://github.com/djm/remark-shortcodes)?
- Image gallery components added in Markdown files, leveraging [gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image)?
