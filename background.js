/* Print hostnames to the console */

function logURL(requestDetails) {

	/* Check whether request and origin use same hostname, only log if they are different */
 	var requestURL = new URL(requestDetails.url);
 	var originURL = new URL(requestDetails.originUrl);

 	if(requestURL.hostname != originURL.hostname){
 		console.log(requestURL.hostname);
 	}
 }


/* Event listener to intercept all HTTP requests */
browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);