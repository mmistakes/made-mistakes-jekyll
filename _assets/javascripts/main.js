//= require vendor/jquery
//= require_tree ./plugins/

$(document).ready(function(){

  // open/close primary navigation
  $('.overlay__menu-trigger').on('click', function(){
    // $('.cd-menu-icon').toggleClass('is-clicked');
    // $('.cd-header').toggleClass('menu-is-open');

    // in Firefox transitions break when parent overflow is changed, so we need to wait for the end of the transition to give the body an overflow hidden
    if( $('.overlay__menu').hasClass('is--visible') ) {
      $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        $('body').removeClass('overflow--hidden');
      });
    } else {
      $('.overlay__menu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        $('body').addClass('overflow--hidden');
      });
    }
  });


  // move table of contents from post body to sidebar
  $(".post__body .js-toc").appendTo($(".toc--sidebar"));


  // FitVids init
  $("#main").fitVids();


  // smooth scroll init
  $("a").smoothScroll({offset: -20});


  // bigfoot footnotes settings
  var bigfoot = $.bigfoot(
    {
      deleteOnUnhover: false,
      preventPageScroll: false,
      activateOnHover: true
    }
  );


  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");


  // Magnific-Popup options
	$('.image-popup').magnificPopup({
		disableOn: function() {
			if( $(window).width() < 500 ) {
				return false;
			}
			return true;
		},
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
		removalDelay: 500, // Delay in milliseconds before popup is removed
		// Class that is added to body when popup is open.
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});


  // lazy load settings
  $("img.load").show().lazyload({
  	effect: "fadeIn",
  	skip_invisible: false
  });

});
