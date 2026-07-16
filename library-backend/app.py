from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")

db = client["library_db"]

collection = db["Book"]


@app.route("/")
def home():
    return "hello world"

@app.route("/api/books")
def get_books():

    books = list(collection.find({}, {"_id": 0}))

    return jsonify(books)


@app.route("/api/books", methods=["POST"])
def add_book():
    data = request.get_json()
    
    if not data.get("Title"):
        return jsonify({"error": "Title is required"}), 400

    collection.insert_one(data)

    return jsonify({"message": "Book added successfully"}), 201



@app.route("/api/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):

    result = collection.delete_one({"BookID": book_id})

    if result.deleted_count == 0:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"message": "Book deleted successfully"}), 200
    


@app.route("/api/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()

    if not data.get("Title"):
        return jsonify({"error": "Title is required"}), 400

    result = collection.update_one(
        {"BookID": book_id},
        {
            "$set": {
                "Title": data["Title"],
                "Author": data["Author"],
                "PublicationYear": data["PublicationYear"],
                "Genre": data["Genre"],
                "Status": data["Status"]
            }
        }
    )

    if result.matched_count == 0:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"message": "Book updated successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)