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
    strings: ["<span class='glitch__title'>Hello^250 my name is Mî̽̿ͫ̒c͑̔̃͂h͂̽ͤ̊ͭͣa͛̓̍̓el̓͌̂̀̆&nbsp;Rͩͤ͂̄o̾̽̈́͆ͨ̚s͋̌̊̐e. ^500</span> <span class='br'></span> I am just another boring, ^250 tattooed, ^250 time traveling designer from Buffalo New York.^500 <span class='br'></span> I enjoy eating chicken wings, ^500 <a href='https://mademistakes.com/paperfaces/'>sketching on an iPad</a>, ^500 and playing Xbox.^500 <span class='br'></span> Here you will find a collection of <a href='https://mademistakes.com/articles/'>my writing</a>, ^750 <a href='https://mademistakes.com/mastering-paper/'>Paper by FiftyThree tutorials</a>, ^750 and other <a href='https://mademistakes.com/work/'>creative endeavors</a>."],
    contentType: "html",
    startDelay: 0,
    backDelay: 3000,
    callback: function(){
      glitch_secondary();
    }
  });

  // 404 page auto typing
  $("#js-404-typed").typed({
    strings: ["<span class='glitch__title'>Your Pixels are on Another&nbsp;Canvas ^500</span> <span class='br'></span> Sorry, but the page you were trying to view has moved or does not exist -- perhaps you can <a href='https://mademistakes.com/sitemap/' title='Made Mistakes sitemap'>find it here</a> or by searching below."],
    contentType: "html",
    startDelay: 0,
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
