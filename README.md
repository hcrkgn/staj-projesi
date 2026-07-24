# Library System

## About

A simple library management system built with Flask, MongoDB, HTML, CSS and JavaScript.

## Features

- User registration
- User login
- Add books
- Update books
- Delete books
- Search books
- Input validation
- Password hashing

## Technologies

- Backend: Flask (Python)
- Database: MongoDB Atlas
- Frontend: HTML, CSS, JavaScript

## Installation

1. Clone the repository

2. Install required packages:

```bash
pip install -r requirements.txt
```

3. Run the backend:

```bash
python app.py
```

4. Open the frontend files in your browser

## Database

MongoDB Atlas is used to store user and book data.

## API Endpoints

### Books

GET /api/books
POST /api/books
PUT /api/books/<id>
DELETE /api/books/<id>

### Users

POST /api/register

POST /api/login
