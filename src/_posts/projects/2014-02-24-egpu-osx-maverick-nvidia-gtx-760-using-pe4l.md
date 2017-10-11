---
title: "eGPU with OS X 10.9, NVIDA GPU, PE4L & TB adapter"
excerpt: "Getting en external eGPU working with OS X 10.9 using the PE4L with Sonnet adapter"
tags:
  - eGPU
comments: true
comments_locked: false
published: true
last_modified_at: 2014-02-24T07:00:00
redirect_from: "/egpu-osx-maverick-nvidia-gtx-760-using-pe4l/"
---
A while ago I made an external GPU setup described [here](/projects/external-graphics-card-experiment-part-1/). Now I have replaced my Lenovo T430s laptop with a MacBook pro 13 retina (late 2013 model) and worked on getting the card to work under both Windows 7, Windows 8.1 and OS X. This post describes how to get the card working in OS X 10.9 (Maverick)

{% include affiliate-disclosure.html %}

The setup used a [Bplus PE4L](https://www.amazon.com/dp/B00GWM5ZLO/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[de][es][it][fr]uk[ca][uk][uk]B00GWM5ZLO"}, [Sonnet Echo ExpressCard Pro Thunderbolt](https://www.amazon.com/dp/B0080MQJJ6/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][de][ca][it][es][fr]B0080MQJJ6"} adapter and a [NVIDIA GTX 760](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=NVIDIA+GTX+760&tag=oddoneout0a-20){:rel="nofollow"} graphics card.
If you have a Thunderbolt enabled device I now recommend the [AKiTiO Thunder2](https://www.amazon.com/dp/B00LTAUTHE/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU"} as described in my post [here](/projects/thunderbolt-2-egpu-setup-using-akitio-thunder/).

## Setup

* Should already be installed, else use recovery to reinstall
* Boot into OS X
* Open the terminal
* Edit the following `Info.plist` files using the "sudo nano {path/filename}" command
    1. `/System/Library/Extensions/NVDAStartup.kext/Contents/Info.plist`
    2. `/System/Library/Extensions/IONDRVSupport.kext/Info.plist`
    3. `/System/Library/Extensions/AppleHDA.kext/Contents/PlugIns/AppleHDAController.kext/Contents/Info.plist`
* In each of the above files find each section starting with

   ```xml
   <key>CFBundleIdentifier</key>
   ```

   and add

   ```xml
   <key>IOPCITunnelCompatible</key>
   <true/>
   ```

   just before the corresponding closing `</dict>` of the section. Example of the modified `/IONDRVSupport.kext/Info.plist` is shown here. The `CFBundleIdentifier` section can be seen on line 45, 62 and 79 and their corresponding `IOPCITunnelCompatible` entries at 57-58, 74-75 and 91-92.

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>BuildMachineOSBuild</key>
  <string>13A3014</string>
  <key>CFBundleDevelopmentRegion</key>
  <string>English</string>
  <key>CFBundleExecutable</key>
  <string>IONDRVSupport</string>
  <key>CFBundleGetInfoString</key>
  <string>2.4, Copyright Apple Computer, Inc. 2000-2012</string>
  <key>CFBundleIdentifier</key>
  <string>com.apple.iokit.IONDRVSupport</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>I/O Kit NDRV Support</string>
  <key>CFBundlePackageType</key>
  <string>KEXT</string>
  <key>CFBundleShortVersionString</key>
  <string>2.4</string>
  <key>CFBundleSignature</key>
  <string>????</string>
  <key>CFBundleVersion</key>
  <string>2.4</string>
  <key>DTCompiler</key>
  <string>com.apple.compilers.llvm.clang.1_0</string>
  <key>DTPlatformBuild</key>
  <string>5A11344p</string>
  <key>DTPlatformVersion</key>
  <string>GM</string>
  <key>DTSDKBuild</key>
  <string>13A3014</string>
  <key>DTSDKName</key>
  <string></string>
  <key>DTXcode</key>
  <string>0500</string>
  <key>DTXcodeBuild</key>
  <string>5A11344p</string>
  <key>IOKitPersonalities</key>
  <dict>
    <key>1</key>
    <dict>
      <key>CFBundleIdentifier</key>
      <string>com.apple.iokit.IONDRVSupport</string>
      <key>IOClass</key>
      <string>IONDRVFramebuffer</string>
      <key>IOMatchCategory</key>
      <string>IOFramebuffer</string>
      <key>IONameMatch</key>
      <string>display</string>
      <key>IOProbeScore</key>
      <integer>20000</integer>
      <key>IOProviderClass</key>
      <string>IOPCIDevice</string>
      <key>IOPCITunnelCompatible</key>
      <true/>
    </dict>
    <key>2</key>
    <dict>
      <key>CFBundleIdentifier</key>
      <string>com.apple.iokit.IONDRVSupport</string>
      <key>IOClass</key>
      <string>IONDRVFramebuffer</string>
      <key>IOMatchCategory</key>
      <string>IOFramebuffer</string>
      <key>IONameMatch</key>
      <string>display</string>
      <key>IOProbeScore</key>
      <integer>20000</integer>
      <key>IOProviderClass</key>
      <string>IOPlatformDevice</string>
      <key>IOPCITunnelCompatible</key>
      <true/>
    </dict>
    <key>3</key>
    <dict>
      <key>CFBundleIdentifier</key>
      <string>com.apple.iokit.IONDRVSupport</string>
      <key>IOClass</key>
      <string>IONDRVFramebuffer</string>
      <key>IOMatchCategory</key>
      <string>IOFramebuffer</string>
      <key>IOPCIClassMatch</key>
      <string>0x03000000&amp;0xff000000</string>
      <key>IOProbeScore</key>
      <integer>0</integer>
      <key>IOProviderClass</key>
      <string>IOPCIDevice</string>
      <key>IOPCITunnelCompatible</key>
      <true/>
    </dict>
  </dict>
  <key>OSBundleCompatibleVersion</key>
  <string>1.0.0b1</string>
  <key>OSBundleLibraries</key>
  <dict>
    <key>com.apple.iokit.IOGraphicsFamily</key>
    <string>1.1</string>
    <key>com.apple.iokit.IOPCIFamily</key>
    <string>1.1</string>
    <key>com.apple.kpi.iokit</key>
    <string>8.0.0</string>
    <key>com.apple.kpi.libkern</key>
    <string>8.0.0</string>
    <key>com.apple.kpi.mach</key>
    <string>8.0.0</string>
    <key>com.apple.kpi.unsupported</key>
    <string>8.0.0</string>
  </dict>
  <key>OSBundleRequired</key>
  <string>Safe Boot</string>
</dict>
</plist>{% endhighlight %}

* Type "sudo touch /System/Library/Extensions"
* Wait a few minutes until the extension cache is rebuild. You can check the activity monitor the kext cache rebuild process, sort after CPU usage
* Shutdown the laptop
* Plug in eGPU setup with SW1 set to 1 and SW2 set to 2-3
* Connect the eGPU to an external monitor and make sure the monitor is on
* Boot into OS X
* My GPU is already supported by OS X (NVIDIA GTX 760) so no driver installation needed
* Change from mirroring the display to extending the desktop
* You should now have a working setup, the internal screen is functional as is the external, but only the external screen is accelerated

## Performance
I use Geeks3D GpuTest with everything standard settings except resolution which is set to 1440x900 windowed mode.

| |FurMark|TessMark (X8/X8)|GiMark|
|---|---:|---:|---:|
|Internal screen (Intel HD 5100) - score|698|6863|1420|
|Internal screen (Intel HD 5100) - fps|11|114|23|
|External monitor (NVIDIA GTX 760) - score|5313|74793|6734|
|External monitor (NVIDIA GTX 760) - fps|88|1247|112|
|**Improvement**|**761%**|**1089%**|**474%**|

## Limitations

1. The internal screen is not accelerated, only the external monitor. Using Optimus this should be possible, worked fine on my Lenovo T430s using Windows, I need to investigate this further.
2. Only unplug the thunderbolt cable when the computer is off, else a kernel panic will occur.
3. Need to power the GPU and laptop off before plugging the eGPU in and the monitor must be connected to the eGPU and powered on

## References

* Enable GPU through thunderbolt by editing kext files taken from this [post](http://www.journaldulapin.com/2013/08/24/a-thunderbolt-gpu-on-a-mac-how-to/)
* [Geeks3D GpuTest](http://www.geeks3d.com/gputest/)
