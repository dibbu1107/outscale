const express = require("express");
const Book = require("./src/Model/Book");
const authenticateToken = require("./src/Middleware/authMiddleware");
const authRoutes = require("./src/Routes/authRoutes");
const bookManagementRoutes = require("./src/Routes/bookManagementRoutes"); 
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB = require("./src/Database/db");

// Create an Express application
const app = express();

// Enable CORS for the Express application
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Parse incoming JSON requests
app.use(express.json());

// Connect to the MongoDB database
connectDB();

// Use authentication routes under the "/api" prefix
app.use("/api", authRoutes);

// Use book-related routes under the "/api/books" prefix
app.use("/api/books", bookManagementRoutes); 

// Set the server to listen on port 3002
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
