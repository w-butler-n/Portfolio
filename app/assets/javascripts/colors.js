"use strict";

var swatches = document.getElementsByClassName('swatch');
for (var i = 0, n = swatches.length; i < n; i++) {
	swatches[i].addEventListener('click', setSwatch);
}

function setColor(color){
	context.fillStyle = color;
	context.strokeStyle = color;
	var active = document.getElementsByClassName('active')[0];
	if (active) {
		active.className = 'swatch';
	}
}

function setSwatch(e){
	var swatch = e.target;
	var color = swatch.getAttribute("data-color");
	setColor(color);
	swatch.className += ' active';

}