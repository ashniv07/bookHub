import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';

const UserDashboard = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const userId = JSON.parse(atob(token.split(".")[1])).userId;
                try {
                    const response = await axios.get(`/borrow/userbook/${userId}`);
                    setBorrowedBooks(response.data);
                } catch (error) {
                    console.error('Error fetching borrowed books:', error);
                }
            }
        };

        fetchBorrowedBooks();
    }, []);

    return (
        <div>
            <h2>Borrowed Books</h2>
            <ul>
                {borrowedBooks.map((book, index) => (
                    <li key={index}>
                        <img src={book.image} alt={book.bookName} style={{ width: '50px', height: '75px' }} />
                        <div>
                            <strong>{book.bookName}</strong> by {book.author}
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
