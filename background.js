/* Print hostnames to the console */
var origin = "";
var requestCount = 0;
var show_badge_count = false;

function logURL(requestDetails) {

	/* Check whether request and origin use same hostname, only log if they are different */
 	var requestURL = new URL(requestDetails.url);
 	var originURL = new URL(requestDetails.originUrl);
 	
 	//console.log(requestDetails);
 	if(requestURL.hostname != originURL.hostname){
 		console.log(requestURL.hostname);
 	}

 	/* Change icon and badge based on number of third party requests from a given origin */
 	
 	/* Increase count if request origin is same as current origin, otherwise reset count */ 
 	if(origin !== originURL.hostname) {
 		requestCount = 0;
 		origin = originURL.hostname;
 	} else {
 		requestCount++;
 	}

 	/* (if enabled) Show current number of requests in toolbar badge */
 	if(show_badge_count){
	 	if(requestCount > 0){

	 		browser.browserAction.setBadgeText({text: "" + requestCount});
	 	} else {
	 		browser.browserAction.setBadgeText({text: ""});
	 	}
	}
	browser.browserAction.setBadgeBackgroundColor({color: "rgba(0, 0, 0, 40)"});

	/* Set icon image (color) based on number of third party requests */
 	if(requestCount > 40){
 		browser.browserAction.setIcon({path: "icons/lightbeam_logo_red.png"});
 	} else if (requestCount > 20) {
 		browser.browserAction.setIcon({path: "icons/lightbeam_logo_orange.png"});
 	} else if (requestCount > 10) {
 		browser.browserAction.setIcon({path: "icons/lightbeam_logo_yellow.png"});
 	} else if (requestCount > 5) {
 		browser.browserAction.setIcon({path: "icons/lightbeam_logo_green.png"});

 	} else {
 		browser.browserAction.setIcon({path: "icons/lightbeam_logo-only_64x64.png"});

 	}
 }


/* Event listener to intercept all HTTP requests */
browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
).bind(this);
