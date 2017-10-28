---
title: "Free Wordpress Jetpack monitor replacement"
excerpt: "Free Wordpress Jetpack monitor replacement"
image:
  path: &image "/assets/images/free-wordpress-jetpack-monitor-replacement-feature.png"
  feature: *image
  thumbnail: "/assets/images/free-wordpress-jetpack-monitor-replacement-feature-th.png"
  teaser: *image
tags:
  - WordPress
comments: true
comments_locked: false
published: true
last_modified_at: 2016-01-27T22:32:32
redirect_from: "/free-wordpress-jetpack-monitor-replacement/"
---
I am slowly moving away from [Jetpack](http://jetpack.me), a WordPress plugin that bundles many smaller plugins. It is too bulky and I don't need many of the features it offers. One feature I do need is Monitor that checks if my site is up and running every 5 minutes and notifies me by email when it is down or up. The same functionality can be had for free using [uptimerobot.com](http://uptimerobot.com):

1. Sign up for a free account at [uptimerobot.com](http://uptimerobot.com) and activate the account
2. Add a new HTTP(s) monitor for you website and remember to select your email under "Alert Contacts To Notify"
{% include figure
  image_path="/assets/images/free-wordpress-jetpack-monitor-replacement-Uptimerobot.com-dashboard-1024.png"
  caption="Uptimerobot.com monitor dashboard"
%}

Thats it! You now get the same 5 minute interval checking as Jetpacks Monitor service. In addition you get a nice simple dashboard to keep track of up and downtime.

I noticed you can be notified by SMS, but I did not have the option from my service provider to use the email to SMS option in uptimerobot.com and I did not want to pay for the Pro SMS feature they provide. I fixed this by a simple [IFTTT](https://ifttt.com/recipes) recipe that listens on the RSS feed uptimerobot.com exposes for my monitor.

1. Create an IFTTT account
2. Login to IFTTT
3. Create a SMS channel with the phone number you want to receive the notification
4. Create a new recipe
    1. For "this" choose the Feed channel, choose "new feed item", enter the RSS url from uptimerobot.com --> "My settings" --> "RSS Notifications" and click "create trigger"
    2. For "that" choose the SMS channel, choose "Send me an SMS" and click "create action"
    3. Finally click "create recipe"

IFTTT now listens for changes in the uptimerobot.com RSS feed for your monitor and sends an SMS for free every time anything happens.
