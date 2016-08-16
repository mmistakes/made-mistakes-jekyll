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

## Self-Hosted Commenting

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

#### Building the Form

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

Using Popcorn's [`main.js`](https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js) as a guide I [added all the AJAX goodness](https://github.com/mmistakes/made-mistakes-jekyll/blob/30e10cce7836b38ea2d7f570573ac748fa7ba12e/_assets/javascripts/main.js#L128-L164), alert messaging, and form states (`disabled` and loading). 


To avoid disrupting the flow too much I went with inline alert messaging that appears directly above the **submit button**.

![inline form alert example](#)

And to improve the user experience upon submission the submit button's text changes to `Loading...`, becomes disabled, and an animated SVG icon inserted.

```js
$(form).addClass('disabled');
$('#comment-form-submit').html('<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Loading...');
```

![submit button loading animation](#)

If the form is successfully submitted a message appears notifying the user that the comment has been received and is pending moderation. Since my site takes a bit to generate with Jekyll I felt it necessary to convey this to the user to avoid duplicate submissions. With small GitHub Pages hosted sites this becomes less of a problem, especially if you decide to merge comments in without the [moderation step](https://github.com/eduardoboucas/staticman#moderation-required).

![form submit success animation](#)

#### Displaying Comments

#### Setting-up Staticman

With the front-end portion of "comments" squared away it was time to configure Staticman. Because I went with the free hosted version it was painless and quick.

##### Adding Staticman as a Collaborator

To use Staticman you need to give it access to your Jekyll repository on GitHub. You don't have to actually host the site there (I use Media Temple for that), but it does need to be a standard Jekyll site with a valid `_config.yml`.

Following the docs I added GitHub username `staticmanapp` as a collaborator and then pinged `https://api.staticman.net/v1/connect/{your GitHub username}/{your repository name}` as instructed to accept the invitation.

![staticmanapp as collaborator](#)

##### Configuring Staticman

Staticman reads certain settings that are defined in your Jekyll `_config.yml` under the `staticman` object. There's a whole [list of stuff](https://github.com/eduardoboucas/staticman#jekyll-configuration) you can configure, the important stuff being `allowedFields`, `branch`, `format`, `moderation`, and `path`.

{% capture branch_setting %}
#### Branch setting

This is the branch comment files will be sent to via pull requests. If you host your site on GitHub Pages it will likely be `master` unless your repo is setup as a project --- use `gh-pages` in that case.
{% endcapture %}

<div class="notice--info">
  {{ branch_setting | markdownify }}
</div>

There's also an undocumented `generatedFields`[^generated-fields] setting that is useful for time stamping each file Staticman creates.

[^generated-fields]: Adds a [`date` timestamp](https://github.com/eduardoboucas/staticman/issues/9) to data files in ISO8601, seconds, of milliseconds formats.

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

Just in case spam made it through I wanted another layer of oversight. Setting `moderation: true` will cause Staticman to send a pull request whenever a new comment is submitted. At this point you can examine the comment content inside of the PR and decide if you want to merge or close.

If hosting with GitHub Pages a merge will instantly force Jekyll to rebuild your site and post the comment. In my case I have to do a pull from remote before building locally and deploying via rsync.

{% capture webhooks %}
#### ProTip: Webhooks for Auto Deletion

Create a GitHub webhook that sends a POST request to the following payload URL `https://api.staticman.net/v1/`webhook and triggers a "Pull request" event to delete Staticman branches on merge. If you don't you'll have to manually remove these branches as they aren't deleted on close or merge.
{% endcapture %}

<div class="notice--info">
  {{ webhooks | markdownify }}
</div>

##### Hook up the form

For your forms to work with Staticman they need to `POST` to 

```
https://api.staticman.net/v1/entry/{your GitHub repository}/{your repository name}/{the name of the branch}`
```

Instead of hard-coding the site repository and branch into the Staticman endpoint use `site` variables defined in `_config.yml` instead. eg: {% raw %}`{{ site.repository }}` and `{{ site.staticman.branch }}`{% endraw %} respectively.
