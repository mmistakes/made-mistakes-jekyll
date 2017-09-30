---
title: DIY Ambilight without a pc
excerpt: DIY Ambilight that does not have to be attached to a PC
image:
  path: &image /assets/images/diy-ambilight-without-pc-effect.jpg
  feature: *image
  thumbnail: /assets/images/diy-ambilight-without-pc-effect-th.jpg
  teaser: *image
gallery_red_green:
  - url: /assets/images/diy-ambilight-without-pc-red-image.jpg
    image_path: /assets/images/diy-ambilight-without-pc-red-image.jpg
    alt: Red image
    title: Red image
  - url: /assets/images/diy-ambilight-without-pc-green-image.jpg
    image_path: /assets/images/diy-ambilight-without-pc-green-image.jpg
    alt: Green image
    title: Green image
gallery_blue_black:
  - url: /assets/images/diy-ambilight-without-pc-blue-image.jpg
    image_path: /assets/images/diy-ambilight-without-pc-blue-image.jpg
    alt: Blue image
    title: Blue image
  - url: /assets/images/diy-ambilight-without-pc-black-image.jpg
    image_path: /assets/images/diy-ambilight-without-pc-black-image.jpg
    alt: Black image
    title: Black image
tags: [OpenBeam, Ambilight]
comments: true
comments_locked: false
published: true
last_modified_at: 2014-07-26T22:24:00-04:00
---
Ever wished you had Philips Ambilight for your tv or monitor? Well, make it yourself and save a buck or two! This post uses the ambi-tv system to create an Ambilight clone.

{% include figure 
  image_path="assets/images/diy-ambilight-without-pc-effect.jpg" 
  caption="Example of my DIY Ambilight setup" 
%}

Here is an example of the finished ambi-tv setup in action using a test demo.
{% youtube IKc895J9n-0 %}

