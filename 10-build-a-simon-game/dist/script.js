document.onkeydown = handleKeyDown;

let congratulationMessage = document.getElementById('congratulation');
let settingNormal = document.getElementById('normal');
let settingStrict = document.getElementById('strict');
let settingInsane = document.getElementById('insane');
let audioRed = document.getElementById('audio-red');
let audioBlue = document.getElementById('audio-blue');
let audioGreen = document.getElementById('audio-green');
let audioYellow = document.getElementById('audio-yellow');
let audioWrong = document.getElementById('audio-wrong');
let start = document.getElementById('start').children[0];
let red = document.getElementById('red');
let blue = document.getElementById('blue');
let green = document.getElementById('green');
let yellow = document.getElementById('yellow');
let cover = document.getElementById('cover');
let scoreDiv = num => {return document.getElementById(`score-${num}`);};
let timerDiv = num => {return document.getElementById(`timer-${num}`);};
let runGame = false;
let playerTurn = false;
let routine = [];
let count = 0;
let difficulty = 1; // 1: normal, 2: strict, 3: insane
let score = 1; // Min: 1, Max: 20
let timer = 1; // Min: 1, Max: 60
let runTimerInterval = null;
let runRoutineInterval = null;

function setDifficulty(setting) {
  switch (setting) {
    case 'normal':
      difficulty = 1;
      settingNormal.checked = true;
      break;

    case 'strict':
      difficulty = 2;
      settingStrict.checked = true;
      break;

    case 'insane':
      difficulty = 3;
      settingInsane.checked = true;
      break;

    case 'loop':
      if (difficulty === 1) {
        difficulty = 2;
        settingStrict.checked = true;
      } else
      if (difficulty === 2) {
        difficulty = 3;
        settingInsane.checked = true;
      } else
      {
        difficulty = 1;
        settingNormal.checked = true;
      }
      break;}

}

function reset(complete = false) {
  while (routine.length) {routine.pop();}
  clearTimer();

  if (complete) {
    congratulationMessage.style.display = 'none';
    clearScore();
  }
}

function clearScore() {
  score = 20;

  while (score >= 1) {
    scoreDiv(score).classList.remove('next');
    score--;
  }

  score = 1;
}

function addScore() {
  if (score < 20) {
    scoreDiv(score).classList.add('next');
    score++;
  } else
  {
    scoreDiv(score).classList.add('next');
    congratulationMessage.style.display = 'block';
  }
}

function clearTimer() {
  timer = 60;

  while (timer >= 1) {
    timerDiv(timer).classList.add('next');
    timer--;
  }

  timer = 1;
}

function setTimer() {
  timer = 1;

  while (timer <= 60) {
    timerDiv(timer).classList.remove('next');
    timer++;
  }

  timer = 60;
}

function runTimer() {
  let multiplier = null;;
  if (difficulty === 1) {multiplier = 15;} else
  if (difficulty === 2) {multiplier = 12.5;} else
  {multiplier = 10;}
  let speed = 50 + multiplier * score;
  let i = 0;

  runTimerInterval = setInterval(() => {
    if (!runGame) {
      clearInterval(runTimerInterval);
      reset(true);
    } else
    if (timer > 1) {
      timerDiv(timer).classList.add('next');
      timer--;
    } else
    {
      clearInterval(runTimerInterval);
      timerDiv(timer).classList.add('next');
      playerSelect(5);
    }
  }, speed);
}

function changeColours() {
  let colours = [red, blue, green, yellow];
  let slots = [[0, 90, 270, 180], [270, 0, 180, 90], [90, 180, 0, 270], [180, 270, 90, 0]];
  let slot = 0;
  while (slot < 4) {
    let colour = Math.floor(Math.random() * colours.length);
    colours[colour].style.transform = `rotate(${slots[colour][slot]}deg)`;
    colours.splice(colour, 1);
    slots.splice(colour, 1);

    slot++;
  }
}

function runRoutine() {
  cover.style.display = 'block';

  let multiplier = null;
  if (difficulty === 1) {multiplier = 10;} else
  if (difficulty === 2) {multiplier = 12.5;} else
  {multiplier = 15;}
  let speed = 650 - multiplier * (score - 1);
  let i = 0;

  runRoutineInterval = setInterval(() => {
    if (!runGame) {
      clearInterval(runRoutineInterval);
      reset(true);
    } else
    if (routine[i] === 1) {
      red.classList.add('highlight');
      audioRed.play();

      setTimeout(() => {
        red.classList.remove('highlight');
      }, speed - 250);
    } else
    if (routine[i] === 2) {
      blue.classList.add('highlight');
      audioBlue.play();

      setTimeout(() => {
        blue.classList.remove('highlight');
      }, speed - 250);
    } else
    if (routine[i] === 3) {
      green.classList.add('highlight');
      audioGreen.play();

      setTimeout(() => {
        green.classList.remove('highlight');
      }, speed - 250);
    } else
    if (routine[i] === 4) {
      yellow.classList.add('highlight');
      audioYellow.play();

      setTimeout(() => {
        yellow.classList.remove('highlight');
      }, speed - 250);
    } else
    {
      clearInterval(runRoutineInterval);
      cover.style.display = 'none';
      playerTurn = true;
      if (difficulty === 3) {changeColours();}

      clearTimer();
      setTimer();
      runTimer();
    }

    i++;
  }, speed);
}

function generateRoutine() {
  playerTurn = false;

  for (let i = 0; i < score; i++) {
    routine.push(Math.floor(Math.random() * 4 + 1));
  }

  runRoutine();
}

function startGame(event) {
  if (event.target.checked) {
    runGame = true;
    start.innerText = 'Quit';
    generateRoutine();
  } else
  {
    runGame = false;
    start.innerText = 'Start';
    reset(true);
  }
}

function handleClick(colour) {
  if (runGame && playerTurn) {
    if (colour === 1) {
      audioRed.play();
    } else
    if (colour === 2) {
      audioBlue.play();
    } else
    if (colour === 3) {
      audioGreen.play();
    } else
    {
      audioYellow.play();
    }

    playerSelect(colour);
  }
}

function handleKeyDown(event) {
  if (runGame && playerTurn && difficulty === 3 && (event.key === '1' ||
  event.key === '2' ||
  event.key === '3' ||
  event.key === '4'))
  {
    if (event.key === 1) {
      audioRed.play();
    } else
    if (event.key === 2) {
      audioBlue.play();
    } else
    if (event.key === 3) {
      audioGreen.play();
    } else
    {
      audioYellow.play();
    }

    playerSelect(parseInt(event.key));
  }
}

function playerSelect(colour) {
  if (colour === routine[count]) {
    count++;

    if (count === routine.length) {
      count = 0;
      playerTurn = false;
      while (routine.length) {routine.pop();}
      reset();
      addScore();
      clearInterval(runTimerInterval);
      generateRoutine();
    }
  } else
  {
    count = 0;
    audioWrong.play();
    playerTurn = false;
    clearInterval(runTimerInterval);

    if (difficulty === 1) {
      clearTimer();
      runRoutine();
    } else
    {
      reset(true);
      generateRoutine();
    }
  }
}