---
title: "Geo-targeted Amazon affiliate links in WordPress"
excerpt: "Geo-targeted Amazon affiliate links in WordPress using the Amazon Link plugin"
tags:
  - Amazon Affiliate
  - Wordpress
  - PHP
comments: true
comments_locked: false
published: true
last_modified_at: 2015-04-06T19:00:51
redirect_from: "/geo-targeted-amazon-affiliate-links-in-wordpress/"
---
In most of my blogs I have always posted links to Amazon for the components I have used. The problem was I was always posting them to Amazon.com. I wanted to change that so when the reader clicking on one of these links they would redirect to the nearest Amazon store, e.g. Amazon.co.uk. This gives my reader a better experience and I get a higher chance of earning a small commission through the Amazon Affiliate program.

Using geolocation I thought it would be a simple matter to write some code to do this for me. Linking to the product AKiTiO Thunder2 would give me the following link on Amazon.com

[https://www.amazon.com/dp/B00LTAUTHE](https://www.amazon.com/dp/B00LTAUTHE)

`B00LTAUTHE` is the unique identifier for the specific product. Amazon calls this [ASIN](http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number) (Amazon Standard Identification Number). Change the above url to point to the German Amazon site and you will get and 404 error

[https://www.amazon.de/dp/B00LTAUTHE](https://www.amazon.com/dp/B00LTAUTHE)

The ASIN does not exists on the German Amazon site. A search reveals instead that the code is `B00NQ23TCU`. So a simply search / replace on the top-level domain was out of the question. Instead I found a gem of a plugin for WordPress, [Amazon Link](https://wordpress.org/plugins/amazon-link). This plugin solved my problem elegantly.

# Setup

1. Download, install and activate the plugin
2. Go to Amazon Link --> Setup
3. Select a default country. This is the country the plugin uses if it cannot find the ASIN number in the chosen country based on geo-location
4. Check the "Localise Amazon Link" checkbox
5. Create an [Amazon Web Services (AWS)](http://aws.amazon.com/) account to get an Amazon Advertising API key. Enter the public and private key.
6. Select "Enable Data Cache"
7. Go to Amazon Link --> Settings
8. Make sure "Create Default Country Links", "Live Data" and "Prefetch Data" is checked
9. Optional: Make sure "Spoof Locale" is installed. This can be done by going to Amazon Link ---> Extras and clicking "Install" in the section "Amazon Link Extra - Spoof Locale". This will enable you to simulate different countries when creating the links.

# Creating localised links
Links are created by writing specific Amazon Link tags anywhere in the body text of the blog post.

### DIRECT LINK TO PRODUCT BASED ON ASIN NUMBER
```php
[Amazon text=Link title&asin=B00LTAUTHE]
```
This will create a link the product in the closest Amazon site, e.g. Amazon.de, with "Link title" as the link text. If the product is not found on the Amazon site it defaults the default country because of step 3 and 4 during our setup. Always make sure that the default country can find the ASIN number to avoid 404 errors.

### DIRECT LINK TO PRODUCT BASED ON ASIN NUMBER - DIFFERENT ASIN BASED ON COUNTRY
```php
[Amazon text=Link title&asin[us]=B00LTAUTHE&asin[de]=B00NQ23TCU]
```  
What if we have different ASIN numbers for different countries? In the above example the ASIN number defined in "asin[us]" is used when the closest Amazon site is Amazon.com and "asin[de]" when Amazon.de. The link defaults to the default country if the country is not defined in the link. The default country should be either the United Status or Germany to get a hit in this example.

### SEARCH BASED LINK
```php
[amazon search_text_s=%title%s#&title=my search terms&search_link=1&text=link title]
```
If you don't want to lookup a specific ASIN number you can create links to a search result.

# Roundup
You can do much more with the plugin than I have described, take a look at the [faq](https://wordpress.org/plugins/amazon-link/faq/). But now I can create dynamic link to Amazon that are more relevant for my readers.
A minor limitation is that the plugin only works for Amazon in United Kingdom, United States, Germany, Spain, France, Japan, Italy, China, India, Canada and Brazil. My readers are mostly from the United States, United Kingdom and Germany so this is not a problem for my blog.
Secondly the geolocation is based on ip numbers and might not be accurate, but is should be in the ballpark for most readers.

**UPDATE: 07-05-2015**  
Using a caching plugin will break the localised functionality with this plugin, but it is possible to make the cache locale aware as I have described in my post [here](/code/amazon-affiliate-link-wp-super-cache-preload/). 
