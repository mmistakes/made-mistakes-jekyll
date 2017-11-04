---
title: "ESP8266 NodeMCU - DHT22 sensor and ThingSpeak"
excerpt: "ESP8266 NodeMCU - DHT22 sensor and ThingSpeak"
image:
  path: &image "/assets/images/esp8266-nodemcu-dht22-thingspeak-feature.png"
  feature: *image
  thumbnail: "/assets/images/esp8266-nodemcu-dht22-thingspeak-feature-th.png"
  teaser: *image
tags:
  - Internet of things
  - ESP8266
  - NodeMCU
comments: true
comments_locked: false
published: true
last_modified_at: 2016-03-19T18:01:2
redirect_from: "/esp8266-nodemcu-dht22-thingspeak/"
---
I have previously [written](/projects/esp8266-nodemcu-dht22-mqtt-deep-sleep/) about pushing temperature and humidity readings from an ESP8266 to a MQTT server using a DHT22 sensor. Later I [leveraged](/projects/esp8266-nodemcu-dht22-custom-modules-firmware/) NodeMCU's built-in DHT22 library by using an online [service](http://nodemcu-build.com) to create a streamlined NodeMCU firmware fit for my needs. However, a reader asked me about pushing data to [ThingSpeak.com](http://thingspeak.com) instead and here is the reply.

# Hardware
Follow my post [here](/projects/esp8266-nodemcu-dht22-mqtt-deep-sleep/) on how to connect all the parts.

# NodeMCU firmware
Follow my post [here](/projects/esp8266-nodemcu-dht22-custom-modules-firmware/) on how to built a custom NodeMCU firmware and remember to check the DHT library. If you need help flashing the firmware you can take a look at my guide [here](/proejcts/esp8266-development-kit-nodemcu-firmware-update-os-x/).
{% include figure
  image_path="/assets/images/esp8266-nodemcu-dht22-thingspeak-nodemcu-build.com-DHT.png"
  caption="Nodemcu-build.com default values and DHT selected"
%}

# Software
Instead of the test code described in my post [here](/projects/esp8266-nodemcu-dht22-custom-modules-firmware/), use the one below. Configure the following variables before uploading to the ESP8266:

* `thingspeak_channel_api_write_key`
* `thingspeak_temperature_field_name`
* `thingspeak_humidity_field_name`
* `wifi_SSID`
* `wifi_password`

And I recommend to use a static IP address for faster connection times, just set the `client_*` variables.
{% highlight lua linenos %}
-- Thingspeak connect script with deep sleep
-- Remember to connect GPIO16 and RST to enable deep sleep
-- TODO: Log error codes to server

--############
--# Settings #
--############

--- Thingspeak ---
thingspeak_channel_api_write_key = "LU1TXYV15GBVTDHU"
thingspeak_temperature_field_name = "field1"
thingspeak_humidity_field_name = "field2"

--- WIFI ---
wifi_SSID = "wifi-Name"
wifi_password = "wifi-Password"
-- wifi.PHYMODE_B 802.11b, More range, Low Transfer rate, More current draw
-- wifi.PHYMODE_G 802.11g, Medium range, Medium transfer rate, Medium current draw
-- wifi.PHYMODE_N 802.11n, Least range, Fast transfer rate, Least current draw
wifi_signal_mode = wifi.PHYMODE_N
-- If the settings below are filled out then the module connects
-- using a static ip address which is faster than DHCP and
-- better for battery life. Blank "" will use DHCP.
-- My own tests show around 1-2 seconds with static ip
-- and 4+ seconds for DHCP
client_ip=""
client_netmask=""
client_gateway=""

--- INTERVAL ---
-- In milliseconds. Remember that the sensor reading,
-- reboot and wifi reconnect takes a few seconds
time_between_sensor_readings = 60000

--################
--# END settings #
--################

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

        con = nil
        con = net.createConnection(net.TCP, 0)

        con:on("receive", function(con, payloadout)
            if (string.find(payloadout, "Status: 200 OK") ~= nil) then
                print("Posted OK to ThingSpeak");
            end
        end)

        con:on("connection", function(con, payloadout)

        -- Get sensor data
        get_sensor_Data()

        -- Post data to Thingspeak
        con:send(
            "POST /update?api_key=" .. thingspeak_channel_api_write_key ..
            "&field1=" .. temperature ..
            "&field2=" .. humidity ..
            " HTTP/1.1\r\n" ..
            "Host: api.thingspeak.com\r\n" ..
            "Connection: close\r\n" ..
            "Accept: */*\r\n" ..
            "User-Agent: Mozilla/4.0 (compatible; esp8266 Lua; Windows NT 5.1)\r\n" ..
            "\r\n")
        end)

        con:on("disconnection", function(con, payloadout)
            con:close();
            collectgarbage();
            print("Going to deep sleep for "..(time_between_sensor_readings/1000).." seconds")
            node.dsleep(time_between_sensor_readings*1000)
        end)

        -- Connect to Thingspeak
        con:connect(80,'api.thingspeak.com')
    else
        print("Connecting...")
    end
end

tmr.alarm(0, 100, 1, function() loop() end)

-- Watchdog loop, will force deep sleep the operation somehow takes too long
tmr.alarm(1,4000,1,function() node.dsleep(time_between_sensor_readings*1000) end)
{% endhighlight %}

# Result
If everything went well you should see the following repeated every 60 seconds on your ESP8266:
{% highlight terminal %}
0�~?�4�R���OCMa��_6E������

NodeMCU custom build by frightanic.com
	branch: dev
	commit: 093a895980fbd4ab8b3ebedcd6efe36e26419887
	SSL: true
	modules: node,file,gpio,wifi,net,tmr,adc,dht
 	built on: 2015-10-13 18:26
  powered by Lua 5.1.4
> Connecting...
Temperature: 23.2 deg C
Humidity: 39.1%
Posted OK to ThingSpeak
Going to deep sleep for 60 seconds
{% endhighlight %}

The results should now show up right away at your ThingSpeak channel.

{% include figure
  image_path="/assets/images/esp8266-nodemcu-dht22-thingspeak-feature.png"
  caption="Thingspeak with temperature and humidity data from and ESP8266 using a DHT22 sensor"
%}
