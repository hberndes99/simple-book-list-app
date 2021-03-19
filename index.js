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
        const StoredBooks = [
            { title: 'book one', author: 'john', isbn: '4646'}, 
            {title: 'book two', author: 'tiff', isbn: '75982758923'}
        ];

        const books = StoredBooks;

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
}

// store class to take care of storage 


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

    // make book instance
    const newBook = new Book(title,author,isbn);

    //add book to UI
    UI.addBookToList(newBook);

    //clear fields method
    UI.clearFields();

});


// event remove book 
