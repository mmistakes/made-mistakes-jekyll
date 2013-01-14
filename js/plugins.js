// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here

// FitVids options
$(".content-wrapper").fitVids();

// FancyBox options
$(document).ready(function() {
	$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox({
		beforeShow: function () {
			if (this.title) {
		        this.title = ''+this.title+'<br /><a class="pin-it-button" href="http://pinterest.com/pin/create/button/?url='+encodeURIComponent(document.location.href)+'&media='+encodeURIComponent(this.href)+'&description='+encodeURIComponent(this.title)+'">'+'<img title="Pin It" src="http://assets.pinterest.com/images/PinExt.png" alt="" border="0" /></a> <a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-text="'+this.title+'" data-hashtags="PaperFaces" data-via="mmistakes" data-url="'+this.href+'">Tweet</a>';
			}
		},
		afterShow: function() {
            // Render tweet button
            twttr.widgets.load();
        },
		padding: 0,
		openEffect: 'elastic',
		closeEffect: 'elastic',
		helpers: {
			title: {
				type: 'outside'
			}
		}
	});
});

// lazyload
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
	animation: "flipInY",
	minHeight: false,
	callback: function( pages, items ){
	/* lazy load current images */
	items.showing.find("img").trigger("turnPage");
	/* lazy load next page images */
	items.oncoming.find("img").trigger("turnPage");
  }
  });

});