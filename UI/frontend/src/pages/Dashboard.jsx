import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import {  useNavigate } from 'react-router-dom';

import Appbar from '../components/Appbar';
import DashSideBar from '../components/DashSideBar';
import { RiEye2Line, RiFontFamily } from "react-icons/ri";
import { toast } from 'react-toastify'; // Import toastify for popups
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const UserDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userId = JSON.parse(atob(token.split(".")[1])).userId;
        try {
          // Fetch borrowed books
          const borrowedBooksResponse = await axios.get(`/borrow/userbook/${userId}`);
          setBorrowedBooks(borrowedBooksResponse.data);

          // Fetch latest book
          const latestBookResponse = await axios.get('/book/latest');
          setFeaturedBook(latestBookResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

   

    fetchData();
  }, []);

  const handleClick = (id) =>
    {
      navigate(`/book/${id}`);
    }


  const containerStyle = {
    display: 'flex',
    minHeight: '70vh',
    backgroundColor: '#f8f3ed'
  };

  const mainContentStyle = {
    marginLeft: '150px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '100px',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
    
  };

  const featuredBookContainerStyle = {
    backgroundColor: '#261709',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    marginLeft: '260px',
    maxWidth: '1200px',
    boxShadow: '0 4px 8px #1f1e2c',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '300px',
    width: '850px',
    position: 'relative',
    backgroundImage: 'url("https://i.pinimg.com/736x/c2/d7/2f/c2d72fc72d1af4476d3165ebeea300cc--free-hd-wallpapers-wallpaper-desktop.jpg")', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  

  const featuredBookImgStyle = {
    width: '220px',
    height: '330px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginTop: '20px',
    marginLeft: 'auto'
  };

  const bookDetailsContainerStyle = {
    flex: '1',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  };

  const headingstyle = {
    fontSize: '45px',
    fontWeight:'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    marginLeft: '55px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    "fontFamily": `"Roboto"`,

    
  };

  const bookTitleStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    marginLeft: '60px',
    marginTop: '20px',
    color: '#f8f3ed',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center'
  };

  const borrowedBooksContainerStyle = {
    backgroundColor: '#f8f3ed',
    padding: '10px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '1200px',
    overflowY: 'auto',
    marginLeft: '300px',
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
    width: '200px',
    height: '310px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '20px'
  };

  const bookImgStyle = {
    width: '100%',
    height: '70%',
    objectFit: 'cover'
  };

  const bookCardTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0'
  };

  const bookCardAuthorStyle = {
    fontSize: '14px',
    color: '#555'
  };

  return (
    <div style={containerStyle}>
      <DashSideBar />
      <div style={mainContentStyle}>
        <Appbar />
        <div style={featuredBookContainerStyle}>
        {/* <div style={overlayStyle}></div> */}
          <div style={bookDetailsContainerStyle}>
            {featuredBook ? (
              <>
                <h1 style={headingstyle}>Explore &nbsp;Our&nbsp; Latest<br/>Book &nbsp;Arrived!</h1>
                <h1 style={bookTitleStyle}> - <b>"{featuredBook.bookName}" </b> &nbsp;by {featuredBook.author}</h1>
                <button  onClick={() => handleClick(featuredBook.bookId)} style={{width:"20%",marginTop:'20px',marginLeft:'65px',borderRadius:'10px',padding:"3px",  background: 'linear-gradient(to top, #261709 0%, white 100%)',color:"white",fontWeight:'bold'
}}>Explore</button>
              </>
            ) : (
              <p>Loading featured book...</p>
            )}
          </div>
          {featuredBook && (
            <img src={featuredBook.image} alt={featuredBook.bookName} style={featuredBookImgStyle} />
          )}
        </div>

        <div style={borrowedBooksContainerStyle}>
          <h2 style={{ color: '#1f1e2c',fontWeight:'bold' }}>My Library</h2>
          <ul style={bookListStyle}>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <li key={index} style={bookCardStyle}>
                  <img src={book.image} alt={book.bookName} style={bookImgStyle} />
                  <div style={bookCardTitleStyle}>{book.bookName}</div>
                  <div style={bookCardAuthorStyle}>by {book.author}</div>
                </li>
              ))
            ) : (
              <p>No borrowed books found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
