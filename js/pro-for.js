let proforEl = document.getElementById("profor");

window.onload =  setInterval(() => {
	let time = (new Date() - new Date(1406592000000)) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
	proforEl.innerText = time.toString().substring(0, 11);
}, 50);