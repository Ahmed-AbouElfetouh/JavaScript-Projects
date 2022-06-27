// Select Elements
const numberOfQuestions = document.getElementById('number-of-questions');
const bulletsContainer = document.getElementById('bullets-container');
const appQuestions = document.getElementById('app-questions');
const appAnswers = document.getElementById('app-answers');
const submitBtn = document.getElementById('submit-btn');
const appControls = document.getElementById('controls');
const appCountDown = document.getElementById('count-down');
const resultsContainer = document.getElementById('results');

// set app options
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;

// get data from JSON File
async function getData() {
  let request = await fetch('./quizData.json');
  let data = await request.json();
  let qCount = data.length;

  createBullets(qCount);
  addQuestionsToUI(data[currentIndex], qCount);
  countDown(65, qCount);
  submitBtn.onclick = function () {
    let theRightAnswer = data[currentIndex].right_answer;
    currentIndex++;
    checkAnswer(theRightAnswer, qCount);
    appQuestions.innerHTML = '';
    appAnswers.innerHTML = '';
    addQuestionsToUI(data[currentIndex], qCount);
    handleBulletsClass();
    clearInterval(countDownInterval);
    countDown(65, qCount);
    showResults(qCount);
  };
}
getData();

// Set number of questions + Create Bullets
function createBullets(number) {
  numberOfQuestions.innerHTML = number;
  for (let i = 0; i < number; i++) {
    bulletsContainer.innerHTML += `
      <li class = "${i === 0 ? 'active' : ''}"></li>
    `;
  }
}

//
function addQuestionsToUI(object, number) {
  if (currentIndex < number) {
    let qTitle = document.createElement('h2');
    let qTitleText = document.createTextNode(object.title);
    qTitle.append(qTitleText);
    appQuestions.append(qTitle);

    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement('div');
      mainDiv.className = 'answer';

      let radioInput = document.createElement('input');
      radioInput.name = 'question';
      radioInput.type = 'radio';
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = object[`answer_${i}`];

      if (i === 1) {
        radioInput.checked = true;
      }

      let theLabel = document.createElement('label');
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(object[`answer_${i}`]);
      theLabel.appendChild(theLabelText);

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      appAnswers.appendChild(mainDiv);
    }
  }
}

//
function checkAnswer(rAnswer, number) {
  let answers = document.getElementsByName('question');
  let theCheckedAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theCheckedAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theCheckedAnswer) {
    rightAnswers++;
  }
}

//
function handleBulletsClass() {
  let bulletsLI = document.querySelectorAll('#bullets-container li');
  bulletsLI.forEach((bullet, index) => {
    if (currentIndex === index) {
      bullet.className = 'active';
    }
  });
}

//
function showResults(number) {
  let theResults;
  if (currentIndex === number) {
    appAnswers.remove();
    appQuestions.remove();
    submitBtn.remove();
    appControls.remove();

    if (rightAnswers > number / 2 && rightAnswers < number) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${number}`;
    } else if (rightAnswers === number) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Correct`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${number}`;
    }
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = theResults;
  }
}

//
function countDown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countDownInterval = setInterval(() => {
      minutes = Math.floor(duration / 60);
      seconds = duration % 60;
      appCountDown.innerHTML = `
        <span class="minutes">${
          minutes < 10 ? `0${minutes}` : minutes
        }</span> : <span class="seconds">${
        seconds < 10 ? `0${seconds}` : seconds
      }</span>
      `;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitBtn.click();
      }
    }, 1000);
  }
}
