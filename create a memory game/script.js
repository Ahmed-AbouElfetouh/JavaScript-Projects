const gameBlocksData = [
  {
    imgSrc: 'pics/angel.png',
    data: 'angel',
  },
  {
    imgSrc: 'pics/angel.png',
    data: 'angel',
  },
  {
    imgSrc: 'pics/angery.png',
    data: 'angery',
  },
  {
    imgSrc: 'pics/angery.png',
    data: 'angery',
  },
  {
    imgSrc: 'pics/crazy.png',
    data: 'crazy',
  },
  {
    imgSrc: 'pics/crazy.png',
    data: 'crazy',
  },
  {
    imgSrc: 'pics/devil.png',
    data: 'devil',
  },
  {
    imgSrc: 'pics/devil.png',
    data: 'devil',
  },
  {
    imgSrc: 'pics/glasses.png',
    data: 'glasses',
  },
  {
    imgSrc: 'pics/glasses.png',
    data: 'glasses',
  },
  {
    imgSrc: 'pics/laugh.png',
    data: 'laugh',
  },
  {
    imgSrc: 'pics/laugh.png',
    data: 'laugh',
  },
  {
    imgSrc: 'pics/love.png',
    data: 'love',
  },
  {
    imgSrc: 'pics/love.png',
    data: 'love',
  },
  {
    imgSrc: 'pics/sad.png',
    data: 'sad',
  },
  {
    imgSrc: 'pics/sad.png',
    data: 'sad',
  },
  {
    imgSrc: 'pics/shy.png',
    data: 'shy',
  },
  {
    imgSrc: 'pics/shy.png',
    data: 'shy',
  },
  {
    imgSrc: 'pics/sleep.png',
    data: 'sleep',
  },
  {
    imgSrc: 'pics/sleep.png',
    data: 'sleep',
  },
];

const createBlocksBtn = document.getElementById('create-blocks');
const numberOfBlocks = document.getElementById('blocks-number');
const blocksContainer = document.getElementById('memory-game-blocks');
const countDownDiv = document.getElementById('count-down');
const startGameBtn = document.getElementById('start-game');
const playerName = document.getElementById('user-name');
const controlDiv = document.querySelector('.control-buttons');
let seconds = 300;
let duration = 1000;
let allBlocks;

function startGameHandler() {
  let userName = prompt('What is your name?');
  if (userName == '' || userName == null) {
    playerName.innerHTML = 'Unknowen';
  } else {
    playerName.innerHTML = userName;
  }
  controlDiv.remove();
}

startGameBtn.addEventListener('click', startGameHandler);

function gameCountDown() {
  setInterval(() => {
    let minutes = Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    countDownDiv.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${
      remSeconds < 10 ? '0' + remSeconds : remSeconds
    }`;
    if (seconds > 0) {
      seconds -= 1;
    } else {
      countDownDiv.innerHTML = `Game Over`;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, 1000);
}

function gameBlocksHandler(e) {
  e.preventDefault();
  let number = +numberOfBlocks.value;
  let blocks = '';
  if (+numberOfBlocks.value > 20 || +numberOfBlocks.value % 2 !== 0) {
    alert(`Max number you can enter is 20,
  you can enter numbers like (2-4-6-8-10 : 20) `);
  } else {
    for (let i = 0; i < number; i++) {
      blocks += `
        <div class="game-block" data-emoji="${gameBlocksData[i].data}">
          <div class="face front"></div>
          <div class="face back">
              <img src="${gameBlocksData[i].imgSrc}" alt="">
          </div>
        </div>
      `;
    }
  }

  blocksContainer.innerHTML = blocks;
  gameCountDown();
  if (blocksContainer.children.length > 1) {
    let gameBlocks = Array.from(blocksContainer.children);
    allBlocks = gameBlocks;
    let orderRange = Array.from(Array(gameBlocks.length).keys());
    shuffelArray(orderRange);
    gameBlocks.forEach((block, index) => {
      block.style.order = orderRange[index];
      block.addEventListener('click', blocksFlippHandler)
    });
  }
}

function shuffelArray(array) {
  let current = array.length;
  let random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }
  return array
}

function blocksFlippHandler() {
  this.classList.add('is-flipped');
  let filtredBlocks = allBlocks.filter((block) => block.classList.contains('is-flipped'));
  if(filtredBlocks.length === 2) {
    noClicking();
    matchedBlocks(filtredBlocks[0], filtredBlocks[1])
  }
  
}

function noClicking() {
  blocksContainer.classList.add('no-clicking');

  setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');
  }, duration)
}

function matchedBlocks(firstBlock, secondBlock) {
  if(firstBlock.dataset.emoji ===  secondBlock.dataset.emoji) {
    firstBlock.classList.remove('is-flipped')
    secondBlock.classList.remove('is-flipped')

    firstBlock.classList.add('has-match')
    secondBlock.classList.add('has-match')

    document.getElementById('success').play()
  } else {
    document.getElementById('wrong').innerHTML = +document.getElementById('wrong').innerHTML + 1;
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped')
      secondBlock.classList.remove('is-flipped')
    }, duration)
  }
  document.getElementById('fail').play()
}

createBlocksBtn.addEventListener('click', gameBlocksHandler);
