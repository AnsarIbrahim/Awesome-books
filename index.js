class Book {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }

  addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    if (title && author) {
      this.books.push({ title, author });
      localStorage.setItem("books", JSON.stringify(this.books));
      this.displayBooks();
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(this.books));
    this.displayBooks();
  }

  displayBooks() {
    const bookList = document.getElementById("books");
    bookList.innerHTML = "";
    this.books.forEach((book, index) => {
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      const removeBtn = document.createElement("button");
      h3.textContent = `${book.title} by ${book.author}`;
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => this.removeBook(index));
      li.classList.add("book-item");
      li.appendChild(h3);
      li.appendChild(removeBtn);
      bookList.appendChild(li);
    });
  }
}

const bookCollect = new Book();
document
  .getElementById("add-btn")
  .addEventListener("click", bookCollect.addBook);
bookCollect.displayBooks();

const links = document.querySelectorAll("nav a");
const secTion = document.querySelectorAll("section");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
    secTion.forEach((section) => (section.style.display = "none"));

    const sectionId = link.getAttribute("href").slice(1);
    document.getElementById(sectionId).style.display = "block";
  });
});

links[0].click();
