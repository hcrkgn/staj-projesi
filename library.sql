<?xml version="1.0" encoding="UTF-8"?><sqlb_project><db path="library.db" readonly="0" foreign_keys="1" case_sensitive_like="0" temp_store="0" wal_autocheckpoint="1000" synchronous="2"/><attached/><window><main_tabs open="structure browser pragmas query" current="0"/></window><tab_structure><column_width id="0" width="300"/><column_width id="1" width="0"/><column_width id="2" width="100"/><column_width id="3" width="1464"/><column_width id="4" width="0"/><expanded_item id="0" parent="1"/><expanded_item id="0" parent="0"/><expanded_item id="1" parent="0"/><expanded_item id="2" parent="0"/><expanded_item id="1" parent="1"/><expanded_item id="2" parent="1"/><expanded_item id="3" parent="1"/></tab_structure><tab_browse><table title="Borrow" custom_title="0" dock_id="1" table="4,6:mainBorrow"/><dock_state state="000000ff00000000fd0000000100000002000003ce0000026ffc0100000001fb000000160064006f0063006b00420072006f00770073006500310100000000000003ce0000011a00ffffff000002570000000000000004000000040000000800000008fc00000000"/><default_encoding codec=""/><browse_table_settings><table schema="main" name="Book" show_row_id="0" encoding="" plot_x_axis="" unlock_view_pk="_rowid_" freeze_columns="0"><sort/><column_widths><column index="1" value="52"/><column index="2" value="143"/><column index="3" value="148"/><column index="4" value="47"/><column index="5" value="62"/><column index="6" value="44"/></column_widths><filter_values/><conditional_formats/><row_id_formats/><display_formats/><hidden_columns/><plot_y_axes/><global_filter/></table><table schema="main" name="Borrow" show_row_id="0" encoding="" plot_x_axis="" unlock_view_pk="_rowid_" freeze_columns="0"><sort/><column_widths><column index="1" value="63"/><column index="2" value="52"/><column index="3" value="70"/><column index="4" value="85"/><column index="5" value="85"/></column_widths><filter_values/><conditional_formats/><row_id_formats/><display_formats/><hidden_columns/><plot_y_axes/><global_filter/></table><table schema="main" name="Member" show_row_id="0" encoding="" plot_x_axis="" unlock_view_pk="_rowid_" freeze_columns="0"><sort/><column_widths><column index="1" value="67"/><column index="2" value="54"/><column index="3" value="132"/></column_widths><filter_values/><conditional_formats/><row_id_formats/><display_formats/><hidden_columns/><plot_y_axes/><global_filter/></table></browse_table_settings></tab_browse><tab_sql><sql name="SQL 1*">CREATE TABLE Book(

BookID INTEGER PRIMARY KEY,

Title TEXT,

Author TEXT,

PublicationYear INTEGER,

Genre TEXT,

Status TEXT);



CREATE TABLE Member(

MemberID INTEGER PRIMARY KEY,

Name TEXT,

Email TEXT);



CREATE TABLE Borrow(

BorrowID INTEGER PRIMARY KEY,

BookID INTEGER,

MemberID INTEGER,

BorrowDate TEXT,

ReturnDate TEXT,

FOREIGN KEY (BookID) REFERENCES Book(BookID),

FOREIGN KEY (MemberID) REFERENCES Member(MemberID));



INSERT INTO Book

(BookID, Title, Author, PublicationYear, Genre, Status)

VALUES

(1,'Harry Potter','J.K. Rowling', 1997, 'Fantasy', 'Read');



INSERT INTO Book

(BookID, Title, Author, PublicationYear, Genre, Status)

VALUES

(2, 'Atomic Habits', 'James Clear', 2018, 'Science', 'Reading'),

(3, 'Clean Code', 'Robert C. Martin', 2008, 'Science', 'To Read'),

(4, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'Read'),

(5, 'Sapiens', 'Yuval Noah Harari', 2011, 'History', 'Reading');



INSERT INTO Book

(BookID, Title, Author, PublicationYear, Genre, Status)

VALUES

(6,'Pride &amp; Prejudice','Jane Austen', 1997, 'Novel', 'Read');



INSERT INTO Member

(MemberID, Name, Email)

VALUES

(1, 'Ali', 'ali@gmail.com'),

(2, 'Ayse', 'ayse@gmail.com'),

(3, 'Mehmet', 'mehmet@gmail.com'),

(4, 'Zeynep', 'zeynep@gmail.com'),

(5, 'Can', 'can@gmail.com'),

(6, 'Fatma', 'fatma@gmail.com');



INSERT INTO Borrow

(BorrowID, BookID, MemberID, BorrowDate, ReturnDate)

VALUES

(1, 1, 2, '2026-07-01', '2026-07-15'),

(2, 6, 1, '2026-07-02', '2026-07-16'),

(3, 2, 4, '2026-07-03', '2026-07-17'),

(4, 5, 3, '2026-07-04', '2026-07-18'),

(5, 4, 5, '2026-07-05', '2026-07-19');



INSERT INTO Borrow

(BorrowID, BookID, MemberID, BorrowDate, ReturnDate)

VALUES

(6, 3, 6, '2026-07-05', '2026-07-20');

SELECT * FROM Book;
SELECT Title FROM Book;
SELECT Title, Author FROM Book;
SELECT * FROM Book WHERE Status="Read";
SELECT * FROM Book ORDER BY PublicationYear DESC;
SELECT * FROM Book WHERE Title LIKE '%a%';
SELECT * FROM Book WHERE Title LIKE 'H%';
SELECT * FROM Book WHERE Genre = 'Science';
SELECT * FROM Book ORDER BY Title;

SELECT * FROM Borrow 
INNER JOIN Book 
ON Borrow.BookID= Book.BookID;

SELECT Member.Name, Book.Title 
FROM Borrow INNER JOIN Member
ON Borrow.MemberID = Member.MemberID
INNER JOIN Book
ON Borrow.BookID=Book.BookID;

SELECT Book.Title FROM Book
LEFT JOIN  Borrow
ON Book.BookID = Borrow.BookID
WHERE Borrow.BookID IS NULL;

SELECT Book.Title, Member.Name, Borrow.BorrowDate
FROM Borrow
INNER JOIN Book
ON Borrow.BookID = Book.BookID
INNER JOIN Member
ON Borrow.MemberID = Member.MemberID;

SELECT Book.Title
FROM Borrow
INNER JOIN Book
ON Borrow.BookID = Book.BookID
INNER JOIN Member
ON Borrow.MemberID = Member.MemberID
WHERE Member.Name = 'Ali';

SELECT Book.Title, Member.Name
FROM Borrow
INNER JOIN Book
ON Borrow.BookID = Book.BookID
INNER JOIN Member
ON Borrow.MemberID = Member.MemberID
WHERE Book.Genre = 'Fantasy';

SELECT Book.Title, Member.Name
FROM Borrow
INNER JOIN Book
ON Borrow.BookID = Book.BookID
INNER JOIN Member
ON Borrow.MemberID = Member.MemberID
ORDER BY Book.Title;

SELECT Book.Title, Member.Name, Borrow.BorrowDate
FROM Borrow
INNER JOIN Book
ON Borrow.BookID = Book.BookID
INNER JOIN Member
ON Borrow.MemberID = Member.MemberID
ORDER BY Borrow.BorrowDate DESC;

</sql><current_tab id="0"/></tab_sql></sqlb_project>
