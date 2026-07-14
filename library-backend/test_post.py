import requests

url = "http://127.0.0.1:5000/api/books"

new_book = {
    "BookID": 7,
    "Title": "The Alchemist",
    "Author": "Paulo Coelho",
    "PublicationYear": 1988,
    "Genre": "Novel",
    "Status": "To Read"
}

response = requests.post(url, json=new_book)

print(response.json())