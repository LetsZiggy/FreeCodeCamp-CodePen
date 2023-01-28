let breakVal = 5;
let pomodoroVal = 1;
let sessionVal = 25;
let mouseDown = false; // false, 'break', 'pomodoro, 'session'
let mouseY = { start: null, current: null };
let diff = 0;
let repeat = 1;
let minute = 25;
let second = 0;
let type = 'work'; // 'work', 'break'
let interval = null;

let adjusterElem = document.getElementById('adjuster');
let breakElem = document.getElementById('break');
let pomodoroElem = document.getElementById('pomodoro');
let sessionElem = document.getElementById('session');
let timerElem = document.getElementById('timer');
let repeatElem = document.getElementById('repeat');
let repeatPluralElem = document.getElementById('plural-repeat');
let typeElem = document.getElementById('type');
let minuteElem = document.getElementById('minute');
let minutePluralElem = document.getElementById('plural-minute');
let secondElem = document.getElementById('second');
let secondPluralElem = document.getElementById('plural-second');
let audioWork = document.getElementById('audio-work');
let audioBreak = document.getElementById('audio-break');

audioWork.volume = 0.01;
audioBreak.volume = 0.005;

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(event, type) {
  mouseDown = type;
  mouseY.start = event.clientY;
  event.preventDefault();
}

function handleMouseMove(event) {
  if (mouseDown !== false) {
    mouseY.current = event.clientY;
    diff = Math.floor(mouseY.current - mouseY.start);

    if (Math.abs(diff) > 15) {
      mouseY.start = mouseY.current;

      if (mouseDown === 'break') {
        if (diff > 0) {++breakVal;} else {--breakVal;}
        if (breakVal <= 1) {breakVal = 1;} else
        if (breakVal >= 30) {breakVal = 30;}

        breakElem.innerText = `${breakVal.toString()} min${breakVal > 1 ? 's' : ''}`;
      } else
      if (mouseDown === 'pomodoro') {
        if (diff > 0) {++pomodoroVal;} else {--pomodoroVal;}
        if (pomodoroVal <= 1) {pomodoroVal = 1;} else
        if (pomodoroVal >= 50) {pomodoroVal = 50;}

        pomodoroElem.innerText = `${pomodoroVal.toString()} cycle${pomodoroVal > 1 ? 's' : ''}`;
      } else
      if (mouseDown === 'session') {
        if (diff > 0) {++sessionVal;} else {--sessionVal;}
        if (sessionVal <= 1) {sessionVal = 1;} else
        if (sessionVal >= 60) {sessionVal = 60;}

        sessionElem.innerText = `${sessionVal.toString()} min${sessionVal > 1 ? 's' : ''}`;
      }
    }
  }
}

function handleMouseUp(event) {
  mouseDown = false;
}

function handleStartButton(event) {
  repeat = pomodoroVal;
  minute = sessionVal;
  second = 0;
  type = 'work';
  typeElem.innerText = type;
  typeElem.classList.remove('gold');
  setNumbers();
  setPlural();
  audioWork.play();
  document.getElementById('radio-play').checked = true;

  setTimeout(() => {
    switchView();
    startInterval();
  }, 100);
}

function handleController(action) {
  if (action === 'stop') {
    audioBreak.play();
    stopInterval();

    setTimeout(() => {
      switchView();
    }, 100);
  }
  // Pause
  else if (action === 'pause') {
      audioBreak.play();
      stopInterval();
    }
    // Play
    else {
        audioWork.play();
        startInterval();
      }
}

function switchView() {
  adjuster.classList.toggle('hidden');
  timer.classList.toggle('hidden');
}

function startInterval() {
  interval = setInterval(() => {
    // End
    if (second === 0 && minute === 0 && repeat === 1 && type === 'break') {
      audioBreak.play();
      switchView();
      clearInterval(interval);
    }
    // Next cycle
    else if (second === 0 && minute === 0 && repeat > 1 && type === 'break') {
        repeat--;
        minute = sessionVal;
        second = 0;
        type = 'work';
        typeElem.innerText = type;
        typeElem.classList.remove('gold');
        audioWork.play();
      }
      // Break
      else if (second === 0 && minute === 0 && type === 'work') {
          minute = breakVal;
          second = 0;
          type = 'break';
          typeElem.innerText = type;
          typeElem.classList.add('gold');
          audioBreak.play();
        }
        // Next minute
        else if (second === 0 && minute > 0) {
            minute--;
            second = 59;
          }
          // Next second
          else {
              second--;
            }

    setNumbers();
    setPlural();
  }, 1000);
}

function stopInterval() {
  clearInterval(interval);
}

function setNumbers() {
  repeatElem.innerText = repeat.toString();
  minuteElem.innerText = minute.toString();
  secondElem.innerText = second.toString();
}

function setPlural() {
  repeatPluralElem.innerText = `cycle${repeat === 1 ? '' : 's'}`;
  minutePluralElem.innerText = `min${minute === 1 ? '' : 's'}`;
  secondPluralElem.innerText = `sec${second === 1 ? '' : 's'}`;
}