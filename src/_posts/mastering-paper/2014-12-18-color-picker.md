---
title: "Mastering Paper for iOS: picking and sharing colors"
last_modified_at: 2018-11-06T12:04:37-05:00
excerpt: "A color picker has been added to Paper! Learn what the new tool does and how to use it."
categories: [mastering-paper]
tags: [Paper for iOS, tutorial, Apple]
image:
  path: &image /assets/images/paper-53-color-picker-feature.jpg
  width: 1280
  height: 674
  feature: *image
twitter:
  card: summary_large_image
toc: true
---

Re-imagined zoom tool, *check*. Expressive paint and ink tools that react to the speed and angle of your strokes, *double check*. A familiar color picker to sample, match, and adjust hues --- *triple check*. Yes that's not a typo, Paper by FiftyThree finally has a color picker.

With each major update Paper takes a forward leap into maturity as new tools and features are added. You really get the feeling that everything has been weighed to carefully balance and compliment the way you interact with the app. Almost to a fault, the tools and gestures have been designed to fade away into the UI putting the focus on what matters most --- the ink and paint being placed on the canvas.

{% figure caption:"Do you remember when Paper by FiftyThree only had 9 colors? I do." %}
![original Paper by 53 color palette](/assets/images/paper-53-original-9-colors.png)
{% endfigure %}

