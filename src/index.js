// let requirejs = require("requirejs");

// let fs = requirejs("fs");
// console.log(fs);

let experimentIsOverNotificationHeader = document.getElementById('end-notification');
experimentIsOverNotificationHeader.style.display = "none";

let btnShowLight = document.getElementById('btn-show-light');
btnShowLight.addEventListener('click', toggleLight);
btnShowLight.disabled = true;

let btnSetTimer = document.getElementById('btn-set-timer');
btnSetTimer.addEventListener('click', setTimer);

let btnReport = document.getElementById('btn-report');
btnReport.addEventListener('click', recordReport);

let lamp = document.getElementById('lamp');
lamp.addEventListener('mouseenter', showLight);
lamp.addEventListener('mouseleave', hideLight);

let light = document.getElementById('light');
light.style.display = "none";

let countdown;
let countdownGenerated = false;

let countdownMin = -5;

let delay;
delay = getRandomArbitrary(100, 500);
delay = Math.round(delay);
console.log(`Delay is generated. ${delay}ms`);

// class subject {
//     constructor(name, age, gender, department, timeSenseInversion, preferableHoveringOverButton) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//         this.department = department;
//         this.timeSenseInversion = timeSenseInversion;
//         this.preferableHoveringOverButton = preferableHoveringOverButton;
//     }
// };

class Subject {
    constructor(name, reportBody, date) {
        this.name = name;
        this.reportBody = reportBody;
        this.date = date;
    }
};

function recordReport() {
    let reportBody = prompt('What do you want to report?', '');
    let name = prompt('What\'s your name ? ', '');
    let dateNow = new Date();
    let subjectExampler = new Subject(name, reportBody, dateNow);
    let data = JSON.stringify(subjectExampler);
    fs.writeFileSync('subjectExampler.json', data);
}

function experimentIsOverNotification() {
    if (countdown <= countdownMin) experimentIsOverNotificationHeader.style.display = "block";
}

function experimentIsOverBtnDisable() {
    if (countdown <= countdownMin) {
        btnShowLight.disabled = true;
        btnSetTimer.disabled = true;
    }
}

function toggleLight() {
    if (light.style.display === "none") {
        if (countdown > countdownMin && countdownGenerated == true) {
            setTimeout(function () {
                light.style.display = "block";
            }, delay);
        }
        countdown--;
        if (countdown === undefined || isNaN(countdown)) {
            console.log(`Delay isn't defined, press "Set" button for starting an experiment.`);
        } else {
            console.log(`Delayed toggling lights left: ${countdown}`);
        }
    } else {
        light.style.display = "none";
        if (countdown < countdownMin) {
            btnShowLight.disabled = true;
        }
    }
    experimentIsOverBtnDisable();
    experimentIsOverNotification();
}

function showLight() {
    if (light.style.display === "none") {
        if (countdown > countdownMin && countdownGenerated == true) {
            setTimeout(function () {
                light.style.display = "block";
            }, delay);
        }
        countdown--;
        if (countdown === undefined || isNaN(countdown)) {
            console.log(`Delay isn't defined, press "Set" button for starting an experiment.`);
        } else {
            console.log(`Delayed toggling lights left: ${countdown}`);
        }
    }
    experimentIsOverBtnDisable();
    experimentIsOverNotification();
}

function hideLight() {
    light.style.display = "none";
    experimentIsOverBtnDisable();
}

function setTimer() {
    countdown = getRandomArbitrary(10, 30);
    countdown = Math.round(countdown);
    console.log(`Delayed toggling lights: ${countdown}`);
    countdownGenerated = true;
    btnShowLight.disabled = false;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}