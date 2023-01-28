const select       = document.getElementById('select');
const userInput    = document.getElementById('user-input');
const userOutput   = document.getElementById('user-output');
const blinking     = document.getElementById('blinking');

// To allow user to use keyboard
// from the start without having
// to click on the screen first
select.focus();
select.blur();

let inputList      = [];
let current        = 0;
let dot            = false;
let fraction       = 10;
let input          = '';
let output         = '';

document.onkeydown = handleKeyDown;

function handleKeyDown(event) {
  let key = event.key;
  switch(event.key) {
    case 'i':
    case 'I':
      key = 'MC';
      break;
    case 'o':
    case 'O':
      key = 'M-';
      break;
    case 'p':
    case 'P':
      key = 'M+';
      break;
    case '[':
    case '{':
      key = 'MS';
      break;
    case ']':
    case '}':
      key = 'MR';
      break;
    case 'a':
    case 'A':
      key = null;
      select.selectedIndex = 1;
      break;
    case 'b':
    case 'B':
      key = null;
      select.selectedIndex = 2;
      break;
    case 'c':
    case 'C':
      key = null;
      select.selectedIndex = 3;
      break;
    case 'd':
    case 'D':
      key = null;
      select.selectedIndex = 4;
      break;
    case 'e':
    case 'E':
      key = null;
      select.selectedIndex = 5;
      break;
    case '.':
      key = '.';
      break;
    case '0':
      key = 0;
      break;
    case '1':
      key = 1;
      break;
    case '2':
      key = 2;
      break;
    case '3':
      key = 3;
      break;
    case '4':
      key = 4;
      break;
    case '5':
      key = 5;
      break;
    case '6':
      key = 6;
      break;
    case '7':
      key = 7;
      break;
    case '8':
      key = 8;
      break;
    case '9':
      key = 9;
      break;
    case 'Delete':
    case 'Backspace':
      key = 'Clear';
      break;
    case 'Enter':
    case '=':
      key = '=';
      break;
    case '\\':
    case '/':
      key = '/';
      break;
    case '*':
      key = '*';
      break;
    case '-':
      key = '-';
      break;
    case '+':
      key = '+';
      break;
    default:
      key = null;
      break;
  }

  if(key !== null) {
    switchFunction(key);
  }
}

function handleMouseDown(input) {
  switchFunction(input);
}

// Refactored to its own function for mousedown event and keydown event
function switchFunction(input) {
  switch(input) {
    case 'MC': // Clear Memory
      if(select.selectedIndex !== 0) {
        let label = select[select.selectedIndex].label.split('');
        while(label.length > 3) { label.pop(); }
        label = label.join('');
        label = `${label} 0`;
        select[select.selectedIndex].label = label;
        select[select.selectedIndex].value = 0;
      }
      break;

    case 'MS': // Store Memory
      if(output !== '0' && output !== '' && select.selectedIndex !== 0) {
        let label = select[select.selectedIndex].label.split('');
        while(label.length > 3) { label.pop(); }
        label = label.join('');
        label = `${label} ${output}`;
        select[select.selectedIndex].label = label;
        select[select.selectedIndex].value = parseFloat(output);
      }
      break;

    case 'MR': // Recall Memory
      if(select.selectedIndex !== 0) {
        current = parseFloat(select[select.selectedIndex].value);
        updateInputDisplay(` ${current.toString()}`);
        blinking.classList.add('blinking');
      }
      break;

    case 'M+': // Add to Memory
      if(output !== '0' && output !== '' && select.selectedIndex !== 0) {
        let optionVal = parseFloat(select[select.selectedIndex].value);
        let label = select[select.selectedIndex].label.split('');
        while(label.length > 3) { label.pop(); }
        label = label.join('');
        optionVal = optionVal + parseFloat(output);
        label = `${label} ${optionVal.toString()}`;
        select[select.selectedIndex].label = label;
        select[select.selectedIndex].value = optionVal;
      }
      break;

    case 'M-': // Subtract from Memory
      if(output !== '0' && output !== '' && select.selectedIndex !== 0) {
        let optionVal = parseFloat(select[select.selectedIndex].value);
        let label = select[select.selectedIndex].label.split('');
        while(label.length > 3) { label.pop(); }
        label = label.join('');
        optionVal = optionVal - parseFloat(output);
        label = `${label} ${optionVal.toString()}`;
        select[select.selectedIndex].label = label;
        select[select.selectedIndex].value = optionVal;
      }
      break;

    case 'Clear':
      if(current !== 0) {
        reset();
      }
      else {
        inputList.pop();
      }

      if(['/', '*', '-', '+'].includes(inputList[inputList.length-1])) {
        updateInputDisplay(' ');
      }
      else {
        updateInputDisplay('');
      }

      blinking.classList.add('blinking');
      break;

    case '=':
      if(['-', '+'].includes(inputList[inputList.length - 1]) && current === 0) {
        updateInputDisplay(' 0');
        inputList.push(0);
      }
      else if(['/', '*'].includes(inputList[inputList.length - 1]) && current === 0) {
        updateInputDisplay(' 1');
        inputList.push(1);
      }
      else {
        inputList.push(current);
      }

      calculate();
      updateInputDisplay('');
      updateOutputDisplay();
      blinking.classList.remove('blinking');

      reset();
      while(inputList.length) { inputList.pop(); }
      break;

    case '/':
    case '*':
    case '-':
    case '+':
      if(current !== 0) {
        inputList.push(current);
        inputList.push(input);
      }
      else {
        if(['/', '*', '-', '+'].includes(inputList[inputList.length-1])) {
          inputList.pop();
          inputList.push(input);
        }
        else if(inputList.length) {
          inputList.push(input);
        }
      }

      reset();
      updateInputDisplay(' ');
      blinking.classList.add('blinking');
      break;

    case '.':
      dot = true;

      updateInputDisplay(` ${current.toString()}.`);
      blinking.classList.add('blinking');
      break;

    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
      if(!['/', '*', '-', '+'].includes(inputList[inputList.length - 1])
         && current === 0
         && inputList.length) {
        current = inputList.pop();
        isFloat();
      }

      if(dot) {
        input    /= fraction;
        current  += input;
        fraction *= 10;
      }
      else {
        current  *= 10;
        current  += input;
      }

      updateInputDisplay(` ${current.toString()}`);
      blinking.classList.add('blinking');
      break;
  }
}