Here you can see the setup using a real video. The video is from [sintel.org](http://www.sintel.org/), although not the best showcase of ambi-tv, it is the least likely to get me in trouble over copyright. I can reveal that the setup looks wonderful using the official Philips Ambilight demo video found [here](https://www.youtube.com/watch?v=jV8IFZ5Sa_k)
{% youtube Z-F1kWZpApU %}

It simply needs a HDMI input to work, no other computers than the Raspberry Pi doing all the processing and controlling the LEDs behind the tv. The whole setup is around 310 USD to make since I live in Europe, if you live in the States or Asia it is cheaper to get the parts. See this excellent video from the maker of the ambi-tv system to get more information: [https://www.youtube.com/watch?v=8cpQpGYtjR0](https://www.youtube.com/watch?v=8cpQpGYtjR0)
## Hardware list
{% include affiliate-disclosure.html %}

* [Raspberry Pi revision B](https://www.amazon.com/dp/B009SQQF9C/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B009SQQF9C[de]B00LPESRUK[uk]B00KKUS3RM[ca]B00AKQA0X6"} (60 USD)
  * **UPDATE 01-04-2015:** I strongly recommend to get the new [Raspberry Pi 3 Model B](https://www.amazon.com/dp/B01CD5VC92/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][de][uk][es][it][fr][ca]B01CD5VC92"} which has 6 times more processing power and twice the ram than the model I have used for the same price!
* [König 2 way HDMI splitter](https://www.amazon.com/dp/B002V2WYK4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B002V2WYK4"} (60 USD)
* 3 meters of [LPD8806 LED strip](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=LPD8806+LED+strip&tag=oddoneout0a-20){:rel="nofollow"} (generic brand from China) (55 USD)
* EasyCAP DC60 - USB 2.0 (fake copy from China, need one using the Fushicai chipset) (15 USD)
* [HDMI to AV composite converter](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=HDMI+to+AV+composite+converter&tag=oddoneout0a-20){:rel="nofollow"} (17 USD)
* [5V 10A powersupply](http://www.adafruit.com/product/658){:rel="nofollow"} (30 USD)
* [OpenBeam beams, brackets and nuts & bolts](https://www.amazon.com/dp/B00G3J6GDM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00G3J6GDM"} (optional) (40 USD)
* [Outlet power strip which automatically power devices on / off with the tv](https://www.av-cables.dk/elspareskinne/) (optional) (30 USD)
* Miscellaneous cables (5 USD)

## Hardware and software setup
I will not go into details, but follow this guide here: [https://github.com/gkaindl/ambi-tv](https://github.com/gkaindl/ambi-tv). Some additional information

### Hardware

1. Make sure the LED strip and Raspberry PI share the same powersupply / grounds. I got very erratic results before I did this

### Software

1. Download the 2013-07-26-wheezy-raspbian image and use this to build your image. I had problems building the USB driver for the tv-grabber using newer images. Don't even do a dist-upgrade, but you should be able to do this after getting the USB driver to work (untested, I did not do the dist upgrade)
2. Green and blue colors were switched so I followed these instruction to fix it: [https://github.com/gkaindl/ambi-tv/issues/14](https://github.com/gkaindl/ambi-tv/issues/14)
3. I cropped the borders until the flickering of lights stopped (slowly increase Crop-* in the v4l2-grab-source section of ambi.conf).
4. I increased blended-frames which introduces slight lag in the Ambilight, this is on purpose as this gives me a smoother effect during movies
5. The image auto logins and starts ambi-tv. Press CTRL+C to quit and edit the settings

You can download my [image](https://www.dropbox.com/s/4947g5meatfvbm2/ambi-tv.gz?dl=1) if you want to skip step 1-5. Login and password pi / pi. Just remember to edit the ambi-tv.conf file to suit your needs. To write the image to an SD-card, use [Win32 Disk Imager](http://sourceforge.net/projects/win32diskimager/). You need to use a SD card of at least 4GB. If you use a SD card greater than 4GB you can resize the image using [this](http://softwarebakery.com/shrinking-images-on-linux) guide if you want to increase the size of the root partition.
This finished setup can be seen here, I still need to hide all the mess behind the tv

{% include figure
  image_path="/assets/images/diy-ambilight-without-pc-setup-leds.jpg"
  caption="LEDs using OpenBeam construction kit. All LEDs are angled at 45 degrees outwards"
%}

{% include figure
  image_path="/assets/images/diy-ambilight-without-pc-setup-back.jpg"
  caption="The OpenBeams are attached to the tv using an old wall mount. The LED strips are attached using strips"
%}

{% include figure
  image_path="/assets/images/diy-ambilight-without-pc-setup-the-rest.jpg"
  caption="Lots of messy cables and boxes, I plan to hide this behind the tv at some point. Not everything belongs to the ambi-tv setup"
%}

## Accuracy
Color accuracy is not perfect, but works well enough that I have no need to tweak it further. I expect tweaking the gamma setting in ambi.conf can get me better results.

{% include gallery 
  id="gallery_red_green" 
  caption="Red and green image. The green color is slightly off" 
%}

{% include gallery
  id="gallery_blue_black"
  caption="Blue and black image (lights are all off). The red light in the lower left corner is from the HDMI switch"
%}

The accuracy regarding what to show is good enough not to need any tweaking, but the ambi-tv.conf can be tweaked to increase accuracy.

{% include figure
  image_path="/assets/images/diy-ambilight-without-pc-accuracy.jpg"
  caption="Accuracy of displayed color according to the screen. Can be perfected using the 'led-inset-top' option in ambi.conf"
%}

## Lag
Using [this](https://www.youtube.com/watch?v=sr_vL2anfXA) youtube video as shown in the beginning of the post I tested the lag on the ambi-tv. If the "blended-frame" variable in ambi.conf is set quite low there is no lag on a Raspberry Pi as you can see again on this video.
{% youtube IKc895J9n-0 %}
As stated before, I use a rather high "blended-frames" to introduce higher lag to have a more smooth transition during movies.

## Limitations

* The ambi-tv setup turns on when the tv turns on because of the attached standby power controller, but startup delay is around 1 minute, which is the time my standby power controller turns on the Raspberry Pi and boots into the operating system. Minor issue
* Up to several minutes when turning off the tv before the ambilight turns off. This is limited by my standby power controller or the tv not entering a low power state right away. One could implement some code that detects when all LEDs are blue (no signal) for more than 10 seconds and turn the LEDs off.
* No remote control support for changing ambi-tv settings. This should be fairly easy using lirc and some IR receiver
* Some flickering of LED light depending on settings

## What next?

* Calibrate color accuracy for better results, starting with gamma correction
* IR setup to remotely change ambilight setting. At the moment it default to edge settings when turing on the tv
* With Philips ambilight tv's it is possible to connect [Philips Hue](https://www.amazon.com/dp/B00BSN8DN4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00BSN8DN4[de][uk]B00ID6US3M[es][it][fr]B016151IRQ[ca]B01BGJN81G"} light-bulbs and extend the ambilight effect beyond the immediate area around the tv. I should be able to do something similar with this DIY ambilight setup
* Cleanup the mess behind the tv
* I would like to replace the software with something written in C# since that is what I prefer to tinker with
* For a "mere" 2000 USD I can get the new Philips 60 inch ambilight tv, [Elevation](http://www.slashgear.com/philips-elevation-ambilighthue-tv-eyes-on-06296712/), and for 200 USD more a [Philips Hue](https://www.amazon.com/dp/B00BSN8DN4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00BSN8DN4[de][uk]B00ID6US3M[es][it][fr]B016151IRQ[ca]B01BGJN81G"} lightbulb set. A bit more than the 300 USD total the ambi-tv costs, but when I do feel the urge to upgrade the size of the tv, it might as well be a Philips tv with ambilight
