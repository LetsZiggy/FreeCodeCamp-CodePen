// List of all winning combinations
let winCombinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

// List of possible computer icons
let comIcons = [
'camera_alt',
'blur_circular',
'brightness_7',
'details'];

// List of individual clickable board
let boardElems = [
document.getElementById('board-0'),
document.getElementById('board-1'),
document.getElementById('board-2'),
document.getElementById('board-3'),
document.getElementById('board-4'),
document.getElementById('board-5'),
document.getElementById('board-6'),
document.getElementById('board-7'),
document.getElementById('board-8')];

// List of boards played
let boardIcons = [
null, // 1, 2 for board-0
null, // 1, 2 for board-1
null, // 1, 2 for board-2
null, // 1, 2 for board-3
null, // 1, 2 for board-4
null, // 1, 2 for board-5
null, // 1, 2 for board-6
null, // 1, 2 for board-7
null // 1, 2 for board-8
];
// List of menu elements
let menuStages = [
document.getElementById('play-mode'),
document.getElementById('icon-pick-one'),
document.getElementById('icon-pick-two')];

let menuElem = document.getElementById('menu');
let gameElem = document.getElementById('game');
let turnElem = document.getElementById('turn-icon');
let winMessage = document.getElementById('win-message');
let spinner = document.getElementById('spinner');

let playMode = null; // null, 'single', 'versus'
let oneIcon = null; // null, --choice--
let twoIcon = null; // null, --choice--
let turn = 1; // 1, 2
let active = true;

function menuSelect(stage, choice) {
  // When #exit clicked
  if (stage === 'exit') {
    playMode = null;
    oneIcon = null;
    twoIcon = null;
    active = true;
    winMessage.style.display = 'none';

    // Resets menu to #play-mode
    menuStages.forEach((value, index, array) => {
      let left = 50 + 100 * index;
      value.style.left = `${left}%`;
    });

    // Shows #menu
    menuElem.style.display = 'flex';
    menuElem.classList.remove('play');
    gameElem.classList.remove('play');
    setTimeout(() => {
      gameElem.style.display = 'none';
    }, 500);

    resetBoard();
  }
  // When #win-message clicked
  else if (stage === 'restart') {
      winMessage.style.display = 'none';
      active = true;

      randomiseTurn();
      resetBoard();

      if (playMode !== 'versus' && turn === 2) {
        active = false;
        spinner.style.display = 'flex';
        setTimeout(() => {
          computersTurn();
          spinner.style.display = 'none';
          setTimeout(() => {
            active = true;
          }, 100);
        }, 250);
      }
    }
    // When #reset clicked
    else if (stage === 'reset') {
        playMode = null;
        oneIcon = null;
        twoIcon = null;

        // Resets menu to #play-mode
        menuStages.forEach((value, index, array) => {
          let left = 50 + 100 * index;
          value.style.left = `${left}%`;
        });
      }
      // When #play-mode clicked
      else if (stage === 1) {
          playMode = choice;

          // Go to Player One Icon Select
          menuStages.forEach((value, index, array) => {
            let left = -50 + 100 * index;
            value.style.left = `${left}%`;
          });
        }
        // When #icon-pick-one clicked
        else if (stage === 2) {
            oneIcon = choice;

            if (playMode === 'versus') {
              // Go to Player Two Icon Select
              menuStages.forEach((value, index, array) => {
                let left = -150 + 100 * index;
                value.style.left = `${left}%`;
              });
            } else
            {
              // Select Computer Icon
              let randomIcon = Math.floor(Math.random() * 4);
              twoIcon = comIcons[randomIcon];

              // Shows #game
              gameElem.style.display = 'grid';
              menuElem.classList.add('play');
              gameElem.classList.add('play');
              setTimeout(() => {
                menuElem.style.display = 'none';
              }, 500);

              randomiseTurn();

              // Take computer's turn if turn === 2
              if (turn === 2) {
                active = false;
                spinner.style.display = 'flex';
                setTimeout(() => {
                  computersTurn();
                  spinner.style.display = 'none';
                  setTimeout(() => {
                    active = true;
                  }, 100);
                }, 250);
              }
            }
          }
          // When #icon-pick-two clicked
          else if (stage === 3) {
              twoIcon = choice;

              // Shows #game
              gameElem.style.display = 'grid';
              menuElem.classList.add('play');
              gameElem.classList.add('play');
              setTimeout(() => {
                menuElem.style.display = 'none';
              }, 500);

              randomiseTurn();
            }
}

