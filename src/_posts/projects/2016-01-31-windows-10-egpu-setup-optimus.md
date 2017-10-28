---
title: "Windows 10 eGPU setup with Optimus!"
excerpt: "Windows 10 eGPU setup with Optimus!"
image:
  path: &image "/assets/images/windows-10-egpu-setup-optimus-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/windows-10-egpu-setup-optimus-feature-th.jpg"
  teaser: *image
tags:
  - eGPU
comments: true
comments_locked: false
published: true
last_modified_at: 2016-01-30T22:43:35
redirect_from: "/windows-10-egpu-setup-optimus/"
---
Last year I did a Thunderbolt 2 enabled external GPU setup using Windows 8.1. I did not upgrade right away when Windows 10 came out because Optimus was [broken](https://www.techinferno.com/index.php?/forums/topic/8918-egpu-window-10-optimus-mode-problem/) which meant I could not use the internal laptop screen. Now NVIDIA has finally fixed the problem in the latest 361.75 driver as described in the release highlights:
> Beta support on GeForce GTX GPUs for external graphics over Thunderbolt 3

I will be starting from scratch so this post assumes you already have
* A clean copy of Windows 10 installed and fully updated. You can try to upgrade from an older version of Windows, but this did not work for me.
* Windows 10 is installed as EFI / UEFI. Check [this](http://www.thewindowsclub.com/check-if-uefi-or-bios) post to see if you are running BIOS or UEFI/EFI
* A similar hardware setup used in my post [here](/projects/thunderbolt-2-egpu-setup-using-akitio-thunder2/). I use
  * [AKiTiO Thunder2 PCIe box](https://www.amazon.com/dp/B00LTAUTHE/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[us][ca]B00LTAUTHE[uk]B00OQPWE72[de][es][it][fr]B00NQ23TCU"} (affiliate)
  * [PCI-Express PCI-E 8X to 16X Riser Card Flexible Ribbon Extender Cable w/Molex](http://www.moddiy.com/products/PCI%252dExpress-PCI%252dE-8X-to-16X-Riser-Card-Flexible-Ribbon-Extender-Cable-w%7B47%7DMolex-%252b-Solid-Capacitor.html)
  * [EVGA GeForce GTX 970 Superclocked ACX 2.0](https://www.amazon.com/dp/B00NVODXR4/?tag=oddoneout0a-20){:rel="nofollow" data-amazon-asin="[uk]B00NSXYEQW[us]B00NVODXR4[de][es][it][fr][ca]B00NSXYEQW"} (affiliate)
* A MacBook without a discrete graphics card. I use a MacBook Pro late 2013

# Driver installation
1. Turn the laptop and eGPU off
2. Plug in the thunderbolt cable from the eGPU setup to the laptop
3. Power on the eGPU setup
4. Power on the laptop and boot into Windows 10 (hold down the ALT key to get to the boot menu)
5. Confirm that the graphics card is detected in Device Manager
{% include figure
  image_path="/assets/images/windows-10-egpu-setup-optimus-Device-manager-basic-adapter.jpg"
  caption="External graphics card detected in device manager before driver installation"
%}

{:start="6"}
6. Install NVIDIA driver (use 361.75 or later)
7. Reboot into Windows 10 (hold down ALT key for boot menu if needed)
8. The internal and external graphics card should now both be visible without any errors in Device Manager
{% include figure
  image_path="/assets/images/windows-10-egpu-setup-optimus-Device-manager-NVIDIA.jpg"
  caption="External card now correctly detected with the NVIDIA driver installed"
%}

{:start="9"}
9. Confirm that the eGPU is working by doing a benchmark, I used [Geeks3D GpuTest](http://www.geeks3d.com/gputest/)
{% include figure
  image_path="/assets/images/windows-10-egpu-setup-optimus-Success.jpg"
  caption="GPU benchmark under Windows 10 using the internal screen (Optimus)"
%}

# Usage
After the driver installation I do the following every time I need to use the setup:
1. Make sure the laptop and eGPU setup is powered off and disconnected
2. Connect the laptop to the eGPU system using the Thunderbolt cable
3. Turn on the laptop and boot into the boot menu by holding down the ALT key
4. Turn on the eGPU system
5. Wait a few seconds (I can usually hear the graphics card fans starting) and then continue booting into Windows 10

The above steps might be overkill, but for now I have successfully started the setup with no problems many times in a row.

# Troubleshooting
* If you boot into a blank screen you probably have the internal screen disabled. Do a full shutdown in Windows 10, disconnect the eGPU setup, boot into Windows 10 without the eGPU, shutdown again and follow the steps described in the section "Usage". To shutdown with a blank screen you could try the following:
  * If you have access to an external monitor, connect this to the external graphics card and you should now see the login screen for Windows 10. Shutdown Windows 10 from here
  * If you don't have access to an external monitor and want to do a proper shutdown, this trick worked for me. If it does not work try it again. When the blue light of the AKiTiO Thunder2 is off then you know the laptop is turned off.
    * Press ENTER
    * Type your Windows 10 password
    * Press ENTER
    * Wait a 10 seconds for Windows to start
    * Press CMD + R
    * Type "shutdown -s -t 0"
    * Press ENTER
* If the blue light on the AKiTiO box does not light up when powering on the setup, check that the PCIe riser is firmly attached to the box and the GPU. Also make sure that the thunderbolt port is working (try using it with another device)
* If you get an error 12 on the eGPU, try using a DSDT override as described in my previous post [here](/projects/thunderbolt-2-egpu-built-around-sonnet-echo-express-se-ii-and-pe4l)

# Help and support
There is a large eGPU community out there. For the best help and support please visit these sites:
* [TechInferno](https://www.techinferno.com/index.php?/forums/forum/83-diy-e-gpu-projects/): Perhaps the biggest source of info on DIY eGPU setups. This is the first place to look for answers
* [DIY eGPU setup](https://egpu.io/diy-egpu-setup-1-30-nando4/): Software created by Nando4 which make can make otherwise impossible eGPU combinations work!
