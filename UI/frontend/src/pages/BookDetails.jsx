import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import { useParams, useNavigate } from 'react-router-dom';
import BorrowButton from '../components/BorrowButton';
import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';
import Appbar from '../components/Appbar';
import ToBeRead from '../components/ToBeRead';
import AddReview from '../components/AddReview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Star, StarBorder } from '@mui/icons-material';

const starRatingStyle = {
    display: 'flex',
    fontSize: '1.5rem',
    color: 'gold',
};

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [userId, setUserId] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/book/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            } finally {
                setLoading(false);
            }
        };

        const getUserIdFromToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    return payload.userId;
                } catch (error) {
                    console.error('Failed to decode token:', error);
                }
            }
            return null;
        };

        const userIdFromToken = getUserIdFromToken();
        setUserId(userIdFromToken);

        if (id) {
            fetchBook();
        } else {
            console.error("Invalid book ID");
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`/borrow/check-access/${userId}/${id}`);
                    setHasAccess(response.data.hasAccess);
                }
            } catch (error) {
                console.error("Error checking access:", error);
            }
        };

        if (id && userId) {
            checkAccess();
        }
    }, [id, userId]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await axios.get(`/review/average/${id}`);
                setAverageRating(response.data);
            } catch (error) {
                console.error("Error fetching rating:", error);
            }
        };

        if (id) {
            fetchRating();
        }
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/review/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        if (id) {
            fetchReviews();
        }
    }, [id]);

    const handleClick = () => {
        if (book && book.url) {
            navigate(`/read/${book.bookId}`);
        } else {
            toast.error("Book URL not available");
        }
    };

    const handleBorrowSuccess = () => {
        toast.success("Successfully borrowed the book!");
    };

    const handleBorrowFailure = () => {
        toast.error("Failed to borrow the book. Please try again.");
    };

    const renderStars = (rating) => {
        return Array(5).fill(false).map((_, index) => (
            index < rating ? (
                <Star key={index} sx={{ color: 'gold', fontSize: '2rem', marginRight: '0.2rem' }} />
            ) : (
                <StarBorder key={index} sx={{ color: 'lightgray', fontSize: '2rem', marginRight: '0.2rem' }} />
            )
        ));
    };

    const handleReadMore = () => {
        setShowFullDescription(!showFullDescription);
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );

    if (!book) return <p>Book not found</p>;

    return (
        <div>
            <Appbar />
            <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                <Box
                    sx={{
                        flex: '0 0 30%',
                        background: 'linear-gradient(to top, #704C2A 0%, #261709 50%)',                        
                        position: 'relative'
                    }}
                >
                    <CardMedia
                        component="img"
                        image={book.image}
                        alt={book.bookName}
                        sx={{
                            position: 'absolute',
                            top: '55%',
                            right: '-20%',
                            width: '70%',
                            height: 'auto',
                            transform: 'translateY(-50%)',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0.2, 0, 1)'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        flex: '1',
                        background: 'white',
                        p: 22,
                        pt: 30,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'auto',
                    }}
                >
                    <div className='bookdets' style={{marginBottom:'200px'}}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#1f1e2c', fontSize: '60px', marginTop: '450px' }}>
                        {book.bookName}
                    </Typography>
                    <Typography variant="h6" fontStyle="italic" color="text.secondary" sx={{ fontSize: '30px', marginLeft: '10px' }}>
                        by {book.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, marginLeft: '10px' }}>
                        <Box sx={starRatingStyle}>
                            {renderStars(Math.round(averageRating))}
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <AddReview bookId={book.bookId} />
                        </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 1, marginLeft: '10px', marginBottom: '30px' }}>
                        <span style={{ textDecoration: 'underline' }}>#{book.genre}</span>
                    </Typography>
                    <Typography variant="h6" fontStyle="italic" color="text.secondary" sx={{ mt: 1 }} style={{ fontSize: '20px', marginLeft: '10px' }}>
                        {showFullDescription ? book.description : `${book.description.slice(0, 250)}...`}
                        {book.description.length > 250 && (
                            <Button variant="text" color="primary" onClick={handleReadMore}>
                                {showFullDescription ? 'Show Less' : 'Read More'}
                            </Button>
                        )}
                    </Typography>
                    <div style={{ display: 'flex' }}>
                        <Box sx={{ mt: 4, marginLeft: '10px' }}>
                            {hasAccess ? (
                                <Button variant="contained" color="primary" onClick={handleClick} style={{ background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)' }}>
                                    Read
                                </Button>
                            ) : (
                                <BorrowButton 
                                    bookId={book.bookId}
                                    onFailure={handleBorrowFailure}
                                />
                            )}
                        </Box>
                        <div style={{ marginTop: '32px', marginLeft: '20px' }}>
                            <ToBeRead bookName={book.bookName} />
                        </div>
                    </div>
                    </div>
                    <Box sx={{ mt: 4, mb: 3 }}>
                        <hr />
                        <Typography variant="h5" fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
                            Reviews
                        </Typography>
                        
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        background: '#f5f5f5',
                                        p: 2,
                                        mb: 2,
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold">
                                        {review.userName}
                                    </Typography>
                                    <Typography variant="body1">
                                        - {review.comment}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No reviews yet.
                            </Typography>
                        )}
                    </Box>
                    <ToastContainer />
                </Box>
            </Box>
        </div>
    );
};

export default BookDetails;

