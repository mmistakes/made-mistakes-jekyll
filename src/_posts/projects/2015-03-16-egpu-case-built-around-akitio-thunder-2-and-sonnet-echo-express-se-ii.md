---
title: "eGPU case built around AKiTiO Thunder 2"
excerpt: "eGPU case built around AKiTiO Thunder 2 and Sonnet Echo Express SE II"
image:
  path: &image "/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-feature-th.jpg"
  teaser: *image
tags: 
  - eGPU
  - OpenBeam
comments: true
comments_locked: false
published: true
last_modified_at: 2015-03-16T20:15:00
redirect_from: "/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii/"
---
I decided to recreate a smaller version of the eGPU case I made in my [previous](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l/) setup. I combine an AKiTiO Thunder2 board and my old Sonnet Echo Express SE II to have a graphics card, SSD drive and a pair of USB 3.0 ports. There is room for an additional hard drive and PCI-e slot. The setup is cooled using two 200mm fans, one fan cooling the graphics cards, the other the laptop.

{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-setup-laptop-1024.jpg"
  caption="My eGPU setup with a 13 inch Retina MacBook Pro attached"
%}

{% include affiliate-disclosure.html %}

## Parts
Check out my previous posts on the [Sonnet Echo Express SE II](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l/) and [AKiTiO Thunder2](/projects/thunderbolt-2-egpu-setup-using-akitio-thunder2/). The only difference in parts is that I ditched the Sonnet power supply by powering the whole setup using a molex to barrel cable using [this](https://www.techinferno.com/index.php?/forums/topic/6543-guide-making-a-molex-to-barrel-adapter/) guide. You don't need both boards, but since I have them both I integrated them both.

## Build process
Building the case took two days of trial and error, but once I get the basic design below done the reset was just installing the boards from the Sonnet and AKiTiO and the top fan.

{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-case_in_progress.jpg"
  caption="PSU, GPU and the side fan installed"
%}

To reduce the overall size of the setup I removed the boards from the Sonnet and AKiTiO. I used [MakerBeam](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=MakerBeam&tag=oddoneout0a-20){:rel="nofollow"} beams and screw standoffs to secure the boards to the case.

{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-AKiTiO_PCB.jpg"
  caption="Using MakerBeam beams to secure the AKiTiO board"
%}

## The case
The final case can be seen below. The laptop is a MacBook Pro retina 13 inch. The setup cannot get much smaller without reducing the size of the fans

{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-setup-1024.jpg"
  caption="eGPU case"
%}

### Top
{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-top-1024.jpg"
  caption="The top is designed to cool the connected laptop"
%}

The top is designed to hold and cool a laptop using the large [200mm fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B000V6FKGM"}. Several self adhesive rubber pads are placed to protect the laptop from scratches. The thunderbolt cable is used to connect the laptop to the setup.

### Side - GPU fan
{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-side-fan-1024.jpg"
  caption="Side – GPU fan"
%}

A 200mm fan is used to assist cooling the graphics card. Running the fan at low speed the graphics card will almost never use its own fans.

### Side - AKiTiO
{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-side-akitio-1024.jpg"
  caption="Side – AKiTiO"
%}

1. ATX power supply, mounted using [OpenBeam L brackets](https://www.amazon.com/dp/B0196FHQK6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B0196FHQK6[ca][uk][de][es][it][fr]"}
2. Thunderbolt cable connecting the [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00FMJPWFW"} on the other side of the case
3. Thunderbolt cable for the laptop
4. [EVGA GeForce GTX 970](https://www.amazon.com/dp/B00NVODXR4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NVODXR4[ca][uk][de][es][it][fr]B00NSXYEQW"} graphics card
5. [AKiTiO Thunder2](https://www.amazon.com/dp/B00LTAUTHE/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU"} board mounted on the side. Notice that since I am using a powered PCI-e riser I do not need to connect the power supply unit to the DC jack
6. Fan control for the two [200mm fans](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B000V6FKGM"}

### Side - Sonnet
{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-side_sonnet-1024.jpg"
  caption="Side – Sonnet"
%}

1. [200mm fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B000V6FKGM"} for cooling the graphics card
2. [EVGA GeForce GTX 970](https://www.amazon.com/dp/B00NVODXR4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NVODXR4[ca][uk][de][es][it][fr]B00NSXYEQW"} graphics card
3. DIY MOLEX to barrel converter
4. [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00FMJPWFW"} with a SATA / USB combo card. The last PCI-e slot is not used

### Side - Power Supply
{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-side_ATX.jpg"
  caption="Side – Power supply"
%}
Nothing much here except the ATX and the SSD disk. A smaller and modular power supply is on my to-do list.

### Bottom
{% include figure
  image_path="/assets/images/egpu-case-built-around-akitio-thunder-2-and-sonnet-echo-express-se-ii-bottom-1024.jpg"
  caption="Bottom"
%}

1. SSD disk
2. ATX PSU
3. [Sonnet Echo Express SE II](https://www.amazon.com/dp/B00FMJPWFW/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00FMJPWFW"} board
4. [200mm fan](https://www.amazon.com/dp/B000V6FKGM/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B000V6FKGM"} that cools the graphics card
5. Protective rubber feet
6. [EVGA GeForce GTX 970](https://www.amazon.com/dp/B00NVODXR4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us]B00NVODXR4[ca][uk][de][es][it][fr]B00NSXYEQW"} graphics card

## Whats next?

* Installing a smaller modular PSU to reduce the number of cables
* Installing a power strip in the case so the power adapter for the MacBook can be installed in the case itself
* A small cable reel for a [10m optical thunderbolt cable](https://www.amazon.com/dp/B00HSTC496/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00HSTC496"} I have lying around to avoid cable clutter
