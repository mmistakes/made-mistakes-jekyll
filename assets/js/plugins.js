// Place any jQuery/helper plugins in here

// FancyBox options
$(function() {
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
	$(".content-wrapper").fitVids();
});