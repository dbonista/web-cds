//start

//set up connection port with app

if (window.name == 'frMain') { //only load if we're in the clinical frame
	var target = {'dt': new Date().toLocaleString()}; //init response json

	chrome.runtime.onMessage.addListener(
		(message, sender) => {
	    if (message == 'refresh') {
		    window.location.reload();
		}
	});

	//get data that's saved on the page meta data
	if (document.getElementById("default-data-context")){
		const ary = JSON.parse(document.getElementById("default-data-context").content);
		for (let i = 0; i < ary.length; i++) {
			Object.assign(target, ary[i]);
		}
	}

	//scrape patient name
	var pname = document.getElementsByClassName("patient-name")[0];
	if (pname){
		var formatted_pname = pname.innerText.replaceAll('\n','').replaceAll('\t','');
		Object.assign(target, {'name': formatted_pname});
	}

	//scrape dob
	var dob = document.getElementsByClassName("birth-date")[0];
	if (dob) {
		var formatted_dob = dob.innerText;
		Object.assign(target, {'dob': formatted_dob});
	}

	//pull practice from url string
	var practice = window.location.href.split('athenahealth.com/')[1].split('/1/')[0];
	Object.assign(target, {'practice': practice});

	chrome.runtime.sendMessage(target);

}

