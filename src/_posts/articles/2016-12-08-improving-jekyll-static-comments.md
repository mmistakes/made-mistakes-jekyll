---
title: "Improving Static Comments with Jekyll & Staticman"
excerpt: "Using Staticman to add threaded comments and reply notifications to a static-based Jekyll site."
image:
  path: &image /assets/images/improving-jekyll-static-comments-feature.jpg
  feature: *image
  teaser: /assets/images/improving-jekyll-static-comments-teaser.jpg
  credit: "Photo by **Gabriel Santiago**"
  creditlink: "https://unsplash.com/@gabrielssantiago"
tags: [web development, GitHub, Jekyll]
comments: true
last_modified_at: 2017-01-16T16:27:13-05:00
---

In the months after ditching Disqus for a [static-based commenting system]({{ site.url }}{% post_url /articles/2016-08-21-jekyll-static-comments %}), [**Staticman**](https://staticman.net/) has matured with feature adds like *threaded comments* and *email notifications*.

Armed with instructions provided by Eduardo Bouças in [this GitHub issue](https://github.com/eduardoboucas/staticman/issues/42 "Email notification upon replies"), I set off to level-up the commenting experience on **Made Mistakes**. Here's how I did it.

{% include toc.html %}

## Upgrade to Staticman v2

To take advantage of the new features, it was necessary to migrate Staticman settings from Jekyll's `_config.yml` file into a new `staticman.yml` file[^staticman-yml]. None of the parameter names changed making the transition to `v2` that much easier.

[^staticman-yml]: An added benefit of the new configuration file means you can use Staticman with other static site generators. `v2` no longer requires you to use a Jekyll specific `_config.yml` file.

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

{% include notice content="
#### New Configuration Options

Be sure to check the [sample configuration file](https://github.com/eduardoboucas/staticman/blob/master/staticman.sample.yml) and [full list of parameters](https://staticman.net/docs/configuration) for setup ideas.

For example you can configure multiple properties (comments, reviews, and other types of user-generated content), change commit message and request body text, enable email notifications, and much more from a `staticman.yml` file."
%}

### Remove/Add Staticman as a Collaborator

I'm not entirely sure if doing the following was necessary. I encountered errors when submitting test comments and this appeared to solve the problem. It's possible I mis-configured something else and that was the real issue...

Either way, let me know about your experience upgrading from Staticman `v1` to `v2` in the comments below.

1. Revoked collaboration rights for Staticman `v1` by removing from my GitHub repository.
   ![Remove staticmanapp as a collaborator]({{ site.url }}/assets/images/staticman-remove-collaborator.png)
2. Added Staticman back as [collaborator]({{ site.url }}{% post_url /articles/2016-08-21-jekyll-static-comments %}#setting-up-staticman).
3. Pinged the version 2 endpoint `https://api.staticman.net/v2/connect/{your GitHub username}/{your repository name}` to accept the collaboration invitation.

### Update POST Endpoint in Comment Form

To `POST` correctly to Staticman, the `action` attribute in my comment form needed a small update. Changing `v1` to `v2` in [**_includes/page__comments.html**](https://github.com/mmistakes/made-mistakes-jekyll/blob/f0074b7b9e64b6d4b63dd13a371cedc576dae49d/src/_includes/page__comments.html#L34) and appending `/comments`[^property] to the end did the trick for me.

```html
{% raw %}<form id="comment-form" class="page__form js-form form" method="post" action="https://api.staticman.net/v2/entry/{{ site.repository }}/{{ site.staticman.branch }}/comments">{% endraw %}
```

[^property]: Site properties are optional. See Staticman documentation for details on [hooking up your forms](https://staticman.net/docs/#step-3-hook-up-your-forms).

## Add Support for Threaded Comments

Getting nested comments working was a big pain point for me. Numerous Liquid errors, trying to wrap my head around `for` loops inside of other `for` loops, array filters that broke things, and more --- took me a bit to figure out.

### Add Parent Identifier

To properly nest replies I needed a way of determining their hierarchy. Staticman `v2` includes a new field named `options[parent]`[^parent-field] that can be used to help establish this relationship.  More on that in a minute, but for now here's it added to my form as a hidden field.

[^parent-field]: Staticman names this field `_parent` in entries.

```html
<input type="hidden" id="comment-parent" name="options[parent]" value="">
```

### Update Liquid Loops

To avoid displaying duplicates, I needed to exclude replies and only show "parent" comments in the main loop. This seemed like the perfect use-case for Jekyll's `where_exp` filter:

{% include notice type="warning" content="
#### Where Expression Jekyll Filter

Select all the objects in an array where the expression is true. Jekyll v3.2.0 & later. **Example:** `site.members | where_exp:\"item\", \"item.graduation_year == 2014\"`"
%}

If the hidden `options[parent]` field I added to the form was working properly I should have comment data files similar to these:

#### Parent comment example

```yaml
message: This is parent comment message.
name: First LastName
email: md5g1bb3r15h
date: '2016-11-30T22:03:15.286Z'
```

#### Child comment example

```yaml
_parent: '7'
message: This is a child comment message.
name: First LastName
email: md5g1bb3r15h
date: '2016-11-02T05:08:43.280Z'
```

As you can see above, the "child" comment has `_parent` data populated from the hidden `options[parent]` field in the form. Using this knowledge I tried to test against it using `where_exp:"item", "item._parent == nil"` to create an array of only "parent" comments.

Unfortunately the following didn't work:

```liquid
{% raw %}{% assign comments = site.data.comments[page.slug] | where_exp:"item", "item._parent == nil" %}
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

What spat out instead was a bunch of empty comment markup like this:

```html
<article id="comment-1" class="js-comment comment">
  <div class="comment__avatar">
    <img src="" alt="">
  </div>
  <h3 class="comment__author-name"></h3>
  <div class="comment__timestamp">
    <a href="#comment-1" title="Permalink to this comment">
      <time datetime=""></time>
    </a>
  </div>
  <div class="comment__content"></div>
</article>
```

Hmmm... guess it was time to add `inspect` filters to my arrays to see what was up.

```liquid
{% raw %}{{ site.data.comments[page.slug] | inspect }}{% endraw %}
```

#### Sample array before filtering with `where_exp`

```yaml
{
  "comment-1471818805944" => {
    "message" => "This is a parent comment message.",
    "name"    => "First LastName",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-21T22:33:25.272Z"
  },
  "comment-1471904599908" => {
    "message" => "This is another parent comment message.",
    "name"    => "First LastName",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-22T21:42:48.075Z"
  }
}
```

#### Sample array after filtering with `where_exp`

```json
[
  {
    "message" => "This is a parent comment message.",
    "name"    => "First LastName",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-21T22:33:25.272Z"
  }, 
  {
    "message" => "This is another parent comment message.",
    "name"    => "First LastName",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-22T21:42:48.075Z"
  }
]
```

Apparently using the `where_exp` filter flattens things slightly by removing the `comment-xxxxxxxxxxxxx` objects. This caused my `assign` tags to return blank values because `comment[1]` no longer existed.

```liquid
{% raw %}{% assign avatar  = comment[1].avatar %}
{% assign email   = comment[1].email %}
{% assign name    = comment[1].name %}
{% assign url     = comment[1].url %}
{% assign date    = comment[1].date %}
{% assign message = comment[1].message %}{% endraw %}
```

Once discovered, the fix was simple --- remove `[1]` from each of the property names.

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

{% include notice content="
#### Note: Sort and Where Filters Don't Mix

I ran into strange behaviors and errors due to mixing a `sort` filter with `where` and `where_exp`. Came to the conclusion it was unnecessary as the items were already being sorted alphabetically based on their filenames, and removed the filter.

I'm using the following: `filename: \"comment-{@timestamp}\"` structure. Your mileage may vary depending on how you name entries."
%}

#### Displaying Nested Comments

Here is what I was looking to accomplish... before the headaches started :anguished: :gun:

- Start a loop and on each iteration create a new array named `replies` of only reply comments.
- Evaluate the value of `_parent` in these replies.
- If `_parent` is equal to the index of the parent loop then it's a child and should be treated as one.
- If not, move on to the next entry in the array.
- Rinse and repeat.

I determined the easiest way of assigning a unique identifier to each parent comment would be sequentially. Thankfully Liquid provides a way of doing this with `forloop.index`.

```liquid
{% raw %}{% assign index = forloop.index %}{% endraw %}
```

Next I nested a modified copy of the *parent* loop from before inside of itself --- to function as the "child" or `replies` loop.

```liquid
{% raw %}{% assign replies = site.data.comments[page.slug] | where_exp:"item", "item._parent == include.index" %}
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

Unfortunately the `where_exp` filter proved troublesome yet again, causing Jekyll to error out with: `Liquid Exception: Liquid error (line 47): Nesting too deep in /_layouts/page.html`.

After brief thoughts of the movie **Inception**, I applied an `inspect` filter to help troubleshoot the `replies` loop. I determined that the `where_exp` condition was failing[^integer-string] because I was trying to compare an integer against a string :flushed:.

[^integer-string]: `15` is not the same as `'15'`. Those single quotes make a world of difference...

To solve this I placed a `capture` tag around the index variable to convert it from an integer into a string. Then modified the `where_exp` condition to compare `_parent` against this new `{% raw %}{{ i }}{% endraw %}` variable --- fixing the issue and allowing me to move on.

```liquid
{% raw %}{% capture i %}{{ include.index }}{% endcapture %}
{% assign replies = site.data.comments[page.slug] | where_exp:"item", "item._parent == i" %}{% endraw %}
```

#### `_includes/page__comments.html`

```html
{% raw %}<section class="page__reactions">
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
        {% assign comments = site.data.comments[page.slug] | where_exp:"item", "item._parent == nil" %}
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

#### `_includes/comment.html`

```html
{% raw %}<article id="comment{% if p %}{{ index | prepend: '-' }}{% else %}{{ include.index | prepend: '-' }}{% endif %}" class="js-comment comment {% if include.name == site.author.name %}admin{% endif %} {% if p %}child{% endif %}">
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
{% assign replies = site.data.comments[page.slug] | where_exp:"item", "item._parent == i" %}
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

### Comment Reply HTML and JavaScript

Next up was to add some finishing touches to pull everything together.

Familiar with the way [**Wordpress**](https://wordpress.org/) handles reply forms I looked to it for inspiration. Digging through the JavaScript in [`wp-includes/js/comment-reply.js`](https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js) I found everything I could possibly need:

- `respond` function to move form into view
- `cancel` function to destroy a reply form a return it to its original state
- pass parent's unique identifier to `options[parent]` on form submit

To start I used an `unless` condition to only show "reply" links on *parent* comments. I only planned on going one-level deep with replies, so this seemed like a good way of enforcing that.

```html
{% raw %}{% unless p %}
  <div class="comment__reply">
    <a rel="nofollow" class="btn" href="#comment-{{ include.index }}">Reply to {{ include.name }}</a>
  </div>
{% endunless %}{% endraw %}
```

<figure>
  <img src="{{ site.url }}/assets/images/staticman-nested-comments.png" alt="Nested comments">
  <figcaption>Nested comments one-level deep.</figcaption>
</figure>

To give the **reply link** life I added the following `onclick` attribute and [JavaScript](https://github.com/mmistakes/made-mistakes-jekyll/blob/49632d19977e341b51c91dad8e71bf6ef88e79c3/src/assets/javascripts/main.js#L84-L181) to it.

```javascript
{% raw %}onclick="return addComment.moveForm('comment-{{ include.index }}', '{{ include.index }}', 'respond', '{{ page.slug }}')"{% endraw %}
```

A few minor variable name changes to Wordpress's `comment-reply.js` script was all it took to get everything working with my `form` markup.

{% capture reply_caption %}
Hitting a **reply button** moves the comment form into view and populates `<input type="hidden" id="comment-parent" name="options[parent]" value="">` with the correct *parent* `value`. While tapping **Cancel reply** returns the form to its original state.
{% endcapture %}

<figure>
  <img src="{{ site.url }}/assets/images/comment-reply-animation.gif" alt="Comment replies in action">
  <figcaption>{{ reply_caption | markdownify | remove: '<p>' | remove: '</p>' }}</figcaption>
</figure>

## Add Support for Email Notifications

Compared to nesting comment replies, email notifications were a breeze to setup.

### Update `staticman.yml` Configuration

To ensure that links in notification emails are safe and only come from trusted domains, set `allowedOrigins` accordingly. 

**Example:**

```yaml
allowedOrigins: ["mademistakes.com"]
```

The domain(s) allowed here must match those passed from an `options.origin` field we're going to add in the next step. Only domains that match will trigger notifications to send, otherwise the operation will abort.

{% include notice type="warning" content="
#### ProTip: Use Your Own Mailgun Account

The public instance of Staticman uses a [**Mailgun**](http://www.mailgun.com/) account with a limit of 10,000 emails a month. You are encouraged to create an account and add your own [Mailgun API and domain](https://staticman.net/docs/configuration#notifications.enabled) to `staticman.yml`. Be sure you encrypt both using the following endpoint: `https://api.staticman.net/v2/encrypt/{TEXT TO BE ENCRYPTED}`."
%}

### Update Comment Form

To finish, add two fields to the comment `form`. 

**Field 1:** A hidden field that passes the `origin`[^origin] set in `staticman.yml`:

```html
{% raw %}<input type="hidden" name="options[origin]" value="{{ page.url | absolute_url }}">{% endraw %}
```

**Field 2:** A checkbox `input` for subscribing to email notifications.

```html  
<label for="comment-form-reply">
  <input type="checkbox" id="comment-form-reply" name="options[subscribe]" value="email">
  Notify me of new comments by email.
</label>
```

Nothing fancy here, `name=options[subscribe]` and `value="email"` are added to the field to associate subscription data with email address.

[^origin]: This URL will be included in the notification email sent to subscribers, allowing them to open the page directly.

If setup correctly a user should receive an email anytime a new comment on the post or page they subscribed to is added.

<figure>
  <img src="{{ site.url }}/assets/images/staticman-email-notification.png" alt="Staticman reply email notification">
  <figcaption>Example of a Staticman "New reply" email notification.</figcaption>
</figure>

---

Well there you have it, a static-based commenting system done up in Jekyll that handles nested comments and reply notifications. Now if I could only shave a minute of my build time to get new comments merged in quicker :frowning:.

*[CSS]: Cascading Style Sheets
