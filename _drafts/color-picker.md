---
layout: article
title: "Mastering Paper by FiftyThree: Picking Colors"
modified: 
categories: mastering-paper
excerpt: ""
tags: [paper by 53, color theory, tutorial, ipad]
image:
  feature:
  teaser:
comments:
---

Re-imagined zoom tool, check. Expressive paint and ink tools that react to the speed and angle of your strokes, double check. A familiar color picker to sample, match, and adjust hues --- triple check. Yes you heard right, Paper by FiftyThree finally has a color picker.

With each major update Paper comes more into its own as new tools and features are added. You get the feeling that their implications have been carefully balanced to compliment the way you interact with the app. Almost to a fault they're designed to fade away into the UI to put the focus on what matters most --- the ink and paint you place on the canvas.

{% include toc.html %}

<figure>
	<img src="{{ site.url }}/images/paper-53-original-9-colors.png" alt="original Paper by 53 color palette">
	<figcaption>Do you remember when Paper by FiftyThree only had 9 colors? I do.</figcaption>
</figure>

From those early days of working with a constrained palette of 9 to the addition of the Color Mixer, selecting and manipulating color has been very important to me. With the launch of Mix being able to match another creators palette in order to make seamlessly additions became a necessity.

Thankfully FiftyThree has us covered with their own take on picking color.

## How to use the Color Picker

First off you need to own either the Essentials or Mixer In-App purchases to enable the Color Picker. If you have FiftyThree's Pencil then good news, all of the tools are already unlocked for you.

<figure class="half">
	<img src="{{ site.url }}/images/paper-53-mixer-iap.png" alt="Paper 53 Mixer In-App purchase screen">
	<img src="{{ site.url }}/images/paper-53-essentials-iap.png" alt="Paper 53 Essentials tools In-App purcahse screen">
	<figcaption>The Mixer is required to use the Color Picker.</figcaption>
</figure>

To sample a color tap on the small disc inside the Color Mixer circle. You may need to tap this a second time if it wasn't previously selected. You'll know you've done it right when an eye dropper icon appears below the color sliders.

<figure>
	<img src="{{ site.url }}/images/paper-53-mixer-eye-dropper.jpg" alt="Color Mixer eye dropper">
	<figcaption>The Mixer changes to an eye dropper when tapped on.</figcaption>
</figure>

Tapping the eye dropper icon will place a small circle onto the canvas that you can use to sample colors. You also have the option of refining a color by moving any of the three HSB[^hsb] sliders around, but I'll get to that in a minute.

[^hsb]: HSB stands for <u>H</u>ue, <u>S</u>aturation, and <u>B</u>rightness (or Luminosity).

There's not much more to using the Color Picker. As the small circle is moved around the canvas the color inside of it will change as a visual cue to what is selected. There is also a black dot in the center to help with aligmment.

<figure>
	<img src="{{ site.url }}/images/paper-53-color-picker.gif" alt="Animation of Color Picker changing colors">
	<figcaption>Pretty cool how the color changes as you drag it around the canvas huh?.</figcaption>
</figure>

When you've found a color you'd like to work with or save to your palette tap the circle. You can also tap the eye dropper icon inside of the Color Mixer or any of the tools in the tray to select the sampled color.

<i class="fa fa-info-circle"></i> Tapping anywhere on the canvas will dismiss the Color Picker and the sampled color will not be saved to the Mixer.
{: .notice .warning}

## Color Picker limitations

If there's one negative thing to be said about the Color Picker its how it handles transparency. 99% of the time the Color Picker will work as you expect it --- sampling colors correctly. But there are a few instances where if you run the picker over a blended area or watercolor splotch that fades into the background, you'll notice it doesn't accurately sample the color.

This doesn't appear to be a problem if you're sampling colors on areas that have been built up with many layers. It's only a problem on areas that are the first layer on the canvas (filled with a color or not).

It's probably best if I just illustrate what I mean below and give some examples.

### Sampling watercolor on the darkest part

<figure>
	![sampling watercolor gradation without page color](image)
	![sampling watercolor gradation with page color](image)
	<figcaption>Sampling color seems fairly accurate here.</figcaption>
</figure>

### Sampling transparent watercolor and blended strokes

<figure>
	![sampling a transparent watercolor stroke without page color](image)
	![sampling a transparent watercolor stroke with page color](image)
	![sampling a blended stroke without page color](image)
	<figcaption>As you can see the color being sampled is not even close to what is shown. It should be much lighter but instead it's exactly the same as the sample from before.</figcaption>
</figure>

As far as I can tell the Color Picker does not combine the page fill color with whatever was drawn on the layer above it to give an accurate sampling. I'm not entirely sure if this is by design, some sort of bug, a limitation of the software, or a little of both. But it does seem to be related to the page fill being treated as it's own independent layer that doesn't affect the strokes and fills drawn on top of it.

Coincidentally a variation of this behavior can be observed when painting with white on top of dark page fill. But I'll save that little gotcha for another guide.

## How to share colors

Don't let that little color sampling inconsistency get you down, there's still plenty to love about Color Picker and enhanced Mixer. If it wasn't clear from the subheading above, both of these updates make sharing color palettes a reality.

As I've started to work with the picker more I'm beginning to see value in including color swatches in the margins or my drawings. It's a way of bringing clarity to the colors I use in a piece as well as convenience in selecting them since my palettes in the tray are more than filled up.

<figure>
	![example of color palette painting in the margin](image)
	<figcaption>Including a base color palette off to the side for easier reference and sampling.</figcaption>
</figure>

Apart from the picker the Mixer received some love by now including numeric values on each of the 3 sliders. Each of these  maps perfectly to HSB[^hsb] values which can be shared with others who choose not to participate on Mix for one reason or another.

<figure>
	![screenshot showing HSB picker in Adobe Photoshop]
	<figcaption>Color values in Paper correlate with those found in desktop graphics applications like Adobe Photoshop.</figcaption>
</figure>

The HSB/HLS color models are found in most desktop graphics programs like Adobe's Photoshop. By using an established color model in Paper it is now possible to match colors. As a designer I find this especially helpful for maintaining consistency when importing PNG files from Paper into existing Creative Suite documents that have established palettes.

## Color palettes on Mix

When I wrote a Mastering Paper guide for [drawing portraits]({{ site.url }}{% post_url mastering-paper/2014-04-21-drawing-faces %}) there wasn't a good way for me to share my palettes. Now with the help of Mix by FiftyThree I'm including them for your sampling pleasure. Feel free to add you own palettes to the stack by remixing any one of the templates below.

<figure>
	<img src="image" alt="portrait color palette">
	<figcaption>My default skin tone palette for drawing portraits.</figcaption>
</figure>