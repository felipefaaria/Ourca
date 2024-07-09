// Relógio
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  var day = now.getDate();
  var month = now.getMonth() + 1; // JavaScript months are 0-based
  var year = now.getFullYear();
  document.querySelector(".digital-clock .hours").textContent =
    padNumber(hours);
  document.querySelector(".digital-clock .minutes").textContent =
    padNumber(minutes);
  document.querySelector(".digital-clock .seconds").textContent =
    padNumber(seconds);
  document.querySelector(".digital-clock .day").textContent = padNumber(day);
  document.querySelector(".digital-clock .month").textContent =
    padNumber(month);
  document.querySelector(".digital-clock .year").textContent = year;
  const secondHand = document.querySelector(".second-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const hourHand = document.querySelector(".hour-hand");
  secondHand.style.transform = `rotate(${seconds * 6 + 90}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6 + 90}deg)`;
  hourHand.style.transform = `rotate(${hours * 30 + 90}deg)`;
  setTimeout(updateClock, 1000);
}

function padNumber(number) {
  return number < 10 ? "0" + number : number;
}
setInterval(updateClock, 1000);
updateClock();

// Toggle clock

document.getElementById("toggleClock").addEventListener("click", function () {
  var digitalClock = document.getElementById("digitalClock");
  var analogClock = document.getElementById("analogClock");
  if (getComputedStyle(digitalClock).opacity == "0") {
    digitalClock.style.opacity = "1";
    analogClock.style.opacity = "0";
  } else {
    digitalClock.style.opacity = "0";
    analogClock.style.opacity = "1";
  }
});

let toggleClockButton = document.querySelector("#toggleClock");
let digitalClock = document.querySelector("#digitalClock");

toggleClockButton.addEventListener("click", function () {
  if (digitalClock.style.opacity == "0") {
    toggleClockButton.classList.remove("move-up");
  } else {
    toggleClockButton.classList.add("move-up");
  }
});

// Temporizador
const timerInput = document.getElementById("timer-input");
const timerStart = document.getElementById("timer-start");
const timerStop = document.getElementById("timer-stop");
const timerResume = document.getElementById("timer-resume");
const timerReset = document.getElementById("timer-reset");
const timerDisplay = document.getElementById("timer");
let timer;
let startTime;
let totalMilliseconds;
let remainingMilliseconds = 0; // Initial value for remaining milliseconds

function padZero(num, size) {
  return num.toString().padStart(size, "0");
}

function updateTimer() {
  const now = Date.now();
  const elapsed = now - startTime;
  const remainingTime = totalMilliseconds - elapsed;

  if (remainingTime < 0) {
    clearInterval(timer);
    timerDisplay.textContent = "00:00:00.000";
    alert("Tempo esgotado!");
  } else {
    const newHours = Math.floor(remainingTime / (60 * 60 * 1000));
    const newMinutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    const newSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
    const newMilliseconds = remainingTime % 1000;
    timerDisplay.textContent = `${padZero(newHours, 2)}:${padZero(
      newMinutes,
      2
    )}:${padZero(newSeconds, 2)}.${padZero(newMilliseconds, 3)}`;
    remainingMilliseconds = remainingTime; // Update remaining milliseconds
  }
}

timerStart.addEventListener("click", function () {
  const time = timerInput.value;
  const regex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,3})$/;
  const match = time.match(regex);

  if (match === null) {
    alert("Por favor, insira o tempo no formato h:min:seg.miliseg");
    return;
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);
  const milliseconds = parseInt(match[4], 10);
  totalMilliseconds =
    (hours * 60 * 60 + minutes * 60 + seconds) * 1000 + milliseconds;

  clearInterval(timer); // Ensure any existing timer is cleared before starting a new one

  startTime = Date.now();
  updateTimer(); // Initial call to update the display immediately
  timer = setInterval(updateTimer, 1); // Update interval changed to 1 millisecond
});

timerStop.addEventListener("click", function () {
  clearInterval(timer);
  remainingMilliseconds = totalMilliseconds - (Date.now() - startTime);
});

