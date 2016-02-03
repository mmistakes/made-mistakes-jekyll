//= require vendor/jquery.min
//= require plugins/jquery.typed.min

$(document).ready(function(){

  $("body").addClass("js");

  // toggle overlay navigation
  $(document).on('click', '.overlay__menu-trigger', function() {
    // in Firefox transitions break when parent overflow is changed, so we need to wait for the end of the transition to give the body an overflow hidden
    if( $('.overlay__menu').hasClass('is--visible') ) {
      $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
    else {
      $('.overlay__menu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  });

  // close overlay navigation on button click
  $('.overlay__menu-close, #screen').on('click', function(){
    $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });

  // open/close overlay navigation on focus
  $('.overlay__menu-item a').on('focus', function(){
    $('.overlay__menu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  $('.overlay__menu-close').on('focus', function(){
    $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });

  // close menu on [esc]
  $(document).on('keydown', function(e){
    if ( e.keyCode === 27 ) { // ESC key
      $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  });

  // home page auto typing
  $("#js-home-typed").typed({
    strings: ["<span class='glitch__title'>Hello^250 my name is&nbsp;M̔̋ͩ̚i̋͢c̛ͪ̈́́̄hͪ̄̆́a̢͋͂ͧē̎̌̿ͣl͋ͬ̽͆͌ͧ̿̕. ^500</span> <span class='br'></span> I am just another boring, ^250 tattooed, ^250 time traveling designer from Buffalo New York.^500 <span class='br'></span> I enjoy eating chicken wings, ^500 <a href='https://mademistakes.com/paperfaces/'>sketching on an iPad</a>, ^500 and playing Xbox.^500 <span class='br'></span> Here you will find a collection of <a href='https://mademistakes.com/articles/'>my writing</a>, ^750 <a href='https://mademistakes.com/mastering-paper/'>Paper by FiftyThree tutorials</a>, ^750 and other <a href='https://mademistakes.com/work/'>creative endeavors</a>. <span class='br'></span> <span class='glitch__secondary'><a href='#0' class='overlay__menu-trigger'>Main Menu</a> <br> <a href='https://mademistakes.com/about/'>About</a> <br> <a href='https://mademistakes.com/contact/'>Contact</a> <br> <a href='https://mademistakes.com/faqs/'>FAQS</a></span>"],
    contentType: "html",
    startDelay: 200,
    backDelay: 3000,
    callback: function(){
      glitch_secondary();
    }
  });

  // 404 page auto typing
  $("#js-404-typed").typed({
    strings: ["<span class='glitch__title'>Your Pixels are on Another Canvas ^500</span> <span class='br'></span> Sorry, but the page you were trying to view has moved or does not exist -- perhaps you can <a href='{{ site.url }}/sitemap/' title='sitemap of Made Mistakes'>find it here</a>. <span class='br'></span> <span class='glitch__secondary'><a href='#0' class='overlay__menu-trigger'>Main Menu</a>"],
    contentType: "html",
    startDelay: 200,
    backDelay: 3000,
    callback: function(){
      glitch_secondary();
    }
  });

  // reveal secondary container at auto typing completion
  function glitch_secondary(){
    $(".typed__secondary").css("opacity", "1");
  }

});
