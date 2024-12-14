const showDialogBtn = document.querySelector("#addBook");
const dialogBox = document.querySelector("dialog");
const main = document.querySelector("main");
const closeDialogBtn = document.querySelector("#closeForm");

const myLibrary = [
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        description: "An epic high-fantasy novel set in Middle-earth.",
        imageURL: "https://books.google.co.in/books/publisher/content?id=GWorEAAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&sig=ACfU3U1nDQxnOwFg5Zo-6gxKOVewuJWUIw&w=1280",
        status: false
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        description: "A romantic comedy of manners novel.",
        imageURL: "https://books.google.co.in/books/content?id=mxDLY0qL2mAC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0r0NFlJTxVqVtxO8Lk6MTgbM2_GQ&w=1280",
        status: false
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A coming-of-age novel set in the American South.",
        imageURL: "https://books.google.co.in/books/publisher/content?id=PGR2AwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2yOpslGog4pI6u_p_MvRErD_yKCA&w=1280",
        status: false
    },
    {
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        description: "A comedic science fiction series.",
        imageURL: "https://books.google.co.in/books/content?id=DmUr6q1EDYMC&pg=PP1&img=1&zoom=3&hl=en&sig=ACfU3U09TknjE6F6Nfsc4Xbi0BWMRoDL7A&w=1280",
        status: false
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A tragic love story set in the Jazz Age.",
        imageURL: "https://books.google.co.in/books/publisher/content?id=acb8EAAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&sig=ACfU3U1nt52okwQBCfd9miir2TxqgdueEQ&w=1280",
        status: false
    }
];

document.addEventListener("DOMContentLoaded", parseBooks);

function Book(title, author, description, imageURL = "", status = false) {
    // the constructor...
    this.title = title
    this.author = author
    this.description = description
    this.imageURL = imageURL
    this.status = status
}




// dom workflow

// Show dialog box
showDialogBtn.addEventListener("click", () => dialogBox.showModal());

// close dialog box 
closeDialogBtn.addEventListener("click", () => {
    const form = document.querySelector("form");

    // list of value
    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const description = form.elements['description'].value;
    const imageURL = form.elements['image'].value;
    const status = form.elements['status'].checked;

    if (title.length || author.length) {
        // constructing a new book
        const newBook = new Book(title, author, description, imageURL, status);

        // adding book to the library
        myLibrary.push(newBook)
    }

    // reseting form 
    form.reset()
    dialogBox.close()
})

// after closing dialog box parse books 
dialogBox.addEventListener("close", parseBooks);




function parseBooks() {
    let STRING_BOOKS = ""

    function getReadStatus(bool) {
        return bool ? "Read the Book" : "Not read yet!"
    }

    myLibrary.forEach(book => {
        const { title, author, description, imageURL, status } = book;

        // constructing dom element from array
        const currentReadingStatus = getReadStatus(status)
        const DOM_BOOK = `
        <div class="book">
            <button class="delete">&times;</button>
            <img src="${imageURL}" alt="Book Image" />
            <div class="details">
            <h3>${title}</h3>
            <div class="author">
                <h4>Written By-</h4>
                <p>${author}</p>
            </div>
            <p class="status ${status}">${currentReadingStatus}</p>
            </div>
        </div>
        `
        // adding items to temprorary fragement
        STRING_BOOKS += DOM_BOOK
    })

    // lastly add all to main dom element
    main.innerHTML = STRING_BOOKS;

    // make sure that status gets updated after double clicking
    const statusOfBooks = document.querySelectorAll(".status");
    statusOfBooks.forEach((book, idx) => {
        book.addEventListener("click", function () {
            myLibrary[idx].status = !myLibrary[idx].status;
            parseBooks()
        })
    })


    // make sure that status gets updated after double clicking
    const allDeleteBtns = document.querySelectorAll(".delete");
    allDeleteBtns.forEach((deleteBtn, idx) => {
        deleteBtn.addEventListener("click", function () {
            myLibrary.splice(idx, 1);
            parseBooks()
        })
    })

}