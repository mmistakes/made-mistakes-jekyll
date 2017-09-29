---
title: "DIY Ambilight without a pc"
excerpt: "Some excerpt"
image:
  path: &image "/assets/images/posts/2014-07-26-diy-ambilight-without-pc/Effect.jpg"
  feature: *image
  thumbnail: "/assets/images/posts/2014-07-26-diy-ambilight-without-pc/Effect.jpg"
  teaser: "/assets/images/posts/2014-07-26-diy-ambilight-without-pc/Effect.jpg"
tags: [OpenBeam, Ambilight]
comments: true
last_modified_at: 2014-07-26T22:24:00-04:00
---
Ever wished you had Philips Ambilight for your tv or monitor? Well, make it yourself and save a buck or two! This post uses the ambi-tv system to create an Ambilight clone.

<figure class="large">
  <img src="/assets/images/posts/2014-07-26-diy-ambilight-without-pc/Effect.jpg" alt="Example of my DIY Ambilight setup">
  <figcaption>Example of my DIY Ambilight setup</figcaption>
</figure>

![Example of my DIY Ambilight setup](/assets/images/posts/2014-07-26-diy-ambilight-without-pc/Effect.jpg)

Here is an example of the finished ambi-tv setup in action using a test demo.
<div class="youtube-player" data-id="IKc895J9n-0"></div>
<p>Here you can see the setup using a real video. The video is from <a href="http://www.sintel.org/">sintel.org</a>, although not the best showcase of ambi-tv, it is the least likely to get me in trouble over copyright. I can reveal that the setup looks wonderful using the official Philips Ambilight demo video found <a href="https://www.youtube.com/watch?v=jV8IFZ5Sa_k">here</a></p>
<div class="youtube-player" data-id="Z-F1kWZpApU"></div>
<p>It simply needs a HDMI input to work, no other computers than the Raspberry Pi doing all the processing and controlling the LEDs behind the tv. The whole setup is around 310 USD to make since I live in Europe, if you live in the States or Asia it is cheaper to get the parts. See this excellent video from the maker of the ambi-tv system to get more information: <a href="https://www.youtube.com/watch?v=8cpQpGYtjR0">https://www.youtube.com/watch?v=8cpQpGYtjR0</a></p>
<h2>Hardware list</h2>
<p>[aDisclaimer]</p>
<ul>
<li><a href="https://www.amazon.com/dp/B009SQQF9C/?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B009SQQF9C[de]B00LPESRUK[uk]B00KKUS3RM[ca]B00AKQA0X6">Raspberry Pi revision B</a> (60 USD)<br />
<strong>UPDATE 01-04-2015: </strong>I strongly recommend to get the new <a href="https://www.amazon.com/dp/B01CD5VC92/?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][de][uk][es][it][fr][ca]B01CD5VC92">Raspberry Pi 3 Model B</a> which has 6 times more processing power and twice the ram than the model I have used for the same price!</li>
<li><a href="https://www.amazon.com/dp/B002V2WYK4/?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B002V2WYK4">König 2 way HDMI splitter</a> (60 USD)</li>
<li>3 meters of <a href="https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=LPD8806+LED+strip&tag=oddoneout0a-20" rel="nofollow">LPD8806 LED strip</a> (generic brand from China) (55 USD)</li>
<li>EasyCAP DC60 - USB 2.0 (fake copy from China, need one using the Fushicai chipset) (15 USD)</li>
<li><a href="https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=HDMI+to+AV+composite+converter&tag=oddoneout0a-20" rel="nofollow">HDMI to AV composite converter</a> (17 USD)</li>
<li><a href="http://www.adafruit.com/product/658">5V 10A powersupply</a> (30 USD)</li>
<li><a href="https://www.amazon.com/dp/B00G3J6GDM/?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00G3J6GDM">OpenBeam beams, brackets and nuts & bolts</a> (optional) (40 USD)</li>
<li><a href="https://www.av-cables.dk/elspareskinne/">Outlet power strip which automatically power devices on / off with the tv</a> (optional) (30 USD)</li>
<li>Miscellaneous cables (5 USD)</li>
</ul>
<h2>Hardware and software setup</h2>
<p>I will no go into details, but follow this guide here: <a href="https://github.com/gkaindl/ambi-tv">https://github.com/gkaindl/ambi-tv</a>. Some additional information</p>
<p><b>Hardware</b></p>
<ol>
<li>Make sure the LED strip and Raspberry PI share the same powersupply / grounds. I got very erratic results before I did this</li>
</ol>
<p><b>Software </b></p>
<ol>
<li>Download the 2013-07-26-wheezy-raspbian image and use this to build your image. I had problems building the USB driver for the tv-grabber using newer images. Don't even do a dist-upgrade, but you should be able to do this after getting the USB driver to work (untested, I did not do the dist upgrade)</li>
<li>Green and blue colors were switched so I followed these instruction to fix it: <a href="https://github.com/gkaindl/ambi-tv/issues/14">https://github.com/gkaindl/ambi-tv/issues/14</a></li>
<li>I cropped the borders until the flickering of lights stopped (slowly increase Crop-* in the v4l2-grab-source section of ambi.conf).</li>
<li>I increased blended-frames which introduces slight lag in the Ambilight, this is on purpose as this gives me a smoother effect during movies</li>
<li>The image auto logins and starts ambi-tv. Press CTRL+C to quit and edit the settings</li>
</ol>
<p>You can download my <a href="https://www.dropbox.com/s/4947g5meatfvbm2/ambi-tv.gz?dl=1">image</a> if you want to skip step 1-5. Login and password pi / pi. Just remember to edit the ambi-tv.conf file to suit your needs. To write the image to an SD-card, use <a href="http://sourceforge.net/projects/win32diskimager/">Win32 Disk Imager</a>. You need to use a SD card of at least 4GB. If you use a SD card greater than 4GB you can resize the image using <a href="http://softwarebakery.com/shrinking-images-on-linux">this</a> guide if you want to increase the size of the root partition.</p>
<p>This finished setup can be seen here, I still need to hide all the mess behind the tv</p>
<p>[caption id="" align="alignnone" width="640"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Setup-LEDs.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Setup-LEDs.jpg" alt="" width="640" height="480" border="0" /></a> LEDs using OpenBeam construction kit. All LEDs are angled at 45 degrees outwards.[/caption]</p>
<p>[caption id="" align="alignnone" width="640"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Setup-back.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Setup-back.jpg" alt="" width="640" height="428" border="0" /></a> The OpenBeams are attached to the tv using an old wall mount. The LED strips are attached using strips.[/caption]</p>
<p>[caption id="" align="aligncenter" width="480"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Setup-the_rest.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Setup-the_rest.jpg" alt="" width="480" height="640" border="0" /></a> Lots of messy cables and boxes, I plan to hide this behind the tv at some point. Not everything belongs to the ambi-tv setup[/caption]</p>
<h2>Accuracy</h2>
<p>Color accuracy is not perfect, but works well enough that I have no need to tweak it further. I expect tweaking the gamma setting in ambi.conf can get me better results.</p>
<p>[caption id="" align="aligncenter" width="320"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_red.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_red.jpg" alt="" width="320" height="211" border="0" /></a> Red image[/caption]</p>
<p>[caption id="" align="aligncenter" width="320"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_green.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_green.jpg" alt="" width="320" height="209" border="0" /></a> Green image. The color is slightly off[/caption]</p>
<p>[caption id="" align="aligncenter" width="320"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_blue.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_blue.jpg" alt="" width="320" height="212" border="0" /></a> Blue image[/caption]</p>
<p>[caption id="" align="aligncenter" width="320"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_black.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/Color_accuracy_black.jpg" alt="" width="320" height="213" border="0" /></a> Black image, the lights are all off. The red light in the lower left corner is from the HDMI switch[/caption]</p>
<p>The accuracy regarding what to show is good enough not to need any tweaking, but the ambi-tv.conf can be tweaked to increase accuracy</p>
<p>[caption id="" align="aligncenter" width="640"]<a style="margin-left: auto; margin-right: auto;" href="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/ACC03.jpg"><img src="https://odd-one-out.serek.eu/wp-content/uploads/2014/07/ACC03.jpg" alt="" width="640" height="480" border="0" /></a> Accuracy of displayed color according to the screen. Can be perfected using the "led-inset-top" option in ambi.conf[/caption]</p>
<h2>Lag</h2>
<p>Using <a href="https://www.youtube.com/watch?v=sr_vL2anfXA">this</a> youtube video as shown in the beginning of the post I tested the lag on the ambi-tv. If the "blended-frame" variable in ambi.conf is set quite low there is no lag on a Raspberry Pi as you can see again on this video.</p>
<div class="youtube-player" data-id="IKc895J9n-0"></div>
<p>As stated before, I use a rather high "blended-frames" to introduce higher lag to have a more smooth transition during movies.</p>
<h2>Limitations</h2>
<ul>
<li>The ambi-tv setup turns on when the tv turns on because of the attached standby power controller, but startup delay is around 1 minute, which is the time my standby power controller turns on the Raspberry Pi and boots into the operating system. Minor issue</li>
<li>Up to several minutes when turning off the tv before the ambilight turns off. This is limited by my standby power controller or the tv not entering a low power state right away. One could implement some code that detects when all LEDs are blue (no signal) for more than 10 seconds and turn the LEDs off.</li>
<li>No remote control support for changing ambi-tv settings. This should be fairly easy using lirc and some IR receiver</li>
<li>Some flickering of LED light depending on settings</li>
</ul>
<h2>What next?</h2>
<ul>
<li>Calibrate color accuracy for better results, starting with gamma correction</li>
<li>IR setup to remotely change ambilight setting. At the moment it default to edge settings when turing on the tv</li>
<li>With Philips ambilight tv's it is possible to connect <a href="https://www.amazon.com/dp/B00BSN8DN4/?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00BSN8DN4[de][uk]B00ID6US3M[es][it][fr]B016151IRQ[ca]B01BGJN81G">Philips Hue</a> light-bulbs and extend the ambilight effect beyond the immediate area around the tv. I should be able to do something similar with this DIY ambilight setup</li>
<li>Cleanup the mess behind the tv</li>
<li>I would like to replace the software with something written in C# since that is what I prefer to tinker with</li>
<li>For a "mere" 2000 USD I can get the new Philips 60 inch ambilight tv, <a href="http://www.slashgear.com/philips-elevation-ambilighthue-tv-eyes-on-06296712/">Elevation</a>, and for 200 USD more a <a href="https://www.amazon.com/dp/B00BSN8DN4/?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00BSN8DN4[de][uk]B00ID6US3M[es][it][fr]B016151IRQ[ca]B01BGJN81G">Philips Hue</a> lightbulb set. A bit more than the 300 USD total the ambi-tv costs, but when I do feel the urge to upgrade the size of the tv, it might as well be a Philips tv with ambilight</li>
</ul> 
