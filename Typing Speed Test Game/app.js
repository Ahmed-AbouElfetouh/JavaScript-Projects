const easyWords = [
  'Code',
  'Test',
  'Rust',
  'Task',
  'Town',
  'Hello',
  'Github',
  'Roles',
  'Coding',
  'Funny',
];
const mediumWords = [
  'Country',
  'Testing',
  'Youtube',
  'Linkedin',
  'Twitter',
  'Paradigm',
  'Styling',
  'Cascade',
  'Leetcode',
  'Internet',
  'Working',
  'Playing',
  'Runner',
  'Python',
  'Scala',
];
const hardWords = [
  'Dependencies',
  'Documentation',
  'Destructuring',
  'Programming',
  'Javascript',
];

const gameLevels = {
  easy: 7,
  medium: 5,
  hard: 3,
};

const difficultySelection = document.getElementById('difficulty');
let theLevel;
let theTime;
let levelText = document.getElementById('lvl');
let timeText = document.getElementById('seconds');
let messageContainer = document.getElementById('message');
const theInput = document.getElementById('my-input');
const startGameBtn = document.getElementById('start-btn');
const theWord = document.getElementById('the-word');
const upComingWords = document.getElementById('upcoming-words');
const timeCount = document.getElementById('time');
const gotScore = document.getElementById('got');
const totalScore = document.getElementById('total');
const levelsContainer = document.getElementById('levels');
const infoContainer = document.getElementById('info');

let globalRandomWord;

let scoreArray = [];
if (localStorage.getItem("theScore")) {
  scoreArray = JSON.parse(localStorage.getItem("theScore"))
}

getScoreFromLocalStorage();

gameInformation();

theInput.onpaste = function () {
  return false;
};

function gameDifficultyHandler() {
  if (difficultySelection.value === '') {
    messageContainer.style.display = 'none';
    startGameBtn.style.display = 'block';
  } else {
    theLevel = this.value;
    theTime = gameLevels[this.value];
    levelText.innerHTML = theLevel;
    timeText.innerHTML = theTime;
    messageContainer.style.display = 'block';
  }
}

function gameStartHandler() {
  if (difficultySelection.value !== '') {
    theInput.focus();
    startGameBtn.style.display = 'none';
    if (difficultySelection.value === 'easy') {
      genWordsFrom(easyWords);
      startPlay(easyWords);
      totalScore.innerHTML = easyWords.length;
    } else if (difficultySelection.value === 'medium') {
      genWordsFrom(mediumWords);
      startPlay(mediumWords);
      totalScore.innerHTML = mediumWords.length;
    } else if (difficultySelection.value === 'hard') {
      genWordsFrom(hardWords);
      startPlay(hardWords);
      totalScore.innerHTML = hardWords.length;
    }
    reloadGame();
  } else {
    alert(`You Must Choose Game Difficulty First...`);
  }
}

function genWordsFrom(array) {
  let randomWord = array[Math.floor(Math.random() * array.length)];
  theWord.innerHTML = randomWord;
  globalRandomWord = theWord.innerHTML;
  let wordIndex = array.indexOf(randomWord);
  array.splice(wordIndex, 1);
  upComingWords.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    upComingWords.innerHTML += `
    <div>
        ${array[i]}
      </div>
    `;
  }
}

function startPlay(array) {
  let emptyArray = [];
  emptyArray.push(globalRandomWord);
  for (let i = 0; i < emptyArray.length; i++) {
    if (emptyArray.indexOf(emptyArray[i]) === 0) {
      timeCount.innerHTML = theTime + 3;
    }
  }
  countDown(array);
}

function getValuesFrom(array) {
  timeCount.innerHTML = theTime;
  countDown(array);
}

function countDown(array) {
  let start = setInterval(() => {
    timeCount.innerHTML--;
    if (timeCount.innerHTML === '0') {
      clearInterval(start);
      if (theInput.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        theInput.value = '';
        theInput.focus();
        gotScore.innerHTML++;
        const theScore = {
          id: new Date(),
          score: gotScore.innerHTML,
        };
        scoreArray.push(theScore);
        saveScoreAtLocalStorage(scoreArray);
        if (array.length > 0) {
          genWordsFrom(array);
          getValuesFrom(array);
        } else {
          win();
        }
      } else {
        lose();
      }
    }
  }, 1000);
}

function saveScoreAtLocalStorage(scoreData) {
  localStorage.setItem('theScore', JSON.stringify(scoreData));
}

function getScoreFromLocalStorage() {
  localStorage.getItem("theScore");
}

function lose() {
  document.body.innerHTML = `
    <div class="lose">
      Game Over
    </div>
    `;
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

function win() {
  document.body.innerHTML = `
    <div class="win">
      Congratulation
    </div>
    `;
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

function reloadGame() {
  difficultySelection.style.display = 'none';
  levelsContainer.innerHTML = `
    <button class="reload" onclick="reload()">Reload Game</button>
  `;
}

function reload() {
  window.location.reload();
}

function gameInformation() {
  infoContainer.innerHTML = `
  <h3>Game Information</h3>
  <ul>
    <li>This Game Contains <span>${
      Object.keys(gameLevels).length
    }</span> Levels Of Difficulty</li>
    <li>Easy Level Has <span>${easyWords.length}</span> Words</li>
    <li>Medium Level Has <span>${mediumWords.length}</span> Words</li>
    <li>Hard Level Has <span>${hardWords.length}</span> Words</li>
    <li>In Easy Level You Will Have <span>${
      gameLevels.easy + 3
    }</span> Seconds For First Word after that you will have <span>${
    gameLevels.easy
  }</span> Seconds</li>
    <li>In Medium Level You Will Have <span>${
      gameLevels.medium + 3
    }</span> Seconds For First Word after that you will have <span>${
    gameLevels.medium
  }</span> Seconds</li>
    <li>In Hard Level You Will Have <span>${
      gameLevels.hard + 3
    }</span> Seconds For First Word after that you will have <span>${
    gameLevels.hard
  }</span> Seconds</li>
  </ul>
  `;
}

startGameBtn.addEventListener('click', gameStartHandler);
difficultySelection.addEventListener('change', gameDifficultyHandler);
