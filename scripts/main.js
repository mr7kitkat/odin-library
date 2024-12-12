const showDialogBtn = document.querySelector("#addBook");
const dialogBox = document.querySelector("dialog");
const main = document.querySelector("main");
const closeDialogBtn = document.querySelector("#closeForm");
const form = document.querySelector("form")

const myLibrary = [];

function Book(title, author, description, imageUrl = "", status = false) {
    // the constructor...
    this.title = title
    this.author = author
    this.description = description
    this.imageUrl = imageUrl
    this.status = status
}


// dom workflow

// Show dialog box
showDialogBtn.addEventListener("click", () => dialogBox.showModal());

// close dialog box 
closeDialogBtn.addEventListener("click", () => dialogBox.close())