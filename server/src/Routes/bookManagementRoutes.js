const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Book = require("../Model/Book");
const authenticateToken = require("../Middleware/authMiddleware");

// Publish a new book
router.post("/publish", authenticateToken, async (req, res) => {
  try {
    const { title, author } = req.body;

    // Get user ID from the token
    const userId = req.user.userId;

    // Create a new book
    const newBook = new Book({ title, author, published: true, userId });
    await newBook.save();

    res.status(201).json({ message: "Book published successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Search for books by title
router.get("/search", async (req, res) => {
  try {
    const { title } = req.query;

    // Search for books by title
    const books = await Book.find({ title });

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Unpublish a book
router.put("/unpublish/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;

    // Update the book to unpublished
    await Book.findByIdAndUpdate(bookId, { published: false });

    res.status(200).json({ message: "Book unpublished successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a list of books published by the current user
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get books published by the current user
    const userBooks = await Book.find({ userId });

    res.status(200).json({ userBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a list of all published books
router.get("/published", async (req, res) => {
  try {
    // Get all published books with pagination
    const page = req.query.page || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;

    const publishedBooks = await Book.find({ published: true })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({ publishedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
