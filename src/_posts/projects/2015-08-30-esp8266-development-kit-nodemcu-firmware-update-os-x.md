---
title: "Update ESP8266 development kit NodeMCU firmware using OS X"
excerpt: "Update ESP8266 development kit NodeMCU firmware using OS X"
tags:
  - Internet of things
  - ESP8266
  - NodeMCU
comments: true
comments_locked: false
published: true
last_modified_at: 2015-08-30T20:04:13
redirect_from: "/esp8266-development-kit-nodemcu-firmware-update-os-x/"
---
I have [previously](/projects/esp8266-getting-started-hello-world/) written a small guide to getting started programming the ESP8266 development kit with the NodeMCU firmware. This post assumes that you have a fully working setup. Specifically I use the [Seeedstudio NodeMCU v2 - Lua based ESP8266 development kit (affiliate link)](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=nodemcu+esp8266&tag=oddoneout0a-20){:rel="nofollow"}. I will flash to the latest version of [NodeMCU](http://nodemcu.com/index_en.html).

# Update the firmware

1. Connect the ESP8266 via a micro-usb cable to the computer
2. Make sure no program is using the serial port to the ESP8266
3. Download and unpack [esptool](https://github.com/themadinventor/esptool), either as a [zip](https://github.com/themadinventor/esptool/archive/master.zip) file or using git clone:
{% highlight terminal %}
$ git clone https://github.com/themadinventor/esptool.git
{% endhighlight %}

{:start="4"}
4. OS X (Yosemite) already comes with python 2.7, but we need to install the `pySerial` dependency. Open a terminal and type

{% highlight terminal %}
$ sudo python setup.py install
{% endhighlight %}

{:start="5"}
5. Download the latest ESP8266 NodeMCU firmware from [here](https://github.com/nodemcu/nodemcu-firmware/releases/latest). Get the `nodemcu_integer_*.bin` file if you are unsure, for this example the newest version was `nodemcu_integer_0.9.6-dev_20150704.bin`
6. Go to the esptool folder, e.g.
{% highlight terminal %}
$ cd ~/Downloads/esptool
{% endhighlight %}

{:start="7"}
7. Flash the firmware using the following command. Replace `/dev/tty.SLAB_USBtoUART` with the name of the serial port you are using and `~/Downloads/nodemcu_integer_0.9.6-dev_20150704.bin` with the path to the firmware you downloaded in step 5.

{% highlight terminal %}
$ sudo python esptool.py --baud 921600 --port /dev/tty.SLAB_USBtoUART write_flash -fm dio 0x00000 ~/Downloads/nodemcu_integer_0.9.6-dev_20150704.bin
{% endhighlight %}

{:start="8"}
8. If everything is done right you should see the following
{% highlight terminal %}
Connecting...
Erasing flash...
Writing at 0x00070c00... (100 %)
Leaving...
{% endhighlight %}

{:start="9"}
9. Reconnect to the ESP8266 using [ESPlorer](http://esp8266.ru/esplorer/) or any other similar software and confirm that the ESP8266 is updated to the newest version. Using the RST button will restart the device and print the version at the boot

# Troubleshooting
* If unable to connect to the board after successfully flashing it you might try to remove the `-fm dio` parameter in step 7 and re-run it. For this particular version of NodeMCU and board from Seeedstudio I needed to add the parameter as explained [here](http://www.seeedstudio.com/depot/NodeMCU-v2-Lua-based-ESP8266-development-kit-p-2415.html) (search for DIO in the comments)
* If using python3 you will run into many error messages about invalid print statements. Apparently the introduced stricter enforcement of how to create print statements in python3 and the esptool source code using an invalid version. Downgrade to python 2.7 seems to be the easy way out unless you want to fix the code (should be easy)
* If you can not reconnect after flashing using baud 9600, but you see the boot loader at baud 74880, then sometimes you need to reflash the old AT firmware. Go to [https://github.com/esp8266/esp8266-wiki/tree/master/sdk](https://github.com/esp8266/esp8266-wiki/tree/master/sdk) and download [esp_iot_sdk_v0.9.5_15_01_23.zip](https://github.com/esp8266/esp8266-wiki/blob/master/sdk/esp_iot_sdk_v0.9.5_15_01_23.zip). Unpack the zip file and follow the instruction in the `bin/at/readme.txt` file. Specifically I refreshed the device using the following 4 commands:

{% highlight terminal %}
$ sudo python esptool.py --baud 921600 --port /dev/tty.SLAB_USBtoUART write_flash -fm dio 0x00000 ~/Downloads/esp_iot_sdk_v0.9.5/bin/boot_v1.2.bin
$ sudo python esptool.py --baud 921600 --port /dev/tty.SLAB_USBtoUART write_flash -fm dio 0x01000 ~/Downloads/esp_iot_sdk_v0.9.5/bin/at/user1.512.new.bin
$ sudo python esptool.py --baud 921600 --port /dev/tty.SLAB_USBtoUART write_flash -fm dio 0x3e000 ~/Downloads/esp_iot_sdk_v0.9.5/bin/blank.bin
$ sudo python esptool.py --baud 921600 --port /dev/tty.SLAB_USBtoUART write_flash -fm dio 0x7e000 ~/Downloads/esp_iot_sdk_v0.9.5/bin/blank.bin
{% endhighlight %}

Then retry step 7 to 9 in the guide with the selected NodeMCU firmware.
* If unable to flash with the `Exception: Failed to connect` error message, then try to remove all components connected to the ESP8266. I get this error when trying to flash the module with the RST and D2 pin connected which is needed for deep sleep.