// Get the result from inputList and apply BODMAS
function calculate() {
  let index    = null;
  let listCopy = inputList.slice(0);
  let arr      = [];
  let result   = null;

  // Check for '/' and '*'
  for(let i = 0; i < listCopy.length; i++) {
    if(listCopy[i] === '/') {
      index  = i - 1;
      arr    = listCopy.splice(index, 3);
      // result = arr[0] / arr[2];
      result = Math.abs(arr[0] / arr[2]);
      listCopy.splice(index, 0, result);
      i      = index;
    }
    else if(listCopy[i] === '*') {
      index  = i - 1;
      arr    = listCopy.splice(index, 3);
      // result = arr[0] * arr[2];
      result = Math.abs(arr[0] * arr[2]);
      listCopy.splice(index, 0, result);
      i      = index;
    }
  }

  // Check for '-' and '+'
  for(let i = 0; i < listCopy.length; i++) {
    if(listCopy[i] === '-') {
      index  = i - 1;
      arr    = listCopy.splice(index, 3);
      // result = arr[0] - arr[2];
      result = Math.abs(arr[0] - arr[2]);
      listCopy.splice(index, 0, result);
      i      = index;
    }
    else if(listCopy[i] === '+') {
      index  = i - 1;
      arr    = listCopy.splice(index, 3);
      // result = arr[0] + arr[2];
      result = Math.abs(arr[0] + arr[2]);
      listCopy.splice(index, 0, result);
      i      = index;
    }
  }

  output = listCopy[0];
  output = output.toString();
}

// Reset current, dot and fraction multiplier after ['/', '*', '-', '+', '=']
function reset() {
  current  = 0;
  dot      = false;
  fraction = 10;
}

// Check if previous number is a float and get the fraction multiplier
function isFloat() {
  if(current % 1 !== 0) {
    let str   = current.toString().split('');
    let arr   = [];
    let toAdd = false;

    for(let i = 0; i < str.length; i++) {
      if(toAdd) {
        arr.push(str[i]);
      }

      if(str[i] === '.') {
        toAdd = true;
      }
    }

    dot      = true;
    fraction = 10 ** (arr.length + 1);
  }
}

function updateInputDisplay(end) {
  let str = inputList.join(' ');
  input = `${str}${end}`;

  userInput.textContent = input;
}

function updateOutputDisplay() {
  userOutput.textContent = output;
}

// function round() {
//   // http://www.jacklmoore.com/notes/rounding-in-javascript/
//   Number(Math.round(current + 'e' + decimals) + 'e-' + decimals);
// }