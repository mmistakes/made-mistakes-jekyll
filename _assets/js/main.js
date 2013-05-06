// @codekit-append "jquery.jPages.js", "jquery.lazyload.js", "jquery.fitvids.js", "picturefill.js", "matchmedia.js", "jquery.magnific-popup.js";

/*! Plugin options and other jQuery stuff */

// Lazyload and j
$(function() {

  /* initiate lazyload defining a custom event to trigger image loading  */
  $("img.lazy").show().lazyload({
	event: "turnPage",
	effect: "fadeIn"
  });

  /* initiate plugin */
  $("div.holder").jPages({
    containerID: "itemContainer",
	previous: "Previous",
	next: "Next",
	perPage: 30,
	midRange: 3,
	direction: "random",
	minHeight: false,
	callback: function( pages, items ){
	/* lazy load current images */
	items.showing.find("img").trigger("turnPage");
	/* lazy load next page images */
	items.oncoming.find("img").trigger("turnPage");
  }
  });

});

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