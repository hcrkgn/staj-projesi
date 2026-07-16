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
    
    if not data.get("Title"):
        return jsonify({"error": "Title is required"}), 400

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

    return jsonify({"message": "Book added successfully"}), 201

@app.route("/api/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):

    cursor.execute("DELETE FROM Book WHERE BookID = %s", (book_id,))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"message": "Book deleted successfully"}), 200


@app.route("/api/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()

    if not data.get("Title"):
        return jsonify({"error": "Title is required"}), 400

    sql = """
    UPDATE Book
    SET Title=%s,
        Author=%s,
        PublicationYear=%s,
        Genre=%s,
        Status=%s
    WHERE BookID=%s
    """

    values = (
        data["Title"],
        data["Author"],
        data["PublicationYear"],
        data["Genre"],
        data["Status"],
        book_id
    )

    cursor.execute(sql, values)
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"message": "Book updated successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)