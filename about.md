---
layout: page
title: About
headline: What's a Made Mistakes?
subheadline: Behind the Name and Designer
date: 2013-05-29
description: "You've found the about page of Michael Rose&thinsp;&ndash;&thinsp;just another boring, tattooed, time traveling, designer and illustrator from Buffalo, New York."
image: paperfaces-michael-rose-beard
tags: 
- Michael Rose
- graphic design
- design
- designer
- Buffalo
- print
- catalog design
- web design
- made mistakes
- mmistakes
---
<section id="table-of-contents" class="toc">
  <header>
    <h3 class="delta">Contents</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

## What's a Made Mistakes?

So why the title "made mistakes? It vaguely has something to do with that whole happy accident thing, where a mistake can turn out to be something great and unplanned. But to be honest I was just looking for a short, memorable sounding domain name.

In May of 2004 I purchased mademistakes.com, and threw up a Macromedia Flash splash (hey remember those?) while I worked on building a design portfolio using Movable Type. For the next couple of years I would experiment with various content management systems ([Movable Type](http://www.movabletype.org/) &rarr; [Textpattern](http://textpattern.com/) &rarr; [Wordpress](http://wordpress.org/) &rarr; [Indexhibit](http://www.indexhibit.org/)), developing minimalistic themes and learning what I could about <abbr>HTML</abbr>, <abbr>CSS</abbr>, Javascript, <abbr>PHP</abbr>, and MySQL databases.

I've since decided to go <abbr>CMS</abbr>-free and utilize black magick and [Jekyll](http://jekyllrb.com/) to [manage the site with static text files]({{ site.url }}/articles/going-static.html). I like knowing how things work behind the scenes so hand-coding the layouts and stylesheets is the only way to go. Not being limited by a <abbr>CMS</abbr> is a wonderful thing...

## And Who Are You Again?

Oh hey. I'm Michael Rose, just another boring, tattooed, time traveling, designer and illustrator working in Buffalo, New York. I'm into drawing faceless portraits[^1] of strangers on an iPad using [Paper by FiftyThree](http://www.fiftythree.com/paper), movie theater popcorn, [chicken wings done right](http://www.duffswings.com "Duff's Famous Wings"), dust collecting record collections, and over using ellipses and em-dashes.

Oh, and I'm a recent father of twin girls and will someday help redesign [my wife's blog](http://2littlerosebuds.com "2 Little Rosebuds")...


## Contact Me

### Send a short message below or [@reply me on Twitter](http://twitter.com/mmistakes).
{:.no_toc}

<div class="contact-form">
	<form id="contact" name="contact" action="#" method="post">
	    <label for="email">Your E-mail:</label>
	    <input type="email" id="email" name="email" class="txt">
	    <label for="msg">Your Message:</label>
	    <textarea id="msg" name="msg" class="txtarea"></textarea>
	    <button id="send" class="btn btn-inverse" style="margin-top:1em;margin-bottom:0">Send Message</button>
	</form>
</div>

<script type="text/javascript">
    function validateEmail(email) { 
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    $(document).ready(function() {
        $("#contact").submit(function() { return false; });

        $("#send").on("click", function(){
            var emailval  = $("#email").val();
            var msgval    = $("#msg").val();
            var msglen    = msgval.length;
            var mailvalid = validateEmail(emailval);
            
            if(mailvalid == false) {
                $("#email").addClass("error");
            }
            else if(mailvalid == true){
                $("#email").removeClass("error");
            }
            
            if(msglen < 4) {
                $("#msg").addClass("error");
            }
            else if(msglen >= 4){
                $("#msg").removeClass("error");
            }
            
            if(mailvalid == true && msglen >= 4) {
                // if both validate we attempt to send the e-mail
                // we then hide the submit btn so the user doesnt click twice
                $("#send").replaceWith("<em>sending...</em>");
                
                $.ajax({
                    type: 'POST',
                    url: 'sendmessage.php',
                    data: $("#contact").serialize(),
                });
            }
        });
    });
</script>

[^1]: One of my many faceless portraits drawn on an iPad using the Paper by 53 app can be seen up top. That bearded fella be me.