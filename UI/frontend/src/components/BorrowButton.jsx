import React, { useState, useEffect } from 'react';
import axios from '../setupAxios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import owlAnimation from '../assets/owl.json'; // Ensure this path is correct

// Default Lottie options
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: owlAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const BorrowButton = ({ bookId, onSuccess, onFailure }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userIdFromToken = decodedToken.userId;
                setUserId(userIdFromToken);
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []);

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

            // Show success toast with Lottie animation
            toast.info(
                <div style={{ textAlign: 'center' }}>
                    <Lottie
                        options={defaultOptions}
                        height={100} // Adjust size as needed
                        width={100} // Adjust size as needed
                        style={{ marginBottom: 10 }} // Margin below the animation
                    />
                    <div>
                        Your borrow request has been sent! Your access to read will be granted upon approval.
                    </div>
                </div>,
                { autoClose: 5000 }
            );

            console.log('Borrow request successful:', response.data);
            if (onSuccess) onSuccess(); // Call success callback
        } catch (error) {
            console.error('Error sending borrow request:', error);
            if (onFailure) onFailure(); // Call failure callback
        }
    };

    const buttonStyle = {
        background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
        color: 'white',
        border: 'none',
        padding: '14px 29px', // Adjust padding for size
        fontSize: '16px',
    };

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={handleBorrowClick} style={buttonStyle}>
                Borrow
            </button>
        </div>
    );
};

export default BorrowButton;
