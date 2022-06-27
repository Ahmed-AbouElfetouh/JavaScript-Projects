const appTitle = document.getElementById('app-title');
const appList = document.getElementById('app-list');
const reloadBtn = document.getElementById('reload');

window.onload = function () {
  if (window.navigator.onLine) {
    onLine();
  } else {
    offLine();
  }
};

function onLine() {
  appTitle.innerHTML = 'Online Now';
  appTitle.style.color = 'green';
  appList.classList.add('hide');
  reloadBtn.classList.add('hide');
}

function offLine() {
  appTitle.innerHTML = 'Offline Now';
  appTitle.style.color = '#666';
  appList.classList.remove('hide');
  reloadBtn.classList.remove('hide');
}

window.addEventListener('online', onLine);
window.addEventListener('offline', offLine);

reloadBtn.onclick = function () {
  window.location.reload();
};
