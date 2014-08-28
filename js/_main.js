// Off Canvas Sliding
$(document).ready(function(){
	// Menu button click
	$('.js-menu-trigger').on('click touchstart', function(e){
		$('body').toggleClass('no-scroll');
		$('.js-menu, .js-menu-screen').toggleClass('is-visible');
		$('.sliding-menu-button').toggleClass('slide close');
		$('#masthead, #page-wrapper').toggleClass('slide');
		e.preventDefault();
	});
	// Page overlay click
	$('.js-menu-screen').on('click touchstart', function(e){
		$('body').toggleClass('no-scroll');
		$('.js-menu, .js-menu-screen').toggleClass('is-visible');
		$('.sliding-menu-button').toggleClass('slide close');
		$('#masthead, #page-wrapper').toggleClass('slide');
		e.preventDefault();
	});
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Magnific-Popup options
$(document).ready(function() {
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
		removalDelay: 300, // Delay in milliseconds before popup is removed
		// Class that is added to body when popup is open. 
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade'
	});
});

// Lazy Load  
$("img.load").show().lazyload({ 
		effect: "fadeIn",
		skip_invisible: false
});

// FitVids
$(document).ready(function(){
	// Target your .container, .wrapper, .post, etc.
	$("#main").fitVids();
});

// Table of Contents Accordion
$("#markdown-toc").prepend("<li><h6>Overview</h6></li>");