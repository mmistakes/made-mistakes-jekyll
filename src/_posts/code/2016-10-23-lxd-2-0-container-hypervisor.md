---
title: "Getting started with LXD 2.0 container hypervisor"
excerpt: "Getting started with LXD 2.0 container hypervisor"
image:
  path: &image "/assets/images/lxd-2-0-container-hypervisor-feature.png"
  feature: *image
  thumbnail: "/assets/images/lxd-2-0-container-hypervisor-feature-th.png"
  teaser: *image
tags:
  - LXD
comments: true
comments_locked: false
published: true
last_modified_at: 2016-10-23T15:36:45
redirect_from: "/lxd-2-0-container-hypervisor/"
---
For the past few years I have been migrating between different [OpenVZ](https://en.wikipedia.org/wiki/OpenVZ){:rel="nofollow"} [VPS](https://en.wikipedia.org/wiki/Virtual_private_server){:rel="nofollow"} providers and each time it has been a hassle to migrate and upgrade my virtual machines between them. Then I stumbled upon [LXD](https://www.ubuntu.com/cloud/lxd){:rel="nofollow"} which in combination with a [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine){:rel="nofollow"} VPS seems like a perfect fit for running multiple containers on a single KVM VPS and migrating them to and from others LXD hosts with a single command! Notice that using OpenVZ VPS'es is not possible since the kernel is too old. For this post I used [VirtualBox](https://www.virtualbox.org){:rel="nofollow"}, but plan on migrating the whole setup to a KVM VPS at [RamNode](https://clientarea.ramnode.com/aff.php?aff=3059){:rel="nofollow"} (affiliate link) which I highly recommend.

{% include notice
  type = "info"
  content = "Check out my post [here](/code/latest-stable-lxd-ubuntu-16-04-lts/) for installing the latest stable version of LXD on Ubuntu 16.04"
%}

# Installation of LXD host
Start by installing a copy of the newest Ubuntu server on VirtualBox, I used Ubuntu 16.04.1 LTS. This already comes with LXD which just need to be configured. I configured LXD with the default values except saying yes to making LXD available over the network. Replace `somepassword` with your own password.

{% highlight terminal %}
$ sudo lxd init
Name of the storage backend to use (dir or zfs) [default=dir]: dir
Would you like LXD to be available over the network (yes/no) [default=no]? yes
Address to bind LXD to (not including port) [default=all]: all
Port to bind LXD to [default=8443]: 8443
Trust password for new clients: somepassword
Again: somepassword
Do you want to configure the LXD bridge (yes/no) [default=yes]? yes
{% endhighlight %}

This will open the bridge configurator. I used the default values.

{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_01.png"
  caption="01: LXD bridge configuration"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_02.png"
  caption="02: Bridge name"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_03.png"
  caption="03: IPv4 subnet"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_04.png"
  caption="04: IPv4 address"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_05.png"
  caption="05: IPv4 CIDR mask"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_06.png"
  caption="06: First DHCP address"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_07.png"
  caption="07: Last DHCP address"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_08.png"
  caption="08: Max number of DHCP clients"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_09.png"
  caption="09: NAT IPv4 traffic"
%}
{% include figure
  image_path="/assets/images/lxd-2-0-container-hypervisor-LXD_Bridge_10.png"
  caption="10: IPv6 subnet"
%}

This should end with a `LXD has been successfully configured` message.

# Setup a container
Lets create an Ubuntu container
{% highlight terminal %}
$ lxc launch ubuntu: test-container
{% endhighlight %}

After it is done we confirm that the container is running

{% highlight terminal %}
$ lxc list
    +-----------------+---------+------------------------+------+------------+-----------+
    |      NAME       |  STATE  |          IPV4          | IPV6 |    TYPE    | SNAPSHOTS |
    +-----------------+---------+------------------------+------+------------+-----------+
    | test-container  | RUNNING |  10.0.0.218 (eth0)     |      | PERSISTENT | 0         |
    +-----------------+---------+------------------------+------+------------+-----------+
{% endhighlight %}

That's it! We can now enter the container
{% highlight terminal %}
$ lxc exec test-container bash
{% endhighlight %}

Which will enter the container as root
{% highlight terminal %}
root@test-container:~#
{% endhighlight %}

Here we can as an example setup NGINX
{% highlight terminal %}
root@test-container:~# apt-get install nginx
{% endhighlight %}

Then exit the container
{% highlight terminal %}
root@test-container:~# exit
{% endhighlight %}

Which drops us back to the host. Here we can now access the webserver we just installed on the container
{% highlight terminal %}
$ wget http://10.0.0.218
--2016-10-22 23:20:15--  http://10.0.0.228/
Connecting to 10.0.0.228:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 632 [text/html]
Saving to: ◼index.html◼

index.html           100%[==============================>]      632   --.-KB/s

2016-10-22 23:20:16 (41.0 MB/s) - ◼index.html◼ saved [632/632]
{% endhighlight %}

Lastly I wanted a static ip address for my containers
{% highlight terminal %}
$ sudo nano /etc/default/lxd-bridge
{% endhighlight %}

Find the line `LXD_CONFILE` and change it to `LXD_CONFILE="/etc/default/lxd_dnsmasq.conf"` and save the file. Next we create the `lxd_dnsmasq.conf` file which will contain our static ip mapping
{% highlight terminal %}
$ sudo nano /etc/default/lxd_dnsmasq.conf
{% endhighlight %}

For each container add a line `dhcp-host=container_name,ip_address`, for our container we add the following in the beginning of the file `dhcp-host=test-container,10.0.0.60` and save the file.
Now stop the container

{% highlight terminal %}
$ lxc stop test-container
{% endhighlight %}

Restart the LXD bridge
{% highlight terminal %}
$ sudo service lxd-bridge stop && sudo service lxd-bridge start
{% endhighlight %}

And start the container again
{% highlight terminal %}
$ lxc start test-container
{% endhighlight %}

Now this container will always use ip 10.0.0.60
{% highlight terminal %}
$ lxc list
    +-----------------+---------+------------------------+------+------------+-----------+
    |      NAME       |  STATE  |          IPV4          | IPV6 |    TYPE    | SNAPSHOTS |
    +-----------------+---------+------------------------+------+------------+-----------+
    | test-container  | RUNNING |  10.0.0.60  (eth0)     |      | PERSISTENT | 0         |
    +-----------------+---------+------------------------+------+------------+-----------+
{% endhighlight %}

# Migrate containers between LXD hosts
Lets assume that this LXD host we have created has the ip of 192.168.1.20. And lets assume we have another LXD host at ip 192.168.1.30 (if you used VirtualBox for this guide you can just clone the whole setup and change the ip). We want to migrate the `test-container` from 192.168.1.20 to 192.168.1.30.

## Both LXD hosts
First we install `criu` on both LXD hosts.
{% highlight terminal %}
$ sudo apt-get install criu
{% endhighlight %}

## 192.168.1.30 host
Then we add a reference to 192.168.1.20 from 192.168.1.30. Replace `somepassword` with your own password from the beginning of this post.
{% highlight terminal %}
$ lxc remote add host1 192.168.1.20:8443
Certificate fingerprint:
a4056e1b82fed6ebca4447c93926003efe3273903df79b131c4c315350812fff
ok (y/n)? y
Admin password for host1: # somepassword
Client certificate stored at server:  host1
{% endhighlight %}

We can now move or copy `test-container` to 192.168.1.30
{% highlight terminal %}
$ lxc copy host1:test-container test-container
{% endhighlight %}

This can take a long time if the container is large or the connection is slow. For me it takes less than a minute, but there is no progress indicator at the moment.
Lastly we check if the new container is transferred.
{% highlight terminal %}
$ lxc list
    +-----------------+---------+------------------------+------+------------+-----------+
    |      NAME       |  STATE  |          IPV4          | IPV6 |    TYPE    | SNAPSHOTS |
    +-----------------+---------+------------------------+------+------------+-----------+
    | test-container  | RUNNING |  10.0.0.60   (eth0)    |      | PERSISTENT | 0         |
    +-----------------+---------+------------------------+------+------------+-----------+
{% endhighlight %}

Since we cloned this host from 192.168.1.20, it also remembers our configuration that a container named `test-container` will get the ip 10.0.0.60. Notice that a copy will stop the original container. To prevent this we can take a snapshot first and then transfer the snapshot.
{% highlight terminal %}
$ lxc snapshot host1:test-container current
$ lxc copy host1:test-container/current test-container
$ lxc start test-container
{% endhighlight %}

Lastly one can play around with live migration, but I choose not to do that yet since it is an experimental feature in LXD 2.0, but take a look at [this](https://www.stgraber.org/2016/04/25/lxd-2-0-live-migration-912/) post for more information.
