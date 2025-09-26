const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");

const regd_users = express.Router();
let users = [];

// ---------------- HELPER FUNCTIONS ----------------
// Check if username exists
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Authenticate user
const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// ---------------- REGISTER ----------------
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// ---------------- LOGIN ----------------
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });
    req.session.authorization = { accessToken, username };
    return res.status(200).json({ message: "Login successful" });
  }
  return res.status(403).json({ message: "Invalid credentials" });
});

// ---------------- ADD OR MODIFY REVIEW ----------------
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if (books[isbn]) {
    books[isbn].reviews[username] = review; // add or update
    return res.status(200).json({ message: "Review added/updated successfully" });
  }
  return res.status(404).json({ message: "Book not found" });
});

// ---------------- DELETE REVIEW ----------------
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted successfully" });
  }
  return res.status(404).json({ message: "No review found for this user/book" });
});

module.exports.authenticated = regd_users;
module.exports.users = users;
