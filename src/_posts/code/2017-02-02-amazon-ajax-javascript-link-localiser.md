---
title: "Amazon AJAX Javascript Link Localiser"
excerpt: "Amazon AJAX Javascript Link Localiser"
tags:
  - Amazon Affiliate
  - WordPress
  - Javascript
comments: true
comments_locked: false
published: true
last_modified_at: 2017-02-02T20:19:19
redirect_from: "/amazon-ajax-javascript-link-localiser/"
---
I recently [wrote](/code/wordpress-caching-static-html-cloudflare/) about how a cache everything on this site on CloudFlare - including the HTML pages. This does not play nice with my geo-aware cache setup which I used to generate specific pages with localised links depending which country my visitor came from. To get around this problem I have written some Javascript to be able to localise link and through an AJAX call get the visitors location. It works by

1. Getting the country code from the visitors IP address using AJAX using freegeoip.net. This makes it cache friendly
2. The country code is mapped to which Amazon store it should redirect to - including which affiliate tag to use. This can be configured / changed.
3. The amazon affiliate link is localised as specified in the `data-amazon-asin` attribute on the link itself.

# Demo
Since we are talking about actual working amazon affiliate links below, I will present my disclaimer first!
{% include affiliate-disclosure.html %}

Now lets use an example link to Amazon:  
{% highlight terminal %}
https://www.amazon.com/dp/B0084A7PI8/?tag=serek-eu-us-20
{% endhighlight %}

With an data-amazon-asin attribute:  
{% highlight terminal %}
data-amazon-asin="[us][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS[ca]us"
{% endhighlight %}

That results in the following clickable link:  
[Test link to Amazon](https://www.amazon.com/dp/B0084A7PI8/?tag=serek-eu-us-20){:target="_blank" rel="nofollow" data-amazon-asin="[us][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS[ca]us"}

The link should already be localised depending on the country you arrived from. The buttons below will simulate that you arrive from another country by setting the cookie with a different country and re-running the script. Then the link above should be changed / localised. You can use the developer tools on your browser to see the changes in the HTML or just click on the link.

<div markdown="0" class="btn--group">
  <a class="btn" href="#" onclick="setCookie('geo_country_code','IT'); localiseLinks(); return false;">Italy (IT)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','US'); localiseLinks(); return false;">United States (US)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','UK'); localiseLinks(); return false;">United Kingdom (UK)</a>
</div>
<div markdown="0" class="btn--group">
  <a class="btn" href="#" onclick="setCookie('geo_country_code','CA'); localiseLinks(); return false;">Canada (CA)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','ES'); localiseLinks(); return false;">Spain (ES)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','DE'); localiseLinks(); return false;">Germany (DE)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','FR'); localiseLinks(); return false;">France (FR)</a>
</div>

The expected results are

* US and ES will get a localised link to `B0084A7PI8`
* UK and DE will get a localised link to `B00JGFDKBQ`
* IT and FR will get a localised link to `B00PQC72ZS`
* CA will get an US link to `B0084A7PI8`

Notice that all the above countries have an Amazon store. To redirect countries without Amazon stores we could do the following:
{% highlight terminal %}
data-amazon-asin="[us][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS[ca][AT][BE][DK][FI][NL][NO][PL][SE][LI][LU][PT][AD]us"
{% endhighlight %}

Which would redirect a bunch of countries to the US Amazon affiliate store, but it is cumbersome to write each time. Therefore it is possible define the mapping of countries to other countries in this way:
{% highlight javascript %}
var amazonAffiliateRegions = {
  "DE":"DE", //Germany
  "AT":"DE", //Austria
  "BE":"DE", //Belgium
  "DK":"DE", //Denmark
  "FI":"DE", //Finland
  "NL":"DE", //Netherlands
  "NO":"DE", //Norway
  "PL":"DE", //Poland
  "SE":"DE", //Sweden
  "LI":"DE", //Liechtenstein
  "LU":"DE", //Luxembourg
  "ES":"ES", //Spain
  "PT":"ES", //Portugal
  "AD":"ES", //Andorra
  "GB":"UK", //United Kingdom
  "UK":"UK", //United Kingdom (dummy, used since I use UK and not GB)
  "IE":"UK", //Ireland
  "IM":"UK", //Isle of Man
  "IT":"IT", //Italy
  "VA":"IT", //Holy See (Vatican City State)
  "FR":"FR", //France
  "CA":"CA", //Canada
  "US":"US", //United States
  "CN":"CN", //China
  "BR":"BR", //Brazil
  "IN":"IN", //India
  "MX":"MX", //Mexico
  "DEFAULT":"US"  //If no match found above, use this country as default
};
{% endhighlight %}

The above is the default mapping. Lets try to play again with some different countries. We use the same links as before:
{% highlight terminal %}
https://www.amazon.com/dp/B0084A7PI8/?tag=serek-eu-us-20
{% endhighlight %}

With an data-amazon-asin attribute:
{% highlight terminal %}
data-amazon-asin="[us][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS[ca]us"
{% endhighlight %}

That results in the following clickable link:  
[Test link to Amazon](https://www.amazon.com/dp/B0084A7PI8/?tag=serek-eu-us-20){:target="_blank" rel="nofollow" data-amazon-asin="[us][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS[ca]us"}

<div markdown="0" class="btn--group">
  <a class="btn" href="#" onclick="setCookie('geo_country_code','VA'); localiseLinks(); return false;">Vatican City (VA)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','PL'); localiseLinks(); return false;">Poland (PL)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','CN'); localiseLinks(); return false;">China (CN)</a>
