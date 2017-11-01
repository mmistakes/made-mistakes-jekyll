---
title: "ESP8266 NodeMCU - Enabling modules in firmware"
excerpt: "ESP8266 NodeMCU - Enabling modules in firmware"
image:
  path: &image "/assets/images/esp8266-nodemcu-dht22-custom-modules-firmware-feature.png"
  feature: *image
  thumbnail: "/assets/images/esp8266-nodemcu-dht22-custom-modules-firmware-feature-th.png"
  teaser: *image
tags:
  - Internet of things
  - ESP8266
  - NodeMCU
comments: true
comments_locked: false
published: true
last_modified_at: 2015-10-24T21:31:21
redirect_from: "/esp8266-nodemcu-dht22-custom-modules-firmware/"
---
I previously wrote a [post](/projects/esp8266-nodemcu-dht22-mqtt-deep-sleep/) about using the ESP8266 NodeMCU firmware to measure temperature and humidity. I used a lua library to read the values from the DHT22 sensor, but then found out that many of the modules I need for my projects are already included in the NodeMCU firmware! Even better, at [frightanic.com](http://frightanic.com/nodemcu-custom-build/) you can customise the NodeMCU firmware and the site will build the version for you and send a download link in a few minutes. Want the latest and greatest firmware? Choose the dev branch. Need more free memory? Choose only the modules you need.

# Customise NodeMCU firmware
{% include figure
  image_path="/assets/images/esp8266-nodemcu-dht22-custom-modules-firmware-configure-768.png"
  caption="Choose which branch and which modules to enable and in a few minutes you will have a custom NodeMCU firmware emailed to you."
%}

As you can see from the screenshot there are plenty of libraries for various components you might need. For this post I choose the "DHT" and "MQTT" module in addition to the default ones. Then click the download link in the mail to download the integer version. Follow my instructions in [this](/projects/esp8266-development-kit-nodemcu-firmware-update-os-x/) post to flash the firmware and be sure to read the troubleshooting section if you run into problems. Connect to the ESP8266 and you should see something like this:

{% highlight terminal %}
> 0�~?�4�R���OCE�a��_&E�������

NodeMCU custom build by frightanic.com
	branch: dev
	commit: 093a895980fbd4ab8b3ebedcd6efe36e26419887
	SSL: true
	modules: node,file,gpio,wifi,net,tmr,adc,mqtt,dht
 	built on: 2015-10-13 18:26
  powered by Lua 5.1.4
lua: cannot open init.lua
>
{% endhighlight %}

You are now running a custom-made NodeMCU firmware!

# Test setup using a DHT22 sensor
To test that we can actually use the built-in modules I wire up my ESP8266 with a DHT sensor as shown here:
{% include figure
  image_path="/assets/images/esp8266-nodemcu-dht22-mqtt-deep-sleep-DHT22.png"
  caption="ESP8266 with a DHT22 sensor"
%}

{% include affiliate-disclosure.html %}

The parts used are

* [ESP8266 NodeMCU development kit v1.0](http://s.click.aliexpress.com/e/MrVjUjIEI){:rel="nofollow"} (a.k.a V2) ~ 4.70 USD
* [DHT22 sensor](http://s.click.aliexpress.com/e/eynQRNBYr){:rel="nofollow"} ~ 2.6 USD
* [10K 5% resistor](http://s.click.aliexpress.com/e/3jII6MZjm){:rel="nofollow"} ~ 1 USD (for 100 pieces)
* [Breadboard](http://s.click.aliexpress.com/e/zZZFyfeEI){:rel="nofollow"} ~ 1.5 USD
* [Cables](http://s.click.aliexpress.com/e/zbMfybImi){:rel="nofollow"} ~ 2.5 USD (for 100+ pieces)
* Micro USB cable

You can get these items from Amazon but the price is higher just take a look at the prices for a [ESP8266](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=nodemcu+development+board&tag=oddoneout0a-20){:rel="nofollow"} development board.

# The test code
Now we are ready to write some code! I have modified the code from my previous [post](/projects/esp8266-nodemcu-dht22-mqtt-deep-sleep/) to use the built-in DHT library. It will wake up every 60 seconds, measure the temperature and humidity and send the data to a MQTT server. In addition I added a watchdog timer to deep sleep the device the logic does not complete within 4 seconds, e.g. if the wifi is down. Upload the code as `init.lua`.

{% highlight lua linenos %}
-- MQTT connect script with deep sleep
-- Remember to connect GPIO16 and RST to enable deep sleep
-- TODO: Log error codes to server

--############
--# Settings #
--############

--- MQTT ---
mqtt_broker_ip = "192.168.1.66"     
mqtt_broker_port = 1883
mqtt_username = ""
mqtt_password = ""
mqtt_client_id = ""

--- WIFI ---
wifi_SSID = "wifi-ssid"
wifi_password = "wifi-password"
-- wifi.PHYMODE_B 802.11b, More range, Low Transfer rate, More current draw
-- wifi.PHYMODE_G 802.11g, Medium range, Medium transfer rate, Medium current draw
-- wifi.PHYMODE_N 802.11n, Least range, Fast transfer rate, Least current draw
wifi_signal_mode = wifi.PHYMODE_N
-- If the settings below are filled out then the module connects
-- using a static ip address which is faster than DHCP and
-- better for battery life. Blank "" will use DHCP.
-- My own tests show around 1-2 seconds with static ip
-- and 4+ seconds for DHCP
client_ip="192.168.1.100"
client_netmask="255.255.255.0"
client_gateway="192.168.1.1"

--- INTERVAL ---
-- In milliseconds. Remember that the sensor reading,
-- reboot and wifi reconnect takes a few seconds
time_between_sensor_readings = 60000

--################
--# END settings #
--################

-- Setup MQTT client and events
m = mqtt.Client(client_id, 120, username, password)
temperature = 0
humidity = 0

-- Connect to the wifi network
wifi.setmode(wifi.STATION)
wifi.setphymode(wifi_signal_mode)
wifi.sta.config(wifi_SSID, wifi_password)
wifi.sta.connect()
if client_ip ~= "" then
    wifi.sta.setip({ip=client_ip,netmask=client_netmask,gateway=client_gateway})
end

-- DHT22 sensor logic
function get_sensor_Data()
    dht=require("dht")
    status,temp,humi,temp_decimial,humi_decimial = dht.read(2)
        if( status == dht.OK ) then
            -- Prevent "0.-2 deg C" or "-2.-6"          
            temperature = temp.."."..(math.abs(temp_decimial)/100)
            humidity = humi.."."..(math.abs(humi_decimial)/100)
            -- If temp is zero and temp_decimal is negative, then add "-" to the temperature string
            if(temp == 0 and temp_decimial<0) then
                temperature = "-"..temperature
            end
            print("Temperature: "..temperature.." deg C")
            print("Humidity: "..humidity.."%")
        elseif( status == dht.ERROR_CHECKSUM ) then          
            print( "DHT Checksum error" )
            temperature=-1 --TEST
        elseif( status == dht.ERROR_TIMEOUT ) then
            print( "DHT Time out" )
            temperature=-2 --TEST
        end
    -- Release module
    dht=nil
    package.loaded["dht"]=nil
end

function loop()
    if wifi.sta.status() == 5 then
        -- Stop the loop
        tmr.stop(0)
        m:connect( mqtt_broker_ip , mqtt_broker_port, 0, function(conn)
            print("Connected to MQTT")
            print("  IP: ".. mqtt_broker_ip)
            print("  Port: ".. mqtt_broker_port)
            print("  Client ID: ".. mqtt_client_id)
            print("  Username: ".. mqtt_username)
            -- Get sensor data
            get_sensor_Data()
            m:publish("ESP8266/temperature",temperature, 0, 0, function(conn)
                m:publish("ESP8266/humidity",humidity, 0, 0, function(conn)
                    print("Going to deep sleep for "..(time_between_sensor_readings/1000).." seconds")
                    node.dsleep(time_between_sensor_readings*1000)             
                end)          
            end)
        end )
    else
        print("Connecting...")
    end
end

tmr.alarm(0, 100, 1, function() loop() end)

-- Watchdog loop, will force deep sleep the operation somehow takes to long
tmr.alarm(1,4000,1,function() node.dsleep(time_between_sensor_readings*1000) end)
{% endhighlight %}

You should see a message like this every 60 seconds if you have set everything up correctly.

{% highlight terminal %}
0�~?�4�R���OCE�a��O6E�����

NodeMCU custom build by frightanic.com
	branch: dev
	commit: 093a895980fbd4ab8b3ebedcd6efe36e26419887
	SSL: true
	modules: node,file,gpio,wifi,net,tmr,adc,mqtt,dht
 	built on: 2015-10-13 18:26
  powered by Lua 5.1.4
> Connecting...
Connected to MQTT
  IP: 192.168.1.66
  Port: 1883
  Client ID:
  Username:
Temperature: 23.0 deg C
Humidity: 44.1%
Going to deep sleep for 60 seconds
{% endhighlight %}

The code is now using the built-in modules for the DHT22 library rather than a lua script library!

**UPDATE: 19-04-2016**  
A reader pointed out that the code could not handle negative temperatures with an integer build of NodeMCU, e.g. "-1.-5" instead of "-1.5". This has now been corrected.
