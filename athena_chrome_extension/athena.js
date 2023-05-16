//start

//set up connection port with app

if (window.name == 'frMain') { //only load if we're in the clinical frame

	function changeClass(elem){
		console.log('click');
		elem.classList.remove('icon-streamlined-spinner');
		elem.classList.add('finite-scrolling-spinner');
	}

	const parentElems = document.getElementsByClassName("patient-demographic-items");
	Array.prototype.forEach.call(parentElems, element => {
		const listElem = document.createElement("li");
		const iconContainer = document.createElement("div");
		iconContainer.className = "chart-alert-container autostart";
		iconContainer.title = "Click to refresh patient clinical content"
		const iconDiv = document.createElement("div");
		iconDiv.className = "chart-alert-trigger";
		const refresh = document.createElement("span");
		refresh.className = "icon-streamlined-spinner"; //pulled from athena .css
		refresh.onclick = function() {
			this.classList.remove('icon-streamlined-spinner');
			this.classList.add('finite-scrolling-spinner');
			this.style.bottom = "5px";
			this.style.left = "10px";
			window.location.reload();
		};
		iconDiv.appendChild(refresh);
		iconContainer.appendChild(iconDiv);
		listElem.appendChild(iconContainer);
		element.appendChild(listElem);
	})

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

