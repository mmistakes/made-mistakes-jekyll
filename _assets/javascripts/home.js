//= require vendor/jquery.min
//= require plugins/jquery.typed.min

$(document).ready(function(){

  $("#js-home-typed").typed({
    stringsElement: $("#js-home-strings"),
    startDelay: 2000,
    backDelay: 3000,
    callback: function(){
      home_secondary();
    }
  });

  function home_secondary(){
    $(".home__secondary").css("opacity", "1");
  }

});