function gameClick(event, board) {
  if (turn === 2 && playMode !== 'versus') {
    event.preventDefault();
  }
  // If game is over
  else if (!active) {
      event.preventDefault();
    } else
    {
      // If Player One's turn
      if (turn === 1) {
        // If board is not taken
        if (boardIcons[board] === null) {
          addIcon(oneIcon, board);
          boardIcons[board] = 1;

          checkResult();

          // If game is not over
          if (active) {
            // Change turn to Player Two
            turnElem.innerText = twoIcon;
            turn = 2;

            // Let computer act if Single Player Mode
            if (playMode !== 'versus') {
              active = false;
              spinner.style.display = 'flex';
              setTimeout(() => {
                computersTurn();
                spinner.style.display = 'none';
                setTimeout(() => {
                  active = true;
                }, 100);
              }, 250);
            }
          }
        }
        // If board is taken
        else {
            boardElems[board].classList.add('warning');
            setTimeout(() => {
              boardElems[board].classList.remove('warning');
            }, 300);
            event.preventDefault();
          }
      }
      // If Player Two's turn
      else {
          // If board is not taken
          if (boardIcons[board] === null) {
            addIcon(twoIcon, board);
            boardIcons[board] = 2;

            checkResult();

            // If game is not over
            if (active) {
              // Change turn to Player One
              turnElem.innerText = oneIcon;
              turn = 1;
            }
          }
          // If board is taken
          else {
              boardElems[board].classList.add('warning');
              setTimeout(() => {
                boardElems[board].classList.remove('warning');
              }, 300);
              event.preventDefault();
            }
        }
    }
}

function randomiseTurn() {
  // Randomise turn
  turn = Math.floor(Math.random() * 2 + 1);
  if (turn === 1) {turnElem.innerText = oneIcon;} else
  {turnElem.innerText = twoIcon;}
}

function computersTurn() {
  // Computer board selection
  let currentBoard = [...boardIcons];
  let board = minimax(currentBoard, 2).index;

  addIcon(twoIcon, board);
  boardIcons[board] = 2;

  checkResult();

  // If game is not over | Cannot use active as it is used to block player's click
  if (winMessage.style.display !== 'block') {
    // Change turn to Player One
    turnElem.innerText = oneIcon;
    turn = 1;
  }
}

function checkEmptyBoards(currentBoard) {
  let emptyBoards = [];
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === null) {
      emptyBoards.push(i);
    }
  }

  return emptyBoards;
}

function minimax(currentBoard, player) {
  let emptyBoards = checkEmptyBoards(currentBoard);

  if (checkWin(currentBoard, 1).check === true) {
    return { score: -10 };
  } else
  if (checkWin(currentBoard, 2).check === true) {
    return { score: 20 };
  } else
  if (!emptyBoards.length) {
    return { score: 0 };
  }

  let moves = [];
  for (let i = 0; i < emptyBoards.length; i++) {
    let move = { index: null, score: null };
    move.index = emptyBoards[i];
    currentBoard[emptyBoards[i]] = player;

    if (player === 2) {
      let result = minimax(currentBoard, 1);
      move.score = result.score;
    } else
    {
      let result = minimax(currentBoard, 2);
      move.score = result.score;
    }

    currentBoard[emptyBoards[i]] = null;
    moves.push(move);
  }

  let bestMove = null;
  if (player === 2) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else
  {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function addIcon(type, board) {
  // Add <i> element into selected board
  let icon = document.createElement('i');
  let attr = document.createAttribute('class');
  attr.value = 'material-icons';
  icon.setAttributeNode(attr);
  let text = document.createTextNode(type);
  icon.appendChild(text);

  boardElems[board].insertBefore(icon, null);
}

function checkWin(currentBoard, currentTurn) {
  for (let i1 = 0; i1 < winCombinations.length; i1++) {
    let win = [false, false, false];

    for (let i2 = 0; i2 < winCombinations[i1].length; i2++) {
      if (currentBoard[winCombinations[i1][i2]] === currentTurn) {
        win[i2] = true;
      }
    }

    if (!win.includes(false)) {
      return { check: true, combination: i1 };
    }
  }

  return { check: false, combination: null };
}

function checkResult() {
  let win = checkWin(boardIcons, turn);

  // Win
  if (win.check) {
    active = false;
    winMessage.style.display = 'block';

    // Set message
    if (playMode !== 'versus') {
      if (turn === 1) {
        winMessage.children[0].innerText = "You've won";
        winMessage.children[1].innerText = "Click for another round";
      } else
      {
        winMessage.children[0].innerText = "You've lost";
        winMessage.children[1].innerText = "Click for another round";;
      }
    } else
    {
      if (turn === 1) {
        winMessage.children[0].innerText = "Player One won";
        winMessage.children[1].innerText = "Click for another round";
      } else
      {
        winMessage.children[0].innerText = "Player Two won";
        winMessage.children[1].innerText = "Click for another round";
      }
    }

    // Highlight winning combination
    winCombinations[win.combination].forEach(value => {
      boardElems[value].classList.add('winning-combination');
    });
  }

  // Draw | Cannot use active as it is used to block player's click
  if (winMessage.style.display !== 'block' && !boardIcons.includes(null)) {
    active = false;
    winMessage.style.display = 'block';
    winMessage.children[0].innerText = "It's a draw";
    winMessage.children[1].innerText = "Click for another round";
  }
}

function resetBoard() {
  boardElems.forEach((value, index, array) => {
    while (boardElems[index].children[0]) {
      boardElems[index].removeChild(boardElems[index].children[0]);
    }

    // Remove winning-combination class
    boardElems[index].classList.remove('winning-combination');
  });

  boardIcons.forEach((value, index, array) => {
    boardIcons[index] = null;
  });
}