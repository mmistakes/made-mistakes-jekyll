---
title: "Extract Amazon Affiliate earnings script"
excerpt: "Extract Amazon Affiliate earnings script"
image:
  path: &image "/assets/images/extract-amazon-affiliate-earnings-script-feature.png"
  feature: *image
  thumbnail: "/assets/images/extract-amazon-affiliate-earnings-script-feature-th.png"
  teaser: *image
tags:
  - Amazon Affiliate
  - PHP
comments: true
comments_locked: false
published: true
last_modified_at: 2015-07-25T17:11:19
redirect_from: "/extract-amazon-affiliate-earnings-script/"
---
[^php-oara]: [Open Affiliate Report Aggregator (OARA)](https://github.com/fubralimited/php-oara) is a set of PHP classes that can download affiliate reports from a number of affiliate networks

My earlier posts have been about creating links to Amazon that are localised in WordPress, see my posts [here](/code/geo-targeted-amazon-affiliate-links-in-wordpress/) and [here](/code/amazon-affiliate-link-wp-super-cache-preload/). One perk of using the excellent [Amazon Link](https://wordpress.org/plugins/amazon-link/) plugin for WordPress is that I get a small commission for items sold through the Amazon Affiliate program. It is not much, but it keeps this site running plus a cup of coffee or two a year. I have an Amazon Affiliate account in

* United States
* United Kingdom
* Germany
* France
* Spain
* Italy
* Canada
* China

I can log into each site and get a report telling me how much I earned in the local currency. These site use different currencies, we have American dollars, Canadian dollars, British pounds, European euros and Chinese yuan. But I just needed a very simple number, how much is my total commission across all the sites in my local Danish currency? For this purpose I found a PHP framework called Open Affiliate Report Aggregator (OARA)[^php-oara] to create a small script to extract the information from each site and use google currency converter to sum the total to my local currency.

# Example output
When executing the script using three Amazon Affiliate accounts (US, UK and DE) one gets the following simple output
{% include figure
  image_path="/assets/images/extract-amazon-affiliate-earnings-script.jpg"
  caption="Example output from script using Amazon US, UK and DE. This can also be sent by mail using CRON"
%}

Notice that the final output is the ~13 USD and ~5 EUR summed and converted into Danish kroner.
# Installation

1. Follow the installations instructions found on the PHP-OARA GITHUB [here](https://github.com/fubralimited/php-oara)
2. Download the file `AmazonAffiliateReportExtractor.php` from GITHUB [here](https://github.com/psirek/Amazon-Affiliate-Report-Extractor/blob/master/AmazonAffiliateReportExtractor.php)
3. Copy `AmazonAffiliateReportExtractor.php` to the `php-oara/examples` folder

# Configuration
Edit the `AmazonAffiliateReportExtractor.php` script

1. Change `$credentials["user"]` and `$credentials["password"]` to match your login to Amazon Affiliate. This scripts assumes that you use the same login and password for all sites. I recommend you create a serviceuser account with limited access if you are going to have any password in a script
2. Change `$startDate` and `$endDate`
3. Set which currency you want the final result in `$totalCommisionCurrency`
4. Add a name for the report in `$reportName`
5. For each Amazon Affiliate account you want to login you need the following four lines. Change only the first and second line to the corresponding Amazon locale and currency
```php
$credentials["network"] = "us"; //Change this to match the Amazon locale
$currency = "USD"; //Change this to match the currency used
$network = Oara_Factory::createInstance($credentials);
$totalCommision += ReportExtractor::currency($currency, $totalCommisionCurrency, ReportExtractor::Extract($network, "Amazon ".strtoupper($credentials["network"]), $currency, $startDate, $endDate));
```

Run the script by invoking it
```php
php AmazonAffiliateReportExtractor.php
```
You should get an output similar to the example above. If you want this report mailed every month you can use CRON like this (assuming sending mail has been configured, I use Googles SMTP server for this):
```bash
@monthly php /some/path/php-oara/examples/AmazonAffiliateReportExtractor.php | mail -s "Amazon Affiliate report" my@email.com
```
# Conclusion
This setup sends me a short report every month to my email with all my Amazon Affiliate commissions summed into a single total in my chosen currency. This means I spend less time logging into my 8 Amazon Affiliate account and manually extracting the numbers, converting them into a common currency and calculating a total. If you know of a better way to do this, please leave me a comment.

**UPDATE 08-04-2016**  
A few weeks ago, extracting data from Amazon.com always failed. I performed the change described [here](https://github.com/fubralimited/php-oara/pull/41/commits/3c143741151b0fe30a902387211b939841703e23) to patch php-oara and it worked again