timerResume.addEventListener("click", function () {
  if (remainingMilliseconds > 0) {
    // Ensure there's time remaining
    clearInterval(timer); // Clear any existing interval to prevent multiple intervals
    totalMilliseconds = remainingMilliseconds;
    startTime = Date.now();
    updateTimer(); // Initial call to update the display immediately
    timer = setInterval(updateTimer, 1); // Update interval changed to 1 millisecond
  }
});

timerReset.addEventListener("click", function () {
  clearInterval(timer);
  timerDisplay.textContent = "00:00:00.000";
  timerInput.value = "";
  totalMilliseconds = 0;
  remainingMilliseconds = 0;
  timer = null;
});

// Cronômetro
const stopwatchDisplay = document.getElementById("stopwatch");
const startButton = document.getElementById("stopwatch-start");
const stopButton = document.getElementById("stopwatch-stop");
const resumeButton = document.getElementById("stopwatch-resume");
const resetButton = document.getElementById("stopwatch-reset");
const lapButton = document.getElementById("stopwatch-lap");
const lapsContainer = document.getElementById("laps");

let stopwatchInterval;
let elapsedTime = 0; // Total elapsed time in milliseconds
let startTimeStopwatch = 0; // The start time of the current interval
let lapCount = 0;
let lastLapTime = 0;

function padZero(num, size) {
  return num.toString().padStart(size, "0");
}

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  const ms = milliseconds % 1000;
  return `${padZero(hours, 2)}:${padZero(minutes, 2)}:${padZero(
    seconds,
    2
  )}.${padZero(ms, 3)}`;
}

function updateStopwatch() {
  const now = Date.now();
  const timeDiff = now - startTimeStopwatch;
  const totalElapsed = elapsedTime + timeDiff;

  stopwatchDisplay.textContent = formatTime(totalElapsed);
}

startButton.addEventListener("click", function () {
  if (!stopwatchInterval) {
    startTimeStopwatch = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 1);
  }
});

stopButton.addEventListener("click", function () {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime += Date.now() - startTimeStopwatch;
  }
});

resumeButton.addEventListener("click", function () {
  if (!stopwatchInterval) {
    startTimeStopwatch = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 1);
  }
});

resetButton.addEventListener("click", function () {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedTime = 0;
  startTimeStopwatch = 0;
  lastLapTime = 0;
  stopwatchDisplay.textContent = "00:00:00.000";
  lapsContainer.innerHTML = ""; // Clear all lap times
  lapCount = 0; // Reset lap count
});

lapButton.addEventListener("click", function () {
  if (stopwatchInterval) {
    // Check if the stopwatch is running
    const now = Date.now();
    const currentLapTime = elapsedTime + (now - startTimeStopwatch);
    const lapTime = currentLapTime - lastLapTime;
    lastLapTime = currentLapTime;

    lapCount++;
    const lapElement = document.createElement("div");
    lapElement.className = "lap";

    const lapNumberElement = document.createElement("span");
    lapNumberElement.className = "lap-number";
    lapNumberElement.textContent = `${lapCount}`;

    const lapDiffElement = document.createElement("span");
    lapDiffElement.className = "lap-diff";
    lapDiffElement.textContent = ` +${formatTime(lapTime)} `;

    const lapTimeElement = document.createElement("span");
    lapTimeElement.className = "lap-time";
    lapTimeElement.textContent = formatTime(currentLapTime);

    lapElement.appendChild(lapNumberElement);
    lapElement.appendChild(lapDiffElement);
    lapElement.appendChild(lapTimeElement);
    lapsContainer.appendChild(lapElement);
  } else {
    alert("O cronômetro não está em execução!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("hrefsono");

  link.addEventListener("click", function (event) {
    event.preventDefault();
    handleNavigation(link.id);
  });

  function handleNavigation(linkId) {
    const firstAccessKey = `firstAccess_${linkId}`;
    const isFirstAccess = !localStorage.getItem(firstAccessKey);
    const firstAccessPage = {
      hrefsono: "../Gerenciar_sono/index.html",
    };
    const subsequentAccessPage = {
      hrefsono: "../Gerenciar_sono/index3.html",
    };

    if (isFirstAccess) {
      localStorage.setItem(firstAccessKey, "true");
      window.location.href = firstAccessPage[linkId];
    } else {
      window.location.href = subsequentAccessPage[linkId];
    }
  }
});
