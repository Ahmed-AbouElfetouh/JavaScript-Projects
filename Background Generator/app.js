const selectColorOne = document.getElementById('color-1');
const selectColorTwo = document.getElementById('color-2');
const outputMesssage = document.getElementById('output-message');

function changeBackgroundColor() {
  document.body.style.background = `linear-gradient(to right, ${selectColorOne.value}, ${selectColorTwo.value})`;
  outputMesssage.textContent = document.body.style.background;
}

selectColorOne.addEventListener('input', changeBackgroundColor);
selectColorTwo.addEventListener('input', changeBackgroundColor);
