---
title: "Piwigo thumbnail generation script"
excerpt: "Piwigo thumbnail generation script"
image:
  path: &image "/assets/images/piwigo-thumbnail-generation-script-feature.png"
  feature: *image
  thumbnail: "/assets/images/piwigo-thumbnail-generation-script-feature-th.png"
  teaser: *image
tags:
  - Piwigo
  - Ruby
comments: true
comments_locked: false
published: true
last_modified_at: 2015-11-10T20:08:02
redirect_from: "/piwigo-thumbnail-generation-script/"
---
[^piwigo]: [Piwigo](http://piwigo.org) is an open source photo gallery using PHP and MySQL

I use Piwigo [^piwigo] photo gallery to host my own photos and I am happy with everything expect one thing, thumbnail generation! Every photo in my gallery has a set of thumbnails of different sizes

* Square 120 x 120 pixels, crop
* Thumbnail 144 x 144 pixels
* XXS - tiny 240 x 240 pixels
* XS - extra small 432 x 324 pixels
* S - small 576 x 432 pixels
* M - medium 792 x 594 pixels
* L - large 1008 x 756 pixels
* XL - extra large 1224 x 918 pixels
* XXL - huge 1656 x 1242 pixels

I mostly use the first 6 thumbnail types and Piwigo creates these on demand, but I want to pre-generate all thumbnails for faster performance than wait the thumbnails to be generated when I need to view them for the first time. There is a function in Piwigo to do this, but it often times out for me and my ARM server takes 2 days to generate all thumbnails. I want to be able to generate the thumbnails on a faster computer and then just transfer the thumbnails to my server. So I created a small script to generate the needed thumbnails.

# The script
The script uses ImageMagick to create the following sizes:

* Square 120 x 120 pixels, crop
* Thumbnail 144 x 144 pixels
* XXS - tiny 240 x 240 pixels
* S - small 576 x 432 pixels
* M - medium 792 x 594 pixels

`sourceDir` points to the base directory where you store the full resolution photos and `destDir` points to Piwigo's internal thumbnail cache directory. It then loops all jpegs found in the `sourceDir`, does some basic error checking and if the medium thumbnail does not exists in the `destDir` it will create a set of thumbnails. Therefore the script can be run daily or weekly on or off the server. For every time the script loops 100 photos it will print a status line and execution time.

{% highlight bash linenos %}
#!/bin/bash
#Author: Poul Serek

shopt -s globstar

echo "Starting Piwigo thumbnail generation"

#Remember a trailing '/'
sourceDir="/mnt/usbdisk/photos/Presentation/"
destDir="/var/www/html/gallery/_data/i/galleries/"

counter=0
fnNoExt=""
fnExt=""
fnPath=""

STARTTIME=$(date +%s)

for file in "$sourceDir"/**/*.{jpg,JPG,jpeg,JPEG}
do
        if [[ ! -f "$file" ]]
        then
                continue
        fi

        fnNoExt="${file%.*}"
        fnExt="${file##*.}"
        fnPath="${file%/*}"
        fnPath="${fnPath#$sourceDir}"
        fnNoExt="${fnNoExt#$sourceDir}"

        echo "${fnNoExt}"

        mkdir -p "${destDir}${fnPath}"

        #Error checking
        result=$(jpeginfo -c "$file")
        if [[ $result != *"[OK]"* ]]
        then
                echo $result
        fi

        #If the medium thumbnail exists we assume that the rest also exists and skip this image
        if [ ! -f "${destDir}${fnNoExt}-me.${fnExt}" ]; then
                #echo "MISSING! ${destDir}${fnNoExt}-me.${fnExt}"
                #Store correctly oriented base image (medium) in memory. All other thumbnails are created from this
                convert "${file}" -auto-orient -resize 792x594 -write mpr:baseline +delete \
                mpr:baseline -write "${destDir}${fnNoExt}-me.${fnExt}" +delete \
                mpr:baseline -resize 144x144 -write "${destDir}${fnNoExt}-th.${fnExt}" +delete \
                mpr:baseline -resize 240x240 -write "${destDir}${fnNoExt}-2s.${fnExt}" +delete \
                mpr:baseline -resize 576x432 -write "${destDir}${fnNoExt}-sm.${fnExt}" +delete \
                mpr:baseline -define jpeg:size=144x144 -thumbnail 120x120^ -gravity center -extent 120x120 "${destDir}${fnNoExt}-sq.${fnExt}"
        fi
        counter=$[$counter +1]
        if [ $(($counter%100)) -eq 0 ]; then
                ENDTIME=$(date +%s)
                echo "Processed: ${counter} - Executing for $((($ENDTIME - $STARTTIME)/60)) minutes"
        fi
done

ENDTIME=$(date +%s)
echo "It took $((($ENDTIME - $STARTTIME)/60)) minutes to complete this task..."
{% endhighlight %}

# Example of execution output
The script should be run as the same user as Piwigo is run, for me that is `www-data`.
{% highlight terminal %}
$ sudo su -s /bin/bash www-data -c '/home/user/piwi.sh'
Starting Piwigo thumbnail generation
Processed: 100 - Executing for 18 minutes
Processed: 200 - Executing for 36 minutes
It took 38 minutes to complete this task...
{% endhighlight %}

And you should now be able to see the thumbnails in Piwigo
{% include figure
  image_path="/assets/images/piwigo-thumbnail-generation-script-example.png"
  caption="Thumbnails perfectly generated in Piwigo using an external script"
%}

# Quirks
Some of my photos seems to be stretched when viewing them after clicking on the picture in the gallery
{% include figure
  image_path="/assets/images/piwigo-thumbnail-generation-script-Piwigo_strected_image.png"
  caption="Piwigo stretched image caused by an incorrect width and height attribute on the IMG tag"
%}

The thumbnails themselves seem to work fine when opening the thumbnail in a new browser tab. I am sure I must be doing something wrong in the thumbnail generation, but for now I just hacked Piwigo by removing the height and width attributes from `themes/default/template/picture_content.tpl`:

1. Open `themes/default/template/picture_content.tpl`
2. Delete `{$current.selected_derivative->get_size_htm()}` from the line beginning with `<img`
3. Restart the webserver

{% include figure
  image_path="/assets/images/piwigo-thumbnail-generation-script-Piwigo_fixed_image.png"
  caption="Fixed the image by hacking Piwigo and removing the width and height attributes"
%}

The stretched thumbnails should now look as expected. Please leave me a comment if you have some questions of improvements to the script!
