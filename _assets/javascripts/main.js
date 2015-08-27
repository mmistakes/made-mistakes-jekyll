//= require vendor/jquery
//= require_tree ./plugins/

$(document).ready(function(){

  // // Full screen menu overlay
  // // toggle menu, trigger, and screen on click
  // $("#js__menu-open").on("click touchstart", function(e){
  //   e.preventDefault();

  //   // toggle button text
  //   var el = $(".masthead__menu-label");
  //   if (el.text() == el.data("text-swap")) {
  //     el.text(el.data("text-original"));
  //   } else {
  //     el.data("text-original", el.text());
  //     el.text(el.data("text-swap"));
  //   }

  //   // move masthead menu
  //   // $(".masthead__menu-wrapper").insertBefore($(".masthead"));
  //   $(".masthead__menu-wrapper").clone().removeClass("masthead__menu-wrapper").addClass("masthead__menu-wrapper--clone").insertBefore($(".masthead"));


  //   // toggle menu open/close
  //   $(".masthead__menu-wrapper").toggleClass("is--open");

  // });


  // Fix widows in headlines
  $(".post__title").widowFix();


  // Add lightbox class to all image links
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


  // Lazy Load
  $("img.load").show().lazyload({
  	effect: "fadeIn",
  	skip_invisible: false
  });


  // FitVids
	// Target your .container, .wrapper, .post, etc.
	$("#main").fitVids();


  // smooth scroll
  $("a").smoothScroll({offset: -20});


  // footnotes
  var bigfoot = $.bigfoot(
    {
      deleteOnUnhover: false,
      preventPageScroll: false,
      activateOnHover: true
    }
  );


  // automatic table of contents
  $(".toc__menu").toc({content: ".post__inner-wrapper", headings: "h2"});
  $(".toc__menu li").addClass("toc__menu--item");


});
