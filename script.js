
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

let books=[];
let editIndex = -1;

async function loadBooks(){
    const response = await fetch("http://127.0.0.1:5000/api/books");
    books = await response.json();

    bookTableBody.innerHTML="";

    books.forEach(function(book,index){
        addBookToTable(book,index);
    });
}

function addBookToTable(book,index){
    const newRow = document.createElement("tr");

    newRow.innerHTML=`
        <td>${book.Title}</td>
        <td>${book.Author}</td>
        <td>${book.PublicationYear}</td>
        <td>${book.Genre}</td>
        <td>${book.Status}</td>
        <td>
            <button class ="edit-btn"> Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    const editButton = newRow.querySelector(".edit-btn");
    const deleteButton =newRow.querySelector(".delete-btn");


    editButton.addEventListener("click",function(){
        booktitle.value = book.Title;
        author.value = book.Author;
        publicationYear.value = book.PublicationYear;
        genre.value= book.Genre;
        status.value = book.Status;

        editIndex = index;
        submitButton.textContent = "Update";
    });

   deleteButton.addEventListener("click", async function () {

    await fetch(`http://127.0.0.1:5000/api/books/${book.BookID}`, {
        method: "DELETE"
    });

    loadBooks();
});

    bookTableBody.appendChild(newRow);
}

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



await fetch("http://127.0.0.1:5000/api/books", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
});

form.reset();

loadBooks();
});

loadBooks();

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