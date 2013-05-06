// @codekit-append "jquery.jPages.js", "jquery.lazyload.js", "jquery.fitvids.js", "picturefill.js", "matchmedia.js";

/*! Plugin options and other jQuery stuff */

// Lazyload
$(function() {

  /* initiate lazyload defining a custom event to trigger image loading  */
  $("img.lazy").show().lazyload({
	event: "turnPage",
	effect: "fadeIn"
  });

  /* initiate plugin */
  $("div.holder").jPages({
    containerID: "itemContainer",
	previous: "←",
	next: "→",
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

// Magnific-Popup options
$(document).ready(function() {
  $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
      }
    }
  });
});