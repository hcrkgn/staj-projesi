from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app)

#Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

db = client["library_db"]

#Collections
collection = db["Book"]
user_collection = db["User"]

# Validate book information
def validate_book(data):

    book = {
        "BookID": data.get("BookID"),
        "Title": data.get("Title", "").strip(),
        "Author": data.get("Author", "").strip(),
        "PublicationYear": data.get("PublicationYear"),
        "Genre": data.get("Genre", "").strip(),
        "Status": data.get("Status", "").strip()
    }

    if book["Title"] == "":
        return None, "Title is required"

    if book["Author"] == "":
        return None, "Author is required"

    if book["PublicationYear"] is None:
        return None, "Publication year is required"

    if book["Genre"] == "":
        return None, "Genre is required"

    if book["Status"] == "":
        return None, "Status is required"

    if "<" in book["Title"] or ">" in book["Title"]:
        return None, "Invalid characters in title"

    if "<" in book["Author"] or ">" in book["Author"]:
        return None, "Invalid characters in author"

    return book, None



@app.route("/")
def home():
    return "hello world"

#Get all books
@app.route("/api/books")
def get_books():

    books = list(collection.find({}, {"_id": 0}))

    return jsonify(books)

#Add a new book
@app.route("/api/books", methods=["POST"])
def add_book():

    data = request.get_json()

    book_data, error = validate_book(data)

    if error:
        return jsonify({"error": error}), 400

    collection.insert_one(book_data)

    return jsonify({"message": "Book added successfully"}), 201



#Delete a book by BookID
@app.route("/api/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):

    result = collection.delete_one({"BookID": book_id})

    if result.deleted_count == 0:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"message": "Book deleted successfully"}), 200

    

# Update book information
@app.route("/api/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):

    data = request.get_json()

    book_data, error = validate_book(data)

    if error:
        return jsonify({"error": error}), 400

    result = collection.update_one(
        {"BookID": book_id},
        {
            "$set": book_data
        }
    )

    if result.matched_count == 0:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"message": "Book updated successfully"}), 200


#Register a new user
@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("Username", "").strip()
    password = data.get("Password", "").strip()

    if len(username) < 3:
        return jsonify({"error": "Username must be at least 3 characters"}), 400

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    if "<" in username or ">" in username:
        return jsonify({"error": "Invalid username"}), 400

    if not username or not password:
        return jsonify({"error": "Username and Password are required"}), 400

    existing_user = user_collection.find_one({"Username": username})

    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "Username": username,
        "Password": hashed_password.decode("utf-8")
    }

    user_collection.insert_one(user)

    return jsonify({"message": "User registered successfully"}), 201



# User login
@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("Username", "").strip()
    password = data.get("Password", "").strip()

    if username == "" or password == "":
        return jsonify({"error": "Please fill all fields"}), 400

    user = user_collection.find_one({"Username": username})

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    if bcrypt.checkpw(
        password.encode("utf-8"),
        user["Password"].encode("utf-8")
    ):

        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid username or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)