</div>
<div markdown="0" class="btn--group">
  <a class="btn" href="#" onclick="setCookie('geo_country_code','PT'); localiseLinks(); return false;">Portugal (PT)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','NO'); localiseLinks(); return false;">Norway (NO)</a>
  <a class="btn" href="#" onclick="setCookie('geo_country_code','RU'); localiseLinks(); return false;">Russia (RU)</a>
</div>

The expected results are

* VA will get an IT link to `B00PQC72ZS`
* PL and NO get an DE link to `B00JGFDKBQ`
* PT will get an ES link to `B0084A7PI8`
* CN will *not* change the link since it cannot find the `[cn]` tag in the `data-attribute-asin`, but it is defined in `amazonAffiliateRegions`. If you try to refresh the page, it should return to the original `.com` link when the page is loaded. **UPDATE 11-02-2017:** On my site I have changed CN to point at US so it will show the US link
* RU will get an US link (default) to `B0084A7PI8` since it cannot be found in `amazonAffiliateRegions`

# Installation
## WordPress
I have made two simple WordPress plugins - one for getting and storing the country code in a cookie. The second reads the country code form the cookie and transforms the links.

1. Go into your WordPress plugin folder, e.g. `/var/www/html/wordpress/wp-content/plugins`
2. git clone [https://github.com/WordPress-plugins-serek/geo-ip](https://github.com/WordPress-plugins-serek/geo-ip)
3. git clone [https://github.com/WordPress-plugins-serek/javascript-amazon-affiliate-link-localiser](https://github.com/WordPress-plugins-serek/javascript-amazon-affiliate-link-localiser)
4. Log into WordPress and activate the above plugins

# Custom
If you don't have WordPress or just want to integrate the files manually do the following:

1. Download the file [amazonAjaxLinkLocaliser.js](https://raw.githubusercontent.com/WordPress-plugins-serek/javascript-amazon-affiliate-link-localiser/master/assets/amazonAjaxLinkLocaliser.js)
2. Download the file [geoip.js](https://raw.githubusercontent.com/WordPress-plugins-serek/geo-ip/master/assets/geoip.js)
3. Add the following to your site (replace `yoursite.com` with the correct path to the files)
{% highlight html %}
<script src="//yoursite.com/geoip.js" defer></script>
<script src="//yoursite.com/amazonAjaxLinkLocaliser.js" defer></script>
{% endhighlight %}

# Configuration
Edit the `amazonAjaxLinkLocaliser.js` file and add your own Amazon affiliate IDs in `amazonAffiliateTags`
{% highlight javascript %}
var amazonAffiliateTags = {
        "US":"serek-eu-us-20",
        "CA":"serek-eu-ca-20",
        "DE":"serek-eu-de-21",
        "UK":"serek-eu-uk-21",
        "ES":"serek-eu-es-21",
        "IT":"serek-eu-it-21",
        "FR":"serek-eu-fr-21",
        "CN":"serek-eu-cn-23",
        "JP":"",
        "MX":"",
        "IN":"",
        "BR":""
};
{% endhighlight %}

Notice that if you do not supply a Amazon affiliate tag for a store that you have configured, I will insert my own tag.
Next you might want to tweak the mapping of countries to Amazon stores:
{% highlight javascript %}
var amazonAffiliateRegions = {
  "DE":"DE", //Germany
  "AT":"DE", //Austria
  "BE":"DE", //Belgium
  "DK":"DE", //Denmark
  "FI":"DE", //Finland
  "NL":"DE", //Netherlands
  "NO":"DE", //Norway
  "PL":"DE", //Poland
  "SE":"DE", //Sweden
  "LI":"DE", //Liechtenstein
  "LU":"DE", //Luxembourg
  "ES":"ES", //Spain
  "PT":"ES", //Portugal
  "AD":"ES", //Andorra
  "GB":"UK", //United Kingdom
  "UK":"UK", //United Kingdom (dummy, used since I use UK and not GB)
  "IE":"UK", //Ireland
  "IM":"UK", //Isle of Man
  "IT":"IT", //Italy
  "VA":"IT", //Holy See (Vatican City State)
  "FR":"FR", //France
  "CA":"CA", //Canada
  "US":"US", //United States
  "CN":"CN", //China
  "BR":"BR", //Brazil
  "IN":"IN", //India
  "MX":"MX", //Mexico
  "DEFAULT":"US"  //If no match found above, use this country as default
};
{% endhighlight %}

The most important configuration here is the default country. All the countries on the right hand side is the ones you should use in the `data-amazon-asin` attribute, e.g. `[de][es][uk][it][fr][ca][us][cn][br][in][mx]`. A full list of country codes can be found [here](http://dev.maxmind.com/geoip/legacy/codes/iso3166/).
You can also tweak the mapping of Amazon stores to their url endings, but this should not be needed:
{% highlight javascript %}
var amazonAffiliateTLDs = {
 "DE":"de",
 "UK":"co.uk",
 "ES":"es",
 "IT":"it",
 "FR":"fr",
 "CA":"ca",
 "US":"com",
 "CN":"cn",
 "JP":"co.jp",
 "MX":"com.mx",
 "IN":"in",
 "BR":"com.br"
};
{% endhighlight %}

Lastly there is a setting that defines if the script should try to localise a link if it is already is localised to the target region:
{% highlight javascript %}
var doNotLocaliseLinksThatMatchRegionAlready = false;
{% endhighlight %}

I use it since I embed link to the `.com` Amazon store with my affiliate links already. No need to waste resources localising these again.

# Next action

* Unit test that tests all the variants for 404 and makes sure the item is available for purchase
* Switch from cookie to local storage
* Wordpress plugin to automatically generate the `data-amazon-asin` attribute or automatically localise links according to certain rules and mappings. These services already exists, but I need more flexibility in configuring mappings
