---
title: "External graphics card (eGPU)"
excerpt: "External graphics card (eGPU)"
image:
  path: &image "/assets/images/external-graphics-card-egpu-laptop-iGPU-eGPU-Optimus-feature.png"
  feature: *image
  thumbnail: "/assets/images/external-graphics-card-egpu-laptop-iGPU-eGPU-Optimus-feature-th.png"
  teaser: *image
tags: 
  - eGPU
comments: true
comments_locked: false
published: true
last_modified_at: 2015-06-03T17:38:56
redirect_from: "/external-graphics-card-egpu/"
---
For the past year I have blogged about NVIDIA based external graphics card (eGPU) setups. This post will sum up my work, findings and recommendations. First I will briefly describe the concept, then the individual parts with my recommendation and lastly links to various guides on hardware and software setup, mostly my own posts.
{% include affiliate-disclosure.html %}
If you already know the basic concepts, then you can safely skip to the [Parts](#parts) section or see my specific post on the subject [here](#setup). This post is meant as a basic introduction.

# Why an external graphics card at all?
I like the idea of having a single modular computer. When I am on the road I have a small light laptop. When I get back home I plug the laptop into my eGPU setup and suddenly I have transformed the laptop into a desktop, with upgraded graphics, USB ports, hard disks and so on. I only have to maintain a single device, the laptop. And the beauty of it all is that you can upgrade the graphics card on devices that would otherwise not be easily upgradable, like

* MacBooks
* iMacs
* Mac Minis
* Laptops with Thunderbolt 1 / 2, mini PCIe and Express cards slots

{% include notice
  type = "danger"
  content = "**A warning to the reader:** Not all combination of hardware and software will work, always use google to see if anybody else has similar hardware and gotten it to work. There is no shame in letting other people do the hard work for you! The safest thing is to buy parts you know other people have gotten to work, like I have in my blog posts."
 %}

You can also buy a finished eGPU enclosure like the [Dell Computer Alienware Graphics Amplifier](https://www.amazon.com/dp/B00PCJXN0I/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca]B00PCJXN0I[uk]B00VTV4UQ4[de][es][it][fr]B0183T2Y30"}, but I have no experience with this and it only works on certain Alienware laptops.

# Simplified overview
Lets assume that a laptop is a device that communicates to various components through a PCIe bus. And lets assume that the laptop is Optimus enabled and has two graphics cards.
{% include figure
  image_path="/assets/images/external-graphics-card-egpu-laptop-simplified.svg"
  caption="A simplified drawing of a laptop in regards to external connections and graphics cards"
%}
What is important to notice here is that we can have an integrated graphics card (iGPU) and / or a dedicated graphics card (dGPU). If both cards are present, then the iGPU will be used during normal usage and the dGPU when more graphic intensive tasks are executed. Notice that only the iGPU is connected to the LCD display, we will get back to this later and how it can be used in external graphics card setups.

Devices can be connected directly to the PCIe bus through external connections on the laptop. For external graphic card (eGPU) usages these are typically Thunderbolt, ExpressCard and Mini PCIe. An external graphics card setup merely takes advantage of this fact and attaches a graphics card outside the laptop through these connections.
{% include figure
  image_path="/assets/images/external-graphics-card-egpu-eGPU-external-monitor.svg"
  caption="External graphics card setup (eGPU) using an external monitor"
%}

In the above example the laptop now sees three graphics cards, where the eGPU is connected to an external monitor. The laptop communicates through the PCIe bus which is extended through a Thunderbolt connection and sends data to the eGPU which in turn displays data on the external monitor. This is an example of a eGPU setup using and external monitor.

What if we could eliminate the external monitor and use the internal LCD display? How is this even possible when the LCD display is only connected to the iGPU? NVIDIA and Intel solves this by using a technology known as [Optimus](https://en.wikipedia.org/wiki/Nvidia_Optimus). When a laptop is using its dedicated GPU (NVIDIA), it actually sends the data to display to the iGPU (Intel) which in turn sends to the LCD display. Therefore the iGPU is always responsible for displaying the output no matter which graphics card is used.
{% include figure
  image_path="/assets/images/external-graphics-card-egpu-laptop-iGPU-dGPU-Optimus.svg"
  caption="Using Optimus the dGPU sends data to be displayed to the iGPU"
%}
Attach another NVIDIA GPU externally to the PCIe bus and we can take advantage of this technology by letting the eGPU send data to the iGPU!
{% include figure
  image_path="/assets/images/external-graphics-card-egpu-laptop-iGPU-eGPU-Optimus.svg"
  caption="External graphics card setup (eGPU) using the internal LCD display"
%}

Now the eGPU is sending the data to be displayed through the Thunderbolt connection to the iGPU which in turn sends it to the LCD display. This is known as an internal / Optimus eGPU setup.
{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-corning-cable-1024.jpg"
  caption="The external graphics card does not even need to be close to the laptop!"
%}

Using an external monitor is the easiest to configure and setup. It has less requirements than using the internal laptop monitor. Accelerating the internal laptop screen using an eGPU setup requires integrated graphics from Intel that is [Optimus](https://en.wikipedia.org/wiki/Nvidia_Optimus) compatible, NVIDIA graphics card and Windows. If running OS X then only the external monitor solution is supported.
There are workarounds and hacks on the internet if you don't meet the above requirements to get the internal LCD working with an eGPU setup, but that is outside the scope of this post.

# Parts
To be able to plugin a graphics card externally you need

1. A computer that has a Thunderbolt / ExpressCard / Mini PCIe port or slot.
2. A PCIe enclosure that converts a Thunderbolt / ExpressCard / Mini PCIe connection into a standard [PCIe slot](http://en.wikipedia.org/wiki/PCI_Express).
3. A graphics card
4. A power supply
5. Computer case (optional)
6. External monitor (optional)

If you are reading this post you most likely have everything already except a PCIe enclosure.
## Computer
First you need a device that can use an external graphics card. I would strongly recommend a device that has a Thunderbolt 2 port, but Thunderbolt 1, mini PCIe and Express card can also work at lower speeds / performance. It can be more difficult and / or impossible for an external eGPU setup to work you have a lot of memory in your laptop and / or a discrete GPU so be sure to check on google if that combination works.  
I use a 13 inch Retina MacBook Pro (late 2013 model) with 16 GB memory and would recommend the newest <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=Retina+MacBook+Pro&tag=oddoneout0a-20" rel="nofollow">Retina MacBook Pro<&#47;a> without a discrete GPU (only Intel Iris Pro) or <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=MacBook+Air&tag=oddoneout0a-20" rel="nofollow">MacBook Air<&#47;a>. I also have had very good experience with my old Lenovo T430s, but this has only a Thunderbolt 1 port. Be very sure you get the correct model, not all models have the Thunderbolt port.<br />
If you want to be able to use an NVIDIA graphics card to run an eGPU setup without an external monitor, then make sure the device supports Optimus. This requires an internal GPU (iGPU) from Intel.</p>
<h3>PCIe enclosure<&#47;h3><br />
The heart of it all, a PCIe enclosure enables us to connect regular PCIe cards like graphics cards through Thunderbolt, mini PCIe or Express card. I highly recommend the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00LTAUTHE&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU">AKiTiO Thunder2 PCIe box<&#47;a> if you have a Thunderbolt port, it works and is very cheap compared to other PCIe enclosures I have used. You can spend twice to four times as much getting other enclosures, but it is not worth it in my opinion. I have previously used the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00FMJPWFW&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00FMJPWFW">Sonnet Echo Express SE II<&#47;a> with two PCIe ports, but I had a lot of trouble getting graphics card to work, most likely because of the two PCIe ports instead of one. The price is also 2-3 times higher than the AKiTiO Thunder2. If you don't have a Thunderbolt port, then I recommend the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00GWM5ZLO&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00GWM5ZLO[ca][uk][de][es][it][fr]">Bplus PE4L-EC060A<&#47;a> if you have an Express card or the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00S4M2UKO&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00S4M2UKO[ca][uk][de][es][it][fr]">Bplus PE4L-PM060A<&#47;a> if you have a mini PCIe slot, it is only a third of the cost of a AKiTiO Thunderbolt solution! The bandwidth is only a quarter of the AKiTiO Thunder2, but it will still give you a nice boost in graphical power.</p>
<h3>Graphics card<&#47;h3><br />
My recommendations here are based on experience, both my own and from the eGPU community. Any recent <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=nvidia+geforce&tag=oddoneout0a-20" rel="nofollow">NVIDIA card<&#47;a> should work fine, both with an external monitor and the internal laptop screen through Optimus. <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=evga+nvidia+geforce&tag=oddoneout0a-20" rel="nofollow">EVGA branded NVIDIA cards<&#47;a> are powered different internally and work better for eGPU setups. Before I used EVGA graphics cards I needed to hot plug and time when I powered on the different parts of my eGPU setup. I even needed to create my own PCIe riser cable with 12v power spliced into it from the ATX power supply, see more <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l&#47;">here<&#47;a>. To be fair, once I switched to using Windows 8 UEFI, most of the above problems went away, but I would still recommend EVGA to iron out the last few quirks.</p>
<h3>Power supply<&#47;h3><br />
Any <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=modular+atx+psu&tag=oddoneout0a-20" rel="nofollow">modular ATX power supply<&#47;a> with enough power to drive the graphics card(s) and enough PCIe power connectors for the chosen card(s). Optionally you might need a powered <a href="http:&#47;&#47;www.moddiy.com&#47;products&#47;PCI%252dExpress-PCI%252dE-8X-to-16X-Riser-Card-Flexible-Ribbon-Extender-Cable-w%7B47%7DMolex-%252b-Solid-Capacitor.html">PCIe riser<&#47;a> if the PCIe port cannot supply 75 watts of power and the graphics card cannot get enough power from the PCIe power connectors alone. If unsure, just get one!</p>
<p>An example from one of my comments on the subject:</p>
<blockquote><p>The power supply should be fine, it has a single PCIe connector which you need to power the GTX 960. However, since the GTX 960 only has a single 6pin PCIe connector (according to the tech specs <a href="http:&#47;&#47;us.msi.com&#47;product&#47;vga&#47;GTX-960-2GD5T-OC.html#hero-specification">here<&#47;a>) and the AKiTiO Thunder2 is limited to 25 watt from the PCIe port, you only have 75 + 25 = 100 watts total to power your card. Most posts on the internet agree that you need at least 125 watts of power as described <a href="http:&#47;&#47;www.guru3d.com&#47;articles-pages&#47;msi-geforce-gtx-960-gaming-oc-review,7.html">here<&#47;a>.</p>
<p>Therefore you need to buy a powered molex PCIe riser to be able to supply up to 75 watts on the PCIe port on the AKiTiO Thunder2 which would bring the total up to a safe 150 watts. The ones I use and recommend can be bought <a href="http:&#47;&#47;www.moddiy.com&#47;products&#47;PCI%252dExpress-PCI%252dE-8X-to-16X-Riser-Card-Flexible-Ribbon-Extender-Cable-w%7B47%7DMolex-%252b-Solid-Capacitor.html">here<&#47;a>.</p>
<p>You can also find similar items on Amazon (search for "<a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=pcie+riser+powered+capacitor&tag=oddoneout0a-20" rel="nofollow">pcie riser powered capacitor<&#47;a>", but the quality might vary. If you don&rsquo;t follow my recommendation then at least make sure that the riser:</p>
<ul>
<li>Is x8 or x16 to x16<&#47;li>
<li>Is powered (molex)<&#47;li>
<li>Has a capacitor<&#47;li>
<li>Has good reviews<&#47;li><br />
<&#47;ul><br />
<&#47;blockquote></p>
<h3>Case (optional)<&#47;h3><br />
The easiest way is to find a small PC case where you can fit the eGPU setup with enough ventilation. If you have chosen the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00GWM5ZLO&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00GWM5ZLO[ca][uk][de][es][it][fr]">Bplus PE4L-EC060A<&#47;a> or <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00S4M2UKO&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00S4M2UKO[ca][uk][de][es][it][fr]">Bplus PE4L-PM060A<&#47;a> as a PCIe enclosure you can get the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00L9UZVKO&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us]B00L9UZVKO[ca][uk][de][es][it][fr]">Bplus DIY box<&#47;a> as I have used before <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;external-graphics-card-experiment-part-1&#47;">here<&#47;a>. I have chosen to build my own exoskeleton cases using <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=OpenBeam&tag=oddoneout0a-20" rel="nofollow">OpenBeam<&#47;a> and <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=MakerBeam&tag=oddoneout0a-20" rel="nofollow">MakerBeam<&#47;a> construction kits as described <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii&#47;">here<&#47;a> and <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l&#47;">here<&#47;a>.</p>
<h3>External monitor&nbsp;(optional)<&#47;h3><br />
Use the one you already have. If you want to purchase one specifically for the eGPU setup I recommend the following</p>
<ul>
<li>Should have more than one connection input. The reasoning behind this is that I like to have my eGPU always connected to my external monitor, but when I am just working I like to connect the laptop directly to the monitor. Hence at least two inputs.<&#47;li>
<li>If used for gaming purposes, the resolution of the monitor should be something the eGPU setup can handle.<&#47;li><br />
<&#47;ul><br />
<a name="setup"><&#47;a></p>
<h1>Hardware setup<&#47;h1><br />
For <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00LTAUTHE&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU">AKiTiO Thunder2<&#47;a> based setups, please see my post <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;thunderbolt-2-egpu-setup-using-akitio-thunder2&#47;">here<&#47;a>. A deprecated setup using <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00FMJPWFW&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00FMJPWFW">Sonnet Echo Express SE II<&#47;a> can be seen <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l&#47;">here<&#47;a>. If using the PE4L, please see my post <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;external-graphics-card-experiment-part-1&#47;">here<&#47;a>.</p>
<h1>Software setup<&#47;h1></p>
<ul>
<li><a href="https:&#47;&#47;odd-one-out.serek.eu&#47;windows-10-egpu-setup-optimus&#47;">Windows 10 Optimus setup<&#47;a>. Recommended setup.<&#47;li>
<li><a href="https:&#47;&#47;odd-one-out.serek.eu&#47;thunderbolt-2-egpu-setup-using-akitio-thunder2&#47;">AKiTiO Thunder2 using Windows 8 UEFI<&#47;a>. Recommended, UEFI just makes everything easier! Check <a href="http:&#47;&#47;www.thewindowsclub.com&#47;check-if-uefi-or-bios">this<&#47;a> post to see if you are running BIOS or (U)EFI.<&#47;li>
<li><a href="https:&#47;&#47;odd-one-out.serek.eu&#47;egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el&#47;">PE4L using Windows 7 BIOS and DIY eGPU setup 1.30<&#47;a>.&nbsp;DIY eGPU setup is recommended when a workaround is needed to get the setup to work. Can disable&nbsp;the discrete GPU and rearrange devices in PCI space to free some much-needed memory and avoid the dreaded "error 12"<&#47;li>
<li><a href="https:&#47;&#47;odd-one-out.serek.eu&#47;egpu-osx-maverick-nvidia-gtx-760-using-pe4l&#47;">PE4L using OS X 10.9 (Maverick)<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;www.journaldulapin.com&#47;2014&#47;12&#47;04&#47;a-nvidia-maxwell-card-with-thunderbolt-on-a-mac-running-yosemite&#47;">OS X10.10 (Yosemite) using NVIDIA Maxwell cards<&#47;a><&#47;li><br />
<&#47;ul></p>
<h1>Help and support<&#47;h1><br />
There is a large eGPU community out there. For the best help and support please visit these&nbsp;sites:</p>
<ul>
<li><a href="https:&#47;&#47;forum.techinferno.com&#47;index.php?&#47;forums&#47;forum&#47;83-diy-e-gpu-projects&#47;">TechInferno<&#47;a>: Perhaps the biggest source of info on DIY eGPU setups. This is the first place to look for answers<&#47;li>
<li><a href="https:&#47;&#47;egpu.io&#47;diy-egpu-setup-1-30-nando4&#47;">DIY eGPU setup<&#47;a>: Software created by Nando4 which make can make otherwise impossible eGPU combinations work!<&#47;li>
<li><a href="http:&#47;&#47;www.journaldulapin.com">Journaldulapin.com<&#47;a>: A few good posts on getting OS X (<a href="http:&#47;&#47;www.journaldulapin.com&#47;2013&#47;08&#47;24&#47;a-thunderbolt-gpu-on-a-mac-how-to&#47;">Maverick<&#47;a>, <a href="http:&#47;&#47;www.journaldulapin.com&#47;2014&#47;12&#47;04&#47;a-nvidia-maxwell-card-with-thunderbolt-on-a-mac-running-yosemite&#47;">Yosemite<&#47;a>) working with eGPU setups<&#47;li><br />
<&#47;ul><br />
Please leave a comment if you feel I have missed something or just want to ask a question.</p>
<p><strong>UPDATE: 13-06-2015<&#47;strong><br />
Good news, it seems Thunderbolt 3 will officially support graphics cards, including hot plugging the card, read more <a href="http:&#47;&#47;www.anandtech.com&#47;show&#47;9331&#47;intel-announces-thunderbolt-3">here<&#47;a>.</p>
<p><strong>UPDATE: 30-01-2016<&#47;strong><br />
Added link to Windows 10 Optimus setup</p>
