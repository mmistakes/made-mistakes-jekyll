---
title: "ESP8266 NodeMCU - Getting started (Hello World)"
excerpt: "ESP8266 NodeMCU - Getting started (Hello World)"
image:
  path: &image "/assets/images/esp8266-nodemcu-getting-started-hello-world-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/esp8266-nodemcu-getting-started-hello-world-feature-th.jpg"
  teaser: *image
tags:
  - Internet of things
  - ESP8266
  - NodeMCU
comments: true
comments_locked: false
published: true
last_modified_at: 2015-08-30T18:19:46
redirect_from: "/esp8266-nodemcu-getting-started-hello-world/"
---
[^ESP8266]: The [ESP8266](https://en.wikipedia.org/wiki/ESP8266) is a low-cost Wi-Fi chip with full TCP/IP stack and MCU (microcontroller unit) capability

Thanks to a bit of donated funds I was finally ready to play around with the ESP8266 [^ESP8266], a tiny and inexpensive wifi system on a chip (SoC), which you can use to read data from sensors, connect to the internet or even act as a webserver!
{% include figure
  image_path="/assets/images/esp8266-nodemcu-getting-started-hello-world-NodeMCU-dev-kit.jpg"
  caption="A tiny Wifi SoC"
%}

This post describes how to get the parts and getting everything up and running using OS X. I will use an ESP8266 running open source firmware called [NodeMCU](http://nodemcu.com/index_en.html). This allows easy programming of the device using [Lua](https://en.wikipedia.org/wiki/Lua_(programming_language)) scripts. Since the tools used in this post are cross-platform compatible, you should be able to use this guide even when running Windows or Linux.

{% include affiliate-disclosure.html %}

# Parts
There are many ways to getting started, but using a development kit is the easiest in my opinion. I bought the [Seeedstudio NodeMCU v2 - Lua based ESP8266 development kit](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=nodemcu+esp8266&tag=oddoneout0a-20){:rel="nofollow"}, but I quickly found out that you can get them at a bargain at [AliExpress](http://s.click.aliexpress.com/e/3rv7eyBI6){:rel="nofollow"}. For around 3.5 USD you can get started and as long as you only buy one at a time the shipping is free (but very slow shipping)! I use these boards from AliExpress now. Make sure you get the NodeMCU development kit v1.0 (a.k.a V2).

# Connecting the ESP8266
1. Install the CP2102 driver from [here](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx). If using a different ESP8266 development board you might need different drivers. If you are lucky like me, the instructions will be printed on the back of the board
{% include figure
  image_path="/assets/images/esp8266-nodemcu-getting-started-hello-world-NodeMCU-dev-kit-back.jpg"
  caption="Seeedstudio was nice enough to leave some instructions on the back"
%}

{:start="2"}
2. Plugin the USB cable to the ESP8266 and then to the computer
3. Open a terminal and type `ls -l /dev/tty.*`. If everything went well you should see an entry similar to `/dev/tty.SLAB_USBtoUART`. Make sure you are using a USB data cable. I was using a purely USB charging cable which prevented the device showing up. Switching to another cable worked
4. Download ESPlorer from [here](http://esp8266.ru/esplorer-latest/?f=ESPlorer.zip)
5. In Finder, click the ESPlorer.jar to run the program (requires Java). If you get the message: ""ESPlorer.jar" can't be opened because it is from an unidentified developer" then go to `System Preferences --> Security & Privacy` and click "Open anyway"
6. Select the `/dev/cu.SLAB_USBtoUART` and set the bad rate to 9600. Then click the "Open" button
{% include figure
  image_path="/assets/images/esp8266-nodemcu-getting-started-hello-world-ESPlorer_configuration.jpg"
%}

{:start="7"}
7. Push the RST button on the ESP8266, it is right next to the micro-usb port
8. You should now see a message similar to `NodeMCU 0.9.5 build 20150403 powered by Lua 5.1.4`
{% include figure
  image_path="/assets/images/esp8266-nodemcu-getting-started-hello-world-NodeMCU_connected.jpg"
%}

Thats it! We are now ready for programming the device

# Programming the ESP8266
The ESP8266 with the NodeMCU firmware executes Lua files. When booting the device it will look for a file called `init.lua` and execute this file. But first we will clear the device of every file

1. In ESPlorer, click the format button to delete all files
2. Next copy / paste the following code into the left hand box in ESPlorer (taken from http://esp8266.co.uk/recipes/blink-demo/, but the site is currently offline)

{% highlight lua linenos %}
-- Config
local pin = 4            --> GPIO2
local value = gpio.LOW
local duration = 1000    --> 1 second


-- Function toggles LED state
function toggleLED ()
    if value == gpio.LOW then
        value = gpio.HIGH
    else
        value = gpio.LOW
    end

    gpio.write(pin, value)
end


-- Initialise the pin
gpio.mode(pin, gpio.OUTPUT)
gpio.write(pin, value)

-- Create an interval
tmr.alarm(0, duration, 1, toggleLED)
{% endhighlight %}

{:start="3"}
3. Save the file as `init.lua`. This will automatically upload the file to the ESP8266
{% include figure
  image_path="/assets/images/esp8266-nodemcu-getting-started-hello-world-Save_to_ESP.jpg"
%}

{:start="4"}
4. Now the blue onboard LED should blink on and off every second. If you restart the device, it will load the `init.lua` file and keep on blinking

# Conclusion
I have yet to explore the possibility of this little nifty device, but it looks promising. Using the development kit is much easier, but more expensive. The ESP8266 chips alone are less than half the price of the development kit, but worth it for me. Check out my post on how to update to the newest NodeMCU [here](/projects/esp8266-development-kit-nodemcu-firmware-update-os-x/). Stay tuned for more posts!
