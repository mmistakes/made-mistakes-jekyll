---
layout: page
title: "Kitchen Sink Post"
categories: articles
excerpt: "Below is just about everything you'll need to style in the theme."
last_modified_at: 
tags: []
comments: true
ads: true
---

Below is just about everything you'll need to style in the theme. Check [the source code](https://github.com/mmistakes/made-mistakes-jekyll) to see the many embedded elements within paragraphs.

# Heading 1: Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

## Heading 2: Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

### Heading 3: Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

#### Heading 4: Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

##### Heading 5: Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

###### Heading 6: Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

### Body text

Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

*This is emphasized*. Donec faucibus. Nunc iaculis suscipit dui. 53 = 125. Water is H<sub>2</sub>O. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. The New York Times <cite>(That’s a citation)</cite>. <u>Underline</u>. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.

HTML and CSS are our tools. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus.

*[CSS]: Cascading Stylesheets

### Blockquotes

> Lorem ipsum dolor sit amet, test link adipiscing elit. Nullam dignissim convallis est. Quisque aliquam.

> <cite>First Lastname, *The Greatest Article*</cite>

## List Types

### Ordered Lists

1. Item one
   1. sub item one
   2. sub item two
   3. sub item three
2. Item two

### Unordered Lists

* Item one
* Item two
* Item three

## Tables

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |

## Code Snippets

Syntax highlighting via Pygments

```css
#container {
  float: left;  
  margin: 0 -240px 0 0;  
  width: 100%;
}
```

## Images

<figure>
  <img src="http://placehold.it/900x400.gif" alt="">
  <figcaption><strong>Example:</strong> One image.</figcaption>
</figure>

<figure class="half">
  <img src="http://placehold.it/900x400.gif" alt="">
  <img src="http://placehold.it/900x400.gif" alt="">
  <figcaption><strong>Example:</strong> Two images.</figcaption>
</figure>

<figure class="third">
  <img src="http://placehold.it/900x400.gif" alt="">
  <img src="http://placehold.it/900x400.gif" alt="">
  <img src="http://placehold.it/900x400.gif" alt="">
  <figcaption><strong>Example:</strong> Three images.</figcaption>
</figure>

## Buttons

Make any link standout more when applying the `.btn` class.

```html
<a href="#" class="btn">Default Button</a>
```

<a href="#" class="btn">.btn</a>
<a href="#" class="btn btn--inverse">.btn--inverse</a>
<a href="#" class="btn btn--info">.btn--info</a>
<a href="#" class="btn btn--warning">.btn--warning</a>
<a href="#" class="btn btn--danger">.btn--danger</a>
<a href="#" class="btn btn--success">.btn--success</a>

## Notices

Set a block of text off from the rest.

{% notice %}
#### Default Notice
[Maecenas ornare tortor](). Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at.
{% endnotice %}

{% notice info %}
#### Info Notice
`.notice.info` [Maecenas ornare tortor](). Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at.
{% endnotice %}

{% notice warning %}
#### Warning Notice
`.notice.warning` Maecenas ornare tortor. Donec sed [tellus eget]() sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at.
{% endnotice %}

{% notice danger %}
#### Danger Notice
`.notice.danger` Maecenas ornare tortor.[ Donec sed tellus]() eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at.
{% endnotice %}

{% notice success %}
#### Success Notice
`.notice.success` Maecenas ornare tortor. Donec sed tellus eget [sapien fringilla]() nonummy. Mauris a ante. Suspendisse quam sem, consequat at.
{% endnotice %}

## Fieldsets and Form Elements

<fieldset>
  <form>
    <h2>Form Element</h2>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui.</p>
    <label for="text_field">Text Field:</label>
    <input type="text" id="text_field" />
    <label for="text_area">Text Area:</label>
    <textarea id="text_area"></textarea>
    <p>
      <label for="select_element">Select Element:</label>
      <select name="select_element">
        <optgroup label="Option Group 1">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </optgroup>
        <optgroup label="Option Group 2">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </optgroup>
      </select>
    </p>
    <p>
      <label for="radio_buttons">Radio Buttons:</label>
      <label><input type="radio" class="radio" name="radio_button" value="radio_1" />Radio 1</label>
      <label><input type="radio" class="radio" name="radio_button" value="radio_2" />Radio 2</label>
      <label><input type="radio" class="radio" name="radio_button" value="radio_3" />Radio 3</label>
    </p>
    <p>
      <label for="checkboxes">Checkboxes:</label>
      <label><input type="checkbox" class="checkbox" name="checkboxes" value="check_1" />Checkbox 1</label>
      <label><input type="checkbox" class="checkbox" name="checkboxes" value="check_2" />Checkbox 2</label>
      <label><input type="checkbox" class="checkbox" name="checkboxes" value="check_3" />Checkbox 3</label>
    </p>
    <p>
      <label for="password">Password:</label>
      <input type="password" class="password" name="password" />
    </p>
    <p>
      <label for="file">File Input:</label>
      <input type="file" class="file" name="file" />
    </p>
    <p>
      <input class="btn" type="submit" value="Submit" />
    </p>
  </form>
</fieldset>
