// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    // Replace with your API endpoints
    axios.get('http://localhost:8080/userinfo').then(response => setUser(response.data));
    axios.get('http://localhost:8080/').then(response => setBorrowedBooks(response.data));
    axios.get('/api/user/favorite-books').then(response => setFavoriteBooks(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">User Profile</h5>
              <p className="card-text"><strong>Name:</strong> {user.name}</p>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
      
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Borrowed Books</h5>
              <ul className="list-group">
                {borrowedBooks.map(book => (
                  <li key={book.id} className="list-group-item">
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Favorite Books</h5>
              <ul className="list-group">
                {favoriteBooks.map(book => (
                  <li key={book.id} className="list-group-item">
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
