let header = document.querySelector('#intro');
let anim = [
    { t: "{}", ms: 200 },
    { t: "{}", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{L_}", ms: 100 },
    { t: "{LI_}", ms: 100 },
    { t: "{LIA_}", ms: 100 },
    { t: "{LIAM_}", ms: 100 },
    { t: "{LIAMS_}", ms: 100 },
    { t: "{LIAMSC_}", ms: 100 },
    { t: "{LIAMSC_}", ms: 200 },
    { t: "{LIAMSC}", ms: 200 },
    { t: "{LIAMSC}", ms: 200 },
];
let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator;
let i = 0;
let update = () => {
    let step = anim[i];
    header.innerText = step.t;
    i++;

    if (i < anim.length)
        setTimeout(update, step.ms / stepDenominator);
    else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            initGlobe();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
}
update();