// Redirect user to login page if not logged in
if(!localStorage.getItem("loggedIn")){
    window.location.href="login.html";
}

const API_URL = "http://127.0.0.1:5000/api/books";
const form= document.getElementById("bookForm");
const booktitle = document.getElementById("bookTitle");
const author = document.getElementById("author");
const publicationYear = document.getElementById("publicationYear");
const genre = document.getElementById("genre");
const status = document.getElementById("status");
const bookTableBody = document.getElementById("bookTableBody");
const submitButton = document.querySelector('button[type="submit"]');
const searchInput = document.getElementById("searchInput");
const noResultMessage = document.getElementById("noResultMessage");

let books= [];
let editBookId = null;

// Load all books from the backend
async function loadBooks(){
    const response = await fetch(API_URL);
    books = await response.json();

    bookTableBody.innerHTML="";

    books.forEach(function(book){
        addBookToTable(book);
    });
}

// Add one book to the table
function addBookToTable(book){
    const newRow = document.createElement("tr");

// Create table cells
const titleCell = document.createElement("td");
titleCell.textContent = book.Title;

const authorCell = document.createElement("td");
authorCell.textContent = book.Author;

const yearCell = document.createElement("td");
yearCell.textContent = book.PublicationYear;

const genreCell = document.createElement("td");
genreCell.textContent = book.Genre;

const statusCell = document.createElement("td");
statusCell.textContent = book.Status;

// Create action buttons
const actionCell = document.createElement("td");

actionCell.innerHTML = `
<button class="edit-btn">Edit</button>
<button class="delete-btn">Delete</button>
`;

newRow.appendChild(titleCell);
newRow.appendChild(authorCell);
newRow.appendChild(yearCell);
newRow.appendChild(genreCell);
newRow.appendChild(statusCell);
newRow.appendChild(actionCell);


    const editButton = newRow.querySelector(".edit-btn");
    const deleteButton =newRow.querySelector(".delete-btn");


    // Fill the form with selected book information
    editButton.addEventListener("click",function(){
        booktitle.value = book.Title;
        author.value = book.Author;
        publicationYear.value = book.PublicationYear;
        genre.value= book.Genre;
        status.value = book.Status;

        editBookId = book.BookID;
        submitButton.textContent = "Update";
    });

    // Delete selected book
   deleteButton.addEventListener("click", async function () {

    await fetch(`${API_URL}/${book.BookID}`, {
        method: "DELETE"
    });

    loadBooks();
});

    bookTableBody.appendChild(newRow);
}

// Add a new book or update an existing one
form.addEventListener("submit",async function(event){
    event.preventDefault();
const titleValue = booktitle.value;
const authorValue= author.value;
const yearValue= publicationYear.value;
const genreValue= genre.value;
const statusValue = status.value;

if(
    titleValue===""||
    authorValue===""||
    yearValue===""
){
    alert("Please fill in all fields");
    return;
}

const book = {
    BookID: books.length + 1,
    Title: titleValue,
    Author: authorValue,
    PublicationYear: Number(yearValue),
    Genre: genreValue,
    Status: statusValue
}; 


// Add new book
if (editBookId === null) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });

    const result = await response.json();

    if (!response.ok) {
        alert(result.error);
        return;
    }

// Update existing book
} else {

    const response = await fetch(`${API_URL}/${editBookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });

    const result = await response.json();

    if (!response.ok) {
        alert(result.error);
        return;
    }

    editBookId = null;
    submitButton.textContent = "Add";
}

form.reset();
loadBooks();
});

// Load books when page opens
loadBooks();

// Search books in the table
searchInput.addEventListener("keyup",function(){

    const searchText = searchInput.value.toLowerCase();
    const rows = bookTableBody.querySelectorAll("tr");

    let visibleRows =0;

    rows.forEach(function(row){

        const rowText = row.textContent.toLowerCase();

        if(rowText.includes(searchText)){
            row.style.display="";
            visibleRows++;

        }else{
            row.style.display="none";
        }
    });

    if(visibleRows=== 0){
        noResultMessage.style.display="block";
    }else{
        noResultMessage.style.display="none";
    }

    });

// Logout user
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function(){

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

});  