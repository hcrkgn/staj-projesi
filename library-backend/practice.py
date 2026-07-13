def say_hello():
    print("Hello")

say_hello()


class Book:
    def __init__(self, title):
        self.title = title

book = Book("Harry Potter")
print(book.title)


import math

print(math.sqrt(25))