const yourInput = document.getElementById('input-number');
const guessBtn = document.getElementById('guess-btn');
const outputMsg = document.getElementById('output-message');

let wrongTries = 3;
let gameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let randomNumber = Math.floor(Math.random() * gameNumbers.length);

function guessAppHandler(e) {
  e.preventDefault();
  if (yourInput.value === '') {
    emptyInput();
  } else if (parseInt(yourInput.value) === randomNumber) {
    winStatus();
  } else if (parseInt(yourInput.value) !== randomNumber) {
    loseStatus();
  }
}

function emptyInput() {
  outputMsg.textContent = 'Please enter a number between 1 and 10';
  outputMsg.classList.add('wrong');
}

function winStatus() {
  outputMsg.textContent = `${randomNumber} was the correct number! YOU WIN`;
  if (outputMsg.classList.contains('wrong')) {
    outputMsg.classList.remove('wrong');
  }
  outputMsg.classList.add('correct');
  playAgain();
}

function loseStatus() {
  outputMsg.textContent = `${yourInput.value} is wrong. You have ${wrongTries} guesses left. Try again!`;
  wrongTries--;
  yourInput.value = '';
  outputMsg.classList.add('wrong');
  yourInput.onfocus = function () {
    outputMsg.textContent = '';
  };
  if (wrongTries < 0) {
    outputMsg.textContent = `Game Over. YOU LOSE! The correct number was ${randomNumber}`;
    yourInput.classList.add('disabled');
    playAgain();
  }
}

function playAgain() {
  guessBtn.value = 'Play Again';
  yourInput.style.pointerEvents = "none"
  guessBtn.onclick = function () {
    outputMsg.textContent = '';
    window.location.reload();
  };
}
guessBtn.addEventListener('click', guessAppHandler);
