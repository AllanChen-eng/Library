const myLibrary = [];
const library = document.querySelector(".library-container");
function Book(title = "N/A", author = "N/A", pages = "N/A", read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.ID = crypto.randomUUID();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function setDialog() {
  const form = document.querySelector("form");
  const addBookbtn = document.querySelector(".showDialog");
  const cancel = document.querySelector("#cancelDialog");
  const bookDialog = document.querySelector("#bookDialog");
  const titleValue = document.querySelector("#addTitle");
  const authorValue = document.querySelector("#addAuthor");
  const pageValue = document.querySelector("#addPage");
  const readValue = document.querySelector("#addRead")
  addBookbtn.addEventListener("click", () => {
    bookDialog.showModal();
  });
  cancel.addEventListener("click", () => {
    bookDialog.close();
  })
form.addEventListener("submit", (e) =>{ 
    e.preventDefault();
    const bookData = new Book(titleValue.value,authorValue.value,pageValue.value,readValue.value);
    library.appendChild(createBookCard(bookData));
    bookDialog.close();
})
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.id = book.ID;

  const bookImage = document.createElement("div");
  bookImage.classList.add("book-image");

  const bookData = document.createElement("div");
  bookData.classList.add("book-data");
  bookData.appendChild(createBookDataList(book));

  const bookOptions = document.createElement("div");
  bookOptions.classList.add("options");
  const exit = document.createElement("img");
  exit.classList.add("delete-button");
  exit.dataset.id = book.ID;
  exit.setAttribute("src","x.svg");
  setDeleteScript(exit);
  bookOptions.appendChild(exit);

  bookCard.appendChild(bookImage);
  bookCard.appendChild(bookData);
  bookCard.appendChild(bookOptions);
  return bookCard;
}

function createBookDataList(book) {
  const ul = document.createElement("ul");

  const title = document.createElement("li");
  title.classList.add("title");
  title.textContent = `Title: ${book.title}`;

  const author = document.createElement("li");
  author.classList.add("author");
  author.textContent = `Author: ${book.author}`;

  const pages = document.createElement("li");
  pages.classList.add("pages");
  pages.textContent = `Pages: ${book.pages}`;

  const read = document.createElement("li");
  read.classList.add("read");
  read.textContent = "Read ";
  const readCheck = document.createElement("input");
  readCheck.setAttribute("type", "checkbox");
  readCheck.checked = book.read;
  read.appendChild(readCheck);

  const bookid = document.createElement("li");
  bookid.classList.add("book-id");
  bookid.textContent = `# ${book.ID}`;

  ul.append(title, author, pages, read, bookid);
  return ul;
}
function setDeleteScript(btn) {
    if(btn == null){
  const deleteButton = document.querySelector(".delete-button");
    deleteButton.addEventListener("click", (e) => {
    const index = e.target.dataset.id;
    const content = document.querySelector(`.book-card[data-id="${index}"]`);
    content.remove();
  })
    }else{
  btn.addEventListener("click", (e) => {
    const index = e.target.dataset.id;
    const content = document.querySelector(`.book-card[data-id="${index}"]`);
    content.remove();
  })
    }
  
}

setDialog();
setDeleteScript();
