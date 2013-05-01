// @codekit-append "jquery.fancybox.js", "jquery.jPages.js", "jquery.lazyload.js", "jquery.fitvids.js", "picturefill.js";

/*! Plugin options and other jQuery stuff */

// FancyBox options
$(function() {
	$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox({
		padding: 0,
		openEffect: 'elastic',
		closeEffect: 'elastic',
		overlay: {
            css: {
            	'background': 'rgba(0,0,0,0.5)'
            }
        },
		helpers: {
			title: {
				type: 'outside'
			}
		}
	});
});

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
	$(".toc h1").click(function () {
		$("#drawer").toggleClass("hidden");
	});
});