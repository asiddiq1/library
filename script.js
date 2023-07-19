class MyLibrary{
    constructor(){
        this.library = [];
    }
    addBook(book){
        this.library.push(book);

    }
    delBook(index){
        this.library.splice(index, 1);
    }
    getBook(index){
        return this.library[index];

    }
    updateBook(index, book){
        this.library[index] = book;

    }
}

class Book{
    constructor (title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read  
    }
}

let myLibrary = new MyLibrary();

const modal = document.querySelector(".form-popup");
const trigger = document.querySelector(".add-book");
const book_container = document.getElementById("myBooks");
const bookForm = document.getElementById("form-container");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("input-title");
    let author = document.getElementById("input-author");
    let pages = document.getElementById("input-pages");
    let is_read = document.getElementById("is_read");

    let book = new Book(title.value, author.value, pages.value, is_read.checked);

    myLibrary.addBook(book);
    addBookToLibrary(book);

    title.value = "";
    author.value = "";
    pages.value = "";
    is_read.checked = false;

    modal.classList.remove("show-modal");

})


function addBookToLibrary(myBook){

    let book = document.createElement('div');
    book.className = 'book'
    book.id = 'book-' + book_container.childElementCount;
    book["data-index"] = book_container.childElementCount;

    let title = document.createElement('div');
    title.className = 'title';
    title.textContent = myBook.title;
    
    let author = document.createElement('div');
    author.className = 'author';
    author.textContent = myBook.author;

    let pages = document.createElement('div');
    pages.className = 'pages';
    pages.textContent = myBook.pages + " pages";

    let is_read = document.createElement('button');

    if (myBook.read){
        is_read.className = 'is_read_btn';
    }
    else{
        is_read.className = 'is_not_read_btn';
    }
    is_read.addEventListener("click", toggleRead);
    let deleteBook = document.createElement('button');
    deleteBook.className = 'delete-book';
    deleteBook.id = 'delete-book-' + book_container.childElementCount;
    deleteBook.textContent = "Delete";
    deleteBook.addEventListener("click", delBook);


    book.append(title, author, pages, is_read, deleteBook);
    book_container.append(book);
}


function toggleModal(event){

    if (event.target == trigger){
        modal.classList.add("show-modal");
    }
    
    else{
        if (event.target == modal){
            modal.classList.remove("show-modal");
        }
    }
}

document.body.addEventListener("click", toggleModal);

function delBook(event){
    let delBookId = event.target.parentNode;
    let index = delBookId["data-index"];
    myLibrary.delBook(index);
    book_container.removeChild(delBookId);
}

function toggleRead(event){
    let readStatus = event.target; 
    let index = readStatus.parentNode["data-index"];
    let book = myLibrary.getBook(index);


    if (readStatus.className == "is_read_btn"){
        readStatus.classList.remove("is_read_btn");
        readStatus.classList.add("is_not_read_btn");
        book.read = false;
    }
    else{
        readStatus.classList.remove("is_not_read_btn");
        readStatus.classList.add("is_read_btn");
        book.read = true;
    }
    myLibrary.updateBook(index, book);

}
