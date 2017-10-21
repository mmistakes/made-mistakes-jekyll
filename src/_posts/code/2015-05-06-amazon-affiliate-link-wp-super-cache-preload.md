---
title: "Caching strategy with Amazon Link"
excerpt: "Localised Amazon Affiliate links with WP Super Cache and preload script"
tags:
  - Amazon Affiliate
  - Wordpress
  - Ruby
  - PHP
comments: true
comments_locked: false
published: true
last_modified_at: 2015-05-06T20:49:30
redirect_from: "/amazon-affiliate-link-wp-super-cache-preload/"
---
Recently I blogged about using the Amazon Link plugin to create localised Amazon links to the products and parts I use in my post [here](/code/geo-targeted-amazon-affiliate-links-in-wordpress/). I later enabled the WP Super Cache plugin to make my site faster, but noticed that I got the wrong localised links. It turns out that the cache will save a localised page and serve this page to all the following visitors. If the first visitor was from the United Kingdom, then everyone else will get links to Amazon.co.uk on that page no matter what country they arrive from. One solution is to make the cache location aware as I will describe. Lastly I will show how one can preload the cache for the different countries when using the Amazon Link plugin.

# Installation and configuration of WP Super Cache

1. Download, install and activate WP Super Cache using `Dashboard --> Plugins --> Add New`
2. Go to `Settings --> WP Super Cache --> Easy`
3. Select `Caching On`
4. Go to `Settings --> WP Super Cache --> Advanced`
5. Select `Cache hits to this website for quick access`
6. Select `Legacy page caching` (This must be set for the country cache to work!)
7. Deselect `Don't cache pages with GET parameters. (?x=y at the end of a url)`. This is only needed for the preloading script, if you don't need the preloading script you can turn this on
8. Edit the `wp-content/wp-cache-config.php` file and replace 
```php
$wp_cache_plugins_dir = WPCACHEHOME . 'plugins';
``` 
with
```php
$wp_cache_plugins_dir = WP_CONTENT_DIR . '/ccwpsc_plugins/';
if ( !defined('CCWPSC_WPSC_CUSTDIR') ) define( 'CCWPSC_WPSC_CUSTDIR', $wp_cache_plugins_dir);
```
9. Restart the webserver

# Installation and configuration of Country Caching Extension for WPSC

1. Download, install and activate Country Caching Extension for WPSC using `Dashboard--> Plugins --> Add New`
2. Go to `Dashboard --> WPSC Country Caching`
3. Select `Enable Country Caching add-on for WPSC`
4. Download, install and activate Category Country Aware WordPress using `Dashboard--> Plugins --> Add New`
5. Go to `Dashboard --> Settings --> Category Country Aware Goodies`
6. Select `Initialize GeoIP checking this will do the initial install of Country/IP look up files from Maxmind (it takes < 1 second)` under `General`
7. Select `Update data files now, and add to WP scheduler for auto update every 3 weeks` under `Contries`. This will auto update the database with the ip to country mapping

