var port = chrome.runtime.connectNative('com.athena.context');
var refresh_port = chrome.runtime.connectNative('com.athena.refresh');

refresh_port.onMessage.addListener(function(msg) {
  console.log("Received: " + msg);
	chrome.tabs.query({ url: "*://*.athenahealth.com/*" }, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, msg);  
	});
});

refresh_port.onDisconnect.addListener(function() {
  console.log("Disconnected");
});

port.onMessage.addListener(function(msg) {
  console.log("Received: " + msg);
});

port.onDisconnect.addListener(function() {
  console.log("Disconnected");
});

function sendContext(context) {
  let sending = port.postMessage(
	context
  );
}
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		sendContext(request);
});