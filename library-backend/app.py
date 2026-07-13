from flask import Flask, jsonify

app = Flask(__name__)
books = [
    {
        "id":1,
        "title":"Harry Potter",
        "author": "J.K. Rowling"
    },
    {
        "id":2,
        "title": "Atomic Habits",
        "author":"James Clear"
    },
    {
        "id":3,
        "title":"Clean Code",
        "author":"Robert C. Martin"
    },
]

@app.route("/")
def home():
    return "hello world"

@app.route("/api/books")
def get_books():
    return jsonify(books)

if __name__ == "__main__":
    app.run(debug=True)