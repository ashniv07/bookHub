
import React, { useState, useEffect } from 'react';
import axios from '../setupAxios';

const BorrowButton = ({ bookId }) => {
    const [userId, setUserId] = useState(null);
    const [buttonText, setButtonText] = useState('Borrow');
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1])).userId;
            setUserId(user);
        }
    }, []);

    useEffect(() => {
        const fetchBorrowStatus = async () => {
            try {
                const response = await axios.get(`/borrow/status/${userId}/${bookId}`);
                if (response.data.status === 'requested') {
                    setButtonText('Requested');
                    setHasRequested(true);
                } else if (response.data.status === 'approved') {
                    setButtonText('Read');
                }
            } catch (error) {
                console.error('Error fetching borrow status:', error);
            }
        };

        if (userId && bookId) {
            fetchBorrowStatus();
        }
    }, [userId, bookId]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (hasRequested) {
                try {
                    const response = await axios.get(`/borrow/status/${userId}/${bookId}`);
                    if (response.data.status === 'approved') {
                        setButtonText('Read');
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error('Error checking borrow status:', error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [hasRequested, userId, bookId]);

    const handleBorrowClick = async () => {
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
            setButtonText('Requested');
            setHasRequested(true);
            alert("Your borrow request has been sent! Your access to read will be granted upon approval.");
        } catch (error) {
            console.error('Error sending borrow request:', error);
        }
    };

    const buttonStyle = {
        background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
        color: 'white',
        border: 'none',
        padding: '14px 29px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={handleBorrowClick} style={buttonStyle} disabled={buttonText !== 'Borrow'}>
                {buttonText}
            </button>
        </div>
    );
};

export default BorrowButton;
