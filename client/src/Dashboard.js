import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const [userBooks, setUserBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [publishedBooks, setPublishedBooks] = useState([]);

  useEffect(() => {
    // Fetch user's books after component mounts
    fetchUserBooks();

    // Fetch all published books after component mounts
    fetchPublishedBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get("http://localhost:3002/api/books/user", {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Extract user's books from the response
      setUserBooks(response.data.userBooks);
    } catch (error) {
      console.error("Error fetching user's books", error);
    }
  };

  const fetchPublishedBooks = async () => {
    try {
      // Make API call to fetch all published books
      const response = await axios.get("http://localhost:3002/api/books/published");

      // Extract published books from the response
      setPublishedBooks(response.data.publishedBooks);
    } catch (error) {
      console.error("Error fetching published books", error);
    }
  };

  const handleLogout = () => {
    // Call the onLogout prop to perform the logout action
    onLogout();
  };

  const handlePublish = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      // Make API call to publish the new book
      await axios.post(
        "http://localhost:3002/api/books/publish",
        { title: newBook.title, author: newBook.author },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // After successful publishing, fetch updated user's books
      fetchUserBooks();

      // Clear the form fields
      setNewBook({ title: "", author: "" });

      // Fetch updated published books
      fetchPublishedBooks();
    } catch (error) {
      console.error("Error publishing book", error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      </div>
      <div>
        <h3>Your Books</h3>
        {userBooks.length === 0 ? (
          <p>No books found</p>
        ) : (
          <ul>
            {userBooks.map((book) => (
              <li key={book._id}>
                <strong>Title:</strong> {book.title}, <strong>Author:</strong>{" "}
                {book.author}, <strong>Published:</strong>{" "}
                {book.published ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Publish a New Book</h3>
        <form onSubmit={handlePublish}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />

          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />

          <button type="submit">Publish</button>
        </form>
      </div>
      <div>
        <h3>Published Books</h3>
        {publishedBooks.length === 0 ? (
          <p>No published books found</p>
        ) : (
          <ul>
            {publishedBooks.map((book) => (
              <li key={book._id}>
                <strong>Title:</strong> {book.title}, <strong>Author:</strong>{" "}
                {book.author}, <strong>Published:</strong> Yes
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
