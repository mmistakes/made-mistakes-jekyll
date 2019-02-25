---
title: "Going static part 2: static comments"
excerpt: "Integrating a static-based commenting system into Jekyll with the help of Staticman and ditching Disqus in the process."
categories: [articles]
tags: [Jekyll, web development, GitHub, open source, tutorial]
image:
  path: &image /assets/images/going-static-comments-feature.jpg
  width: 1800
  height: 700
  feature: *image
  caption: "Photo by [**Ian Schneider**](https://unsplash.com/@goian)"
twitter:
  card: summary_large_image
comments: true
comments_locked: true
toc: true
last_modified_at: 2018-03-22T10:45:51-04:00
---

Offloading comments to an external service like Disqus[^third-party-commenting] has always felt like a necessary evil to me when building Jekyll sites.

Convenient to embed a small bit of `<script>` voodoo into your pages, sure. But kiss goodbye to controlling the user experience, look and feel, data, and privacy. The alternatives haven't been all that great for the statically-minded unless you were willing to make some compromises...

[^third-party-commenting]: There are several third-party commenting services to choose from: [**Disqus**](https://disqus.com/), [**IntenseDebate**](https://intensedebate.com/), [**Livefrye**](http://web.livefyre.com/), [**Facebook**](https://developers.facebook.com/docs/plugins/comments/), and countless others. They all essentially work the same --- you embed some JavaScript on your site and comments magically appear.

## Self hosted comment systems

[**Isso**](https://posativ.org/isso/)[^self-hosted-commenting] describes itself as "commenting software similar to Disqus." You host a SQLite database and embed some JavaScript on your pages (just like Disqus and friends) and you're ready to roll. After freeing my content from Wordpress and "[going static]({% post_url /articles/2012-03-19-going-static %})" I really didn't want to manage a database again just to have comments on my site. So these solutions were out.

[^self-hosted-commenting]: Other self-hosted commenting systems include: [**Discourse**](http://www.discourse.org/), [**talkatv**](https://github.com/talkatv/talkatv), [**Juvia**](https://github.com/phusion/juvia), [**HashOver**](https://github.com/jacobwb/hashover), and [**Savas**](https://github.com/savaslabs/squabble).

## Static comments

What I really was searching for was a commenting system to compliment the rest of my Jekyll generated site.

Over the years I've come across [several solutions](https://tlvince.com/static-commenting) that seemed promising: 

- Use `mailto` links (how very retro :smirk:) to email comments for inclusion into post.
- Use PHP to do something similar.
- Leverage [GitHub's issue tracker](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html).

Jekyll plugins like [**Jekyll::StaticComments**](http://theshed.hezmatt.org/jekyll-static-comments/) and [**Jekyll AWS Comments**](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html) were pretty close to what I was looking for. A PHP `<form>` captures a comment, converts into YAML and emails it over to be placed in a prescribed location. Then with the help of a Liquid `for` loop, comments are displayed on the appropriate pages.

I can't really explain it, but something about using PHP with Jekyll felt off to me. And so I didn't pull the trigger on these solutions either.

It wasn't until I discovered Eduardo Bouças's blog post "[*Rethinking the Comment System for My Jekyll Site*](https://eduardoboucas.com/blog/2015/05/11/rethinking-the-commenting-system-for-my-jekyll-site.html)" and the launch of [**Staticman**](https://staticman.net/) 2.0 that I finally decided to ditch Disqus. Starting the process of migrating years of comment data and integrating them into the rest of my site's statically generated content. 

### Enter Staticman

On paper and in practice Staticman was just the app I was looking for to power static-based commenting on my site.

- Designed to work with [**Jekyll**](http://jekyllrb.com/) and [**GitHub Pages**](https://pages.github.com/).
- Free and open source. Run it on your own server as a Node.js app or go the free hosted route.
- Complete control over the data/content, user experience, and user interface.
- Not just for comments! Perfect for any sort of user generated content: *reviews*, *comments*, *polls*, and more.
- User submitted content can be merged in automatically or moderated.

### Getting started

Much like building my first Jekyll site, I found the process of integrating Staticman into my workflow very rewarding. It was nice to get dirty again crafting markup, styling `<form>`s, and giving comments a feel that fit the rest of my site.

Thankfully I didn't have to start from scratch as I was able to draw inspiration from the Staticman demo site --- [**Popcorn**](https://github.com/eduardoboucas/popcorn) and [Eduardo Bouças's](https://github.com/eduardoboucas/eduardoboucas.github.io) personal site. The documentation for Staticman does a good job of explaining [how to set things up](https://staticman.net/docs/) so definitely give that a read first to familiarize yourself with what the app can do.

### Building the form

I set my gaze on squaring away the "Leave a comment" submission form first. Seemed like an easy target as the styling of various [form elements](/style-guide/#guide-forms) like `<input>`, `<label>`, `<textarea>` and [buttons](/style-guide/#guide-buttons) were already done as part of my [living style guide]({% post_url /articles/2015-02-10-jekyll-style-guide %}). 

All it really needed for completion was a decision on what fields I wanted to capture, and a little bit of JavaScript for events handling and submission. Arriving at this for my [`post__comments.html`](https://github.com/mmistakes/made-mistakes-jekyll/blob/10.2.0/_includes/post__comments.html) include (`class` names and Liquid removed for brevity).

```html
{% raw %}<form id="comment-form" method="post" action="https://api.staticman.net/v1/entry/{{ site.repository }}/{{ site.staticman.branch }}">
  <fieldset>
    <label for="comment-form-message">Comment</label>
    <textarea type="text" rows="3" id="comment-form-message" name="fields[message]" tabindex="1"></textarea>
  </fieldset>
  <fieldset>
    <label for="comment-form-name">Name</label>
    <input type="text" id="comment-form-name" name="fields[name]" tabindex="2" />
  </fieldset>
  <fieldset>
    <label for="comment-form-email">Email address</label>
    <input type="email" id="comment-form-email" name="fields[email]" tabindex="3" />
  </fieldset>
  <fieldset>
    <label for="comment-form-url">Website</label>
    <input type="url" id="comment-form-url" name="fields[url]" tabindex="4"/>
  </fieldset>
  <fieldset class="hidden" style="display:none;">
    <!-- used by Staticman to generate filenames for each comment -->
    <input type="hidden" name="options[slug]" value="{{ page.slug }}">
    <!-- honey pot field used to filter out spam -->
    <label for="comment-form-location">Not used. Leave blank if you are a human.</label>
    <input type="text" id="comment-form-location" name="fields[hidden]" autocomplete="off"/>
  </fieldset>
  <fieldset>
    <button type="submit" id="comment-form-submit" tabindex="5">Submit Comment</button>
  </fieldset>
</form>{% endraw %}
<!-- End new comment form -->
```

Staticman's documentation covers this in more detail, but essentially I'm adding `fields[]` values to the `name` attributes. `message`, `name`, `email`, and `url` fields are then used to generate a .yml similar to this:

```yaml
message: "![Bill Murray](http://www.fillmurray.com/400/300)\r\n\r\n“It's hard to be an artist. It's hard to be anything. It's hard to be.”"
name: Bill Murray
email: b0caa2a71f5066b3d90711c224578c21
url: ''
hidden: ''
date: '2016-08-11T19:33:25.928Z'
```

A note on `hidden` and `date` fields you may have noticed in the sample comment above:

**`hidden`** is used as a spam deterrent in the form of a :honeybee: honeypot. The thought is a human wouldn't fill out an input they can't see, but a spam bot may. Adding `fields[hidden]` to this input and not placing it in the `allowedFields` array in our Jekyll config, instructs Staticman to reject the entry. Hopefully filtering out bots who are dumb enough to populate it with something.

**`date`** is captured when the entry is generated by Staticman. Its format can be changed from `iso8601` (default) to `timestamp-seconds` or `timestamp-milliseconds`.

#### Interactions and state

Using Popcorn's [`main.js`](https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js) as a guide I [added all the AJAX goodness](https://github.com/mmistakes/made-mistakes-jekyll/blob/30e10cce7836b38ea2d7f570573ac748fa7ba12e/_assets/javascripts/main.js#L128-L164), alert messaging, along with `disabled` and loading form states. 

To avoid disrupting the flow too much I went with inline alert messaging directly above the **submit button**.

{% figure caption:"Comment form inline alert example." %}
![Inline comment form alert example](/assets/images/mm-comment-inline-alert.png)
{% endfigure %}

And to improve the user experience upon submission the submit button's text changes to `Loading...`, becomes disabled, and an animated SVG icon inserted for bit of extra flare.

```js
$(form).addClass('disabled');
$('#comment-form-submit').html('<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Loading...');
```

{% figure caption:"Submit button loading animation." %}
![Submit button loading animation](/assets/images/mm-submit-comment-loading.gif)
{% endfigure %}

If the form is successfully submitted a message appears notifying the user that the comment has been received and is pending moderation. Since my site takes a bit to generate with Jekyll I felt it necessary to convey this to the user, hopefully avoiding duplicate submissions. 

With smaller sites hosted with GitHub Pages this becomes less of a problem, as they build much faster. Especially true if you decide to go with the auto merge option and skip [moderating comments](https://github.com/eduardoboucas/staticman#moderation-required).

{% figure caption:"The comment form in action." %}
![Form submit success animation](/assets/images/mm-submit-comment-success.gif)
{% endfigure %}

### Displaying comments

There's a bunch of Staticman settings available to you, but forget all that right now. For this next step all you really need to know is **static comment files will live in `_data/comments/<post slug>/`**. By predictably placing them here we will be able to access their contents from the following array: `{% raw %}site.data.comments[page.slug]{% endraw %}`.

With this array we'll be looping through it with [`for`][for-tag] just like you would with `site.posts` to spit out a list of all posts. But first we'll use an [`assign`][assign-tag] tag to rename the array and apply a `sort`[^sort-filter] filter on the objects. This will order them by filename, which in our case should be chronological[^chronological].

[for-tag]: https://help.shopify.com/themes/liquid/tags/iteration-tags#for
[assign-tag]: https://help.shopify.com/themes/liquid/tags/variable-tags#assign
[^sort-filter]: Sort an array. Optional arguments for hashes: 1. property name 2. nils order (first or last).
[^chronological]: eg. `comment-2014-02-10-040840.yml`, `comment-2015-03-22-204128.yml`, etc.

```liquid
{% raw %}{% assign comments = site.data.comments[page.slug] | sort %}
{% for comment in comments %}
  show a comment
{% endfor %}{% endraw %}
```

Since I'm capturing `message`, `name`, `email`, and `url` in the comment form these will be the same fields I'll want to pull from to build each comment. Using an [`assign`](https://help.shopify.com/themes/liquid/tags/variable-tags#assign) tag again we'll cleanup variable names like `comment[1].avatar` into just `avatar`. Which will then be used to [pass parameters](https://jekyllrb.com/docs/templates/#includes) into the [`comment.html`](https://github.com/mmistakes/made-mistakes-jekyll/blob/10.2.0/_includes/comment.html) include:

```liquid
{% raw %}{% assign comments = site.data.comments[page.slug] | sort %}
{% for comment in comments %}
  {% assign avatar = comment[1].avatar %}
  {% assign email = comment[1].email %}
  {% assign name = comment[1].name %}
  {% assign url = comment[1].url %}
  {% assign date = comment[1].date %}
  {% assign message = comment[1].message %}
  {% include comment.html index=forloop.index avatar=avatar email=email name=name url=url date=date message=message %}
{% endfor %}{% endraw %}
```

If done correctly the values and strings in a data file like `_data/comments/basics/comment-2014-02-10-040840.yml`

```yaml
---
id: comment-1237690364
date: '2014-02-10 04:08:40 +0000'
updated: '2014-02-10 04:08:40 +0000'
post_id: "/basics"
name: Tamara
url: ''
message: "This? This is freakin' awesome! Thanks so much for sharing your mad skills and expertise with us!"
```

Should populate `_includes/comment.html` and spit out as the following HTML:

```html
<article id="comment1" class="js-comment comment" itemprop="comment" itemscope itemtype="http://schema.org/Comment">
  <div class="comment__avatar-wrapper">
    <img class="comment__avatar" src="https://www.gravatar.com/avatar/?d=mm&amp;s=50" srcset="https://www.gravatar.com/avatar/?d=mm&amp;s=100 2x" alt="Tamara" height="50" width="50">
  </div>
  <div class="comment__content-wrapper">
    <h3 class="comment__author" itemprop="author" itemscope itemtype="http://schema.org/Person">
      <span itemprop="name">Tamara</span>
    </h3>
    <div class="comment__date">
      <a href="#comment1" itemprop="url">
      <time datetime="2014-02-09T23:08:40-05:00" itemprop="datePublished">February 09, 2014 at 11:08 PM</time>
      </a>
    </div>
    <div itemprop="text"><p>This? This is freakin’ awesome! Thanks so much for sharing your mad skills and expertise with us!</p></div>
  </div>
</article>
```

Looking like this when styled with `CSS`:

{% figure caption:"Comment example (rendered HTML)." %}
![Comment example](/assets/images/mm-comment-example.png)
{% endfigure %}

There's not much magic in the `comment.html` include --- some [structured data](https://schema.org/Comment) markup sprinkled about and a few Liquid conditionals for displaying author avatars and URLs.

{% notice %}
#### ProTip: encode email addresses as MD5 hashes

Staticman supports [transforming a string](https://github.com/eduardoboucas/staticman#transforms) into a MD5 hash. By doing this you avoid compromising a commenter's email address in what could potentially be accessible from a public GitHub repo. These hashed emails also have the benefit of being used with [**Gravatar**](https://en.gravatar.com/site/implement/hash/) to pull in avatar images.
{% endnotice %}

### Setting up Staticman

With the front-end portion of my *static-based comment system* squared away, it was time to configure Staticman. Because I went with the hosted version, it only took a few quick steps to setup.

#### Adding Staticman as a collaborator

First you need to grant Staticman access to your Jekyll repository on GitHub. You don't have to actually host the site there (I use [Media Temple](http://bit.ly/1Ugg7nN) for that), but it does need to be a [standard Jekyll site](https://jekyllrb.com/docs/structure/) with valid `_config.yml`.

Following the docs I added GitHub username `staticmanapp` as a collaborator and then pinged `https://api.staticman.net/v1/connect/{your GitHub username}/{your repository name}` as instructed to accept the invitation.

![staticmanapp as collaborator](/assets/images/staticman-collaborator.png)

#### Configuring Staticman

Staticman is configured by settings defined in your Jekyll `_config.yml` under a `staticman` object. There's a whole [list of stuff](https://github.com/eduardoboucas/staticman#jekyll-configuration) you can configure --- the important stuff being `allowedFields`, `branch`, `format`, `moderation`, and `path`.

{% notice %}
#### Branch setting

This is the branch comment files will be sent to via pull requests. If you host your site on GitHub Pages it will likely be `master` or `gh-pages`. If you're unsure check the [**Configuring a Publishing Source**](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) documentation to refresh your memory.
{% endnotice %}

There's also an undocumented `generatedFields`[^generated-fields] setting that is useful for time stamping each file Staticman creates.

[^generated-fields]: Adds a [`date` timestamp](https://github.com/eduardoboucas/staticman/issues/9) to entries in ISO8601, seconds, or milliseconds formats.

I ended up with the following settings in my `_config.yml`:

```yaml
staticman:
  allowedFields          : ['name', 'email', 'url', 'message']
  branch                 : "master"
  commitMessage          : "New comment."
  filename               : comment-{@timestamp}
  format                 : "yml"
  moderation             : true
  path                   : "_data/comments/{options.slug}"
  requiredFields         : ['name', 'email', 'message']
  transforms:
    email                : "md5"
  generatedFields:
    date:
      type               : "date"
      options:
        format           : "iso8601"
```

In case spam makes it through, I'd like another layer of "protection" to block it. Setting `moderation: true` will make Staticman send a pull request whenever a new comment entry is submitted. At this point you can examine the content inside of the PR and decide if you want to **merge** or **close** it.

When hosting with GitHub Pages, a merge will instantly force Jekyll to rebuild the site --- publishing the comment. Since I self host I have the extra step of pulling from `remote`, before building locally and [deploying via rsync]({% post_url /articles/2016-02-17-using-jekyll-2016 %}#deployment).

{% notice %}
#### ProTip: webhooks for branch auto deletion

Avoid manually cleaning up Staticman generated branches. Create a GitHub webhook instead that sends a POST request to the following payload URL `https://api.staticman.net/v1/webhook` and triggers a **`pull_request`** event automatically to delete Staticman branches on merge or close.
{% endnotice %}

### Hooking up the form

For your forms to work with Staticman they need to `POST` to:

```
https://api.staticman.net/v1/entry/{your GitHub repository}/{your repository name}/{the name of the branch}`
```

Instead of hard-coding the site repository and branch strings into this endpoint, use `site` variables defined in `_config.yml` instead. eg: {% raw %}`{{ site.repository }}` and `{{ site.staticman.branch }}`{% endraw %} respectively.

```yaml
# sample _config.yml

repository: "mmistakes/made-mistakes-jekyll"
staticman:
  branch: "master"
```

Hitting the Staticman endpoint should trigger the **success** and **error** messages in our comment `<form>`. Firing up the console in your browser of choice can also give you some more hints on what's going on if you encounter any snags.

For example if all of the required fields aren't filled out an error like this could hit the console:

```js
Object {readyState: 4, responseText: "[{"code":"MISSING_REQUIRED_FIELDS","data":["name","email","message"]}]", responseJSON: Array[1], status: 500, statusText: "error"}
```

{% notice %}
#### ProTip: redirect after POST

To set a redirect URL for your form after comment submission, simply add a hidden `input` like so: `<input type="hidden" name="options[redirect]" value="http://your-redirect-url.com">`.
{% endnotice %}

### Publishing comments

If configured correctly you should receive a pull request notification on GitHub each time a comment entry is submitted. Look the commit over (if you're moderating them) and **merge pull request** to accept or **close** to block it.

{% figure caption:"Staticman **pull request** notifications on GitHub." %}
![Staticman pull request notifications on GitHub](/assets/images/staticman-github-pull-requests.png)
{% endfigure %}

{% figure caption:"Staticman pull request merged and branch auto-deleted via webhook." %}
![Staticman pull request merge on GitHub](/assets/images/staticman-pull-request-merge.png)
{% endfigure %}

---

## Migrating Disqus comments

It was now time to deal with the 500+ Disqus comments I've accumulated. A good chunk of them had valuable content worth keeping, so I didn't exactly want to dump them all.

I came across a Rake task by *Patrick Hawks*, aptly named [**jekyll-disqus-comments**](https://github.com/pathawks/jekyll-disqus-comments) that downloads Disqus posts as YAML files via the [Disqus API](https://disqus.com/api/docs/).

With [some modifications](https://github.com/mmistakes/jekyll-disqus-comments) I was able to get it working with my site and `_posts` files.

### Installing

Copy the following files to the root of your Jekyll project folder.

- [`_rake/disqus_comments.rake`](https://github.com/mmistakes/jekyll-disqus-comments/blob/master/_rake/disqus_comments.rake)
- [`Rakefile`](https://github.com/mmistakes/jekyll-disqus-comments/blob/master/Rakefile) (Not necessary if you already have a Rakefile that loads `_rake/*`)

### Obtain a Disqus API public key

To use the plugin, you will need to obtain a `public key` from the [Disqus API](http://disqus.com/api/applications/) and add it to your `_config.yml`. You can do this by:

Step 1. [**Register new application**](https://disqus.com/api/applications/register/).

Step 2. **Setup application** using suggested configuration below:

```
Label: <Name of application> eg. Jekyll Disqus importer
Description: Convert comments into static files.
Website:
Domains: disqus.com
Default Access: Read only
```

Step 3. Add the following lines to your `_config.yml`:

```yaml
comments:
  disqus:
    short_name: YOUR-DISQUS-FORUM-SHORTNAME-HERE
    api_key:    YOUR-DISQUS-PUBLIC-KEY-HERE
```

### Run import task

Import comments from Disqus by running `rake disquscomments` from the CLI. If it completes successfully you should find a set of `.yml` files in `_data/comments/<post-slug>/` similar to this:

```
├── _data
|  └── comments
|      └── 365-days-of-drawing
|      |   └── comment-2013-08-30-162902.yml
|      |   └── comment-2013-08-30-204505.yml
|      └── basics
|          └── comment-2014-02-10-040840.yml
```

Each with YAML Front Matter data similar to this:

```yaml
---
id: comment-1237690364
date: '2014-02-10 04:08:40 +0000'
updated: '2014-02-10 04:08:40 +0000'
post_id: "/basics"
name: Tamara
url: ''
message: "This? This is freakin' awesome! Thanks so much for sharing your mad skills and expertise with us!"
```

Key names correlate with the ones defined earlier with Staticman, along with a few specific to Disqus: `id`, `updated`, and `post_id` that aren't currently used on the site.

I'm a little obsessive so I went through a ton of old comments adding [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)[^markdown-filter] backticks to improve the reading experience of code blocks. Having properly formatted code blocks in comments looks so good I couldn't pass it up. 

Pulling this off with Disqus required way [more work](https://help.disqus.com/customer/portal/articles/466253) and didn't support Markdown.

[^markdown-filter]: The `markdownify` filter is used in `_includes/comment.html` to convert Markdown-formatted strings found in `{% raw %}{{ include.message }}{% endraw %}` into HTML.

{% figure caption:"Syntax highlighted code blocks in comments." %}
![Syntax highlighted code blocks in comments](/assets/images/mm-comments-syntax-highlighted.png)
{% endfigure %}

### Troubleshooting

When running `rake disquscomments` I ran into several warnings like this:

```
Comments feed not found: <domain.com>/post-slug/
```

For posts that I knew didn't have any comments this wasn't a problem, but for those that did it was a real head scratcher. Eventually I discovered that `ident` in **`disqus_comments.rake`** wasn't matching the style of post permalinks used on my site.

I was able to determine what Disqus was expecting for id's and adjust the plugin by:

1. [Exporting all my Disqus comments](https://disqus.com/admin/discussions/export/) as XML.
2. Opening the Disqus XML file.
3. Looking at the `<link>` elements eg. `<link>https://mademistakes.com/mastering-paper/contour-drawing/</link>`

By playing around with the [following line](https://github.com/mmistakes/jekyll-disqus-comments/blob/e2561412785af8cdc7579fa6a774eaccb020ea98/_rake/disqus_comments.rake#L50) in `disqus_comments.rake` I finally sorted it out:

```ruby
# site.url + post.id + trailing slash
ident = site['url'] + post.id + '/'
```

---

## Final thoughts

Treating comments as content and integrating them into the same build process as the rest of my site has been an informative and rewarding experience. By successfully migrating over 500 comments away from Disqus I was able to:

- Style them consistently and match the rest of the site's design.
- Improve the appearance of `<code>` blocks within comments.
- Make it easier for visitors to leave a comment without having to create a Disqus account.

### SEO implications

The comments left on many of my posts often contain corrections, follow-up, and other valuable post content. From earlier tests it did seem as if search engines were able to crawl the embedded Disqus JavaScript comments and partially index them. Time will tell if I'll see any SEO *lift* now that comments are part of the HTML and marked up as structured data.

### Spam slipping through

Seems to only happen on my older posts or ones that rank well in Google and friends. As no one is really adding valuable comments to these I've added a `comments_locked` conditional to disable the comment form on specific pages.

```liquid
{% raw %}{% unless page.comments_locked == true %}
  <!-- comment form -->
{% else %}
  <p><!-- comments locked messaging --></p>
{% endunless %}{% endraw %}
```

I'll have to keep an eye on the effectiveness of this method, or possibly find a tastier honeypot to better combat spam bots.

### Comment replies

One thing I miss since leaving Disqus, are comment notifications. Sure you can setup GitHub to notify you of each Staticman pull request, which will in turn clue you in that you have a new comment. What's missing is a way to notify the commenter that there's been a reply to their comment.

Less likely a commenter will return to the page to see if a reply was made without the nudge of a notification. Wordpress and friends has the whole "**subscribe to comments**" feature which could apply here I suppose.

{% notice %}
#### Update: replies, notifications, and more

Staticman has been updated to support replies, email notifications, and [reCAPTCHA](https://www.google.com/recaptcha/intro/) (helps reduce spam comments). To learn more about how I added each of these to this site, read my post [Improving Static Comments with Jekyll & Staticman]({% post_url /articles/2016-12-08-improving-jekyll-static-comments %}).
{% endnotice %}
