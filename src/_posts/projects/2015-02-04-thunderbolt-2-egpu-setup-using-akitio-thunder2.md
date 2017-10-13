---
title: "Thunderbolt 2 eGPU using AKiTiO Thunder2"
excerpt: "Thunderbolt 2 eGPU using AKiTiO Thunder2 PCIe box - performance on a budget!"
image:
  path: &image "/assets/images/thunderbolt-2-egpu-setup-using-akitio-thunder2-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/thunderbolt-2-egpu-setup-using-akitio-thunder2-feature-th.jpg"
  teaser: *image
tags:
  - eGPU
comments: true
comments_locked: false
published: true
last_modified_at: 2015-02-04T19:38:00
redirect_from: "/thunderbolt-2-egpu-setup-using-akitio-thunder2/"
---
I wanted to try a simpler and cheaper external GPU (eGPU) setup than I have used [previously](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l/). For this I use the AKiTiO Thunder2 which is a fairly inexpensive compared to the rest of the pack.
Setup, installation and use is much simpler than before (no voodoo, rain dance or luck needed anymore), to use the setup from is as simple as

* Plug in the thunderbolt cable from the eGPU setup
* Turn on PSU
* Turn on laptop and boot into Windows

This is both using the internal monitor with Optimus enabled and using an external monitor.

{% include affiliate-disclosure.html %}

The key differences from my previous setup is

* [EVGA branded NVIDIA cards](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=evga+nvidia+geforce&tag=oddoneout0a-20){:rel="nofollow"} are powered different internally so I do not need to power on the PSU at specifics times
* The thunderbolt PCIe box only have a single PCIe port. The multiplexing chip on boxes that have multiple PCIe ports is suspected of interfering with eGPU setups and therefore making it less plug and play

## eGPU Setup
### Parts

