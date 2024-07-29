import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Appbar from '../components/Appbar';
import { RiEye2Line } from "react-icons/ri";
import DashSideBar from '../components/DashSideBar'; // Import the sidebar component

const UserDashboard = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [featuredBook, setFeaturedBook] = useState(null);

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

    const containerStyle = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor:'#f8f3ed'
    };

    const mainContentStyle = {
        marginLeft: '300px', // Adjust according to the width of your sidebar
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '180px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const featuredBookContainerStyle = {
        backgroundColor: '#1f1e2c',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        marginLeft: '230px',
        maxWidth: '1200px',
        boxShadow: '0 4px 8px #1f1e2c',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start', // Align text to the top
        height: '300px',
        width: '800px',
        position: 'relative',
    };

    const featuredBookImgStyle = {
        width: '250px',
        height: '350px',
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
        justifyContent: 'flex-start' // Ensure content starts from the top
    };

    const headingstyle = {
        fontSize: '50px',
        fontWeight: 'bold',
        color: 'white', 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow for depth
        marginLeft: '30px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center'
    };

    const bookTitleStyle = {
        fontSize: '25px', // Increase size to make it prominent
        fontWeight: 'bold',
        marginLeft: '30px',
        marginTop: '20px',
        color: '#f8f3ed', // Use a contrasting color
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', // Add text shadow for depth
        display: 'flex',
        alignItems: 'center'
    };

    const continueReadingTextStyle = {
        position: 'absolute',
        bottom: '40px',
        left: '50px',
        color: 'black', // Contrasting color for emphasis
        fontSize: '20px', // Increase font size
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center', // Align items horizontally in the container
    }

    const continueReadingIconStyle = {
        marginRight: '10px'
    };

    const borrowedBooksContainerStyle = {
        backgroundColor: '#f8f3ed',
        padding: '10px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
        overflowY: 'auto',
        marginLeft:'300px',
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
        width: '200px',  // Increased width
        height: '310px', // Increased height
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
        fontSize: '16px', // Adjusted font size
        fontWeight: 'bold',
        margin: '10px 0'
    };

    const bookCardAuthorStyle = {
        fontSize: '14px', // Adjusted font size
        color: '#555'
    };

    return (
        <div style={containerStyle}>
            <DashSideBar />
            {/* Add the sidebar */}
            <div style={mainContentStyle}>
                <Appbar/>
                {/* Featured Book Container */}
                <div style={featuredBookContainerStyle}>
                    <div style={bookDetailsContainerStyle}>
                        {featuredBook ? (
                            <>
                                <h1 style={headingstyle}>Our Newest ARRIVAL!!</h1>
                                <h1 style={bookTitleStyle}>{featuredBook.bookName}</h1>
                                {/* <div style={continueReadingTextStyle}>
                                    <RiEye2Line style={continueReadingIconStyle} />
                                    Continue Reading
                                </div> */}
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
                    <h2 style={{color:'#1f1e2c'}}>My Library</h2>
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
