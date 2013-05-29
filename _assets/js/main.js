/*! Plugin options and other jQuery stuff */

// FitVids options
$(function() {
	$("article").fitVids();
});

// Table of Contents toggle
$(function() {
  $(".toc h3").click(function () {
    $("#drawer").toggleClass("hidden");
  });
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Magnific-Popup options
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});

// Contact Form
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
            // then hide the submit btn so the user doesnt click twice
            $("#send").replaceWith("<em>sending...</em>");
            
            $.ajax({
                type: 'POST',
                url: 'sendmessage.php',
                data: $("#contact").serialize(),
            });
        }
    });
});
