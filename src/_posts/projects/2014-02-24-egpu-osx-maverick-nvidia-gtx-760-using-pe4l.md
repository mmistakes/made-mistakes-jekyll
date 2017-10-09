---
title: "eGPU: rMBP with OS X 10.9 (Maverick) and NVIDIA GTX 760 using PE4L with Sonnet adapter"
excerpt: "Getting en external eGPU working with OS X 10.9 using the PE4L with Sonnet adapter"
image:
  path: &image "/assets/images/template-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/template-th.jpg"
  teaser: "/assets/images/template-feature.jpg"
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

1. Should already be installed, else use recovery to reinstall
2. Boot into OS X
3. Open the terminal
4. Edit the following `Info.plist` files using the "sudo nano {path/filename}" command
    1. `/System/Library/Extensions/NVDAStartup.kext/Contents/Info.plist`
    2. `/System/Library/Extensions/IONDRVSupport.kext/Info.plist`
    3. `/System/Library/Extensions/AppleHDA.kext/Contents/PlugIns/AppleHDAController.kext/Contents/Info.plist`
5. In each of the above files find each section starting with

   ```xml
   <key>CFBundleIdentifier</key>
   ```  
     
   and add

   ```xml
   <key>IOPCITunnelCompatible</key>
   <true/>
   ```

   just before the corresponding closing `</dict>` of the section. Example of the modified `/IONDRVSupport.kext/Info.plist` is shown here, starting sections highlighted with yellow and added sections highlighted with green.

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
<span style="background-color: lime;"><key>IOPCITunnelCompatible</key><&#47;span><br />
<span style="background-color: lime;"><br />
<true/><&#47;span><br />
<&#47;dict><br />
<key>2</key>
<span style="background-color: yellow;"><dict><&#47;span><br />
<span style="background-color: yellow;"><key>CFBundleIdentifier</key><&#47;span><br />
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
<span style="background-color: lime;"><key>IOPCITunnelCompatible</key><&#47;span><br />
<span style="background-color: lime;"><br />
<true/><&#47;span><br />
<&#47;dict><br />
<key>3</key>
<span style="background-color: yellow;"><dict><&#47;span><br />
<span style="background-color: yellow;"><key>CFBundleIdentifier</key><&#47;span><br />
<string>com.apple.iokit.IONDRVSupport</string>
<key>IOClass</key>
<string>IONDRVFramebuffer</string>
<key>IOMatchCategory</key>
<string>IOFramebuffer</string>
<key>IOPCIClassMatch</key>
<string>0x03000000&amp;amp;0xff000000</string>
<key>IOProbeScore</key>
<integer>0</integer>
<key>IOProviderClass</key>
<string>IOPCIDevice</string>
<span style="background-color: lime;"><key>IOPCITunnelCompatible</key><&#47;span><br />
<span style="background-color: lime;"><br />
<true/><&#47;span><&#47;dict><br />
<&#47;dict><br />
<key>OSBundleCompatibleVersion</key>
<string>1.0.0b1</string>
<key>OSBundleLibraries</key>
<dict><br />
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
<&#47;dict><br />
<key>OSBundleRequired</key>
<string>Safe Boot</string>
<&#47;dict><br />
<&#47;plist>
   {% endhighlight %}
6. Type "sudo touch /System/Library/Extensions
<li>Wait a few minutes until the extension cache is rebuild. You can check the activity monitor the kext cache rebuild process, sort after CPU usage<&#47;li>
<li>Shutdown the laptop<&#47;li>
<li>Plug in eGPU setup with SW1 set to 1 and SW2 set to 2-3<&#47;li>
<li>Connect the eGPU to an external monitor and make sure the monitor is on<&#47;li>
<li>Boot into OS X<&#47;li>
<li>My GPU is already supported by OS X (NVIDIA GTX 760) so no driver installation needed<&#47;li>
<li>Change from mirroring the display to extending the desktop<&#47;li>
<li>You should now have a working setup, the internal screen is functional as is the external, but only the external screen is accelerated<&#47;li><br />
<&#47;ul></p>
<h2>Performance<&#47;h2><br />
I use&nbsp;Geeks3D GpuTest with everything standard settings except resolution which is set to 1440x900 windowed mode.</p>
<table border="1">
<tbody>
<tr>
<th><&#47;th></p>
<th>FurMark<&#47;th></p>
<th>TessMark (X8&#47;X8)<&#47;th></p>
<th>GiMark<&#47;th><br />
<&#47;tr></p>
<tr>
<td>Internal screen (Intel HD 5100)<&#47;td></p>
<td>698<br />
(11 FPS)<&#47;td></p>
<td>6863<br />
(114 FPS)<&#47;td></p>
<td>1420<br />
(23 FPS)<&#47;td><br />
<&#47;tr></p>
<tr>
<td>External monitor (NVIDIA GTX 760)<&#47;td></p>
<td>5313<br />
(88 FPS)<&#47;td></p>
<td>74793<br />
(1247 FPS)<&#47;td></p>
<td>6734<br />
(112 FPS)<&#47;td><br />
<&#47;tr></p>
<tr>
<td>Improvement in percent<&#47;td></p>
<td>761%<&#47;td></p>
<td>1089%<&#47;td></p>
<td>474%<&#47;td><br />
<&#47;tr><br />
<&#47;tbody><br />
<&#47;table></p>
<h2>Limitations<&#47;h2></p>
<ol>
<li>The internal screen is not accelerated, only the external monitor. Using Optimus this should be possible, worked fine on my Lenovo T430s using Windows, I need to investigate this further.<&#47;li>
<li>Only unplug the thunderbolt cable when the computer is off, else a kernel panic will occur<&#47;li>
<li>Need to power the GPU and laptop off before plugging the eGPU in and the monitor must be connected to the eGPU and powered on<&#47;li><br />
<&#47;ol></p>
<h2>References<&#47;h2></p>
<ul>
<li>Enable GPU through thunderbolt by editing kext files taken from this <a href="http:&#47;&#47;www.journaldulapin.com&#47;2013&#47;08&#47;24&#47;a-thunderbolt-gpu-on-a-mac-how-to&#47;" target="_blank">post<&#47;a><&#47;li>
<li>Geeks3D GpuTest download <a href="http:&#47;&#47;www.geeks3d.com&#47;gputest&#47;" target="_blank">here<&#47;a><&#47;li><br />
<&#47;ul></p>
