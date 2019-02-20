---
title: "Styling language specific code blocks with Jekyll"
categories: [notes]
tags: [TIL, web development, Jekyll]
comments: true
support: true
last_modified_at: 2017-05-16T16:24:26-04:00
---

While inspecting the markup of some syntax highlighted code blocks I noticed something I hadn't before, `language-lexer` classes:

```html
<div class="language-css highlighter-rouge">
  <pre class="highlight">
    <code>.foo { color: red; }</code>
  </pre>
</div>
```

This extra hook[^syntax-highlighting-lang] on the `<div>` element opens up some interesting styling possibilities. A fun use case for this is styling code blocks to look like terminal windows. Simply use `terminal`[^terminal-lexer] as the language/lexer like so:

<div class="highlighter-rouge">
<pre class="highlight"><code>```terminal

```</code></pre>
</div>

Add the following Sass to your site's stylesheet:

```scss
$terminal-window-height: 30px;

.language-terminal {
  position: relative;
  margin-bottom: 1.5em;
  padding: calc(#{$terminal-window-height} + 1em) 1em 1em;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  box-shadow: 0 0.25em 1em rgba($base-color, 0.25);
  background-color: $base-color;

  &::before {
    content: "\2022 \2022 \2022";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: $terminal-window-height;
    margin: 0;
    padding: (0.5 * $terminal-window-height) 0;
    background: mix($base-color, #fff, 25%);
    color: mix($base-color, #fff, 50%);
    font-size: (2 * $terminal-window-height);
    line-height: 0;
    text-indent: (0.5 * $terminal-window-height);
  }

  .highlight {
    margin: 0;
    padding: 0;
    background-color: initial;
    color: #fff;
  }
}
```

And you'll get something that looks like this:

```terminal
[15:34:01] Finished 'site' after 2.18 min
[15:34:01] Starting 'copy:site'...
[15:34:06] Finished 'copy:site' after 4.8 s
[15:34:06] Finished 'build:site' after 2.33 min
[15:34:06] Starting 'reload'...
[BS] Reloading Browsers...
[15:34:06] Finished 'reload' after 5.22 ms
```

This isn't limited to `language-terminal`, and can be applied to any of the other [languages and lexers](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers) supported by [**Rouge**](http://rouge.jneen.net/).

[^syntax-highlighting-lang]: Apparently this was [added into **Kramdown**](https://github.com/gettalong/kramdown/issues/328) a year ago. :neutral_face: Who knew?

[^terminal-lexer]: `terminal` and `console` are aliases for `shell_session` and can be used interchangeably when assigning a language for syntax highlighting.
