showCookieConsent();

function showCookieConsent(){
	poll(
    		function() {
        		return getCookie("geo_country_code") != "";
    		},
    		function() {
        		initializeCookieConsent(getCookie("geo_country_code"));
    		},
    		function() {
        		initializeCookieConsent("DE");
    		},
		200,
		2000
	);
}

//Source: https://davidwalsh.name/javascript-polling
function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
            // If the condition is met, we're done!
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments));
            }
    })();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function initializeCookieConsent(countryCode){
	if(document.readyState === 'complete'){
                initializeCookiePopup(countryCode);
        }else{
             	window.addEventListener("load", function(){
                	initializeCookiePopup(countryCode);
        	});
	}
}

function initializeCookiePopup(code){
	window.cookieconsent.initialise({
  		"palette": {
    			"popup": {
      				"background": "#393e46"
    				},
    			"button": {
      				"background": "#00848a"
    			}
  		},
		"theme": "classic",
  		"content": {
    			"message": "This website uses cookies to ensure you get the best experience on my website. ",
    			"href": "/terms/"
  		},
		"law": {
          		// takes the "preferred" options and changes them slightly to match the country's law
          		"countryCode": code
        	}
	})
}

