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
<p>A while ago I made an external GPU setup described <a href="https:&#47;&#47;odd-one-out.serek.eu&#47;external-graphics-card-experiment-part-1" target="_blank">here<&#47;a>.&nbsp;Now I have replaced my Lenovo T430s laptop with a MacBook pro 13 retina (late 2013 model) and worked on getting the card to work under both Windows 7, Windows 8.1 and OS X. This post describes how to get the card working in OS X 10.9 (Maverick)</p>
<p>[aDisclaimer]</p>
<p>The setup used a <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00GWM5ZLO&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[de][uk][us][es][it][fr][ca]B00GWM5ZLO">Bplus PE4L<&#47;a>, <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B0080MQJJ6&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][de][ca][it][es][fr]B0080MQJJ6">Sonnet Echo ExpressCard Pro Thunderbolt<&#47;a> adapter and a <a href="https:&#47;&#47;www.amazon.com&#47;s&#47;ref=nb_sb_noss_2?url=search-alias%3Daps&amp;field-keywords=NVIDIA+GTX+760&amp;tag=oddoneout0a-20" rel="nofollow">NVIDIA GTX 760<&#47;a> graphics card.</p>
<p>If you have a Thunderbolt enabled device I now recommend the <a href="https:&#47;&#47;www.amazon.com&#47;dp&#47;B00LTAUTHE&#47;?tag=oddoneout0a-20" rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU">AKiTiO Thunder2<&#47;a> as described in my post&nbsp;<a href="https:&#47;&#47;odd-one-out.serek.eu&#47;thunderbolt-2-egpu-setup-using-akitio-thunder2&#47;">here<&#47;a>.</p>
<h2>Setup<&#47;h2></p>
<ol>
<ol>
<li>Should already be installed, else use recovery to reinstall<&#47;li>
<li>Boot into OS X<&#47;li>
<li>Open the terminal<&#47;li>
<li>Edit the following Info.plist files using the "sudo nano {path&#47;filename}" command
<ol>
<li>&#47;System&#47;Library&#47;Extensions&#47;NVDAStartup.kext&#47;Contents&#47;Info.plist<&#47;li>
<li>&#47;System&#47;Library&#47;Extensions&#47;IONDRVSupport.kext&#47;Info.plist<&#47;li>
<li>&#47;System&#47;Library&#47;Extensions&#47;AppleHDA.kext&#47;Contents&#47;PlugIns&#47;AppleHDAController.kext&#47;Contents&#47;Info.plist<&#47;li><br />
<&#47;ol><br />
<&#47;li></p>
<li>In each of the above files find each section starting with<&#47;li><br />
<&#47;ol><br />
<&#47;ol></p>
<blockquote><p><key>CFBundleIdentifier<&#47;key><&#47;blockquote><br />
and add</p>
<blockquote><p><key>IOPCITunnelCompatible<&#47;key></p>
<true&#47;><&#47;blockquote><br />
just before the corresponding closing <&#47;dict> of the section. Example of the modified&nbsp;IONDRVSupport.kext&#47;Info.plist is shown here, starting sections highlighted with yellow and added sections highlighted with green.</p>
<blockquote><p><!--?<span class="hiddenSpellError" pre="" data-mce-bogus="1"-->xml version="1.0" encoding="UTF-8"?><br />
<!--<span class="hiddenSpellError" pre="" data-mce-bogus="1"-->DOCTYPE plist PUBLIC "-&#47;&#47;Apple&#47;&#47;DTD PLIST 1.0&#47;&#47;EN" "http:&#47;&#47;www.apple.com&#47;DTDs&#47;PropertyList-1.0.dtd"></p>
<plist version="1.0">
<dict><br />
<key>BuildMachineOSBuild<&#47;key><br />
<string>13A3014<&#47;string><br />
<key>CFBundleDevelopmentRegion<&#47;key><br />
<string>English<&#47;string><br />
<key>CFBundleExecutable<&#47;key><br />
<string>IONDRVSupport<&#47;string><br />
<key>CFBundleGetInfoString<&#47;key><br />
<string>2.4, Copyright Apple Computer, Inc. 2000-2012<&#47;string><br />
<key>CFBundleIdentifier<&#47;key><br />
<string>com.apple.iokit.IONDRVSupport<&#47;string><br />
<key>CFBundleInfoDictionaryVersion<&#47;key><br />
<string>6.0<&#47;string><br />
<key>CFBundleName<&#47;key><br />
I&#47;O Kit NDRV Support<br />
<key>CFBundlePackageType<&#47;key><br />
<string>KEXT<&#47;string><br />
<key>CFBundleShortVersionString<&#47;key><br />
<string>2.4<&#47;string><br />
<key>CFBundleSignature<&#47;key><br />
<string>????<&#47;string><br />
<key>CFBundleVersion<&#47;key><br />
<string>2.4<&#47;string><br />
<key>DTCompiler<&#47;key><br />
<string>com.apple.compilers.llvm.clang.1_0<&#47;string><br />
<key>DTPlatformBuild<&#47;key><br />
<string>5A11344p<&#47;string><br />
<key>DTPlatformVersion<&#47;key><br />
<string>GM<&#47;string><br />
<key>DTSDKBuild<&#47;key><br />
<string>13A3014<&#47;string><br />
<key>DTSDKName<&#47;key><br />
<string><&#47;string><br />
<key>DTXcode<&#47;key><br />
<string>0500<&#47;string><br />
<key>DTXcodeBuild<&#47;key><br />
<string>5A11344p<&#47;string><br />
<key>IOKitPersonalities<&#47;key><br />
<dict><br />
<key>1<&#47;key><br />
<span style="background-color: yellow;"><dict><&#47;span><br />
<span style="background-color: yellow;"><key>CFBundleIdentifier<&#47;key><&#47;span><br />
<string>com.apple.iokit.IONDRVSupport<&#47;string><br />
<key>IOClass<&#47;key><br />
<string>IONDRVFramebuffer<&#47;string><br />
<key>IOMatchCategory<&#47;key><br />
<string>IOFramebuffer<&#47;string><br />
<key>IONameMatch<&#47;key><br />
<string>display<&#47;string><br />
<key>IOProbeScore<&#47;key><br />
<integer>20000<&#47;integer><br />
<key>IOProviderClass<&#47;key><br />
<string>IOPCIDevice<&#47;string><br />
<span style="background-color: lime;"><key>IOPCITunnelCompatible<&#47;key><&#47;span><br />
<span style="background-color: lime;"><br />
<true&#47;><&#47;span><br />
<&#47;dict><br />
<key>2<&#47;key><br />
<span style="background-color: yellow;"><dict><&#47;span><br />
<span style="background-color: yellow;"><key>CFBundleIdentifier<&#47;key><&#47;span><br />
<string>com.apple.iokit.IONDRVSupport<&#47;string><br />
<key>IOClass<&#47;key><br />
<string>IONDRVFramebuffer<&#47;string><br />
<key>IOMatchCategory<&#47;key><br />
<string>IOFramebuffer<&#47;string><br />
<key>IONameMatch<&#47;key><br />
<string>display<&#47;string><br />
<key>IOProbeScore<&#47;key><br />
<integer>20000<&#47;integer><br />
<key>IOProviderClass<&#47;key><br />
<string>IOPlatformDevice<&#47;string><br />
<span style="background-color: lime;"><key>IOPCITunnelCompatible<&#47;key><&#47;span><br />
<span style="background-color: lime;"><br />
<true&#47;><&#47;span><br />
<&#47;dict><br />
<key>3<&#47;key><br />
<span style="background-color: yellow;"><dict><&#47;span><br />
<span style="background-color: yellow;"><key>CFBundleIdentifier<&#47;key><&#47;span><br />
<string>com.apple.iokit.IONDRVSupport<&#47;string><br />
<key>IOClass<&#47;key><br />
<string>IONDRVFramebuffer<&#47;string><br />
<key>IOMatchCategory<&#47;key><br />
<string>IOFramebuffer<&#47;string><br />
<key>IOPCIClassMatch<&#47;key><br />
<string>0x03000000&amp;amp;0xff000000<&#47;string><br />
<key>IOProbeScore<&#47;key><br />
<integer>0<&#47;integer><br />
<key>IOProviderClass<&#47;key><br />
<string>IOPCIDevice<&#47;string><br />
<span style="background-color: lime;"><key>IOPCITunnelCompatible<&#47;key><&#47;span><br />
<span style="background-color: lime;"><br />
<true&#47;><&#47;span><&#47;dict><br />
<&#47;dict><br />
<key>OSBundleCompatibleVersion<&#47;key><br />
<string>1.0.0b1<&#47;string><br />
<key>OSBundleLibraries<&#47;key><br />
<dict><br />
<key>com.apple.iokit.IOGraphicsFamily<&#47;key><br />
<string>1.1<&#47;string><br />
<key>com.apple.iokit.IOPCIFamily<&#47;key><br />
<string>1.1<&#47;string><br />
<key>com.apple.kpi.iokit<&#47;key><br />
<string>8.0.0<&#47;string><br />
<key>com.apple.kpi.libkern<&#47;key><br />
<string>8.0.0<&#47;string><br />
<key>com.apple.kpi.mach<&#47;key><br />
<string>8.0.0<&#47;string><br />
<key>com.apple.kpi.unsupported<&#47;key><br />
<string>8.0.0<&#47;string><br />
<&#47;dict><br />
<key>OSBundleRequired<&#47;key><br />
<string>Safe Boot<&#47;string><br />
<&#47;dict><br />
<&#47;plist><&#47;blockquote></p>
<ul>
<li>Type "sudo touch&nbsp; &#47;System&#47;Library&#47;Extensions<&#47;li>
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
