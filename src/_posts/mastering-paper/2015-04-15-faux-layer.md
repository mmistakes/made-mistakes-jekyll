---
title: "Mastering Paper for iOS: faux layer technique"
last_modified_at: 2018-11-06T12:05:21-05:00
excerpt: "Discover the faux layer technique and how it can aid in sketching and tracing with Paper for iOS."
categories: [mastering-paper]
tags: [Paper for iOS, tutorial]
image:
  path: &image /assets/images/paper-53-faux-layers-feature.jpg
  width: 1280
  height: 450
  feature: *image
twitter:
  card: summary_large_image
toc: true
---

Up until recently I would painstakingly erase and Blend away lines until I got them just right when drawing with Paper by FiftyThree.

When [version 2.2](http://news.fiftythree.com/post/104844221313/paper-update-2-2-holiday-bonus-edition-happy) was released this past December, along with it came a Color Picker and a way to swap page colors whenever you wanted. Using these new features and a carefully mixed color, I'm going to show you how a "faux" layer can help with sketching and tracing.

## Replicating the background color

Have you noticed that the default page color in **Paper by FiftyThree** isn't a pure white? If you haven't here's a quick comparison between the two that makes the difference obvious.

{% figure caption:"Default background color compared against pure white." %}
![white comparison](/assets/images/paper-53-default-white.png)
{% endfigure %}

The key to the "faux" layer trick is matching the color you sketch with exactly to the default background color.

{% figure caption:"Default background color mix: **48**/**2**/**96**" %}
![default background color](/assets/images/paper-53-default-background-mix.jpg)
{% endfigure %}

There's two ways of getting this color into your Paper palette:

1. Use the [Color Picker]({% post_url /mastering-paper/2014-12-18-color-picker %}) eyedropper to sample an empty spot on the canvas.
2. Tap the small circle inside of the [Color Mixer]({% post_url /mastering-paper/2013-07-31-introduction-tool-guide %}#color-mixer) and adjust the 3 sliders to have the following values (48/2/96).

Whichever way you end up choosing I suggest you drag this newly mixed off-white color to an open slot in one of your palettes --- for safe keeping of course.

{% figure caption:"Drag a color to an open palette slot and release to save it." %}
![dragging color swatches](/assets/images/paper-53-drag-color-swatch.jpg)
{% endfigure %}

## Setting the background

If you were to start sketching now it would look like you weren't drawing anything at all. To make these off-white lines more visible, we need to fill in the background with a contrasting color. In this example I went with a gray, but you can choose whatever color you want (we'll delete it later so don't agonize over the perfect color selection).

To fill in the background, simply drag a swatch from one of your palettes (or the [Color Mixer]({% post_url /mastering-paper/2013-07-31-introduction-tool-guide %}#color-mixer)) onto the canvas. When done correctly it should fill in the entire background leaving you with something like this:

{% figure caption:"Quickly fill in the background by dragging a color onto the canvas and releasing." %}
![dragging a color to the background](/assets/images/paper-53-filled-gray-background.jpg)
{% endfigure %}

## Sketching with white

Now the fun begins! Select the off-white color you sampled/mixed earlier and begin sketching.

{% figure caption:"Sketching in off-white with the expectation of tracing over it with a darker color." %}
![white sketch layer](/assets/images/paper-53-white-sketch-layer.jpg)
{% endfigure %}

As you sketch don't worry about whether your strokes are perfect, they won't be part of the finished drawing so be loose and free with them.

{% notice %}
#### ProTip: sketch with the pencil tool

To yield the best results with the "faux" layer technique I suggest using the pencil tool. It blends into the default page color better than the harsh edges produced by the ink tools.
{% endnotice %}

## Tracing your drawing

{% figure caption:"Select a darker color to trace over the white sketch with." %}
![selecting a darker color](/assets/images/paper-53-tracing-layer-dark.jpg)
{% endfigure %}

Once you get the general composition of your drawing locked down you'll want to change the color to something darker. Depending on the background color you initially filled the canvas with you may need to adjust it so these new strokes show up.

Using the rough sketch as a guide trace over the white lines with a tool and color of your choice. I used a single color for my tracing but if you happen to change your color as you work it may be necessary to alter the background. You'll know this is the case when your tracing blends into the background making it difficult to tell if you're laying down a mark.

{% figure caption:"Continue tracing your white sketch and add shadows and other details as you desire." %}
![tracing and shading over white](/assets/images/paper-53-tracing-shading.jpg)
{% endfigure %}

In the example above I took the tracing one step further by adding dark shadows using a [cross-hatching technique]({% post_url /mastering-paper/2014-02-09-basics %}#ink-techniques). This step is completely optional, you really just want to establish enough contours and values to "inform" the drawing.

## Erasing the faux layer

{% figure caption:"Tap and hold on the Eraser tool and then select **Clear Page Color**." %}
![clear page color option](/assets/images/paper-53-clear-page.jpg)
{% endfigure %}

Once you're happy with things the next step is to remove all of the white lines. If you tap and hold on the Eraser tool for 2 seconds you'll be given the option to **Clear Ink** or **Clear Page Color**. 

Tap **Clear Page Color** and watch as the background and rough sketch disappear, leaving behind a pristinely traced image.

{% figure caption:"All that remains now is the traced drawing." %}
[![finished contour drawing](/assets/images/paper-53-removed-faux-layer.jpg)](https://mix.fiftythree.com/11098-Michael-Rose/2808345)
{% endfigure %}

Now you can continue adding to page by drawing and painting on top of what remains. I think you'll find this method is so much faster than having to carefully [erase or Blend away lines]({% post_url /mastering-paper/2014-10-25-erasing %}) from an "under-drawing."

{% figure caption:"And here is how the faux layer trick for Paper by FiftyThree looks in sequence." %}
![faux layer trick process animation](/assets/images/paper-53-faux-layers-process.gif)
{% endfigure %}

## Other uses

Because I mostly do portrait work it never crossed my mind that this technique could have other applications.

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/mmistakes">@mmistakes</a> your dark background trick is sweet. now i&#39;m trying to make a grid based on that idea: even sweeter.</p>&mdash; Ron Jeffries (@RonJeffries) <a href="https://twitter.com/RonJeffries/status/587650836018438144">April 13, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I think Ron is onto something and brings up a great use for the faux layer method. In a previous Mastering Paper tutorial I showed how [using grids]({% post_url /mastering-paper/2014-07-06-grid-method %}) could help a beginner draw more accurately. Creating a grid comprised of off-white lines would sure make hiding them a breeze don't you think?

{% figure caption:"Grid template available for free on FiftyThree's Mix service." %}
[![grid template](/assets/images/paper-53-mix-grid-template.jpg)](https://mix.fiftythree.com/11098-Michael-Rose/2854744)
{% endfigure %}

So with that in mind here's a [grid template](https://mix.fiftythree.com/11098-Michael-Rose/2854744) I shared on Mix. Save it to your Paper journal, remix your own variations for others to build off of, or share what you created with it on Mix or in the comments below.
