import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from '../setupAxios'; // Adjust the path if necessary
import Appbar from '../components/Appbar';

const borrowedBooksContainerStyle = {
  backgroundColor: '#f8f3ed',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '1200px',
  overflowY: 'auto',
  marginLeft: '200px',
  marginTop:'150px'
};

const bookListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '60px',
  listStyleType: 'none',
  marginTop: '30px',
  padding: '0'
};

const bookCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px #1f1e2c',
  textAlign: 'center',
  width: '200px', // Adjusted width
  height: '310px', // Adjusted height
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: '20px',
  cursor: 'pointer' // Add cursor pointer
};

const bookImgStyle = {
  width: '100%',
  height: '70%', 
  objectFit: 'cover'
};

const bookCardTitleStyle = {
  fontSize: '16px', // Adjusted font size
  fontWeight: 'bold',
  margin: '10px 0'
};

const bookCardAuthorStyle = {
  fontSize: '14px', // Adjusted font size
  color: '#555'
};

const UserBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

        if (userId) {
          // Fetch borrowed book IDs
          const response = await axios.get(`/history/user-books/${userId}`);
          const bookIds = response.data.map(book => book.bookId);

          // Fetch detailed book information for each book ID
          const detailedBooksPromises = bookIds.map(bookId => 
            axios.get(`/book/${bookId}`)
          );
          const detailedBooksResponses = await Promise.all(detailedBooksPromises);
          const detailedBooks = detailedBooksResponses.map(res => res.data);

          setBooks(detailedBooks);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`); // Navigate to the book detail page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={borrowedBooksContainerStyle}>
        <Appbar/>
      <h2 style={{color:'#1f1e2c',textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom:'90px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',}}>My History</h2>
      <ul style={bookListStyle}>
        {books.length > 0 ? (
          books.map((book) => (
            <li 
              key={book.bookId} 
              style={bookCardStyle}
              onClick={() => handleBookClick(book.bookId)} // Add onClick handler
            >
              <img src={book.image} alt={book.bookName} style={bookImgStyle} />
              <div style={bookCardTitleStyle}>{book.bookName}</div>
              <div style={bookCardAuthorStyle}>by {book.author}</div>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserBooksPage;
