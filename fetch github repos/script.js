const theInput = document.getElementById('my-input');
const fetchBtn = document.getElementById('my-btn');
const divMessage = document.querySelector('.show-data span');


const getRepoHandler = function () {
  if (theInput.value == '') {
    divMessage.innerHTML = `<span>You should write a github username..</span>`;
  } else {
    fetchData();
  }
};


const fetchData = function () {
  fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response) => response.json())
    .then((data) => {
      loopOn(data)
    });
};

const loopOn = function(theData) {
  divMessage.innerHTML = "";
  theInput.value = "";
  theData.forEach(data => {
    createElementsBy(data)
  });
}

const createElementsBy = function(myData) {
  divMessage.innerHTML += `
    <div class="repo-box">
      ${myData.name}
      <a href="https://github.com/${theInput.value}/${myData.name}" target="_blank">Visit</a>
      <span>Stars ${myData.stargazers_count}</span>
    </div>
  `
}


fetchBtn.addEventListener('click', getRepoHandler);


// my github username for testing : Ahmed-AbouElfetouh