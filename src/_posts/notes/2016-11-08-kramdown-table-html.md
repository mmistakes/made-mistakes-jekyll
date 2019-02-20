---
title: "HTML inside Kramdown table cells"
excerpt: "The question of how to write a list inside of a table cell with Kramdown recently came up on **Jekyll Talk** --- prompting me to look for a solution."
categories: [notes]
tags: [TIL, web development, Jekyll]
comments: true
support: true
last_modified_at: 2017-09-08T10:33:53-04:00
---

The question of how to write a list inside of a table cell with [**Kramdown**](http://kramdown.gettalong.org/) recently came up in a thread on [Jekyll Talk](http://talk.jekyllrb.com/) --- prompting me to look for a solution.

Unfortunately something like this doesn't work:

```markdown
| Fruit         | Price         | Advantages         |
| ------------- | ------------- | ------------------ |
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
| ------------- | ------------- | ------------------ |
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
```

**Kramdown** treats each new line as a row and doesn't render the bullet lists properly in the Banana and Oranges rows as can be seen below.

| Fruit         | Price         | Advantages         |
| ------------- | ------------- | ------------------ |
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
| ------------- | ------------- | ------------------ |
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |

Throwing HTML at the problem doesn't quite work either.

```markdown
| Fruit         | Price         | Advantages         |
| ------------- | ------------- | ------------------ |
| Bananas       | $1.34         | <ul><li>built-in wrapper</li><li>bright color</li></ul> |
| ------------- | ------------- | ------------------ |
| Oranges       | $2.10         | <ul><li>cures scurvy</li><li>tasty</li></ul> |
```

Instead of rendering the HTML, it is escaped and outputted as a single line of text.

| Fruit         | Price         | Advantages         |
| ------------- | ------------- | ------------------ |
| Bananas       | $1.34         | <ul><li>built-in wrapper</li><li>bright color</li></ul> |
| ------------- | ------------- | ------------------ |
| Oranges       | $2.10         | <ul><li>cures scurvy</li><li>tasty</li></ul> |

What is needed is a way of telling **Kramdown** to leave the HTML alone and output as is. Thankfully there is such a way using the [`nomarkdown` extension](http://kramdown.gettalong.org/syntax.html#extensions).

Simply wrap the HTML with `{% raw %}{::nomarkdown} ... {:/}{% endraw %}` like so:

```markdown
| Fruit         | Price         | Advantages         |
| ------------- | ------------- | ------------------ |
| Bananas       | $1.34         | {::nomarkdown}<ul><li>built-in wrapper</li><li>bright color</li></ul>{:/} |
| ------------- | ------------- | ------------------ |
| Oranges       | $2.10         | {::nomarkdown}<ul><li>cures scurvy</li><li>tasty</li></ul>{:/} |
```

And the table will output as expected[^cell-content].

[^cell-content]: Be sure to keep all of your HTML on a single line for this to work properly.

| Fruit         | Price         | Advantages         |
| ------------- | ------------- | ------------------ |
| Bananas       | $1.34         | {::nomarkdown}<ul><li>built-in wrapper</li><li>bright color</li></ul>{:/} |
| ------------- | ------------- | ------------------ |
| Oranges       | $2.10         | {::nomarkdown}<ul><li>cures scurvy</li><li>tasty</li></ul>{:/} |

While not as readable as a pure Markdown solution, it gets the job done.

From what I understand [**Pandoc**](http://pandoc.org/) and [**RedCarpet**](https://github.com/vmg/redcarpet) have better support for this sort of thing if you want to use their [flavor of Markdown](http://jekyllrb.com/docs/configuration/#markdown-options).

Since Kramdown is the default renderer used by Jekyll I think I'll just suck it up and stick with this workaround for now :expressionless:.
