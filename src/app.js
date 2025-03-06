const start = document.getElementById("start");
const pause = document.getElementById("pause");
const pomodoro = document.getElementById("pomodoro");
const shortbreak = document.getElementById("short-break");
const longbreak = document.getElementById("long-break");
const timer = document.getElementById("timer");
const breakSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16a.mp3");
const ring = new Audio("/src/assets/audio/click.wav");
const container = document.querySelector(".container");
let timeLeft = 1500;
let interval;
let currentMode = "pomodoro";

const updateTimer = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    if (interval) return;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            ring.play();
            clearInterval(interval);
            interval = null;
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const setTime = (seconds) => {
    clearInterval(interval);
    interval = null;
    timeLeft = seconds;
    updateTimer();
};

const resetColors = () => {

    resetStyle(pomodoro);
    resetStyle(shortbreak);
    resetStyle(longbreak);

    if (currentMode === "pomodoro") {
        applyStyles("rgb(199, 31, 31)", "rgb(209, 58, 58)", pomodoro);
    } else if (currentMode === "short-break") {
        applyStyles("rgb(44, 3, 230)", "rgb(91, 62, 223)", shortbreak);
    } else if (currentMode === "long-break") {
        applyStyles("rgb(5, 151, 0)", "rgb(96, 226, 92)", longbreak);
    }
};

const resetStyle = (button) => {
    button.style.backgroundColor = "transparent";
    button.style.color = "";
};

const applyStyles = (buttonColor, containerColor, activeButton) => {
    document.body.style.backgroundColor = buttonColor;
    container.style.backgroundColor = containerColor;
    activeButton.style.backgroundColor = buttonColor;``
};

start.addEventListener("click", () => {
    startTimer();
    breakSound.play();
});

pause.addEventListener("click", () => {
    stopTimer();
    breakSound.play();
});

pomodoro.addEventListener("click", () => {
    setTime(10);
    currentMode = "pomodoro";
    resetColors();
});

shortbreak.addEventListener("click", () => {
    setTime(5 * 60);
    currentMode = "short-break";
    resetColors();
});

longbreak.addEventListener("click", () => {
    setTime(15 * 60);
    currentMode = "long-break";
    resetColors();
});
