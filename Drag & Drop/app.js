const theBtn = document.getElementById('btn');
const theInput = document.getElementById('the-input');
const boxs = document.querySelectorAll('.box');
let dragContent = null;
theBtn.onclick = function () {
  if (theInput.value !== '') {
    boxs[0].innerHTML += `
    <p class="item" draggable="true">${theInput.value}</p>
    `;
    theInput.value = '';
  }
  dragAndDropItems();
};

function dragAndDropItems() {
  let items = document.querySelectorAll('.item');
  items.forEach((item) => {
    item.addEventListener('dragstart', () => {
      dragContent = item;
      item.style.opacity = '0.5';
    });
    item.addEventListener('dragend', () => {
      dragContent = null;
      item.style.opacity = '1';
    });
    boxs.forEach((box) => {
      box.addEventListener('dragover', (e) => {
        e.preventDefault();
        box.style.backgroundColor = '#090';
        box.style.color = '#fff';
      });
      box.addEventListener('dragleave', () => {
        box.style.backgroundColor = '#fff';
        box.style.color = '#000';
      });
      box.addEventListener('drop', () => {
        box.append(dragContent);
        box.style.backgroundColor = '#fff';
        box.style.color = '#000';
      });
    });
  });
}
