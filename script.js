
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

const books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = -1;

function addBookToTable(book,index){
    const newRow = document.createElement("tr");

    newRow.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.genre}</td>
        <td>${book.status}</td>
        <td>
            <button class ="edit-btn"> Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    const editButton = newRow.querySelector(".edit-btn");
    const deleteButton =newRow.querySelector(".delete-btn");


    editButton.addEventListener("click",function(){
        booktitle.value = book.title;
        author.value = book.author;
        publicationYear.value = book.year;
        genre.value= book.genre;
        status.value = book.status;

        editIndex = index;
        submitButton.textContent = "Update";
    });

    deleteButton.addEventListener("click",function(){
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        newRow.remove();
    });

    bookTableBody.appendChild(newRow);
}

form.addEventListener("submit",function(event){
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
    title: titleValue,
    author: authorValue,
    year: yearValue,
    genre: genreValue,
    status: statusValue
}; 



if(editIndex=== -1){
    books.push(book);
}else{
    books[editIndex]=book;
}

localStorage.setItem("books", JSON.stringify(books));
bookTableBody.innerHTML = "";
books.forEach(function(book, index){
    addBookToTable(book, index);
});

editIndex = -1;
submitButton.textContent = "Add";

form.reset();

});

books.forEach(function(book,index){
    addBookToTable(book,index);
    
});

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