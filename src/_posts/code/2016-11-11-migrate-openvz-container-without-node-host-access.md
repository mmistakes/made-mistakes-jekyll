---
title: "Migrate OpenVZ container to another host without node access"
excerpt: "Migrate OpenVZ container to another host without node access"
tags:
  - VPS
  - OpenVZ
comments: true
comments_locked: false
published: true
last_modified_at: 2016-11-10T22:04:15
redirect_from: "/migrate-openvz-container-without-node-host-access/"
---
Today I received a notice that all Crissic.net OpenVZ VPS customers are cancelled 30 days from now so I needed to figure out fast how to migrate my OpenVZ container to another hosting company. Lucky for me, the process took less than 10 minutes without access to the OpenVZ node. My setup is:

* OpenVZ container (Ubuntu 14.04.5 LTS)
* CloudFlare DNS and HTTP proxy
* SSH access to the OpenVZ container

# Prepare new container

1. I created a new OpenVZ container at [RamNode](https://clientarea.ramnode.com/aff.php?aff=3059){:rel="nofollow"} (affiliate link, I highly recommend this provider) making sure to match the operating system.
2. Log in through SSH and make sure the system is fully updated
{% highlight terminal %}
$ sudo apt-get update && sudo apt-get upgrade -y
{% endhighlight %}

# Migrate container

1. Log into the OpenVZ container you want to migrate
2. Make sure to update the container
{% highlight terminal %}
$ sudo apt-get update && sudo apt-get upgrade -y
{% endhighlight %}

{:start="3"}
3. Using rsync we transfer the content of the container to the destination container. Make sure to replace `root@168.235.90.201` with your own information
{% highlight terminal %}
$ sudo rsync -aAXv --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / root@168.235.90.201:/
{% endhighlight %}

{:start="4"}
4. When the transfer is complete, SSH into the new OpenVZ container. You might get the following warning because of the transfer.
{% highlight terminal %}
$ ssh root@168.235.90.201
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:OzqhEWM2LyrsboJtVN/zSAT5jLY9jTALPoTakFJdyoc.
Please contact your system administrator.
Add correct host key in /Users/newUser/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/newUser/.ssh/known_hosts:15
ECDSA host key for 168.235.90.201 has changed and you have requested strict checking.
Host key verification failed.
{% endhighlight %}

If so, edit the `/Users/newUser/.shh/known_hosts` file and remove the line containing `168.235.90.201` and try to SSH again.

{:start="5"}
5. We reboot the container
{% highlight terminal %}
$ sudo reboot
{% endhighlight %}

{:start="6"}
6. Now we just change the DNS settings and the new container is accessible.
{% include figure
  image_path="/assets/images/migrate-openvz-container-without-node-host-access-CloudFlare-DNS-settings.png"
  caption="CloudFlare DNS settings"
%}

# Conclusion
It really only took 10 minutes to migrate the whole setup to [RamNode](https://clientarea.ramnode.com/aff.php?aff=3059){:rel="nofollow"} (affiliate link). It took me another 30 minutes to confirm everything was working because I really did not believe it was that easy.
