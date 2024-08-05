import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from '../setupAxios'; // Adjust the path if necessary
import Appbar from '../components/Appbar';
import header from '../assets/Group 5.png'
import HistoryB  from '../assets/h2.jfif';

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

const featuredBookContainerStyle = {
  padding: '20px',
  borderRadius: '8px',
  width: '80%',
  marginTop:"120px",
  marginLeft:"230px",
    maxWidth: '1500px',
  boxShadow: '0 4px 8px #1f1e2c',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  height: '300px',
  width: '1000px',
  position: 'relative',
  backgroundImage: 'url("https://i.pinimg.com/736x/c2/d7/2f/c2d72fc72d1af4476d3165ebeea300cc--free-hd-wallpapers-wallpaper-desktop.jpg")', // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
const textShadowStyle = {
  textAlign: 'center',
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '2px 2px 4px ',
  marginTop: '10px',
  marginLeft:'90px'
};
const textShadowStyle1 = {
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#fff',
  marginTop: '160px',
  marginLeft:'150px'
};
const bookCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px #1f1e2c',
  textAlign: 'center',
  width: '200px',  // Increased width
  height: '310px', // Increased height
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: '10px',
  cursor: 'pointer' // Add cursor pointer
};

const bookImgStyle = {
  width: '100%',
  height: '70%', 
  objectFit: 'cover'
};

const featuredBookImgStyle = {
  width: '220px',
  height: '330px',
  borderRadius: '8px',
  objectFit: 'cover',
  marginTop: '50px',
  marginLeft: 'auto'
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

const History = () => {
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
    <div>
      <div style={featuredBookContainerStyle}>
      {/* <h1 style={textShadowStyle} >My History</h1> */}
      <h1 style={textShadowStyle1} >Re-read Your most favourite books again here</h1>
      <div>
        <img src={HistoryB} alt='noimg' style={{featuredBookImgStyle}}/>
      </div>
      </div>
      
    <div style={borrowedBooksContainerStyle}>
        <Appbar/>
      {/* <h2 style={{color:'#1f1e2c',textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom:'90px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',}}>My History</h2> */}
      <ul style={bookListStyle}>
        {books.length > 0 ? (
          books.map((book) => (
            <li 
              key={book.bookId} 
              style={bookCardStyle}
              onClick={() => handleBookClick(book.bookId)} >
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
    </div>
  );
};

export default History;
