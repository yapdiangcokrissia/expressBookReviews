const axios = require("axios");

// Base URL of your server
const BASE_URL = "http://localhost:5000";

// ------------------ Async/Await Example ------------------
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("📚 Task 10: All books:", response.data);
  } catch (error) {
    console.error("❌ Error fetching all books:", error.message);
  }
}

// ------------------ Promise Example ------------------
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log(`🔎 Task 11: Book with ISBN ${isbn}:`, response.data);
    })
    .catch(error => {
      console.error(`❌ Error fetching book ${isbn}:`, error.message);
    });
}

// ------------------ Promise Example ------------------
function getBooksByAuthor(author) {
  axios.get(`${BASE_URL}/author/${author}`)
    .then(response => {
      console.log(`👩‍💼 Task 12: Books by ${author}:`, response.data);
    })
    .catch(error => {
      console.error(`❌ Error fetching books by ${author}:`, error.message);
    });
}

// ------------------ Async/Await Example ------------------
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(`📖 Task 13: Books with title "${title}":`, response.data);
  } catch (error) {
    console.error(`❌ Error fetching title "${title}":`, error.message);
  }
}

// ------------------ Run specific task ------------------
const task = process.argv[2];   // e.g. 10, 11, 12, 13
const input = process.argv[3];  // e.g. ISBN, author, or title

switch (task) {
  case "10":
    getAllBooks();
    break;
  case "11":
    if (!input) {
      console.log("⚠️ Please provide an ISBN (e.g. node client.js 11 1)");
    } else {
      getBookByISBN(input);
    }
    break;
  case "12":
    if (!input) {
      console.log("⚠️ Please provide an author (e.g. node client.js 12 'Jane Austen')");
    } else {
      getBooksByAuthor(input);
    }
    break;
  case "13":
    if (!input) {
      console.log("⚠️ Please provide a title (e.g. node client.js 13 'Pride and Prejudice')");
    } else {
      getBooksByTitle(input);
    }
    break;
  default:
    console.log("⚠️ Usage: node client.js <taskNumber> <value>");
    console.log("Examples:");
    console.log("   node client.js 10");
    console.log("   node client.js 11 1");
    console.log("   node client.js 12 'Jane Austen'");
    console.log("   node client.js 13 'Pride and Prejudice'");
}
