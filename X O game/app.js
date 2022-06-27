const allBoxs = document.querySelectorAll('.boxs .box');
// const arrayFromAllBoxs = Array.from(allBoxs);
const myTitle = document.getElementById('title');
let turn = 'X';
let squares = [];

const handelGameTime = function () {
  setInterval(() => {
    myTitle.innerHTML += '.';
  }, 1000);
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};


const handelWin = function (num1, num2, num3) {
  myTitle.innerHTML = `${squares[num1]} Wins`;

  document.getElementById(`box${num1}`).style.opacity = '0.5';
  document.getElementById(`box${num2}`).style.opacity = '0.5';
  document.getElementById(`box${num3}`).style.opacity = '0.5';
};

const win = function () {
  for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById(`box${i}`).innerHTML;
  }
  if (
    squares[1] == squares[2] &&
    squares[2] == squares[3] &&
    squares[1] != ''
  ) {
    handelWin(1, 2, 3);
    handelGameTime();
  } else if (
    squares[4] == squares[5] &&
    squares[5] == squares[6] &&
    squares[4] != ''
  ) {
    handelWin(4, 5, 6);
    handelGameTime();
  } else if (
    squares[7] == squares[8] &&
    squares[8] == squares[9] &&
    squares[7] != ''
  ) {
    handelWin(7, 8, 9);
    handelGameTime();
  } else if (
    squares[1] == squares[4] &&
    squares[4] == squares[7] &&
    squares[1] != ''
  ) {
    handelWin(1, 4, 7);
    handelGameTime();
  } else if (
    squares[2] == squares[5] &&
    squares[5] == squares[8] &&
    squares[2] != ''
  ) {
    handelWin(2, 5, 8);
    handelGameTime();
  } else if (
    squares[3] == squares[6] &&
    squares[3] == squares[9] &&
    squares[3] != ''
  ) {
    handelWin(3, 6, 9);
    handelGameTime();
  } else if (
    squares[1] == squares[5] &&
    squares[5] == squares[9] &&
    squares[1] != ''
  ) {
    handelWin(1, 5, 9);
    handelGameTime();
  } else if (
    squares[3] == squares[5] &&
    squares[5] == squares[7] &&
    squares[3] != ''
  ) {
    handelWin(3, 5, 7);
    handelGameTime();
  }
};

const myGameHanbler = function () {
  let element = document.getElementById(this.id);
  if (turn === 'X' && element.innerHTML == '') {
    element.innerHTML = 'X';
    turn = 'O';
    myTitle.innerHTML = `${turn} Turn`;
  } else if (turn === 'O' && element.innerHTML == '') {
    element.innerHTML = 'O';
    turn = 'X';
    myTitle.innerHTML = `${turn} Turn`;
  }
  win();
};


allBoxs.forEach((box) => {
  box.addEventListener('click', myGameHanbler);
});
