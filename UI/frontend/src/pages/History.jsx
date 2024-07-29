import React, { useState, useEffect } from 'react';
import axios from '../setupAxios'; // Adjust the path if necessary

const UserBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Get the token from localStorage (this is handled in setupAxios)
                // You don't need to extract userId from token manually here
                
                // Fetch the books based on user ID
                const token = localStorage.getItem('token');
                const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

                if (userId) {
                    const response = await axios.get(`/history/user-books/${userId}`);
                    console.log(`/history/user-books/${userId}`);
                    setBooks(response.data);
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Books History</h1>
            <ul>
                {books.length > 0 ? (
                    books.map(book => (
                        <li key={book.bookId}>
                            <img src={book.image} alt={book.title} style={{ width: '50px', height: '75px', marginRight: '10px' }} />
                            <p>{book.title} by {book.author}</p>
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
