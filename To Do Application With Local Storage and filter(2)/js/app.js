const theChekbox = document.getElementById('checkbox');
const appLabels = document.querySelectorAll('.app .special form label');
const appHeads = document.querySelectorAll('.app .special h2');
const appInputs = document.querySelectorAll('.app .special .my-input');
const inputOfTasks = document.getElementById('new-task');
const addTasksBtn = document.getElementById('add-task');
const allTasksContainer = document.getElementById('all-tasks');
const deleteAllTasksBtn = document.getElementById('delete-all');
const appPopup = document.getElementById('app-popup');
const theApp = document.getElementById('app');
const searchInput = document.getElementById('filter-tasks');

let arrayOfTasks = [];

if (localStorage.getItem('allTasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('allTasks'));
}

//
getDataFromLocalStorage();

// Change Color To Dark
function changeTheme() {
  document.body.classList.toggle('dark-theme');
  appLabels.forEach((label) => {
    label.classList.toggle('light-color');
  });
  appHeads.forEach((head) => {
    head.classList.toggle('light-color');
  });
  appInputs.forEach((input) => {
    input.classList.toggle('light-color');
  });
}

//
function appHandler(e) {
  e.preventDefault();
  if (inputOfTasks.value === '') {
    return;
  } else {
    addTasksToArray(inputOfTasks.value);
    inputOfTasks.value = '';
  }
}

//
function addTasksToArray(tasks) {
  const task = {
    id: Date.now(),
    title: tasks.toLowerCase(),
    completed: false,
  };
  arrayOfTasks.push(task);
  addTasksToPage(arrayOfTasks);
  saveTasksAtLocalStorage(arrayOfTasks);
  console.log(arrayOfTasks);
}

//
function addTasksToPage(tasks) {
  let theTask = tasks.map((task) => {
    return `
    <div class= "task" data-id="${task.id}">
      <p class="${task.completed ? 'finish test' : 'test'}">${task.title}</p>
      <span class="wrong-mark" id="wrong-mark">x</span>
    </div>
    `;
  });
  allTasksContainer.innerHTML = theTask;
}

//
function saveTasksAtLocalStorage(tasks) {
  localStorage.setItem('allTasks', JSON.stringify(tasks));
}

//
function getDataFromLocalStorage() {
  let data = localStorage.getItem('allTasks');
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

//
function deleteAndFinshHandler(e) {
  if (e.target.classList.contains('wrong-mark')) {
    deleteTasksFromLocalStorage(e.target.parentElement.getAttribute('data-id'));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains('test')) {
    toggleStatusInLocalStorage(e.target.parentElement.getAttribute('data-id'));
    e.target.classList.toggle('finish');
  }
}

//
function deleteTasksFromLocalStorage(taskID) {
  arrayOfTasks = arrayOfTasks.filter((task) => {
    return task.id != taskID;
  });
  saveTasksAtLocalStorage(arrayOfTasks);
}

//
function toggleStatusInLocalStorage(taskID) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskID) {
      arrayOfTasks[i].completed == true
        ? (arrayOfTasks[i].completed = false)
        : (arrayOfTasks[i].completed = true);

      saveTasksAtLocalStorage(arrayOfTasks);
    }
  }
}

//
function deleteAllTasksHandler(e) {
  e.preventDefault();
  appPopup.classList.add('down');
  theApp.classList.add('disabled');
  popupHandler(e);
}

//
function popupHandler(e) {
  if (e.target.classList.contains('yes')) {
    arrayOfTasks = [];
    localStorage.removeItem('allTasks');
    allTasksContainer.innerHTML = '';
    appPopup.classList.remove('down');
    theApp.classList.remove('disabled');
  } else if (e.target.classList.contains('no')) {
    appPopup.classList.remove('down');
    theApp.classList.remove('disabled');
  }
}

//
function searchInTasksHandler() {
  let task = '';
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].title.includes(this.value.toLowerCase())) {
      task += `
      <div class="task" data-id="${arrayOfTasks[i].id}">
        <p class="${arrayOfTasks[i].completed ? 'test finish' : 'test'}" >${
        arrayOfTasks[i].title
      }</p>
        <span class="wrong-mark" id="wrong-mark">x</span>
      </div>
      `;
    }
  }
  allTasksContainer.innerHTML = task;
}

addTasksBtn.addEventListener('click', appHandler);
allTasksContainer.addEventListener('click', deleteAndFinshHandler);
theChekbox.addEventListener('change', changeTheme);
deleteAllTasksBtn.addEventListener('click', deleteAllTasksHandler);
appPopup.addEventListener('click', popupHandler);
searchInput.addEventListener('keyup', searchInTasksHandler);
