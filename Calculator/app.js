const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const equalButton = document.querySelector('[data-equal]');
const previousText = document.getElementById('previous-text');
const currentText = document.getElementById('current-text');
const historyText = document.getElementById('history-text');

let prevNum = '';
let currentNum = '';
resultNum = '';
let result = null;
let lastOperation = '';

//
function calculatorNumbersHandler(e) {
  let number = e.target.textContent;
  if (number === '.' && currentText.textContent.includes('.')) return;
  currentText.textContent += number;
}

//
function calculateOperationHandler(e) {
  if (currentText.textContent === '') return;
  let operationName = e.target.textContent;
  if (currentText.textContent && previousText.textContent && operationName) {
    mathOperations();
  } else {
    result = parseFloat(currentText.textContent);
  }
  clearInputs(operationName);
  lastOperation = operationName;
}

//
function clearInputs(name = '') {
  previousText.textContent += currentText.textContent + ' ' + name + ' ';
  currentText.textContent = '';
  historyText.textContent = result;
}

//
function mathOperations() {
  currentNum = parseFloat(currentText.textContent);
  resultNum = parseFloat(result);
  switch (lastOperation) {
    case '+':
      result = resultNum + currentNum;
      break;
    case '-':
      result = resultNum - currentNum;
      break;
    case '*':
      result = resultNum * currentNum;
      break;
    case '÷':
      result = resultNum / currentNum;
      break;
    default:
      return;
  }
}

//
function equalBtnHandler() {
  if (!currentText.textContent) return;
  mathOperations();
  previousText.textContent += currentText.textContent + ' ' + name + ' ';
  currentText.textContent = result;
  historyText.textContent = '';
}

//
function deleteAllDataHandler() {
  historyText.textContent = '';
  previousText.textContent = '';
  currentText.textContent = '';
}

//
function deleteLastNumHandler() {
  currentText.textContent = currentText.textContent.slice(0, -1)
}

numberButtons.forEach((button) => {
  button.addEventListener('click', calculatorNumbersHandler);
});
operationButtons.forEach((button) => {
  button.addEventListener('click', calculateOperationHandler);
});
equalButton.addEventListener('click', equalBtnHandler);

clearAllButton.addEventListener('click', deleteAllDataHandler);

deleteButton.addEventListener('click', deleteLastNumHandler)