For more information about setting up the Country Caching Extension for WPSC plugin see this [post](http://wptest.means.us.com/geolocation-and-wp-super-cache-caching-by-page-visitor-country-instead-of-just-page/).

# Preloading script
A quick and dirty script that "works on my machine". The script will extract a list of published posts from WordPress and for each post it will loop all defined countries to request the post with the `?spoof_locale=XX` query. This will create all the cache entries we need, but with the wrong cache key as the url is used as the cache key. The last part of the script modifies the cache files for the posts by

* Removing the `?Spoof_locale` from the two urls defined in the blog meta file
* Appending the correct country code to the cache key
* Renaming the meta and html file with the correct MD5 hash of the now corrected url to the post

The script should be executed as the same user as the webserver, e.g. `www-data`. It can be run at any time, if the cache entry already exists it will update this. This script requires

* That the plugin Amazon Link Extra - Spoof Locale is installed and configured in Amazon Link as described in my previous [post](/code/geo-targeted-amazon-affiliate-links-in-wordpress/)
* WP-CLI is installed, see more [here](http://wp-cli.org/)
* Ruby

The script defines a few parameters that can be tweaked

* `wpCachePath`: Path to the legacy cache, e.g. `/var/www/html/wordpress/wp-content/cache`
* `wpHomepageUrl`: The url to the wordpress blog
* `countryCodesToCache`: A list of country codes to preload in cache

{% highlight ruby linenos %}
#Author: Psirek

require 'digest/md5'

wpCachePath = "/var/www/html/wp-content/cache"
wpHomepageUrl = "https://odd-one-out.serek.eu"

#Country codes to generate
#Notice that "uk" is "GB"
countryCodesToCache = ["DK", "US", "CA", "GB", "DE", "RU", "FR", "AU", "PL", "KR", "NL", "CN", "IN", "TW", "BR", "TH", "ES", "JP", "SE", "SG", "MX", "IT"]

puts "Requesting all posts with the specified countryCodes using the ?spoof_locale=XX query"
blogs = %x(/usr/local/bin/wp post list --fields="ID,post_status" --format="csv" --path="/var/www/html")

blogs.each_line do |line|
        post_id = line.split(",")[0].strip
        post_status = line.split(",")[1].strip

        if post_status == "publish"
                post_url = %x(/usr/local/bin/wp post url "#{post_id}" --path="/var/www/html" --quiet).strip
                puts "Requesting: #{post_url}"
                countryCodesToCache.each do |countryCode|
                        # Hit all the defined pages using the spoof_locale query to create the pages with the correct localized Amazon links
                        puts "#{post_url}?spoof_locale=#{countryCode}"
                        %x(wget -qO /dev/null "#{post_url}?spoof_locale=#{countryCode}" --delete-after)
                end
        end
end
puts "Requesting posts done!"

puts "Requesting frontpages"
#Cache the frontpage
countryCodesToCache.each do |countryCode|
        puts "#{wpHomepageUrl}?spoof_locale=#{countryCode}"
        # Hit all the defined pages using the spoof_locale query to create the pages with the correct localized Amazon links
        %x(wget -qO /dev/null "#{wpHomepageUrl}?spoof_locale=#{countryCode}" --delete-after)
end
puts "Requesting frontpages done!"

#Remove spoof_locale from the query and fix country extension in url
Dir.glob("#{wpCachePath}/meta/*.php") do |cacheMetadata|
        metaCacheFile = File.read(cacheMetadata)
        if metaCacheFile.include?("spoof_locale=")
                puts "Contains spoof_local: #{cacheMetadata}"

                #Extract the real countrycode
                realCountryCode = metaCacheFile.match(/spoof_locale=([a-zA-Z]{2})/)[1]

                #Replace ?spoof_locale=xxxx with countrycode in cache key
                modifiedMetaCacheFile = metaCacheFile.gsub(/\?spoof_locale=[a-zA-Z]{4}/, realCountryCode)
                modifiedMetaCacheFile = modifiedMetaCacheFile.gsub(/\?spoof_locale=[a-zA-Z]{2}/, "")

                #Extract cache key
                cacheKey = modifiedMetaCacheFile.match(/\"key\":\"(.+?)\"/)[1]
                puts "CacheKey: #{cacheKey}"

                #Extract uri. The ? in (.+?) is the lazy operator so the regex grabs as little as possible before matching '"'
                uri = modifiedMetaCacheFile.match(/\"uri\":\"(.+?)\"/)[1]
                puts "URI: #{uri}"

                #Save the file
                File.open(cacheMetadata, "w") do |f|
                        f.write(modifiedMetaCacheFile)
                end

                #Create new md5 hash
                cacheKey = cacheKey.tr('\\', '')
                hash  = Digest::MD5.hexdigest("#{cacheKey}")

                #Rename files so the guid in the filename is an md5 hash of the new key
                puts "Renaming to #{wpCachePath}/meta/wp-cache-#{hash}.php"
                File.rename(cacheMetadata, "#{wpCachePath}/meta/wp-cache-#{hash}.php")
                puts "New hash: #{hash}"
                oldHash =  cacheMetadata.match(/\wp-cache-(.*)\.php/)[1]
                puts "Old hash: #{oldHash}"
                File.rename("#{wpCachePath}/wp-cache-#{oldHash}.php", "#{wpCachePath}/wp-cache-#{hash}.php")
        end
end
{% endhighlight %}

# Potential issues
The tradeoff is the size of the cache is going to be much larger using this setup. I have 14 pages / post on my blog I would like to cache and my preload script preloads 22 countries. That equals to 14 * 22 = 308 cache entries. That is around 50MB of data. I use the tmpfs filesystem to partially store the cache in memory and my VPS box at [RamNode](https://clientarea.ramnode.com/aff.php?aff=3059){:rel="nofollow"} (affiliate link) only has 512MB of memory and swap, but a 100GB space. I can switch away from tmpfs and use the 100GB or I can tweak the tmpfs mount to take a small amount of memory and large amount of swap. The limit for the cache using tmpfs is still around 512MB since I need resources for the other services running on the server.

# Conclusion
I now have great performance on my wordpress blog and my localised links to Amazon works. The trade-off is a much larger cache, but for a blog my size it is worth it. If anyone reading this knows of a better way to do Amazon link localization using a cache in WordPress, please leave me a comment.

# Whats next?

* The WP Super Cache setting "Don't cache pages with GET parameters. (?x=y at the end of a url)" can potentially increase the size of the cache a lot. Maybe the spoofing the Amazon Link plugin can be done in other ways or the webserver can be configured to only allow certain known queries for the preload script to work
* Do the link localization on the fly using JavaScript. Then I can revert back to a normal non country aware cache and save much disk space.

**UPDATE: 14-10-2015**  
WP Super Cache has changed a bit since I created the preload script. I have rewritten the update script in Ruby to work with the new version

**UPDATE: 21-10-2017**  
I have created a pure JavaScript version of a Amazon link localizer that works perfectly with any cache. Take a look [here](/code/amazon-ajax-javascript-link-localiser/)
