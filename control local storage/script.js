const keyInput = document.getElementById('key-input');
const valueInput = document.getElementById('value-input');
const checkBtn = document.getElementById('check');
const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('delete');
const showBtn = document.getElementById('show');
const resultDiv = document.querySelector('.results span');

function showMessage() {
  resultDiv.innerHTML = `This Field Can't Be Empty`;
}

const checkHandler = function () {
  if (valueInput.value != '') {
    resultDiv.innerHTML = `you can't check items in your local storage by using <span> Value</span> input use <span> Key</span> input only`;
    valueInput.value = '';
  } else if (keyInput.value != '') {
    if (localStorage.getItem(keyInput.value)) {
      resultDiv.innerHTML = `we found item in your local storage with key <span>${
        keyInput.value
      }</span> and with value <span>${localStorage.getItem(
        keyInput.value,
      )}</span>`;
      keyInput.value = '';
    } else {
      resultDiv.innerHTML = `there is no item in your local storage have <span> ${keyInput.value}</span> key`;
    }
  } else {
    showMessage();
  }
};

const addHandler = function () {
  if (keyInput.value != '' && valueInput.value != '') {
    localStorage.setItem(keyInput.value, valueInput.value);
    resultDiv.innerHTML = `you added item to your local storage that key is <span> ${keyInput.value}</span> and that value is <span> ${valueInput.value}</span>`;
    keyInput.value = '';
    valueInput.value = '';
  } else if (keyInput.value != '' && valueInput.value == '') {
    resultDiv.innerHTML = `you must entred both values <span>key</span> and <span>value<span>`;
    keyInput.value = '';
  } else if (keyInput.value == '' && valueInput.value != '') {
    resultDiv.innerHTML = `you must entred both values <span>key</span> and <span>value<span>`;
    valueInput.value = '';
  } else {
    showMessage();
  }
};

const deleteHandler = function () {
  if (valueInput.value != '') {
    resultDiv.innerHTML = `you can't delete items by using <span> Value</span> input use <span> Key</span> input only`;
    valueInput.value = '';
  } else if (keyInput.value != '') {
    if (localStorage.getItem(keyInput.value)) {
      localStorage.removeItem(keyInput.value);
      resultDiv.innerHTML = `you deleted item from your local storage that key is <span> ${keyInput.value}</span>`;
      keyInput.value = '';
    } else {
      resultDiv.innerHTML = `there is no item in your local storage have <span> ${keyInput.value}</span> key`;
    }
  } else {
    showMessage();
  }
};

const showHandler = function () {
  if (localStorage.length) {
    resultDiv.innerHTML = '';
    for (let [key, value] of Object.entries(localStorage)) {
      resultDiv.innerHTML += `<p>- Key is <span>${key}</span> and Value is <span> ${value}</span><p>`;
    }
  } else {
    resultDiv.innerHTML = 'No Itmes In Local Storage';
  }
};

checkBtn.addEventListener('click', checkHandler);
addBtn.addEventListener('click', addHandler);
deleteBtn.addEventListener('click', deleteHandler);
showBtn.addEventListener('click', showHandler);
