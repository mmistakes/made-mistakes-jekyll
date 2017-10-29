getGeoLocationData();

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

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
    	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    	var expires = "expires="+d.toUTCString();
    	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getGeoLocationData(){
	//Check if geo location information is stored in a cookie, else use AJAX to get it
	var geo_country_code = getCookie("geo_country_code");
    	if (geo_country_code == "") {
		var xhr = new XMLHttpRequest();
		//Setup our own or use http://freegeoip.net/json/ as the url
		var url = "//freegeoip.net/json/?" + new Date().getTime();
		xhr.open('GET', url, true);
		xhr.send(null);

		xhr.onreadystatechange = function () {
        		if (xhr.readyState === 4) { //ReadyState 4 means the request is done
                		if (xhr.status === 200) {
					setCookie("geo_country_code", JSON.parse(xhr.responseText).country_code, 1);
                		} else {
                        		//TODO: log as an error event in GA?
					//TODO: Fallback on another geo locater and remember to preconnect / preload
                        		console.log('Error: ' + xhr.status); // An error occurred during the request.
                		}
        		}
		};
	}
}

