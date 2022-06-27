const claculateBtn = document.getElementById('calc-btn');
const resultsDiv = document.getElementById('results-container');
const inputsDiv = document.getElementById('app-inputs');

const loanAmount = document.getElementById('loan-amount');
const interest = document.getElementById('interest');
const monthlySalary = document.getElementById('monthly-salary');
const yearsToRepay = document.getElementById('years-to-rapay');

const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const canOfford = document.getElementById('offord');

//
function theAppHandler(e) {
  e.preventDefault();
  if (
    loanAmount.value === '' ||
    interest.value === '' ||
    monthlySalary.value === '' ||
    yearsToRepay.value === ''
  ) {
    showAlert('Please check your numbers again!', 'move-down', 'wrong');
  } else if (
    loanAmount.value <= 0 ||
    interest.value <= 0 ||
    monthlySalary.value <= 0 ||
    yearsToRepay.value <= 0
  ) {
    showAlert('Please check your numbers again!', 'move-down', 'wrong');
  } else {
    handelClasses();
    calculateAllNumbers();
  }
}

//
function handelClasses() {
  resultsDiv.classList.add('handel-result-div');
  inputsDiv.classList.add('handel-inputs-div');
}

//
function showAlert(message, classNameOne, classNameTwo) {
  const popupDiv = document.createElement('div');
  popupDiv.className = `popup-message ${classNameOne} ${classNameTwo}`;
  const popupPragraphe = document.createElement('p');
  const praText = document.createTextNode(message);
  popupPragraphe.append(praText);
  popupDiv.append(popupPragraphe);
  document.body.append(popupDiv);
  setTimeout(function () {
    popupDiv.className = 'popup-message';
  }, 1000);
}

//
function calculateAllNumbers() {
  totalInterest.textContent = (
    loanAmount.value *
    (interest.value / 100) *
    yearsToRepay.value
  ).toFixed(2);
  totalPayment.textContent = (
    parseFloat(totalInterest.textContent) + parseFloat(loanAmount.value)
  ).toFixed(2);
  monthlyPayment.textContent = (
    parseFloat(totalPayment.textContent) /
    (yearsToRepay.value * 12)
  ).toFixed(2);
  let payment = parseFloat(monthlyPayment.textContent) * 10;
  if (payment < monthlySalary.value) {
    canOfford.textContent = 'Yes';
  } else if (payment >= monthlySalary.value) {
    canOfford.textContent = 'No';
  }
}

claculateBtn.addEventListener('click', theAppHandler);
