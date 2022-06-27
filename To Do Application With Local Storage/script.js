const addBtn = document.getElementById('add-btn');
const theInput = document.getElementById('my-input');
const tasksContainer = document.getElementById('tasks-content');
const allTasksNumber = document.querySelector('.tasks-count span');
const finshedTasksNumber = document.querySelector('.tasks-completed span');
const noMessageDiv = document.getElementById('no-tasks');
const deleteAllBtn = document.getElementById('delete-all');
const completeAllBtn = document.getElementById('complete-all');

let arrayOfTasks = [];

if (localStorage.getItem('allTasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('allTasks'));
}

getDataFromLocalStorage();

window.onload = function () {
  theInput.focus();
};

const myAppHandler = function () {
  if (theInput.value == '') {
    swal("Sorry that field can't be empty!");
  } else {
    addTasksToArray(theInput.value);
    noMessageDiv.remove();

    theInput.value = '';
    theInput.focus();
  }
};

const addTasksToArray = function (tasks) {
  const task = {
    title: tasks,
    id: Date.now(),
    completed: false,
  };
  arrayOfTasks.push(task);
  addTasksToPage(arrayOfTasks);
  saveTasksAtLocalStorage(arrayOfTasks);
};

function addTasksToPage(tasks) {
  let theTasks = tasks.map((task) => {
    return `
        <span class="${
          task.completed ? 'task-box finish' : 'task-box'
        }" data-id="${task.id}">
            ${task.title}
            <span class="delete">Delete</span>
        </span>
        `;
  });
  tasksContainer.innerHTML = theTasks;
  countCompleteAndFinsh();
}

const saveTasksAtLocalStorage = function (tasks) {
  localStorage.setItem('allTasks', JSON.stringify(tasks));
};

function getDataFromLocalStorage() {
  let data = localStorage.getItem('allTasks');
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

const deleteAndFinshHandler = function (e) {
  if (e.target.classList.contains('delete')) {
    deletetasksFromLocalStorage(e.target.parentElement.getAttribute('data-id'));
    e.target.parentElement.remove();
    if (tasksContainer.childElementCount == 0) {
      createNoMessage();
    }
  }

  if (e.target.classList.contains('task-box')) {
    toggleStatusInLocalStorage(e.target.getAttribute('data-id'));
    e.target.classList.toggle('finish');
  }

  countCompleteAndFinsh();
};

const deletetasksFromLocalStorage = function (taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => {
    return task.id != taskId;
  });
  saveTasksAtLocalStorage(arrayOfTasks);
};

const toggleStatusInLocalStorage = function (taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);

      saveTasksAtLocalStorage(arrayOfTasks);
    }
  }
};

function createNoMessage() {
  tasksContainer.innerHTML = `
    <span class="tasks-message" id="no-tasks">No Tasks To Show..</span>
  `;
}

function countCompleteAndFinsh() {
  allTasksNumber.innerHTML = document.querySelectorAll(
    '.tasks-content .task-box',
  ).length;
  finshedTasksNumber.innerHTML = document.querySelectorAll(
    '.tasks-content .finish',
  ).length;
}

const deleteAllTasksHandler = function () {
  if (localStorage.getItem('allTasks')) {
    arrayOfTasks = []
    localStorage.removeItem("allTasks")
  }
  saveTasksAtLocalStorage(arrayOfTasks);
  tasksContainer.innerHTML = '';
  createNoMessage();
  countCompleteAndFinsh();
};

const completeAllTasksHandler = function () {
  let children = tasksContainer.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains('task-box')) {
      children[i].classList.add('finish');
    }
  }
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].completed == false) {
      arrayOfTasks[i].completed = true;
    }
    saveTasksAtLocalStorage(arrayOfTasks);
  }
  countCompleteAndFinsh();
};

tasksContainer.addEventListener('click', deleteAndFinshHandler);
addBtn.addEventListener('click', myAppHandler);
deleteAllBtn.addEventListener('click', deleteAllTasksHandler);
completeAllBtn.addEventListener('click', completeAllTasksHandler);
