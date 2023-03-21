const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add-btn');
const books = document.getElementById('books');

let booksArr = [];

function removeItemAt(arr, index) {
  arr.splice(index, 1);
}

function showBooks() {
  books.innerHTML = '';
  booksArr.forEach((book, index) => {
    const appendBook = `
            <h3>${book.title}</h3><br>
            <h4>${book.author}</h4><br>
            <button id="btn-${index}">remove</button>
            <hr>
        `;
    const bookContainer = document.createElement('div');

    bookContainer.id = `book-${index}`;
    bookContainer.innerHTML = appendBook;
    books.appendChild(bookContainer);

    const removeBtn = document.getElementById(`btn-${index}`);
    removeBtn.addEventListener('click', () => {
      removeItemAt(booksArr, index);
      localStorage.setItem('booksData', JSON.stringify(booksArr));
      showBooks();
    });
  });
}

function loadBooks() {
  if (localStorage.booksData) {
    booksArr = JSON.parse(localStorage.booksData);
    showBooks();
  } else {
    booksArr = [];
  }
}

function addItem() {
  if (title.value !== '' && author.value !== '') {
    const theBook = {
      title: title.value,
      author: author.value,
    };

    booksArr.push(theBook);
    title.value = '';
    author.value = '';
    localStorage.setItem('booksData', JSON.stringify(booksArr));
    showBooks();
  }
}

addBtn.addEventListener('click', () => addItem());

document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
});