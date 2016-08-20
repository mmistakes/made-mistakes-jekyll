---
layout: article
title: "Going Static: Episode II --- Attack of the Comments"
excerpt: ""
categories: articles
tags: [Jekyll, web development, GitHub, open source]
image:
  feature:
  teaser:
comments: true
featured:
modified:
---

Offloading comments to an external service like Disqus[^third-party-commenting] has never set well with me. You basically give control of the data, privacy, user experience, and look and feel when you embed those convenient bits of `<script>` voodoo into your page(s).

[^third-party-commenting]: There are several third-party commenting services to choose from: [**Disqus**](https://disqus.com/), [**IntenseDebate**](https://intensedebate.com/), [**Livefrye**](http://web.livefyre.com/), [**Facebook**](https://developers.facebook.com/docs/plugins/comments/), and countless others. They all essentially work the same. They host the comment data and front-end and you add a small `<script>` embed to your site to serve them up.

The alternatives haven't been all that great unless you wanted to make some compromises.

{% include toc.html %}

## Self-Hosted Comment Systems

You could self-host with something like [**Isso**](https://posativ.org/isso/)[^self-hosted-commenting], that closely mimics what you'd get with **Disqus** --- but you control the data. After freeing my content and "[going static]({{ site.url }}{% post_url 2012-03-19-going-static %})" I really didn't want to manage a SQL database just to have comments on my site.

[^self-hosted-commenting]: Other self-hosted commenting systems include: [**Discourse**](http://www.discourse.org/), [**talkatv**](https://github.com/talkatv/talkatv), [**Juvia**](https://github.com/phusion/juvia), [**HashOver**](https://github.com/jacobwb/hashover), and [**Savas**](https://github.com/savaslabs/squabble).

## Static Comments

What I really wanted was a static file commenting system. Flat comment files that could live in harmony with the rest of my site's content.

In my search I came across [several solutions](https://tlvince.com/static-commenting). Emailed comments (how very retro :smirk:), PHP scripts, and using [GitHub's issue tracker](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html) (pretty cool but limits your audience since you need an account to comment).

Jekyll plugins like [**Jekyll::StaticComments**](http://theshed.hezmatt.org/jekyll-static-comments/) and [**Jekyll AWS Comments**](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html) were pretty close to what I was looking for. A PHP `<form>` captures a comment, converts into YAML and emails it over to be placed in a prescribed location. Then with the help of a Liquid `for` loop comments are displayed on the appropriate pages.

It wasn't until I discovered Eduardo Bouças's blog post "[*Rethinking the Comment System for My Jekyll Site*](https://eduardoboucas.com/blog/2015/05/11/rethinking-the-commenting-system-for-my-jekyll-site.html)" and [**Staticman**](https://staticman.net/) that I finally decided to ditch Disqus. 

### Enter Staticman

On paper and in practice Staticman was just the app I was looking for to enable static-based commenting.

- Designed to work with [**Jekyll**](http://jekyllrb.com/) and [**GitHub Pages**](https://pages.github.com/).
- Free and open source. Run it on your own server as a Node.js app or go the free hosted route.
- Complete control over the data/content, user experience, and user interface.
- Not just for comments! Perfect for any sort of user generated content: reviews, comments, polls, and more.
- User submitted content can be moderated and merged in automatically.

### Getting Started

Much like building my first Jekyll site, I found the process of integrating Staticman into my workflow rewarding. Starting from a relatively blank canvas --- marking-up/styling comments and `<form>`s as I saw fit was very rewarding.

Thankfully I didn't have to start from scratch as I was able to draw inspiration from the Staticman demo site, [**Popcorn**](https://github.com/eduardoboucas/popcorn) and [Eduardo Bouças's](https://github.com/eduardoboucas/eduardoboucas.github.io) personal site. The documentation for Staticman does a good job of explaining [how to set things up](https://staticman.net/get-started) so definitely give that a read first.

### Building the Form

I set my gaze on squaring away the "Leave a comment" submission form first. Seemed like an easy target as the styling of various [form elements]({{ site.url }}/style-guide/#guide-forms) like `<input>`, `<label>`, `<textarea>` and [buttons]({{ site.url }}/style-guide/#guide-buttons) were already done as part of my [living style guide]({{ site.url }}{% post_url 2015-02-10-jekyll-style-guide %}). All it really needed was a decision on what fields I wanted to capture and a little bit of JavaScript for events handling and form submission.

At its most simplest (`class` names and extra Liquid and markup removed for brevity) I arrived at this for my [`post__comments.html`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_includes/post__comments.html) include.

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
  <fieldset class="hidden">
    <!-- used by Staticman to generate filenames for each comment -->
    <input type="hidden" name="options[slug]" value="{{ page.slug }}">
    <!-- honey pot field used to filter out spam -->
    <input type="hidden" name="fields[hidden]"/>
  </fieldset>
  <fieldset>
    <button type="submit" id="comment-form-submit" tabindex="5">Submit Comment</button>
  </fieldset>
</form>{% endraw %}
<!-- End new comment form -->
```

Staticman's documentation covers this in more detail, but essentially we're adding `fields[]` values the `name` attributes. Fields used above --- `message`, `name`, `email`, and `url` will generate a .yml like this:

```yaml
message: "![Bill Murray](http://www.fillmurray.com/400/300)\r\n\r\n“It's hard to be an artist. It's hard to be anything. It's hard to be.”"
name: Bill Murray
email: b0caa2a71f5066b3d90711c224578c21
url: ''
hidden: ''
date: '2016-08-11T19:33:25.928Z'
```

`hidden` is used as a spam deterant in the form of a :honeybee: honeypot. Because `fields[hidden]` was placed on a hidden element, the thought is a human wouldn't fill it out, but a spam bot may. Because we didn't include it with the other `allowedFields` in our config Staticman should reject the entry.

`date` is captured when the entry is generated. It's format can be changed from `iso8601` (default), `timestamp-seconds`, or `timestamp-milliseconds`.

#### Interactions and State

Using Popcorn's [`main.js`](https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js) as a guide I [added all the AJAX goodness](https://github.com/mmistakes/made-mistakes-jekyll/blob/30e10cce7836b38ea2d7f570573ac748fa7ba12e/_assets/javascripts/main.js#L128-L164), alert messaging, and form states: `disabled` and loading. 

To avoid disrupting the flow too much I went with inline alert messaging directly above the **submit button**.

<figure>
  <img src="{{ site.url }}/images/mm-comment-inline-alert.png" alt="inline comment form alert example">
  <figcaption>Comment form inline alert example.</figcaption>
</figure>

And to improve the user experience upon submission the submit button's text changes to `Loading...`, becomes disabled, and an animated SVG icon inserted.

```js
$(form).addClass('disabled');
$('#comment-form-submit').html('<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Loading...');
```

![submit button loading animation]({{ site.url }}/images/mm-submit-comment-loading.gif)

If the form is successfully submitted a message appears notifying the user that the comment has been received and is pending moderation. Since my site takes a bit to generate with Jekyll I felt it necessary to convey this to the user to avoid duplicate submissions. With small GitHub Pages hosted sites this becomes less of a problem, especially if you decide to merge comments in without the [moderation step](https://github.com/eduardoboucas/staticman#moderation-required).

<figure>
  <img src="{{ site.url }}/images/mm-submit-comment-success.gif" alt="form submit success animation">
  <figcaption>The final form in action.</figcaption>
</figure>

### Displaying Comments

In a bit I'm going to go over how I configured Staticman in `_config.yml`, but for now all you really need to know is comment datafiles will live in `_data/comments/<post slug>/`. By predictably placing them here we will be to access their contents from the following array: `{% raw %}site.data.comments[page.slug]{% endraw %}`.

Taking it a step further we can loop through it just like you would with `site.posts`:

```liquid
{% raw %}{% assign comments = site.data.comments[page.slug] | sort %}
{% for comment in comments %}
  show a comment
{% endfor %}{% endraw %}
```

Since I'm capturing `message`, `name`, `email`, and `url` in the comment form this will be the same fields I'll want to pull from for each comment. Through the use of [`{% raw %}{% assign %}{% endraw %}`](https://help.shopify.com/themes/liquid/tags/variable-tags#assign) we can cleanup variable names. Which will then be used to [pass parameters](https://jekyllrb.com/docs/templates/#includes) in the [`comment.html`](https://github.com/mmistakes/made-mistakes-jekyll/blob/master/_includes/comment.html) include:

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

If done correctly `_data/comments/basics/comment-2014-02-10-040840.yml`

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

Should spit out as the following HTML on the `/basics/index.html` post:

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

<figure>
  <img src="{{ site.url }}/images/mm-comment-example.png" alt="comment example">
  <figcaption>Comment example (rendered HTML).</figcaption>
</figure>

There's not much magic in the `comment.html` include --- some [structured data](https://schema.org/Comment) markup sprinkled about and a few Liquid conditionals for author avatars and URLs.

{% capture md5_protip %}
#### ProTip: Encode Email Addresses as MD5 Hashes

Staticman supports [transforming a string](https://github.com/eduardoboucas/staticman#transforms) into a MD5 hash. By doing this you avoid compromising a commenter's email address in datafiles. These hashed emails also have the benefit of being used with [**Gravatar**](https://en.gravatar.com/site/implement/hash/) to pull in avatar images.
{% endcapture %}

<div class="notice--info">
  {{ md5_protip | markdownify }}
</div>

### Setting Up Staticman

With the front-end portion of "comments" squared away it was time to configure Staticman. Because I went with the free hosted version it was painless and quick.

#### Adding Staticman as a Collaborator

To use Staticman you need to give it access to your Jekyll repository on GitHub. You don't have to actually host the site there (I use Media Temple for that), but it does need to be a standard Jekyll site with a valid `_config.yml`.

Following the docs I added GitHub username `staticmanapp` as a collaborator and then pinged `https://api.staticman.net/v1/connect/{your GitHub username}/{your repository name}` as instructed to accept the invitation.

![staticmanapp as collaborator](#)

#### Configuring Staticman

Staticman reads certain settings that are defined in your Jekyll `_config.yml` under the `staticman` object. There's a whole [list of stuff](https://github.com/eduardoboucas/staticman#jekyll-configuration) you can configure, the important stuff being `allowedFields`, `branch`, `format`, `moderation`, and `path`.

{% capture branch_setting %}
#### Branch setting

This is the branch comment files will be sent to via pull requests. If you host your site on GitHub Pages it will likely be `master` unless your repo is setup as a project --- use `gh-pages` in that case.
{% endcapture %}

<div class="notice--info">
  {{ branch_setting | markdownify }}
</div>

There's also an undocumented `generatedFields`[^generated-fields] setting that is useful for time stamping each file Staticman creates.

[^generated-fields]: Adds a [`date` timestamp](https://github.com/eduardoboucas/staticman/issues/9) to entries in ISO8601, seconds, or milliseconds formats.

I ended up with the following settings that I added to `_config.yml`:

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
        format           : "iso8601" # "iso8601" (default), "timestamp-seconds", "timestamp-milliseconds"
```

In case spam made it through, I wanted another layer of oversight to block it. Setting `moderation: true` will cause Staticman to send a pull request whenever a new comment is submitted. At this point you can examine the comment content inside of the PR and decide if you want to merge or close.

If hosting with GitHub Pages a merge will instantly force Jekyll to rebuild your site and post the comment. In my case I have to do a pull from `remote` before building locally and deploying via rsync.

{% capture webhooks %}
#### ProTip: Webhooks for Branch Auto Deletion

Create a GitHub webhook that sends a POST request to the following payload URL `https://api.staticman.net/v1/`webhook and triggers a "Pull request" event to delete Staticman branches on merge. If you don't you'll have to manually remove these branches as they aren't deleted on close or merge.
{% endcapture %}

<div class="notice--info">
  {{ webhooks | markdownify }}
</div>

### Hooking Up the Form

For your forms to work with Staticman they need to `POST` to:

```
https://api.staticman.net/v1/entry/{your GitHub repository}/{your repository name}/{the name of the branch}`
```

Instead of hard-coding the site repository and branch into this endpoint, use `site` variables defined in `_config.yml` instead. eg: {% raw %}`{{ site.repository }}` and `{{ site.staticman.branch }}`{% endraw %} respectively.

```yaml
# sample _config.yml

repository: "mmistakes/made-mistakes-jekyll"
staticman:
  branch: "master"
```

Hitting the Staticman endpoint should trigger the success and error messages. Firing up the console in your browser of choice can also give you some more detail on what's going on if you hit any snags.

For example if all of the required fields aren't filled out an error like this could hit the console:

```js
Object {readyState: 4, responseText: "[{"code":"MISSING_REQUIRED_FIELDS","data":["name","email","message"]}]", responseJSON: Array[1], status: 500, statusText: "error"}
```

{% capture form_redirect %}
#### ProTip: Redirect after POST

To set a redirect URL for your form after comment submission, simply add a hidden `input` like so: `<input type="hidden" name="options[redirect]" value="http://your-redirect-url.com">`.
{% endcapture %}

<div class="notice--info">
  {{ form_redirect | markdownify }}
</div>

### Publishing Comments

If configured correctly you should receive a pull request notification on GitHub anytime a comment is submitted. Look the commit over (if you're moderating them) and merge to accept or close to block.

<figure>
  <img src="{{ site.url }}/images/staticman-github-pull-requests.png" alt="Staticman pull request notifications on GitHub">
  <figcaption>Staticman <strong>pull request</strong> notifications on GitHub.</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/images/staticman-pull-request-merge.png" alt="Staticman pull request merge on GitHub">
  <figcaption>Staticman pull request merged on GitHub.</figcaption>
</figure>

---

## Migrating Disqus Comments

It was now time to deal with the 500+ Disqus comments I've accumulated over the years. A good chunk of them had valuable content so I didn't exactly want to dump them all and start fresh.

I came across a Rake task by Patrick Hawks, aptly named [**jekyll-disqus-comments**](https://github.com/pathawks/jekyll-disqus-comments) that downloads Disqus posts as YAML files via their API.

With [some modifications](https://github.com/mmistakes/jekyll-disqus-comments) I was able to get it working with my Jekyll site.

### Installing

Copy the following files to the root of your Jekyll project folder.

- [`_rake/disqus_comments.rake`](https://github.com/mmistakes/jekyll-disqus-comments/blob/master/_rake/disqus_comments.rake)
- [`Rakefile`](https://github.com/mmistakes/jekyll-disqus-comments/blob/master/Rakefile) (Not necessary if you already have a Rakefile that loads `_rake/*`)

### Obtain Disqus API Public Key

To use the plugin, you will need to obtain a `public key` from the [Disqus API](http://disqus.com/api/applications/) and add it to your `_config.yml`.

1. [Register new application](https://disqus.com/api/applications/register/).
2. Setup application. Suggested configuration below:

```
Label: <Name of application> eg. Jekyll Disqus importer
Description: Convert comments into static files.
Website:
Domains: disqus.com
Default Access: Read only
```

Add the following lines to your `_config.yml`

```yaml
comments:
  disqus:
    short_name: YOUR-DISQUS-FORUM-SHORTNAME-HERE
    api_key:    YOUR-DISQUS-PUBLIC-KEY-HERE
```

### Importing Task

Import comments from Disqus by running `rake disquscomments`. If it completes successfully you should find a set of `.yml` files in `_data/comments/<post-slug>` similar to this:

```
├── _data
|  └── comments
|      └── 365-days-of-drawing
|      |   └── comment-2013-08-30-162902.yml
|      |   └── comment-2013-08-30-204505.yml
|      └── basics
|          └── comment-2014-02-10-040840.yml
```

With YAML Front Matter data like this:

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

Key names correlate with the ones Staticman uses with a few extra Disqus ones like `id`, `updated`, and `post_id` that aren't currently used on the site.

Because I'm a little crazy I went through a ton of old comments adding Markdown to improve the reading experience. Having syntax highlighted code blocks in comments looks so good, something that took a lot more work to [pull off with Disqus](https://help.disqus.com/customer/portal/articles/466253).

### Troubleshooting

When running `rake disquscomments` I ran into warnings like:

```
Comments feed not found: <domain.com>/post-slug/
```

For posts that I knew didn't have any comments this wasn't a problem, but for those that did it was a real head scratcher. Eventually I discovered that `ident` wasn't matching the style of post permalinks used on my site.

I was able to verify what Disqus was expecting as id's by:

1. [Exporting all my Disqus comments](https://disqus.com/admin/discussions/export/) as a XML file.
2. Opening said XML file.
3. Looking at the `<link>` elements eg. `<link>https://mademistakes.com/mastering-paper/contour-drawing/</link>`

By playing around with the [following line](https://github.com/mmistakes/jekyll-disqus-comments/blob/e2561412785af8cdc7579fa6a774eaccb020ea98/_rake/disqus_comments.rake#L50) in `disqus_comments.rake` I finally sorted it out:

```ruby
# site.url + post.id + trailing slash
ident = site['url'] + post.id + '/'
```

---

## Final Thoughts

Treating comments as content and closely integrating them with the rest of my site has been an informative and rewarding exercise. By successfully migrating over 500 comments away from Disqus I was able style them cohesively and match the rest of the site's design. Improve `<code>` blocks within comments. And hopefully make it easier for visitors to leave feedback without having to create a Disqus account first.

### SEO Implications

The comment's section on many of posts often contain valuable content and replies to questions. Doing some limited tests in the past it did seem as if search engine crawlers were partially indexing these JavaScript based comments. Time will tell if I'll see any SEO *lift* from comments being marked up with structured data and in the actual page HTML.

### Spam Slipping Through

Seems to only happen on my older posts or ones that rank well in Google and friends. As no one is really adding valuable comments to these I've added `comments_locked` conditional that I can remove the comment form from specific pages.

```liquid
{% raw %}{% unless page.comments_locked == true %}
  <!-- comment form -->
{% else %}
  <p><!-- comments locked messaging --></p>
{% endunless %}{% endraw %}
```

### Comment Replies

One negative from leaving Disqus are comment reply notifications. Sure you can setup GitHub to notify you of each Staticman pull request, which will in turn clue you in that you have a new comment. But what's missing is the notification to the commenter that they've received a reply to their comment.

No email notifications when replying to comments makes for less of a discussion. Less likely a commenter will return to the page to see if a reply was made. Anyone out there also using a static commenting approach and found a slick way to handle this? Let me know below.