From those early days of working with a constrained palette up to the addition of the [Color Mixer]({% post_url /mastering-paper/2013-07-31-introduction-tool-guide %}#color-mixer), selecting and manipulating color has been very important to me. The lack of a color picker has been a minor annoyance for me but I really started to feel its absence after the [launch of Mix]({% post_url /mastering-paper/2014-11-25-mix %}). Trying to accurately match color palettes when remixing ideas became a time sink that I'm glad to see finally filled.

## How to use the Color Picker

First off you need to own either the **Essentials** or **Mixer In-App purchases** to enable the Color Picker. If you have FiftyThree's Pencil then good news, all of the tools are already unlocked for you.

{% figure caption:"The Mixer is required to use the Color Picker." class:"gallery-2-col" %}
![Paper 53 Mixer In-App purchase screen](/assets/images/paper-53-mixer-iap.png)
![Paper 53 Essentials tools In-App purchase screen](/assets/images/paper-53-essentials-iap.png)
{% endfigure %}

To sample a color tap on the small circle inside of the Color Mixer --- you may need to tap it a second time if it wasn't previously selected. You'll know you've done it right when an eye dropper icon appears in the circle.

{% figure caption:"The Mixer changes to an eye dropper when tapped on." %}
![Color Mixer eye dropper](/assets/images/paper-53-mixer-eye-dropper.jpg)
{% endfigure %}

Tapping the eye dropper icon will place a small circle onto the canvas that you can use to sample colors and add to your palette. You also have the option of refining a color by moving any of the three HSB[^hsb] sliders around, but I'll get to that in a minute.

[^hsb]: HSB stands for <u>H</u>ue, <u>S</u>aturation, and <u>B</u>rightness (or Luminosity).

There's not much more to using the Color Picker. As the small circle is moved around the canvas, the color inside of it will change letting you know what color is selected. There is also a black dot in the center to help with alignment when trying to pick up a tiny speck of color.

{% figure caption:"Pretty cool how the color changes as you drag it around the canvas huh?." %}
![animation of Color Picker changing colors](/assets/images/paper-53-color-picker.gif)
{% endfigure %}

When you've found a color you'd like to work with or save to your palette tap the circle. You can also tap the eye dropper icon inside of the Color Mixer or any of the tools in the tray to select the sampled color.

{% notice %}
#### ProTip: saving a sampled color

Tapping anywhere on the canvas will dismiss the Color Picker and the sampled color will not be saved to the Mixer. You have to tap the circle in the Color Picker or eye dropper for it to stick.
{% endnotice %}

### Picking colors from a photograph

Sampling colors with the picker tool isn't limited to just the ink, fill, and background layers --- you can also sample colors from photos. To start you'll want to import an existing image (or snap a new one with the camera).

To place a photo on the canvas tap the **camera icon**. Importing photos can be done when an idea is first created...

![Paper new idea options](/assets/images/paper-53-color-new-idea.jpg)

Or after the fact...

![import photos in Paper](/assets/images/paper-53-color-photo-import-button.jpg)

Once you have a photo on the canvas you can sample its colors same as before:

1. Tap the small circle inside of the **Color Mixer** tool.
2. Tap the eyedropper.
3. Drag the selector on top of the area you wish to sample.
4. Tap the eyedropper again to work with or save to your palette.

{% figure class:"gallery-2-col" %}
![Color Mixer eyedropper](/assets/images/paper-53-color-photo-sample-1.jpg)
![sampling a photo's color](/assets/images/paper-53-color-photo-sample-2.jpg)
{% endfigure %}

---

## Color Picker limitations

99% of the time the Color Picker will work as you expect it when placed on top of ink, marker, and pencil strokes. But when sampling the transparent strokes made by the watercolor brush or blends, you may not get the results you were expecting.

Let's use these two splotches of color below as an example of what I mean. On the left is a shape painted with the watercolor brush and on the right one with the marker tool --- both filled with the same color.

{% figure caption:"Two shapes filled by two different tools with the same exact color." %}
![shapes filled with the same color](/assets/images/paper-53-sampled-colors-1.jpg)
{% endfigure %}

Because of the transparent nature of the watercolor brush, the painted shape on the left appears to be a lighter hue than the one on the right. You'd think that when dragging the Color Picker over both shapes it would sample them as two different colors, but that's not quite what happens...

{% figure caption:"Notice anything strange? According to Paper both colors are identical even though they don't look the same. Weird. Filling the page with a dark color had no effect on sampling." %}
![sampling shapes filled with the same color](/assets/images/paper-53-sampled-colors-2.jpg)
![sampling shaped filled with the same color](/assets/images/paper-53-sampled-colors-3.jpg)
{% endfigure %}

As far as I can tell the Color Picker completely ignores the background page color when sampling --- rather than combining the page color with the transparent strokes on top of it. I'm not entirely sure if this is by design, some sort of bug, a limitation of the software, or a little of both. Before crying foul, sampling the colors on a transparent background in Adobe Photoshop produced the same exact results. So the picker doesn't seem to be broken...

{% figure caption:"Adobe Photoshop samples the fills just like Paper with both having the same color values." %}
![screenshot of sampled colors in Photoshop](/assets/images/paper-53-sampled-colors-4.jpg)
{% endfigure %}

This little gotcha is even more pronounced when sampling areas that have been heavily blended as shown below.

{% figure caption:"The discrepancy between what you see and what the picker samples is really noticeable here. I was expecting the bottom sample to be a lighter blue than what was actually picked up." %}
![sampling gradations](/assets/images/paper-53-sampled-colors-5.jpg)
{% endfigure %}

Personally I think it would be less confusing if the Color Picker was sampling the combined color that you see on screen (page color + transparent strokes on top) like **Procreate** and other drawing apps. But like I said it's more of an edge case scenario since you'll mostly be sampling opaque and layered colors.

---

## How to share colors

Don't let that little color sampling inconsistency get you down, there's still plenty to love about the Color Picker and enhanced Mixer tools. If it wasn't clear from the sub-heading above, you can now *sort of* share colors and palettes with the Paper community. 

As I've started to work with the picker more I'm beginning to see value in including color swatches in the margins of my drawings. It's a way of bringing clarity to the palette I use in a piece. Not only that, but it gives me a place to stash additional colors since my 6 palettes are more than filled up.

{% figure caption:"Placing color swatches off to the side for reference and sampling has its advantages." %}
![example of color palette painting in the margin](/assets/images/paper-53-color-picker-swatches.jpg)
{% endfigure %}

Aside from the new picker, the Mixer received some love by now including numeric values on each of the 3 sliders. These numbers map perfectly to HSB[^hsb] values which makes communicating the exact makeup of a color others that much easier.

{% figure class:"align-right" %}
![screenshot showing the HSB picker in Adobe Photoshop](/assets/images/photoshop-hsb.jpg)
{% endfigure %}

The HSB/HLS color models are found in most desktop graphics programs like Adobe's Photoshop. By opting to include a standardized color model in Paper it is now possible to match colors across platforms and apps. As a designer I find this especially helpful for maintaining color consistency when importing Paper PNG files into Adobe Creative Suite documents.

### Sharing color palettes on Mix

When I wrote my Mastering Paper guide for [drawing portraits]({% post_url /mastering-paper/2014-04-21-drawing-faces %}) there wasn't a good way for me to share my palettes with the community. Now with the help of Mix by FiftyThree I can share my palette[^paper-palette-template] of skin tones to be sampled and used by anyone who decides to download them. 

[^paper-palette-template]: Thanks to Dayna D. Smith for providing the great "[My Paper Palettes](https://mix.fiftythree.com/200794-Danya-D-Smith/1299445)" template that I remixed.

{% figure caption:"Download my default skin tone palette for drawing portraits." %}
[![my skin tone palette for drawing portraits](/assets/images/paper-53-skin-palette.jpg)](https://mix.fiftythree.com/11098-Michael-Rose/1376457)
{% endfigure %}

---

## What's up next

If you found this guide helpful stay tuned for the next one where I cover how the updated page fill feature works. I was going to include it in this guide but figured it would make more sense on its own.

As always feel free to leave comments below, ask questions, or [follow me on Twitter](https://twitter.com/mmistakes) and the like (links below in the footer).
