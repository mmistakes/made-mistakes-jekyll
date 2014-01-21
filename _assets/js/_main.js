/*! Responsive Menu */
// http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/
//  The function to change the class
var changeClass = function (r,className1,className2) {
  var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
  if( regex.test(r.className) ) {
    r.className = r.className.replace(regex,' '+className2+' ');
    }
    else{
    r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
    }
    return r.className;
};  
//  Creating our button in JS for smaller screens
var menuElements = document.getElementById('site-nav');
menuElements.insertAdjacentHTML('afterBegin','<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="fa fa-bars"> </i> Menu</button>');

//  Toggle the class on click to show / hide the menu
document.getElementById('menutoggle').onclick = function() {
  changeClass(this, 'navtoogle active', 'navtoogle');
};
// http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/comment-page-2/#comment-438918
document.onclick = function(e) {
  var mobileButton = document.getElementById('menutoggle'),
    buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

  if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
    changeClass(mobileButton, 'navtoogle active', 'navtoogle');
  }
};

/*! Plugin options and other jQuery stuff */

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

// FitVids options
$(function() {
	$("article").fitVids();
});

// Lazy Load  
$("img.load").show().lazyload({ 
    effect : "fadeIn"
});

/* Disqus Comments */

  // Load Disqus comments when visitor scrolls down page to comments
  // Usage:
  // Add a div with id "disqus_thread" and data attributes for every Disqus parameter:
  //
  // <div id="disqus_thread" data-disqus-shortname="username" data-disqus-url="http://example.com/post/post-name/"></div>
  // 
  // @author: Murat Corlu
  // @link: https://gist.github.com/gists/2290198

  $(function(){
      var disqus_div = $("#disqus_thread");
      if (disqus_div.size() > 0 ) {
          var ds_loaded = false,
              top = disqus_div.offset().top, // WHERE TO START LOADING
              disqus_data = disqus_div.data(),
              check = function(){
                  if ( !ds_loaded && $(window).scrollTop() + $(window).height() > top ) {
                      ds_loaded = true;
                      for (var key in disqus_data) {
                          if (key.substr(0,6) == 'disqus') {
                              window['disqus_' + key.replace('disqus','').toLowerCase()] = disqus_data[key];
                          }
                      }
   
                      var dsq = document.createElement('script'); 
                      dsq.type = 'text/javascript';
                      dsq.async = true;
                      dsq.src = 'http://' + window.disqus_shortname + '.disqus.com/embed.js';
                      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                  }
              };
          $(window).scroll(check);
          check();
      }
  });