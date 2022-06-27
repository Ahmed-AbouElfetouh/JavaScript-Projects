const theLetters = 'abcdefghijklmnopqrstuvwxyz';
const arrayOfLetters = Array.from(theLetters);
const lettersContainer = document.getElementById('letters');

arrayOfLetters.forEach((letter) => {
  lettersContainer.innerHTML += `
    <span class="letter-box">${letter}</span>
  `;
});

const data = {
  programming: [
    'php',
    'javascript',
    'go',
    'scala',
    'fortran',
    'r',
    'mysql',
    'python',
  ],
  movies: [
    'Prestige',
    'Inception',
    'Parasite',
    'Interstellar',
    'Whiplash',
    'Memento',
    'Coco',
    'Up',
  ],
  people: [
    'Albert Einstein',
    'Hitchcock',
    'Alexander',
    'Cleopatra',
    'Mahatma Ghandi',
  ],
  countries: ['Syria', 'Palestine', 'Yemen', 'Egypt', 'Bahrain', 'Qatar'],
};

const keysOfData = Object.keys(data);
const randomNumbeFromKeys = Math.floor(Math.random() * keysOfData.length);
const randomValueFromKeys = keysOfData[randomNumbeFromKeys];

const propValues = data[randomValueFromKeys];
const randomNumberFromProp = Math.floor(Math.random() * propValues.length);
const randomValueFromProp = propValues[randomNumberFromProp].toLowerCase();

const theWord = document.getElementById('word');
theWord.innerHTML = randomValueFromKeys;

const arrayFromRandomValue = Array.from(randomValueFromProp);
console.log(arrayFromRandomValue);
const lettersGuessContainer = document.getElementById('letters-guess');

arrayFromRandomValue.forEach((letter) => {
  let emptySpan = document.createElement('span');
  if (letter === ' ') {
    emptySpan.className = 'has-space';
  }
  lettersGuessContainer.append(emptySpan);
});

const lettersGuessSpans = document.querySelectorAll('#letters-guess span');
const arrayOfLettersGuessSpans = Array.from(lettersGuessSpans);
const theDraw = document.getElementById('hangman-draw');
let wrongTries = 0;
let emptyArray = [];

lettersContainer.addEventListener('click', function (e) {
  let status = false;
  if (e.target.className === 'letter-box') {
    e.target.classList.add('clicked');
  }
  let clickedLetter = e.target.innerHTML.toLowerCase();
  arrayFromRandomValue.forEach((letter, letterIndex) => {
    if (clickedLetter === letter.toLowerCase()) {
      status = true;
      lettersGuessSpans.forEach((span, index) => {
        if (index === letterIndex) {
          span.innerHTML = clickedLetter;
        }
      });
    }
  });
  if (status !== true) {
    wrongTries++;
    theDraw.classList.add(`wrong-${wrongTries}`);
    document.getElementById('fail').play();
    if (wrongTries === 8) {
      lose();
      lettersContainer.classList.add('finish');
    }
  } else {
    document.getElementById('success').play();
    emptyArray.push(clickedLetter);
    let filtredArray = arrayFromRandomValue.filter((element, index) => {
      return arrayFromRandomValue.indexOf(element.toLowerCase()) === index;
    });
    if (emptyArray.length == filtredArray.length) {
      lettersContainer.classList.add('finish');
      win()
    }
  }
});

function lose() {
  document.body.innerHTML = `
    <div class="popup">
    Game Over, The Word Is ${randomValueFromProp}
    </div>
  `;
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

function win() {
  document.body.innerHTML = `
    <div class="win">
    You Win, Congratulation .. 
    Your Wrong Tries is ${wrongTries}
    </div>
  `;
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}