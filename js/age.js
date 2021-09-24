let ageEl = document.getElementById("age");

window.onload = setInterval(() => {
	let time = (new Date() - new Date(1122663600000)) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
	ageEl.innerText = time.toString().substring(0, 11);
}, 50);