import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Appbar from '../components/Appbar';
import { RiEye2Line } from "react-icons/ri";

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
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '70px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const featuredBookContainerStyle = {
        backgroundColor: '#ffeb3b',
        padding: '20px',
        borderRadius: '8px',
        width: '70%',
        maxWidth: '1200px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start', // Align text to the top
        height: '400px',
        position: 'relative'
    };

    const featuredBookImgStyle = {
        width: '300px',
        height: '400px',
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

    const bookTitleStyle = {
        fontSize: '60px',
        fontWeight: 'bold',
        marginLeft: '20px',
        marginTop: '35px'
    };

    const continueReadingTextStyle = {
        position: 'absolute',
        bottom: '100px',
        left: '60px',
        color: 'black',
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center' // Align items horizontally in the container
    };

    const continueReadingIconStyle = {
        marginRight: '10px' 
    };

    const borrowedBooksContainerStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '1200px',
        overflowY: 'auto'
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
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '270px',  // Increased width
        height: '370px', // Increased height
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft:'20px'
    };

    const bookImgStyle = {
        width: '100%',
        height: '70%', // Adjusted to fit within the card
        objectFit: 'cover'
    };

    const bookCardTitleStyle = {
        fontSize: '20px', // Adjusted font size
        fontWeight: 'bold',
        margin: '20px 0'
    };

    const bookCardAuthorStyle = {
        fontSize: '18px', // Adjusted font size
        color: '#555'
    };

    return (
        <div style={containerStyle}>
            <Appbar/>

            {/* Featured Book Container */}
            <div style={featuredBookContainerStyle}>
                <div style={bookDetailsContainerStyle}>
                    {featuredBook ? (
                        <>
                            <h1 style={bookTitleStyle}>{featuredBook.bookName}</h1>
                            <div style={continueReadingTextStyle}>
                                <RiEye2Line style={continueReadingIconStyle} />
                                Continue Reading
                            </div>
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
                <h2>My Library</h2>
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
    );
};

export default UserDashboard;
