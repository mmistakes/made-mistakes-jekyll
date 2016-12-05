---
layout: page
category: articles
read_time: true
breadcrumbs:
  - label: "Blog Articles"
    url: /articles/

title: "Improving Static Comments with Jekyll & Staticman"
excerpt:
image:
  path:
  teaser:
  cover:
tags: [web development, GitHub, Jekyll]
last_modified_at:
---

During the time I first [integrated a static-based commenting system]({% post_url /articles/2016-08-21-jekyll-static-comments %}) with Jekyll, [**Staticman**](https://staticman.net/) has added support for [nesting comments](https://github.com/eduardoboucas/staticman/issues/35) and [email notifications](https://github.com/eduardoboucas/staticman/issues/42). 

Using an example provided by [Eduardo Bouças](https://eduardoboucas.com/) as a blueprint, here's how I leveled-up the commenting experience on **Made Mistakes**.

{% include toc.html %}

## Upgrade to Staticman v2

To take advantage of the new features Staticman provides, it is necessary to move configurations out of Jekyll's `_config.yml` and into a `staticman.yml` file. Thankfully all of the parameter names have remained the same so it's just a matter of copying and pasting and renaming `staticman` to `comments`.

### Staticman v2 staticman.yml

```yaml
comments:
  allowedFields     : ['name', 'email', 'url', 'message']
  branch            : "master"
  commitMessage     : "New comment."
  filename          : "comment-{@timestamp}"
  format            : "yaml"
  moderation        : true
  path              : "src/_data/comments/{options.slug}"
  requiredFields    : ['name', 'email', 'message']
  transforms:
    email           : md5
  generatedFields:
    date:
      type          : "date"
      options:
        format      : "iso8601"
```

{% capture staticman_config %}
#### ProTip: Additional Configuration Parameters

It's worth reviewing the [full list of parameters](https://staticman.net/docs/configuration) available and [`staticman.sample.yml`](https://github.com/eduardoboucas/staticman/blob/master/staticman.sample.yml) for setup ideas.

For example you can configure multiple properties (comments, reviews, and other types of user-generated content), commit message text, pull request body text, and notifications.
{% endcapture %}

<div class="notice--info">
  {{ staticman_config | markdownify }}
</div>

### Staticman as a Collaborator

Because I previously granted Staticman `v1` collaboration rights to my GitHub repository I went ahead and removed `staticmanapp` and then [re-added]({% post_url /articles/2016-08-21-jekyll-static-comments %}#setting-up-staticman).

Then I pinged `https://api.staticman.net/v2/connect/{your GitHub username}/{your repository name}` as instructed in the docs to accept the invitation.

![Remove staticmanapp as a collaborator]({{ site.url }}/assets/images/staticman-remove-collaborator.png)

{% capture staticman_collab %}
#### Remove/Add Voodoo?

I'm not entirely sure if this step is even needed. I encountered some errors when I tried to submit a test comment and this solved the problem. It's possible I had something else configured wrong and that was the real issue.

Please chime in if you had to do this step when upgrading from `v1` to `v2`.
{% endcapture %}

<div class="notice--warning">
  {{ staticman_collab | markdownify }}
</div>

### Update POST Endpoint in Comment Form

The comment form needs a small update to `POST` to the correct endpoint. Changing `v1` to `v2` in **_includes/page__comments.html** and appending `/comments`[^property] to the end did the trick for me.

[^property]: Property name (optional) should match the name used in your `staticman.yml` file. For example `comments` would have you append `/comments` to `https://api.staticman.net/v2/entry/{GITHUB USERNAME}/{GITHUB REPOSITORY}/{BRANCH}`.

## Add Support for Nested Comments

This was the biggest pain point for me to get working. Numerous Liquid errors, trying to wrap my head around `for` loops inside of `for` loops inside of `for` loops, broken array filters, and more, all took me a bit to sort out.

### Add Parent Identifier

To properly nest replies we need a way of determining their lineage. Staticman `v2` includes a new field named `options[parent]`[^parent-field] that can be used to to establish this relationship with a unique identifier.

[^parent-field]: Staticman names this field `_parent` in entries were it is assigned.

In my comment form `include` I added the following as a hidden field (similar to `options[slug]`):

```html
<input type="hidden" id="comment-parent" name="options[parent]" value="">
```

The `value` is purposely left blank to indicate a comment is a parent (the default). For a reply I'll use JavaScript to assign a `value` that matches its parent before the form is submitted to Staticman.

### Update Liquid Loops

To properly display nested comments, I first needed a way of showing only "parent" comments. This seemed like a perfect case for Jekyll's `where_exp` filter:

{% capture where_expression %}
#### Where Expression Jekyll Filter

Select all the objects in an array where the expression is true. Jekyll v3.2.0 & later. Example: {% raw %}`{{ site.members | where_exp:"item","item.graduation_year == 2014" }}`{% endraw %}
{% endcapture %}

<div class="notice--warning">
  {{ where_expression | markdownify }}
</div>

Since only comment replies should have the `_parent` field populated, we can test against it with something like `where_exp:"item","item._parent == nil"`. This leaves us with an array filled with just parent comments, which we can loop through.

One problem. The following didn't work:

```liquid
{% raw %}{% assign comments = site.data.comments[page.slug] | where_exp:"item","item._parent == nil" %}
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

Just a bunch of HTML markup minus all the important comment data. It wasn't until I added the `inspect` filter my arrays to get a closer look at what was going on.

```liquid
{% raw %}{{ site.data.comments[page.slug] | inspect }}{% endraw %}
```

Here's a sample of what the array looked like before I attempted to filter it with `where_exp`.

```yaml
{
  "comment-1471818805944" => {
    "message" => "This is the comment message.",
    "name"    => "First LastName",
    "email"   => "md5-hashed-email@email.com",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-21T22:33:25.272Z"
  },
  "comment-1471904599908" => {
    "message" => "This is another comment message.",
    "name"    => "First LastName",
    "email"   => "md5-hashed-email@email.com",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-22T21:42:48.075Z"
  }
}
```

And here is a sample after filtering out comment replies using `where_exp`.

```json
[
  {
    "message" => "This is the comment message.",
    "name"    => "First LastName",
    "email"   => "md5-hashed-email@email.com",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-21T22:33:25.272Z"
  }, 
  {
    "message" => "This is another comment message.",
    "name"    => "First LastName",
    "email"   => "md5-hashed-email@email.com",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-22T21:42:48.075Z"
  }
]
```

{% capture sort_array %}
#### Note: Sort and Where Filters Don't Mix

I had all kinds of errors and strange behavior due to mixing a `sort` filter with `where` and `where_exp`. I determined it was unnecessary as the items were being sorted alphabetically based on their filenames, and removed the filter.

Your mileage may vary depending on your `_data` filenames.
{% endcapture %}

<div class="notice--info">
  {{ sort_array | markdownify }}
</div>

As you can see, using the `where_exp` filter flattens the array slightly --- removing `comment-1471818805944` items. Which in turn was causing each `assign` to return blank values and empty comments.

```liquid
{% raw %}{% assign avatar  = comment[1].avatar %}
{% assign email   = comment[1].email %}
{% assign name    = comment[1].name %}
{% assign url     = comment[1].url %}
{% assign date    = comment[1].date %}
{% assign message = comment[1].message %}{% endraw %}
```

Once discovered, the fix was simple --- remove the item position from `comment[1]`.

```liquid
{% raw %}{% assign avatar  = comment.avatar %}
{% assign email   = comment.email %}
{% assign name    = comment.name %}
{% assign url     = comment.url %}
{% assign date    = comment.date %}
{% assign message = comment.message %}{% endraw %}
```

<figure>
  <img src="{{ site.url }}/assets/images/staticman-parent-comments-only.png" alt="Parent comments only">
  <figcaption>Success, there be parent comments Captain!</figcaption>
</figure>

Next up, displaying comment replies nested in the appropriate threads. Here is when the real headaches began...

I determined the easiest way of matching up child comments with their parents would be to number them sequentially. Liquid provides a way of doing this in a loop with `forloop.index`.

So what I did was add another `assign` to the loop which I could then pass as a variable into `_includes/comments.html`.

```liquid
{% raw %}{% assign index = forloop.index %}{% endraw %}
```

Using the same approach from above (filtering an array with `where_exp`) I started by copying the `for` loop in **page__comments.html** and adding it to the bottom of **comment.html**.

With some minor adjustments to array names and the `where_exp` condition, I thought I nailed it.

```html
{% raw %}{% assign replies = site.data.comments[page.slug] | where_exp:"item","item._parent == include.index" %}
{% for reply in replies %}
  {% assign parent  = reply._parent %}
  {% assign avatar  = reply.avatar %}
  {% assign email   = reply.email %}
  {% assign name    = reply.name %}
  {% assign url     = reply.url %}
  {% assign date    = reply.date %}
  {% assign message = reply.message %}
  {% include comment.html parent=parent avatar=avatar email=email name=name url=url date=date message=message %}
{% endfor %}{% endraw %}
```

Unfortunately nothing is ever this easy and I received the following error: `Liquid Exception: Liquid error (line 47): Nesting too deep in /_layouts/page.html`.

Thoughts of the movie **Inception** ran through my head as I fought with duplicate comments, missing comments, and more.

After using the `inspect` filter again I determined that my `where_exp` condition was trying to compare an integer against a string[^integer-string] :flushed:.

[^integer-string]: `15` is not the same as `'15'`. Those single quotes make a world of difference...

To solve this I used the Liquid `capture` tag to convert `forloop.index` into a string and then used that to compare against.

```liquid
{% raw %}{% capture i %}{{ include.index }}{% endcapture %}
{% assign replies = site.data.comments[page.slug] | where_exp:"item","item._parent == i" %}{% endraw %}
```

Now we're getting somewhere! With `for` loops mostly solved I added `if/else` conditions for hiding reply buttons and adding `class` hooks for styling via CSS. 

#### Comment includes (HTML + Liquid)

```html
{% raw %}<!-- /_includes/page__comments.html -->

<section class="page__reactions">
  {% if site.repository and site.staticman.branch %}
    {% if site.data.comments[page.slug] %}
      <!-- Start static comments -->
      <div id="comments" class="js-comments">
        <h2 class="page__section-label">
          {% if site.data.comments[page.slug].size > 1 %}
            {{ site.data.comments[page.slug] | size }}
          {% endif %}
          Comments
        </h2>
        {% assign comments = site.data.comments[page.slug] | where_exp:"item","item._parent == nil" %}
        {% for comment in comments %}
          {% assign index   = forloop.index %}
          {% assign p       = comment._parent %}
          {% assign parent  = p | to_integer %}
          {% assign avatar  = comment.avatar %}
          {% assign email   = comment.email %}
          {% assign name    = comment.name %}
          {% assign url     = comment.url %}
          {% assign date    = comment.date %}
          {% assign message = comment.message %}
          {% include comment.html index=index parent=parent avatar=avatar email=email name=name url=url date=date message=message %}
        {% endfor %}
      </div>
      <!-- End static comments -->
    {% endif %}

    {% unless page.comments_locked == true %}
    <!-- Start new comment form -->
    <div id="respond">
      <h2 class="page__section-label">Leave a Comment <small><a rel="nofollow" id="cancel-comment-reply-link" href="{{ page.url | absolute_url }}#respond" style="display:none;">Cancel reply</a></small></h2>
      <p class="instruct"><a href="https://daringfireball.net/projects/markdown/syntax">Markdown</a> is allowed. Email addresses will not be published.</p>
      <form id="comment-form" class="page__form js-form form" method="post" action="https://api.staticman.net/v2/entry/{{ site.repository }}/{{ site.staticman.branch }}/comments">
        <fieldset>
          <label for="comment-form-message"><strong>Comment</strong> <span class="required">*</span></label>
          <textarea type="text" rows="6" id="comment-form-message" name="fields[message]" spellcheck="true"></textarea>
        </fieldset>
        <fieldset>
          <label for="comment-form-name"><strong>Name</strong> <span class="required">*</span></label>
          <input type="text" id="comment-form-name" name="fields[name]" spellcheck="false" />
        </fieldset>
        <fieldset>
          <label for="comment-form-email"><strong>Email</strong> <small>(used for <a href="https://en.gravatar.com/">Gravatar</a> image and reply notifications)</small></label>
          <input type="email" id="comment-form-email" name="fields[email]" spellcheck="false" />
        </fieldset>
        <fieldset>
          <label for="comment-form-url"><strong>Website</strong> <small>(optional)</small></label>
          <input type="url" id="comment-form-url" name="fields[url]" spellcheck="false" />
        </fieldset>
        <fieldset class="hidden" style="display:none;">
          <input type="hidden" name="options[origin]" value="{{ page.url | absolute_url }}">
          <input type="hidden" id="comment-parent" name="options[parent]" value="">
          <input type="hidden" id="comment-post-id" name="options[slug]" value="{{ page.slug }}">
          <label for="comment-form-location">Leave blank if you are a human</label>
          <input type="text" id="comment-form-location" name="fields[hidden]" autocomplete="off"/>
        </fieldset>
        <!-- Start comment form alert messaging -->
        <p class="hidden js-notice">
          <span class="js-notice-text"></span>
        </p>
        <!-- End comment form alert messaging -->
        <fieldset>
          <button type="submit" id="comment-form-submit" class="btn btn--large">Submit Comment</button>
          <label for="comment-form-reply">
            <input type="checkbox" id="comment-form-reply" name="options[subscribe]" value="email">
            Notify me of new comments by email.
          </label>
        </fieldset>
      </form>
    </div>
    <!-- End new comment form -->
    {% else %}
      <p><em>Comments are closed. If you have a question concerning the content of this page, please feel free to <a href="{{ site.url }}/contact/">contact me</a>.</em></p>
    {% endunless %}
  {% endif %}
</section>{% endraw %}
```

```html
{% raw %}<!-- /_includes/comment.html -->

<article id="comment{% if p %}{{ index | prepend: '-' }}{% else %}{{ include.index | prepend: '-' }}{% endif %}" class="js-comment comment {% if include.name == site.author.name %}admin{% endif %} {% if p %}child{% endif %}">
  <div class="comment__avatar">
    {% if include.avatar %}
      <img src="{{ include.avatar }}" alt="{{ include.name | escape }}">
    {% elsif include.email %}
      <img src="https://www.gravatar.com/avatar/{{ include.email }}?d=mm&s=60" srcset="https://www.gravatar.com/avatar/{{ include.email }}?d=mm&s=120 2x" alt="{{ include.name | escape }}">
    {% else %}
      <img src="{{ site.url }}/assets/images/avatar-60.png" srcset="{{ site.url }}/assets/images/avatar-120.png 2x" alt="{{ include.name | escape }}">
    {% endif %}
  </div>
  <h3 class="comment__author-name">
    {% unless include.url == blank %}
      <a rel="external nofollow" href="{{ include.url }}">
        {% if include.name == site.author.name %}<svg class="icon"><use xlink:href="#icon-mistake"></use></svg> {% endif %}{{ include.name }}
      </a>
    {% else %}
      {% if include.name == site.author.name %}<svg class="icon"><use xlink:href="#icon-mistake"></use></svg> {% endif %}{{ include.name }}
    {% endunless %}
  </h3>
  <div class="comment__timestamp">
    {% if include.date %}
      {% if include.index %}<a href="#comment{% if p %}{{ index | prepend: '-' }}{% else %}{{ include.index | prepend: '-' }}{% endif %}" title="Permalink to this comment">{% endif %}
      <time datetime="{{ include.date | date_to_xmlschema }}">{{ include.date | date: '%B %d, %Y' }}</time>
      {% if include.index %}</a>{% endif %}
    {% endif %}
  </div>
  <div class="comment__content">
    {{ include.message | markdownify }}
  </div>
  {% unless p or page.comments_locked == true %}
    <div class="comment__reply">
      <a rel="nofollow" class="btn" href="#comment-{{ include.index }}" onclick="return addComment.moveForm('comment-{{ include.index }}', '{{ include.index }}', 'respond', '{{ page.slug }}')">Reply to {{ include.name }}</a>
    </div>
  {% endunless %}
</article>

{% capture i %}{{ include.index }}{% endcapture %}
{% assign replies = site.data.comments[page.slug] | where_exp:"item","item._parent == i" %}
{% for reply in replies %}
  {% assign index   = forloop.index | prepend: '-' | prepend: include.index %}
  {% assign p       = reply._parent %}
  {% assign parent  = p | to_integer %}
  {% assign avatar  = reply.avatar %}
  {% assign email   = reply.email %}
  {% assign name    = reply.name %}
  {% assign url     = reply.url %}
  {% assign date    = reply.date %}
  {% assign message = reply.message %}
  {% include comment.html index=index parent=parent avatar=avatar email=email name=name url=url date=date message=message %}
{% endfor %}{% endraw %}
```

<figure>
  <img src="{{ site.url }}/assets/images/staticman-nested-comments.png" alt="Nested comments">
  <figcaption>Nested comments one-level deep.</figcaption>
</figure>

### Comment Reply HTML and JavaScript

With the plumbing laid for parent and child comments, we now need a way of passing this info on to Staticman.

The pattern Wordpress uses is one I was familiar with and tried to emulate. Digging through [`wp-includes/js/comment-reply.js`](https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js) I found everything I needed for handling comment replies:

- pass the parent's ID to the comment form
- move the comment form next to the reply link
- allow for canceling a reply

To start I used an `unless` condition to only show "reply" links on parent comments.

```html
{% raw %}{% unless p %}
  <div class="comment__reply">
    <a rel="nofollow" class="btn" href="#comment-{{ include.index }}">Reply to {{ include.name }}</a>
  </div>
{% endunless %}{% endraw %}
```

To give this link life the following `onclick` attribute and [some JavaScript](https://github.com/mmistakes/made-mistakes-jekyll/blob/49632d19977e341b51c91dad8e71bf6ef88e79c3/src/assets/javascripts/main.js#L84-L181) will need to be added. I only had to make some minor variable name changes to Wordpress's `comment-reply.js` script to get everything working with my `form` markup.

```javascript
{% raw %}onclick="return addComment.moveForm('comment-{{ include.index }}', '{{ include.index }}', 'respond', '{{ page.slug }}')"{% endraw %}
```

With both in place hitting any **reply button** should move the comment form and populate `<input type="hidden" id="comment-parent" name="options[parent]" value="">` with the correct parent `value`.

<figure>
  <img src="{{ site.url }}/assets/images/comment-reply-animation.gif" alt="Comment replies in action">
  <figcaption>Comment replies in action.</figcaption>
</figure>

## Add Support for Email Notifications

Compared to adding support for nested comments, reply notifications were a breeze to enable.

### Update staticman.yml Configuration

To ensure that links in notification emails are safe and come from trusted domains under your control, set `allowedOrigins` accordingly. 

**Example:**

```yaml
allowedOrigins: ["mademistakes.com"]
```

The domains allowed here must match one passed from `options.origin` field we're going to add in the next step. If it doesn't the operation will be aborted and the notification not sent.

### Update Comment Form

Two fields need to be added to the comment for. 

A hidden field that passes the `origin`[^origin] set in `staticman.yml`:

```html
{% raw %}<input type="hidden" name="options[origin]" value="{{ page.url | absolute_url }}">{% endraw %}
  ```

And a checkbox `input` to allow a commenter to subscribe to any new comments.

```html  
<label for="comment-form-reply">
  <input type="checkbox" id="comment-form-reply" name="options[subscribe]" value="email">
  Notify me of new comments by email.
</label>
```

`options[subscribe]` contains the name of the field corresponding to the email address of the subscriber. In my case, `comment-form-reply`.

[^origin]: This URL be included in the notification email sent to subscribers, allowing them to open the page directly.



*[CSS]: Cascading Style Sheets