* [AKiTiO Thunder2 PCIe box](https://www.amazon.com/dp/B00LTAUTHE/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU"} - 216 USD
* [PCI-Express PCI-E 8X to 16X Riser Card Flexible Ribbon Extender Cable w/Molex](http://www.moddiy.com/products/PCI%252dExpress-PCI%252dE-8X-to-16X-Riser-Card-Flexible-Ribbon-Extender-Cable-w%7B47%7DMolex-%252b-Solid-Capacitor.html) - 15 USD
* [EVGA GeForce GTX 970 Superclocked ACX 2.0](https://www.amazon.com/dp/B00NVODXR4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NVODXR4[ca][de][uk][es][it][fr]B00NSXYEQW"} - 350 USD
* ENERMAX PRO82+ PSU ~ 60 USD
* Single paperclip

**Total 641 USD**  

For my readers who wants to build something similar I have a few recommendations:

* Get any [EVGA branded NVIDIA card](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=evga+nvidia+geforce&tag=oddoneout0a-20){:rel="nofollow"}, these just work better for eGPU type setups
* You don't need an ATX power supply, but often they are the cheapest way of powering the setup. Get one that is [modular](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=atx+psu+modular&tag=oddoneout0a-20){:rel="nofollow"} and has enough 6/8pin PEG connectors to power your chosen graphic card
* Thunderbolt 2 is limited to PCIe x4 2.0, so it does not matter if you get a PCIe x4, x8 or x16 PCIe riser, but what does matter is getting a quality PCIe riser to prevent stability issues!

#### Hardware

{% include figure
  image_path="/assets/images/thunderbolt-2-egpu-setup-using-akitio-thunder2-overview.jpg"
  caption="eGPU setup"
%}

1. [AKiTiO Thunder2 PCIe box](https://www.amazon.com/dp/B00LTAUTHE/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU"}
2. [GTX 970 GPU](https://www.amazon.com/dp/B00NVODXR4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NVODXR4[ca][de][uk][es][it][fr]B00NSXYEQW"}
3. PSU
4. Powered PCIe riser

Plug the GPU into the PCIe riser. The PICe riser is plugged into the AKiTiO box. Make sure it is firmly attached. Plug in power to the PCIe riser and GPU from the PSU and use the [paperclip trick](http://aphnetworks.com/tutorials/psu_paperclip_trick) (c) to turn on the PSU. Plug in the PSU to the wall socket and thunderbolt cable from the AKiTiO box to your thunderbolt enabled computer. Notice that I have disconnected the fan in the AKiTiO box (a) and when using a powered PCIe riser there is no need to use the power supply unit that came with the AKiTiO box (b).

#### Software

* Windows 8.1 installed via bootcamp in UEFI mode.
* Newest NVIDIA drivers
* (Optional) Benchmarking software

{% include notice 
  type="warning"
  content="**UPDATE 30-01-2016:** NVIDIA released a new driver for Windows 10 that finally fixes Optimus! Check out my post [here](/projects/windows-10-egpu-setup-optimus/)"
%}

#### Driver installation

* Turn off the laptop
* Plug in the thunderbolt cable from the eGPU setup
* Turn on PSU
* Turn on laptop and boot into Windows
* Install NVIDIA driver
* Shutdown laptop
* Boot into Windows. The internal and external GPU should now both be visible without any errors

This will work both when using external monitors attached to the GPU or using Optimus to accelerate the internal screen of the laptop. Repeat step 1-4 to boot into Windows with the eGPU active.

#### Troubleshooting

* When booting into Windows without an external monitor attached to the eGPU, sometimes the monitor of the laptop is blank.
  * Try the windows key + P followed by the left arrow and finally hit the enter key. Repeat this if you don't see anything on the monitor up to 3 times.
  * Try attaching a monitor or shutdown Windows and try booting into Windows again.
* If the blue light on the AKiTiO box does not light up when powering on the setup, check that the PCIe riser is firmly attached to the box and the GPU. Also make sure that the thunderbolt port is working (try using it with another device)
* If you get an error 12 on the eGPU, try using a DSDT override as described in my previous post [here](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l/)

## Performance
The reduced bandwidth from the setup does not impact frame rates in games as much as one would think, see [here](http://www.techpowerup.com/reviews/NVIDIA/GTX_980_PCI-Express_Scaling/) for an excellent test using the new NVIDIA GTX 980.

The following tests are executed using a 13 inch retina MacBook Pro late 2013 with 16 GB ram. You can use any laptop with thunderbolt, but I recommend getting one with Thunderbolt 2 like the MacBook Pro. I have included my previous test result using my [previous setup](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l/) with a GTX 760. The presets are described here:

### Unigine Valley 1.0 benchmark

* Basic: 1280x720, DirectX 9, medium quality, 2x AA
* Extreme: 1600x900, DirectX 11, ultra quality, 8x AA
* Extreme HD: 1920x1080, DirectX 11, ultra quality, 8x AA

#### FPS

|                               |Basic  |Extreme|Extreme HD|
|---                            |---:   |---:   |---:|
|HD5100                   |14,7   |5,0    |3,8|
|GTX 760 (internal)       |40,0   |40,3   |32,4|
|GTX 760 (external)       |85,4   |44,7   |35,3|
|GTX 970 (internal)       |45,1   |53,5   |45,5|
|GTX 970 (external)       |69,4   |57,8   |N/A|

#### Score

|                               |Basic  |Extreme|Extreme HD|
|---                            |---:   |---:   |---:|
|HD5100                 |616   |208    |160|
|GTX 760 (internal)     |1674   |1686   |1354|
|GTX 760 (external)     |3575   |1870   |1479|
|GTX 970 (internal)     |1889   |2239   |1903|
|GTX 970 (external)     |2904   |2418   |N/A|

Using higher resolutions makes the difference between internal and external monitor using the GPU very small compared to lower resolutions or lower AA. Notice that my GTX 970 scores are lower than GTX 760 using an external monitor at low settings. I did retest using my GTX 970 card getting the same results. I do not currently own an external 1080p monitor, hence no result for Extreme HD. 

### 3DMark benchmark

The presets are described here:

* Fire strike ultra (3840x2160)
* Fire strike extreme (2560x1440)
* Fire strike (1080p)
* Sky diver
* Cloud gate

| |Fire strike ultra|Fire strike extreme|Fire strike|
|---|---:|---:|---:|
|HD5100|N/A|400|921|
|GTX 760 (internal)|N/A|2492|4209|
|GTX 970 (internal)|2295|3921|5941|
|GTX 970 (external)|2398|4239|6659|

| |Sky diver|Cloud gate|
|---|---:|---:|
|HD5100|4077|5750|
|GTX 760 (internal)|8660|7975|
|GTX 970 (internal)|12760|9206|
|GTX 970 (external)|14955|11557|

A 4k monitor was not needed to run the high resolution test, but I need at least 3 GB video ram. Therefore no results for fire strike ultra on HD5100 and GTX 760.

## Whats next?

* Build a case for the setup using [OpenBeam](https://www.amazon.com/dp/B00G3J6GDM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][de][uk][es][it][fr]B00G3J6GDM"} or [MakerBeam](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=MakerBeam&tag=oddoneout0a-20){:rel="nofollow"}  
  **UPDATE 01-04-2015:** Done! See my post [here](/projects/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii)
* Test if I can get this to work using OS X 10.10.2 as previously done [here](/projects/egpu-osx-maverick-nvidia-gtx-70-using-pe4l)
* Move the Windows installation to my thunderbolt disk ([Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][de][uk][es][it][fr]B00FMJPWFW} enclosure)
* Test higher resolutions using external monitors
