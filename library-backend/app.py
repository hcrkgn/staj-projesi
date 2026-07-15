from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db= mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="library_db"
)

cursor = db.cursor(dictionary=True)


@app.route("/")
def home():
    return "hello world"

@app.route("/api/books")
def get_books():
    cursor.execute("SELECT * FROM Book")
    books = cursor.fetchall()
    return jsonify(books)

@app.route("/api/books", methods=["POST"])
def add_book():
    data = request.get_json()

    sql = """
    INSERT INTO Book (BookID, Title, Author, PublicationYear, Genre, Status)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    values = (
        data["BookID"],
        data["Title"],
        data["Author"],
        data["PublicationYear"],
        data["Genre"],
        data["Status"]
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Book added successfully"})

@app.route("/api/books/<int:book_id>",methods=["DELETE"])
def delete_book(book_id):
    sql="DELETE FROM Book WHERE BookID = %s"

    cursor.execute(sql, (book_id,))
    db.commit()

    return jsonify({"message": "Book deleted succesfully"})

if __name__ == "__main__":
    app.run(debug=True)