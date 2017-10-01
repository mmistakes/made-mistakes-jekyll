---
title: "External graphics card experiment: Part 1"
excerpt: "External graphics card connected via Thunderbolt using the PE4L-EC060 ExpressCard adapter and Sonnet Echo Express Thunderbolt Adapter Pro"
image:
  path: &image "/assets/images/external-graphics-card-experiment-part-1-eGPU-setup-overview-feature.png"
  feature: *image
  thumbnail: "/assets/images/external-graphics-card-experiment-part-1-eGPU-setup-overview-feature-th.png"
  teaser: *image
tags: [eGPU]
comments: true
comments_locked: false
published: true
last_modified_at: 2014-05-25T19:48:00
redirect_from: "/external-graphics-card-experiment-part-1/"
---
I always wanted to have a small light portable computer on the go and when I get home to use a docking station and get the full desktop experience. Following other people examples on the internet I have made this cheap solution with and external graphics card in the docking station (eGPU) that can be used with an external monitor or accelerate the internal screen of the laptop.
## Parts
{% include affiliate-disclosure.html %}

* Laptop with thunderbolt port (Lenovo T430s)
* Graphics card ([GIGABYTE Nvidia GTX 760](https://www.amazon.com/dp/B00DGM8B6O/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk]B00H707RP2[us][es][it][fr][ca]B00DGM8B6O"}) ~ 275 USD
* PCI-E 1x to ExpressCard adapter [PE4L-EC060](https://www.amazon.com/dp/B00GWM5ZLO/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00GWM5ZLO"}) ~ 70 USD + 22 USD postal fees
* [Sonnet Echo Express Thunderbolt Adapter Pro](https://www.amazon.com/dp/B0080MQJJ6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B0080MQJJ6"} ~ 120 USD
* Thunderbolt cable ~ 55 USD
* ATX power supply ~ 73 USD
* Case ~ 75 USD

That is 415 USD for the setup without the laptop and graphics card and 690 USD with the graphics card included. Notice all prices are in USD but I live in Denmark so prices are higher than the states.
## Setup
My laptop is connected via thunderbolt to the Sonnet Echo Thunderbolt to ExpressCard adapter which is connected to the PCI-E 1x ExpressCard adapter. I connect the graphics card to this PCI-E 1x port, the power supply unit and case.

{% include figure
  image_path="/assets/images/external-graphics-card-experiment-part-1-eGPU-setup-overview.png"
  caption="Final eGPU setup"
%}

{% include figure
  image_path="/assets/images/external-graphics-card-experiment-part-1-back.jpg"
  caption="Closeup of GPU inside the case"
  class="half"
%}

The setup is configured to start when the laptop start or wakes from sleep and turns off when the computer turns off. I have installed windows 7 64 bit. I have not used any bootloaders, memory reallocation or third-party tools like described [here](https://www.techinferno.com/index.php?/forums/topic/3225-2013-11-mba-gtx5704gbpsc-tbec2-pe4l-21b-win7-kloper/).
Maybe it is because I don't use MacBook in combination with bootcamp. My laptop does not contain a discrete graphics card which might have helped me avoid PCI memory allocation problems. When I plugin the cable it detects my graphic card and I install the drivers.
## Performance
There are two ways of using the setup, one is to display the content on an external monitor connected to the graphic card. Another is to accelerate the laptops internal monitor, I give you performance measurements for both:


### 3dMark 6

* 21028 with NVIDIA GeForce GTX 760(1x) and Intel Core i7-3520M (external monitor
* 18829 with NVIDIA GeForce GTX 760(1x) and Intel Core i7-3520M   (internal laptop screen)
* 6678 with Intel HD Graphics 4000 Mobile(1x) and Intel Core i7-3520M (internal laptop screen)

Looking at the first part of the test I saw these framerates:

* GeForce GTX 760 (external monitor) 160 fps
* GeForce GTX 760 (internal laptop monitor) 100 fps
* Intel HD Graphics 4000 Mobile (internal laptop monitor) 30 fps

### 3dMark11
{% include figure
  image_path="/assets/images/external-graphics-card-experiment-part-1-3dmark11-hd4000.png"
  caption="Laptop only, internal laptop screen"
%}

{% include figure
  image_path="/assets/images/external-graphics-card-experiment-part-1-3dmark11-gtx760.png"
  caption="External monitor, external graphics card"
%}

I did not take a screenshot of the test using the internal laptop screen and the external graphics card, but the score was 4400.

## Scaling
Using an ExpressCard adapter halves the bandwidth of thunderbolt 1, so the effective bandwidth is PCI-E 2.0 x1. This does slow down the graphics performance, but not as much as you might think:

[http://www.techpowerup.com/reviews/Intel/Ivy_Bridge_PCI-Express_Scaling/1.html](http://www.techpowerup.com/reviews/Intel/Ivy_Bridge_PCI-Express_Scaling/1.html)

Using a laptop with the new thunderbolt 2 port and a setup that support this thunderbolt port, like enclosures from Sonnet or Magma, would have a bandwidth of PCI-E 2.0 x4, four times as much, but not four times the performance. See my post about my thunderbolt 2 setup [here](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l).

## Conclusion
I have succeeded in building a setup that is close to giving my the full desktop experience, with some performance limitations. Why not just buy a desktop pc on the side? Well I still only want a single computer, not two, even if the performance is reduced. Next project however is getting a laptop with two thunderbolt 2 ports (MacBook Pro retina 13 inch) and Sonnet Echo Express SE II so I can enjoy the full PCI-E 2.0 x4 speed and with a possibility to use two graphics card if I use PCI-E risers and an external power supply. Corning has just released 33 feet optical thunderbolt cables which enables all the noisy hardware to be further away from me. But that is another blog post when the money is there

**UPDATE 08-01-2014:** Added pictures of the setup

**UPDATE 25-05-2014:** Upgraded the setup to thunderbolt 2, see my post [here](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l)
