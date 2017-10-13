---
title: "eGPU using Sonnet Echo Express SE II"
excerpt: "Thunderbolt 2 eGPU built around the Sonnet Echo Express SE II and PE4L"
image:
  path: &image "/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-feature-th.jpg"
  teaser: *image
tags:
  - eGPU
  - OpenBeam
comments: true
comments_locked: false
published: true
last_modified_at: 2014-05-19T23:42:00
redirect_from: "/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l/"
---
I recently upgraded to a new eGPU setup which is faster than the one I describe in this [post](/projects/external-graphics-card-experiment-part-1). It is built around the Sonnet Echo Express SE II and using a long thunderbolt cable and a thunderbolt dock with HDMI enables me to have a silent gaming setup built around my laptop. Adding a hard disk frees up some much-needed space on my laptop without sacrificing hard disk speed.

{% include affiliate-disclosure.html %}

## Features

* Thunderbolt 2 bandwidth, 20 Gbps to a single device (2 PCI-E 2.0 x4 slots)
* PCI-E 2.0 x1 slot from my old [setup](/projects/external-graphics-card-experiment-part-1) (daisy chained from Sonnet thunderbolt port)
* [2x 200mm fans](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}, one for cooling the GPU, the other for cooling the laptop
* 2x SATA III ports, one used with 300GB solid state drive
* 2x USB 3.0 ports
* A large ATX PSU that powers the GPU (1200 watt, more than enough for a dual GPU setup)
* Smaller PSU that powers the sonnet and PICO psu
* Open case built using an [OpenBeam](https://www.amazon.com/dp/B00G3J6GDM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00G3J6GDM"} construction kit
* [CallDigit thunderbolt dock](https://www.amazon.com/dp/B00NIQPA30/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NIQPA30"} (USB 3.0 ports, HDMI out, ethernet, audio out etc.)
* [33 feet Corning optical thunderbolt cable](https://www.amazon.com/dp/B00HSTC496/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00HSTC496"} + thunderbolt dock to enable quite gaming

## Setup
### Parts

* [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00FMJPWFW"} thunderbolt enclosure
* [Delock PCI Express card, 2x external USB 3.0 and 2x internal SATA III](http://www.delock.de/produkte/G_89359/merkmale.html?setLanguage=en)
* [OpenBeam Precut Kit Black Anodised](https://www.amazon.com/dp/B00G3J6GDM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00G3J6GDM"}
* Additional OpenBeams parts
* [Corsair AX1200 PSU](https://www.amazon.com/dp/B008Q7HUR0/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B008Q7HUR0[de][uk][es][it][fr][ca]B008O0ZKMQ"}
* [33 feet Corning optical thunderbolt cable](https://www.amazon.com/dp/B00HSTC496/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00HSTC496"}
* [CallDigit thunderbolt dock](https://www.amazon.com/dp/B00NIQPA30/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NIQPA30"}
* PCI-E riser (x4 to x8), modified to enable pci delay
* [2x 200mm Antec Bigboy fans](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca] B000V6FKGM"}
* 0,5m thunderbolt cable
* [Gigabyte GeForce GTX 760 2GB (GV-N760OC-2GD (REV. 2.0))](https://www.amazon.com/dp/B00H707RP2/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00H707RP2"}
* 2,5mm DC barrel plugs and cables
* 300GB Solid State Drive
* [picoPSU-80 12V](https://www.amazon.com/dp/B005TWE5E6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B005TWE5E6[de]B0071IHQBK"}
* [PE4L](http://www.hwtools.net/Adapter/PE4L%20V2.1.html) (Parts from my old eGPU [setup](/projects/external-graphics-card-experiment-part-1))
* [Sonnet Echo Express Adapter Pro](https://www.amazon.com/dp/B0080MQJJ6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B0080MQJJ6"} (Parts from my old eGPU [setup](/projects/external-graphics-card-experiment-part-1))
* [Velleman remote control switch set](http://www.velleman.eu/products/view/?id=408364)

### The case
{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-right-back-1024.jpg"
  caption="Right / back side"
%}

1. [200mm GPU fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}
2. [200mm laptop fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}
3. [GPU](https://www.amazon.com/dp/B00H707RP2/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00H707RP2"}
4. Room for a secondary GPU (SLI or PhysX dedicated card)
5. 2x USB 3.0 ports
6. Optical thunderbolt cable plugged into the laptop
7. Thunderbolt cable connected to the PE4L
8. Power to the [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00FMJPWFW"} that powers the laptop fan and supplies power to the SATA / USB add in card and hard disk.
9. Power to the GPU via the ATX PSU

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-top-1024.jpg"
  caption="Top"
%}

1. [GPU](https://www.amazon.com/dp/B00H707RP2/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00H707RP2"}
2. Small rubber pads to keep my laptop scratch free when placing it on top of the setup
3. [200mm laptop fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}
4. [200mm GPU fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}
5. Power to the GPU via the ATX PSU
6. Power to the [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00FMJPWFW"} and a [picoPSU-80](https://www.amazon.com/dp/B005TWE5E6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de]B0071IHQBK[us]B005TWE5E6"} that powers the laptop fan and supplies power to the SATA / USB add in card and hard disk.

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-front-1024.jpg"
  caption="Front"
%}

1. [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00FMJPWFW"}
2. [picoPSU-80](https://www.amazon.com/dp/B005TWE5E6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de]B0071IHQBK[us]B005TWE5E6"}
3. [ATX PSU](https://www.amazon.com/dp/B008Q7HUR0/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B008Q7HUR0[es][it][fr][ca][de][uk]B008O0ZKMQ"}
4. [Sonnet Echo Express Adapter Pro](https://www.amazon.com/dp/B0080MQJJ6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B0080MQJJ6"} (Used for the PE4L, not plugged in the picture)
5. SSD
6. [GPU](https://www.amazon.com/dp/B00H707RP2/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00H707RP2"}
7. [200mm laptop fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}
8. [200mm GPU fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-left-1024.jpg"
  caption="Left side"
%}

1. [picoPSU-80](https://www.amazon.com/dp/B005TWE5E6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de]B0071IHQBK[us]B005TWE5E6"}
2. [ATX PSU](https://www.amazon.com/dp/B008Q7HUR0/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B008Q7HUR0[es][it][fr][ca][de][uk]B008O0ZKMQ"}
3. [Sonnet Echo Express Adapter Pro](https://www.amazon.com/dp/B0080MQJJ6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B0080MQJJ6"}. Currently not connected to the PE4L to expand with the third pci-e slot
4. [200mm laptop fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B000V6FKGM"}

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-back-1024.jpg"
  caption="Back"
%}

No description, everything has been described in the previous pictures.
#### The modified pci-e riser
I will not go into detail how I modified the PCI-E riser, but you can do the same following this [post](https://www.techinferno.com/index.php?/forums/topic/2594-mac-mini-gtx660-echo-express-w7-black-screen/). It basically cuts the 3 and 12 volt powerlines from the PCI-E slot and gets power directly from the PSU. It is only needed if you want to get the internal screen (Optimus) working under Windows 7. Windows 8 is plug and play, but only working to my knowledge on an external monitor.

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-pci-riser-1024.jpg"
  caption="The modified PCI-E riser cable is visible in the middle of the picture"
%}

#### The 2,5mm DC barrel plug
I used a few of these to route the power from the Sonnet PSU to a picoPSU-80 which powers the fan under the laptop and supplies extra power to the SATA / USB add in card. I could have used the ATX PSU to power the whole thing, but since I plan to remotely power on and off the GPU only using a Belkin WeMo, then it was easier just to have separate PSU's

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-barrel-plug-1024.jpg"
  caption="The power from the power brick is split between the Sonnet Echo Express SE II and the picoPSU-80 12V"
%}

#### The remote control
From my previous posts it is written that you need to power cycle the GPU when rebooting the laptop. With the 10 meter cable that can be a pain to time it correctly. The solution is simple, a small remote control to control the wall socket I use for the ATX PSU which powers the GPU.

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-remote-1024.jpg"
  caption="Simple way to power cycle the GPU remotely"
%}

### Software
With my previous setup I used a different and much more complex approach to install the software:

* Lenovo T430s (thunderbolt 1), see my previous post [here](/projects/external-graphics-card-experiment-part-1)
* Macbook Pro Retina late 2013 (thunderbolt 2). See my previous posts about this [here](/projects/egpu-rmbp-windows7-bios-nvidia-gtx-70-p4el) and [here](/projects/egpu-osx-maverick-nvidia-gtx-70-using-pe4l)

When installing games to play that I know I will only play using the eGPU setup (3D intensive), I install them to the SSD connected to the eGPU setup to save space on my laptop drive.

**UPDATE 22-06-2014**  
Getting Optimus to work was quite easy once I found these two posts, [here](https://www.techinferno.com/index.php?/forums/topic/5389-2013-15-mbp-iris-gtx76016gbps-tb2-sonnet-ee-se-ii-win-81-relentless/) and [here](https://www.techinferno.com/index.php?/forums/topic/5420-updated-2013-13-or-15-macbook-pro-thunderbolt-2-egpu-plug-and-play-optimus/). I used the [Windows 7 USB/DVD download tool](http://www.microsoftstore.com/store/msusa/html/pbPage.Help_Win7_usbdvd_dwnTool) to create a bootable USB stick with Windows 8.1N, plugged it in and booted to the OS selection menu holding down the ALT key. I choose Windows USB and installed it to my previous bootcamp partition. I then followed the steps below taken from the above posts every time I want to get Optimus working. Install bootcamp and NVIDIA drivers when booting the first time. If the external GPU does not show up in device manager, make sure you make a [full shutdown](http://www.thewindowsclub.com/force-full-shutdown-fully-reinitialize-windows-8) from Windows 8.1N and then try again.
> So I have worked out a repeatable process for getting my Optimus setup to work:
> 1. Turn off Macbook.
> 2. Power off Sonnet (I actually pull the power out of the unit). This seems to reset the state of the Sonnet to clean.
> 3. Turn off power supply to GPU.
> 4. Power on Sonnet and plug in Thunderbolt cable.
> 5. Turn on laptop holding ALT&#47;Option to allow OS selection.
> 6. When MacBook startup chime happens (a couple of seconds after power on) turn on GPU power supply.
> 7. Choose Windows from the OS selection menu.
>
> This works 3/3 times. I think the key learning is to make sure you turn off/unplug the Sonnet so any memory/state is lost from their board.
>
> Of course, if you want to use an external screen then just turn off the MacBook and make sure the Sonnet and the GPU are powered and it will just work.

The above steps have worked every time for the past few days. Notice that I don't even need to use my bootcamp partition, I can install Windows 8.1N to my SSD connected to the eGPU setup to free even more space on the laptop.

**UPDATE 23-08-2014**  
After doing a reinstall I could not get both the SATA / USB card to work alongside the eGPU. If I pulled out the SATA / USB card and followed the above steps everything worked fine, with the SATA / USB card I got an error 12. To solve this problem I did a DSDT override using this [guide](https://www.techinferno.com/index.php?/forums/topic/5874-guide-dsdt-override-to-fix-error-12/#comment-91134), remember to enable test signing. When compiling the file you might get some errors, for my macbook pro 13 retina (late 2013 model) I got the error "syntax error, unexpected PARSEOP NOTIFY, expecting ',' or ')'". To solve this I changed the line with the error from
```xml
If (LEqual (PARM, 0x01))
{
   Or (\_SB.PCI0.AUDE, 0x20, \_SB.PCI0.AUDE)
   \_SB.PCI0.HDAU.ASTR (\_SB.PCI0.HDAU.AINI (\_SB.PCI0.HDAU.CXDC ()), Notify (\_SB.PCI0, 0x00))
}
```

to

```xml
If (LEqual (PARM, 0x01))
{
  Or (\_SB.PCI0.AUDE, 0x20, \_SB.PCI0.AUDE)
  \_SB.PCI0.HDAU.ASTR ()
  \_SB.PCI0.HDAU.AINI ()
  \_SB.PCI0.HDAU.CXDC ()
  Notify (\_SB.PCI0, 0x00)
}
```
{% include notice
  type = "danger"
  content= "**A word of warning:** I have no idea if my fix is the correct one, but it seems to be working fine and looks the same as [here](http://pastebin.com/Mdqma8CS) (search for 'HDAU.ASTR')"
 %}

**UPDATE 22-09-2014**  
After a major crash windows crash I could not the setup working again using the above steps. The one difference from I had was the default boot partition was bootcamp. I changed this back to OSX in the bootcamp control panel and then everything worked fine again

### The final product
**Internal screen accelerated**  
Boot without a HDMI / DVI cable connected to the GPU and no external monitor connected using the thunderbolt docking station

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-laptop-1024.jpg"
  caption="The laptop is getting cooled by the 200mm fan"
%}

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-corning-cable-1024.jpg"
  caption="The setup hooked up to my work laptop in the living room"
%}

**Internal screen accelerated with external monitor connected through thunderbolt**  
Boot without a HDMI / DVI cable connected to the GPU and external monitor connected using the thunderbolt docking station. Now we have two displays, the internal one and external one, both accelerated.

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-T430s-1024.jpg"
  caption="Lenovo T430s connected to the eGPU setup using the short cable…"
%}

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-dock-1024.jpg"
  caption="… and the long thunderbolt cable is connected to the eGPU setup and the CalDigit thunderbolt dock…"
%}

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-monitor-1024.jpg"
  caption="… enabling a fully silent setup in the living room, fully controllable using a mouse and keyboard connected to the CalDigit thunderbolt dock!"
%}

**External monitor accelerated** 
Boot with HDMI / DVI cable connected to the eGPU. This gives the fastest performance, but the drawback on a Macbook Pro is that the internal GPU gets turned off so no internal monitor

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l-laptop-monitor-1024.jpg"
  caption="eGPU setup connected to an external monitor"
%}

One could use a long HDMI cable in conjunction with the 10m thunderbolt cable connected to the CalDigit thunderbolt dock to move the screen further away, but I prefer to use the previous example to only have a single cable even though I get a performance hit since the display signal takes some bandwidth from the thunderbolt cable. See the next section about performance
Here is a quickly, and badly, made video of the setup to give you an impression of the whole thing:

{% youtube 2YkdGYEDUmY %}

## Performance
I do not expect 3DMark to increase, since bandwidth does not affect the benchmark much, see this [post](http://www.techpowerup.com/reviews/Intel/Ivy_Bridge_PCI-Express_Scaling/21.html). Therefore I also test using Unigine since it appears to be more bandwidth sensitive, see [here](http://www.techpowerup.com/reviews/Intel/Ivy_Bridge_PCI-Express_Scaling/22.html)

The following tests are executed using a 13 inch retina MacBook Pro late 2013 with 16 GB ram. 

### Unigine Valley 1.0 benchmark
Presets:

* Basic: 1280x720, DirectX 9, medium quality, 2x AA
* Extreme: 1600x900, DirectX 11, ultra quality, 8x AA
* Extreme HD: 1920x1080, DirectX 11, ultra quality, 8x AA

|				|Basic	|Extreme|Extreme HD|
|---				|---:	|---:	|---:|
|HD5100 - fps			|14,7	|5,0	|3,8|
|HD5100 - score			|616	|208	|160|
|GTX 760 (internal) - fps	|40,0	|40,3	|32,4|
|GTX 760 (internal) - score	|1674	|1686	|1354|
|GTX 760 (external) - fps	|85,4	|44,7	|35,3|
|GTX 760 (external) - score	|3575	|1870	|1479|

Using higher resolutions makes the difference between internal and external monitor using the GPU very small compared to lower resolutions or lower AA.

### 3DMark

| |Fire strike extreme)|Fire strike|Sky diver|
|---|---:|---:|---:|
|HD5100|400|921|4077|
|GTX 760 (internal)|2492|4209|8660|

| |Cloud gate|Ice storm extreme|Ice storm|
|---|---:|---:|---:|
|HD5100|5750|36209|46045|
|GTX 760 (internal)|7975|21411|30124|

Notice that the level entry test "Ice storm" is faster using the internal GPU, this is most likely a bandwidth issue. Where the setup really shines is the heavier benchmarks like Fire strike.

*On my to-do list is testing higher resolutions using external monitors, the highest tested is 1080p. I don't own any monitor that has higher resolution than 1080p*

## Noise
All measurements were made 10 cm from the eGPU setup using the iPhone app Decibal. Not an accurate way, but gives you a ballpark estimate of the noise.
* 42 dB idle, both 200mm fans on low
* 44 dB idle, both 200mm fans on medium
* 49 dB idle, both 200mm fans on high

This is without the GPU fans spinning at full speed. I expect to able to reduce the noise by disabling the GPU fans and only letting the 200mm fan cool the card. Of course with a 10m optical thunderbolt cable you can completely eliminate any noise from the eGPU setup by moving the laptop to another room.

Or even better, eliminate the noise from the eGPU and laptop by leaving the laptop connected with the short 0,5m thunderbolt cable and using the second thunderbolt port on the eGPU docking station to connect the 10m thunderbolt cable to the CalDigit thunderbolt. The CalDigit thunderbolt has HDMI, 3 USB ports, Ethernet, audio and microphone and a secondary thunderbolt port, enabling completely silent gaming setup!

See the video below to see the setup with an idle GPU and the fans set to low, then in the middle of the video set to high.

{% youtube ILtODgFA6r8 %}

## Price
The price of the [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00FMJPWFW"} is 500 USD. This is twice as much as my old setup which consisted of the PE4L (70 USD) and the [Sonnet Echo Express Adapter Pro](https://www.amazon.com/dp/B0080MQJJ6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B0080MQJJ6"} (170 USD) = 240 USD. If you need to save money, that is one way to go, but you get one quarter of the bandwidth which might not be enough for you. You can get the cheaper [Sonnet Echo Express SEL](https://www.amazon.com/dp/B00IPSJLXG/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00IPSJLXG"} for 350 USD on Amazon which only have a single PCI-E slot, but it is still thunderbolt 2. The cheapest way is to skip thunderbolt altogether and just get the PE4Lfor 70 USD, but is requires your laptop to have an pci express port.

If you want an estimate of the total cost, you need to look up the price on the parts list earlier in the post.

## Whats next?

* Eliminate the picoPSU and Sonnet power supply and take all power from the ATX power supply driving the GPU. Implement a switch to be able cut off power to the 12v lines to the GPU alone.
* When sitting 10 meters away, the timing of turning the GPU on and off is difficult. To mitigate this, I plan to purchase a remote-controlled power outlet so I can turn the ATX psu on and off using my cellphone, something like the [Belkin WeMo Insight Switch](https://www.amazon.com/dp/B01DBXNYCS/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[ca][us]B01DBXNYCS[es][it][fr][de][uk]B00EPQB1LC"}
* One could add more PCI-E ports, sharing the PCI-E 2.0 x4 bandwidth using a PCI-E splitter, something like the one from [Amfeltec](http://amfeltec.com/products/flexible-x4-pci-express-4-way-splitter-gpu-oriented/). This is very low on my list since I have 3 slots already
* PCI-E bandwidth for GPU does not increase performance much when going from PCI-E 2.0 x2 to PCI-E 2.0 x16, see this [post](http://www.techpowerup.com/reviews/Intel/Ivy_Bridge_PCI-Express_Scaling/18.html). There is room for another GPU, a SLI setup using two cards, each having PCI-E 2.0 x2 performance, should be faster than my current setup with a single GPU at PCI-E 2.0 x4. While SLI performance itself might be nice, using a SLI setup on an older thunderbolt 1 laptop should give the same performance as a thunderbolt 2 laptop, since the bandwidth in thunderbolt 1 and 2 is the same, except that thunderbolt 1 can only use 10 Gbit/s per device, up to a total of 20 Gbit/s. A SLI setup should take advantage of the full bandwidth of thunderbolt 1!
* While thunderbolt 3 promises twice the speed of thunderbolt 2, around PCI-E 2.0 x8 speeds, I have no desire to upgrade anytime soon since the increase of bandwidth is not increasing performance by much. Maybe in a few years
* At some point I might consider using 3mm acrylic to cover up the case so its less open and less exposed. The massive 200mm fans should still be able to cool the setup

That was my brief description of my eGPU setup, leave a comment if you have any questions

**UPDATE 20-08-2014**  
*Added a 3DMark benchmark (iGPU and eGPU using the internal monitor only, but it adds some high resolution benchmarks. Also added a secondary harddisk*

**UPDATE 01-04-2015**  
*I would not recommend this setup anymore, a cheaper and better setup can be seen in my blog post [here](/projects/thunderbolt-2-egpu-setup-using-akitio-thunder2) if you just need it for attaching a single graphics card*
