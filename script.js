
const form= document.getElementById("bookForm");
const booktitle = document.getElementById("bookTitle");
const author = document.getElementById("author");
const publicationYear = document.getElementById("publicationYear");
const genre = document.getElementById("genre");
const status = document.getElementById("status");
const bookTableBody = document.getElementById("bookTableBody");


const books = [];

form.addEventListener("submit",function(event){
    event.preventDefault();
const titleValue = booktitle.value;
const authorValue= author.value;
const yearValue= publicationYear.value;
const genreValue= genre.value;
const statusValue = status.value;

const book = {
    title: titleValue,
    author: authorValue,
    year: yearValue,
    genre: genreValue,
    status: statusValue
}; 
books.push(book);

const newRow = document.createElement("tr");
newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.year}</td>
    <td>${book.genre}</td>
    <td>${book.status}</td>
`;
bookTableBody.appendChild(newRow);
form.reset();

console.log(books);
});