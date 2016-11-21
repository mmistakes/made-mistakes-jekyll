// asynchronously load fonts
WebFontConfig = {
  google: {
    families: ['PT Serif:400,400italic,700', 'PT Sans Narrow:400,700']
  }
};

// if( cookie( fullCSSKey ) ){
//   (function(d) {
//     var wf = d.createElement('script'), s = d.scripts[0];
//     wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
//     s.parentNode.insertBefore(wf, s);
//   })(document);
// };


$(document).ready(function(){

  $("body").addClass("js");

  // FitVids init
  $(".page__content").fitVids();

  // smooth scroll init
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'], a[href$='.png'], a[href$='.gif']").attr("data-lity", "");

  // lazy load settings
  $("img.load").show().lazyload({
  	effect: "fadeIn",
  	skip_invisible: false
  });

  // Bigfoot footnotes
  var bigfoot = $.bigfoot(
    // {
    //   actionOriginalFN: "ignore"
    // }
  );

});


// Static comments
(function ($) {
  var $comments = $('.js-comments');

  $('#comment-form').submit(function () {
    var form = this;

    $(form).addClass('disabled');
    $('#comment-form-submit').html('<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Loading...');

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        $('#comment-form-submit').html('Submitted').addClass('btn--disabled');
        $('#comment-form .js-notice').removeClass('notice--danger').addClass('notice--success');
        showAlert('<strong>Thanks for your comment!</strong> It will show on the site once it has been reviewed and approved.');
      },
      error: function (err) {
        console.log(err);
        $('#comment-form-submit').html('Submit Comment');
        $('#comment-form .js-notice').removeClass('notice--success').addClass('notice--danger');
        showAlert('<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again.');
        $(form).removeClass('disabled');
      }
    });

    return false;
  });

  function showAlert(message) {
    $('#comment-form .js-notice').removeClass('hidden');
    $('#comment-form .js-notice-text').html(message);
  }
})(jQuery);
