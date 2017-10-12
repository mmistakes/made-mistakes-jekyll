---
title: "eGPU with Windows 7 (BIOS), NVIDIA, PE4L & Sonnet TB adapter"
excerpt: "eGPU: rMBP with Windows 7 (BIOS) and NVIDIA GTX 760 using PE4L with Sonnet adapter"
image:
  path: &image "/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_detect_GPU-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_detect_GPU-feature-th.jpg"
  teaser: *image
tags: 
  - eGPU
comments: true
comments_locked: false
published: true
last_modified_at: 2014-04-02T19:21:00
redirect_from: "/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el/"
---
This post describes how to get the card working in Windows 7 (BIOS / Bootcamp install) which includes getting Optimus to work (read: Accelerating the internal screen of the laptop). This is mostly getting the software to work, my hardware setup is described more [here](/projects/external-graphics-card-experiment-part-1).

## Setup
1. Boot into OS X
2. Use Boot Camp to create a bootable USB stick from a Windows 7 image, including the drivers
3. Reboot and install Windows 7. If you keep booting into OS X, then reboot and hold down the "ALT" key until you see a boot menu where the USB stick should be selectable. Alternatively use a boot manager like [rEFInd](http://www.rodsbooks.com/refind/)
4. Update Windows until nothing can be updated
5. Purchase and download [DIY eGPU Setup 1.x](https://egpu.io/diy-egpu-setup-1-30-nando4/)
6. Extract the files to `C:/eGPU`
7. As admin run `C:/eGPUsetup-disk-image.bat` and follow the instructions 

{% include figure
  image_path="/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_Setup_Install_Screen.png"
%}

{:start="8"}
8. Run `C:/eGPUeGPU-Setup-mount.bat` to mount the disk image
9. Replace `V:/configpci.bat` with the one from part C [here](https://www.techinferno.com/index.php?/forums/topic/3225-2013-11-mba-gtx5704gbpsc-tbec2-pe4l-21b-win7-kloper/). I could not generate anything that I could get to work with DIY eGPU
10. Turn of the laptop, turn off the GPU
11. Plug in eGPU setup with SW1 set to 3 and SW2 set to 2-3
12. Make sure no monitor is connected to the eGPU
13. Turn on the GPU
14. Turn on the laptop while holding down the "ALT" key and choose to boot windows
15. Select "DIY Setup 1.x" in the windows boot menu

{% include figure
  image_path="/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_Windows_boot_menu.jpg"
%}

{:start="16"}
16. Wait for the automated startup

{% include figure
  image_path="/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_Menu.jpg"
%}

{:start="17"}
17. Wait for the automatic detection of the GPU

{% include figure
  image_path="/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_detect_GPU.jpg"
%}

{:start="18"}
18. This time let it boot into windows

{% include figure
  image_path="/assets/images/egpu-rmbp-windows7-bios-nvidia-gtx-760-p4el-DIY_Windows_boot_menu_2.jpg"
%}

{:start="19"}
19. Install NVIDIA drivers if needed

## Performance
I did not do any performance testing since I just replaced my laptop with one that was more difficult getting to work on the software side. The performance should be very similar to the one I got in [this post](/projects/external-graphics-card-experiment-part-1)

## Limitations
1. Using a DSDT override it should not be necessary to use DIY eGPU setup. I did do this, but no success in getting the eGPU to work even though the "large memory" did shown up correctly.

## What is next?
The next project is to make a better and faster docking station using the Sonnet Echo Express SE II which will increase my bandwidth 4 times compared to this setup. It will include an onboard SSD drive and a pair of USB ports so I can boot of the external SSD when using the graphics cards at home. This way I free up much-needed space on the laptop since games and other files only needed when connected to the GPU can stay in the docking station. I will have to get creative with a pci-e riser since this the Sonnet does not have a pci-e reset delay needed for this setup to work.

## References
* [3DMark](http://www.futuremark.com/benchmarks/3dmark/all)
* [Geeks3D GpuTest](http://www.geeks3d.com/gputest/)
* [DIY eGPU setup 1.x](https://egpu.io/diy-egpu-setup-1-30-nando4/)
* [rEFInd boot manager](http://www.rodsbooks.com/refind/)
* `pci.bat` used in DIY Setup from [here](https://www.techinferno.com/index.php?/forums/topic/3225-2013-11-mba-gtx5704gbpsc-tbec2-pe4l-21b-win7-kloper/) (part C)
