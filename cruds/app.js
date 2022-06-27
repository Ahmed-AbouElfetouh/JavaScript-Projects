const allPriceInputs = document.querySelectorAll('.price input');
const totalText = document.getElementById('total');
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const count = document.getElementById('count');
const category = document.getElementById('category');
const createBtn = document.getElementById('create');

const tBody = document.getElementById('t-body');
const deleteAll = document.getElementById('delete-all');

let appMode = 'create';
let mainIndex;

let arrayOfData = [];

if (localStorage.getItem('myProducts')) {
  arrayOfData = JSON.parse(localStorage.getItem('myProducts'));
}

getDataFromLocalStorage();

// create product

const createProductHandler = function () {
  const product = {
    id: 1,
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: totalText.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    count.value <= 100
  ) {
    if (appMode === 'create') {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          arrayOfData.push(product);
          clearAllInputs();
        }
      } else {
        arrayOfData.push(product);
        clearAllInputs();
      }
    } else {
      arrayOfData[mainIndex] = product;
      count.style.display = 'block';
      createBtn.innerHTML = 'Create';
      appMode = 'create';
    }
  }

  saveDataAtLocalStorage(arrayOfData);
  addProductsToPage(arrayOfData);
  
  getTotalHandler();
};

const saveDataAtLocalStorage = function (data) {
  localStorage.setItem('myProducts', JSON.stringify(data));
};

function getDataFromLocalStorage() {
  let data = localStorage.getItem('myProducts');
  if (data) {
    let result = JSON.parse(data);
    addProductsToPage(result);
  }
}

function addProductsToPage(products) {
  let allProducts = products.map((product, index) => {
    return `
      <tr id="tr">
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button id="update" onclick="updateProduct(${index})">Update</button></td>
        <td><button id="delete" onclick="delteProduct(${index})">Delete</button></td>
      </tr>
    `;
  });
  tBody.innerHTML = allProducts;
  if (arrayOfData.length > 0) {
    deleteAll.innerHTML = `
      <button onclick="deleteAllProducts()">Delete All (${arrayOfData.length})</button>
    `;
  } else {
    deleteAll.innerHTML = '';
  }
}

createBtn.addEventListener('click', createProductHandler);

// clear all inputs

function clearAllInputs() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  totalText.innerHTML = '';
  category.value = '';
  count.value = '';
}

// delete one product
function delteProduct(index) {
  arrayOfData.splice(index, 1);
  addProductsToPage(arrayOfData);
  saveDataAtLocalStorage(arrayOfData);
}

// delete all products
function deleteAllProducts() {
  arrayOfData.splice(0);
  addProductsToPage(arrayOfData);
  saveDataAtLocalStorage(arrayOfData);
}

// updata product
function updateProduct(index) {
  title.value = arrayOfData[index].title;
  price.value = arrayOfData[index].price;
  taxes.value = arrayOfData[index].taxes;
  ads.value = arrayOfData[index].ads;
  discount.value = arrayOfData[index].title;
  category.value = arrayOfData[index].category;
  appMode = 'update';
  getTotalHandler();
  count.style.display = 'none';
  createBtn.innerHTML = 'Update';
  scroll({
    top: 0,
    behavior: 'smooth',
  });
  mainIndex = index;
}

// search
const searchBtns = document.querySelectorAll('.search-btns button');
const searchInput = document.getElementById('search');
let searchMood = 'title';

function searchBtnsHandler() {
  if (this.id === 'search-by-title') {
    searchMood = 'title';
  } else {
    searchMood = 'category';
  }
  searchInput.placeholder = `Search By ${searchMood}`;
  searchInput.focus();
  searchInput.value = '';
  addProductsToPage(arrayOfData);
}

function theSearchHandler() {
  let product = '';
  for (let i = 0; i < arrayOfData.length; i++) {
    if (searchMood === 'title') {
      if (arrayOfData[i].title.includes(this.value.toLowerCase())) {
        product += `<tr id="tr">
          <td>${i + 1}</td>
          <td>${arrayOfData[i].title}</td>
          <td>${arrayOfData[i].price}</td>
          <td>${arrayOfData[i].taxes}</td>
          <td>${arrayOfData[i].ads}</td>
          <td>${arrayOfData[i].discount}</td>
          <td>${arrayOfData[i].total}</td>
          <td>${arrayOfData[i].category}</td>
          <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
          <td><button id="delete" onclick="delteProduct(${i})">Delete</button></td>
        </tr>`;
      }
    } else {
      if (arrayOfData[i].category.includes(this.value.toLowerCase())) {
        product += `<tr id="tr">
          <td>${i + 1}</td>
          <td>${arrayOfData[i].title}</td>
          <td>${arrayOfData[i].price}</td>
          <td>${arrayOfData[i].taxes}</td>
          <td>${arrayOfData[i].ads}</td>
          <td>${arrayOfData[i].discount}</td>
          <td>${arrayOfData[i].total}</td>
          <td>${arrayOfData[i].category}</td>
          <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
          <td><button id="delete" onclick="delteProduct(${i})">Delete</button></td>
        </tr>`;
      }
    }
  }
  tBody.innerHTML = product;
}

searchInput.addEventListener('keyup', theSearchHandler);

searchBtns.forEach((btn) => {
  btn.addEventListener('click', searchBtnsHandler);
});

// get total price of one product

function getTotalHandler() {
  let result;
  if (price.value != '') {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    totalText.innerHTML = result;
    totalText.style.backgroundColor = '#040';
  } else {
    totalText.innerHTML = '';
    totalText.style.backgroundColor = '#9f0d02';
  }
}

allPriceInputs.forEach((input) => {
  input.addEventListener('keyup', getTotalHandler);
});
