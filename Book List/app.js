const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const isbnInput = document.getElementById('book-isbn');
const addBookBtn = document.getElementById('add-book');
const tableBody = document.getElementById('t-body');
const clearAllBooksBtn = document.getElementById('clear-books');

let arrayOfBooks = [];

if (localStorage.getItem('allBooks')) {
  arrayOfBooks = JSON.parse(localStorage.getItem('allBooks'));
}

//
getDataFromLocalStorage();

//
function showAlert(message, classNameOne, classNameTwo) {
  const popupDiv = document.createElement('div');
  popupDiv.className = `popup-message ${classNameOne} ${classNameTwo}`;
  const popupPragraphe = document.createElement('p');
  const praText = document.createTextNode(message);
  popupPragraphe.append(praText);
  popupDiv.append(popupPragraphe);
  document.body.append(popupDiv)
  setTimeout(function () {
    popupDiv.className = 'popup-message';
  }, 1000);

}

//
function addBooksHandler(e) {
  e.preventDefault();
  if (
    titleInput.value === '' ||
    authorInput.value === '' ||
    isbnInput.value === ''
  ) {
    showAlert('Please fill in all fields!', 'move-down', 'wrong');
  } else {
    addBooksToArray(titleInput.value, authorInput.value, isbnInput.value);
    clearInputs();
  }
}

//
function clearInputs() {
  titleInput.value = '';
  authorInput.value = '';
  isbnInput.value = '';
}

//
function addBooksToArray(title, author, isbn) {
  const book = {
    id: Date.now(),
    bookTitle: title,
    bookAuthor: author,
    bookIsbn: isbn,
  };
  arrayOfBooks.push(book);
  addBooksToPage(arrayOfBooks);
  showAlert('You added a new book!', 'move-down', 'correct');
  saveBooksAtLocalStorage(arrayOfBooks);
}

//
function addBooksToPage(books) {
  let theBook = books.map((book) => {
    return `
    <tr id="tr" data-id="${book.id}">
      <td>${book.bookTitle}</td>
      <td>${book.bookAuthor}</td>
      <td>${book.bookIsbn}</td>
      <td><span class="x-mark">X</span></td>
    </tr>
    `;
  });
  tableBody.innerHTML = theBook;
}

//
function saveBooksAtLocalStorage(books) {
  localStorage.setItem('allBooks', JSON.stringify(books));
}

//
function getDataFromLocalStorage() {
  let data = localStorage.getItem('allBooks');
  if (data) {
    let books = JSON.parse(data);
    addBooksToPage(books);
  }
}

//
function removeBookHandler(e) {
  if (e.target.classList.contains('x-mark')) {
    removeBookFromLocalStorage(
      e.target.parentElement.parentElement.getAttribute('data-id'),
    );
    e.target.parentElement.parentElement.remove();
    showAlert('You remove a book!', 'move-down', 'correct');
  }
}

//
function removeBookFromLocalStorage(bookId) {
  arrayOfBooks = arrayOfBooks.filter((book) => {
    return bookId != book.id;
  });
  saveBooksAtLocalStorage(arrayOfBooks);
}

//
function clearAllBooksHandler(e) {
  e.preventDefault();
  arrayOfBooks = [];
  localStorage.removeItem('allBooks');
  tableBody.innerHTML = '';
  showAlert('You cleared all books!', 'move-down', 'correct');
}

addBookBtn.addEventListener('click', addBooksHandler);
tableBody.addEventListener('click', removeBookHandler);
clearAllBooksBtn.addEventListener('click', clearAllBooksHandler);
