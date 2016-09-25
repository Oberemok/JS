
var sec = min = hour = "00", mil = "000";
var checkboxForStart = true;
var checkboxForPauseAndStop = true;
var checkboxForPause = true;
var counter = 1;

zeroing(hour, sec, min, mil);
document.getElementById('btn-start').addEventListener("click", enter);
document.getElementById('btn-stop').addEventListener("click", stop);
document.getElementById('btn-pause').addEventListener("click", pause);

function start() {
	checkboxForStart = false;
	checkboxForPauseAndStop = false;
	checkboxForPause = true;
    reset(document.getElementById("block_of_hours").innerHTML, document.getElementById("block_of_min").innerHTML, document.getElementById("block_of_sec").innerHTML, document.getElementById("block_of_mil").innerHTML);
    
    var d = new Date();
    currentTime = d.getTime() - remainder;

    playOfStopwatch = setInterval(stopwatch, 4, currentTime);
    return currentTime;
}

function pause() {
	if (checkboxForPauseAndStop == false) {
		checkboxForStart = true;
		clearInterval(playOfStopwatch);
		if (checkboxForPause == true) {
			timecode(currentTime);
			checkboxForPause = false;
		}
	}
}

function stop() {
	if (checkboxForPauseAndStop == false) {
		checkboxForStart = true;
		clearInterval(playOfStopwatch);
		zeroing("00", "00", "00", "000");

		for (i = 1; i < counter; i++) {
			var element = document.getElementsByClassName('timecode')[0];

			document.body.removeChild(element);
		}
		counter = 1;
	}
}

function enter() {
	if (checkboxForStart == true) {
		start();
	} else {
		timecode(currentTime);
	}
}

function timecode(currentTime) {
	var element = document.createElement('p');
	element.className = 'timecode';
	var date = new Date();
	newTimecode = date.getTime() - currentTime;
	
	element.innerHTML = counter + ". " + hour + " : " + min + " : " + sec + " : " + mil;
	counter++;
	var myBody = document.querySelector('body');
	myBody.appendChild(element);
}

function stopwatch(currentTime) { 	
	
	var d = new Date();
	var newTime = d.getTime();
	var timeInMiliseconds = newTime - currentTime;

	conversion(timeInMiliseconds);
	zeroing(hour, sec, min, mil);

	
}
function conversion(timeInMiliseconds) {
	hours(timeInMiliseconds);
	minutes(timeInMiliseconds);		
	seconds(timeInMiliseconds);		
	miliseconds(timeInMiliseconds);	
}

function hours(timeInMiliseconds) {
	hour = (timeInMiliseconds - timeInMiliseconds % 3600000) / 3600000;
	if (hour < 10) {
		hour = "0" + hour;
	}
	return hour;
		
}
function minutes(timeInMiliseconds) {
	min = (timeInMiliseconds - timeInMiliseconds % 60000) / 60000;
	if (min < 10) {
		min = "0" + min;
	}
	return min;
		
}

function seconds(timeInMiliseconds) {
	timeInMiliseconds = timeInMiliseconds % 60000;
	sec = (timeInMiliseconds - timeInMiliseconds % 1000) / 1000;
	if (sec < 10) {
		sec = "0" + sec;
	}
	return sec;
}

function miliseconds(timeInMiliseconds) {
	timeInMiliseconds = timeInMiliseconds % 1000;
	mil = timeInMiliseconds;
	if (mil < 10) {
		mil = "00" + mil;
	} else if (mil < 100) {
 			mil = "0" + mil;
	}
	return mil;
}

function reset(h, m, s, ml) {
	remainder = +h * 3600000 +m * 60000 + +s * 1000 + +ml;
	return remainder;
}

function zeroing(a, b, c, d) {
	document.getElementById("block_of_hours").innerHTML = a;
	document.getElementById("block_of_sec").innerHTML = b;
	document.getElementById("block_of_min").innerHTML = c;
	document.getElementById("block_of_mil").innerHTML = d;
} 
