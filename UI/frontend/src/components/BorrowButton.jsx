import React, { useState, useEffect } from 'react';
import axios from '../setupAxios';

const BorrowButton = ({ bookId }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        console.log('Received bookId:', bookId); // Log received bookId
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1])).userId;
            console.log('User ID from token:', user);
            setUserId(user);
        }
    }, [bookId]);

    const handleBorrowClick = async () => {
        console.log('Clicked');
        console.log('User ID:', userId);
        console.log('Book ID:', bookId);

        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        if (!bookId) {
            console.error('Book ID is missing');
            return;
        }

        try {
            const response = await axios.post('/borrow/request', {
                bookId,
                userId,
            });
            alert("Your borrow request has been sent! Happy Reading :)");
            console.log('Borrow request successful:', response.data);
        } catch (error) {
            console.error('Error sending borrow request:', error);
        }
    };

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={handleBorrowClick}>Borrow</button>
        </div>
    );
};

export default BorrowButton;
