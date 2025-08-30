const timer = document.querySelector(".timer");
const startPauseButton = document.querySelector(".start-pause");
const editButton = document.querySelector(".edit");
const editBox = document.querySelector(".edit-box");

const hourSelectEl = document.querySelector(".hour-select");
const HourDeEl = document.querySelector(".hour-decrement");
const HourInEl = document.querySelector(".hour-increment");


let currentTime = 1200; //in sec
let isTimerRunning = false;
let isStarted = false;
let timerInterval = null;
let flagTime;

timer.textContent = formatTime(currentTime); // Initial display

function getMinute(seconds) {
  return Math.floor(seconds / 60);
}

function formatTime(time) {
  let minutes = getMinute(time);
  let seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;
}

//main countdown function
function countdownStart(timeLeft) {
  isTimerRunning = true;
  timer.textContent = formatTime(timeLeft); // Show immediately
  clearTimer(); // Clear any previous interval
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      timer.textContent = "00 : 00";
      isStarted = false;
      clearTimer();
      return;
    }
    if (isTimerRunning) {
      timeLeft--;
      currentTime = timeLeft;
      timer.textContent = formatTime(timeLeft);
    }
  }, 1000);
}

// Function to clear the timer interval from outside
function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

//Start, pause, resume control
startPauseButton.addEventListener("click", () => {
  if (!isStarted) {
    isStarted = true;
    countdownStart(currentTime);
    startPauseButton.textContent = "Pause";
    return;
  }
  if (isTimerRunning) {
    startPause("pause");
  } else {
    startPause("resume");
  }
});

function startPause(stage) {
  if (stage === "pause") {
    isTimerRunning = false;
    flagTime = currentTime;
    startPauseButton.textContent = "Resume";
  } else if (stage === "resume") {
    countdownStart(currentTime);
    startPauseButton.textContent = "Pause";
  }
}



// Edit box creation and logic
const MinDeEl = document.querySelector(".minute-decrement");
const MinInEl = document.querySelector(".minute-increment");
const minuteSelectEl = document.querySelector(".minute-select");
const setTimeButton = document.querySelector(".set-time");
const cancelButton = document.querySelector(".cancel");

//Edit timer toggle
editButton.addEventListener("click", () => {
  editBox.style.display = "flex";
  startPause("pause");
});

//Set time from edit box
setTimeButton.addEventListener("click", () => {
  editBox.style.display = "none";
  timer.textContent = formatTime(currentTime);
  isStarted = false;
  clearTimer();
  startPauseButton.textContent = "Start";
});

cancelButton.addEventListener("click", () => {
  editBox.style.display = "none";
  startPauseButton.textContent = "Resume";
  currentTime = flagTime;
});

function loadMinuteOptions() {
  // Only add options if not already present
  if (minuteSelectEl.options.length < 60) {
    for (let i = 0; i <= 59; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i.toString().padStart(2, '0');
      minuteSelectEl.appendChild(option);
      if (i === 0) {
        option.selected = true;
      }
    }
  }
}

function loadHourOptions() {
  // Only add options if not already present
  if (hourSelectEl.options.length < 24) {
    for (let i = 0; i <= 23; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i.toString().padStart(2, '0');
      hourSelectEl.appendChild(option);
      if (i === 0) {
        option.selected = true;
      }
    }
  }
}


MinDeEl.addEventListener("click", () => {
  if (minuteSelectEl.value > 0) {
    minuteSelectEl.value = parseInt(minuteSelectEl.value) - 1;
    updateCurrentTimeFromInputs();
  }
});

MinInEl.addEventListener("click", () => {
  if (minuteSelectEl.value < 59) {
    minuteSelectEl.value = parseInt(minuteSelectEl.value) + 1;
    updateCurrentTimeFromInputs();
  }
});

minuteSelectEl.addEventListener("change", (e) => {
  updateCurrentTimeFromInputs();
});

HourDeEl.addEventListener("click", () => {
  if (hourSelectEl.value > 0) {
    hourSelectEl.value = parseInt(hourSelectEl.value) - 1;
    updateCurrentTimeFromInputs();
  }
});

HourInEl.addEventListener("click", () => {
  if (hourSelectEl.value < 23) {
    hourSelectEl.value = parseInt(hourSelectEl.value) + 1;
    updateCurrentTimeFromInputs();
  }
});

hourSelectEl.addEventListener("change", (e) => {
  updateCurrentTimeFromInputs();
});

function updateCurrentTimeFromInputs() {
  const hours = parseInt(hourSelectEl.value) || 0;
  const minutes = parseInt(minuteSelectEl.value) || 0;
  currentTime = hours * 3600 + minutes * 60;
}

// Initialize hour and minute options on page load
loadHourOptions();
loadMinuteOptions();
