// class Books : represents a book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

// class UI to handle UI tasks (user interface)
class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book));
    };

    static addBookToList(book) {
       const list = document.querySelector("#book-list");

       const row = document.createElement('tr');

       row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td> <a href="#" class="btn btn-danger btn-sm delete">X</a> </td>`

       list.appendChild(row)
    }

    static clearFields() {
        document.querySelector('#book-form').reset();
    }

    static deleteBook(target) {
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
        }
    }

    static showValidationAlert(message, className) {
        const div = document.createElement('div');
        div.className = (`alert alert-${className}`);
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        // get alert to disappear
        setTimeout( () => document.querySelector(".alert").remove(),3000)
    }
}

// store class to take care of storage 
class Store {
    constructor() {

    }

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null)  {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach( (book, index) => {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

// event display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//event add book 
const bookForm = document.querySelector("#book-form");
bookForm.addEventListener('submit', (e) => {
    //prevent default reload
    e.preventDefault();


    //get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //validation
    if (title ===""|| author ===""|| isbn ==="") {
        UI.showValidationAlert(`please fill in all sections`, 'danger');
    }
    else {
    
        // make book instance
    const newBook = new Book(title,author,isbn);

    //add book to UI
    UI.addBookToList(newBook);

    //add book to storage
    // i.e so it doesn't disappear if page is reloaded
    Store.addBooks(newBook);

    //clear fields method
    UI.clearFields();

    //successful book added message
    UI.showValidationAlert(`book successfully added`, 'success');
    }

 

});


// event remove book 
document.querySelector("#book-list").addEventListener("click", e => {
    UI.deleteBook(e.target);
    UI.showValidationAlert(`book removed from list`, 'success');

    // remove a book from local
    // i.e so it doesn't re appear if page is reloaded
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

})