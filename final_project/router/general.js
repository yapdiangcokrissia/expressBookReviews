const express = require('express');
let books = require("./booksdb.js");
let genl_routes = express.Router();

// ---------------- GET ALL BOOKS ----------------
genl_routes.get('/', (req, res) => {
  res.status(200).json(books);
});

// ---------------- GET BOOK BY ISBN ----------------
genl_routes.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn]; // lookup directly by key
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// ---------------- GET BOOKS BY AUTHOR ----------------
genl_routes.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  let filteredBooks = Object.values(books).filter(
    b => b.author.toLowerCase() === author
  );
  
  if (filteredBooks.length > 0) {
    res.status(200).json(filteredBooks);
  } else {
    res.status(404).json({ message: "No books found for this author" });
  }
});

// ---------------- GET BOOKS BY TITLE ----------------
genl_routes.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  let filteredBooks = Object.values(books).filter(
    b => b.title.toLowerCase() === title
  );

  if (filteredBooks.length > 0) {
    res.status(200).json(filteredBooks);
  } else {
    res.status(404).json({ message: "No books found with this title" });
  }
});

// ---------------- GET REVIEWS FOR A BOOK ----------------
genl_routes.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn]; // lookup directly by key
  if (book) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = genl_routes;
