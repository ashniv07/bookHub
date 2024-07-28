import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import { useParams, useNavigate } from 'react-router-dom';
import Appbar from '../components/Appbar';
import BorrowButton from '../components/BorrowButton';
import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';

// Inline CSS for Star Rating
const starRatingStyle = {
    display: 'flex',
    fontSize: '1.5rem',
    color: 'gold',
};

const starStyle = {
    marginRight: '0.2rem',
};

const filledStarStyle = {
    color: 'gold',
};

const emptyStarStyle = {
    color: 'lightgray',
};

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false); 
    const [userId, setUserId] = useState(1); 
    const [averageRating, setAverageRating] = useState(0); 

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
                const response = await axios.get(`/borrow/check-access/${userId}/${id}`);
                setHasAccess(response.data.hasAccess);
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

    const handleClick = () => {
        if (book && book.url) {
            navigate(`/read/${book.bookId}`);
        } else {
            console.error("Book URL not available");
        }
    };

    const renderStars = (rating) => {
        return Array(5).fill(false).map((_, index) => (
            <span
                key={index}
                style={{
                    ...starStyle,
                    ...(index < rating ? filledStarStyle : emptyStarStyle),
                }}
            >
                {index < rating ? '★' : '☆'}
            </span>
        ));
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
            <Container sx={{ mt: 10 }}>
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: 3,
                        height: '650px',
                        position: 'relative',
                        border: '1px solid #ccc',
                        backgroundColor: 'transparent',
                    }}
                >
                    <Box
                        sx={{
                            flex: '1',
                            backgroundColor: 'white',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={book.image}
                            alt={book.bookName}
                            sx={{
                                position: 'absolute',
                                width: '70%',
                                height: 'auto',
                                left: '15%',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flex: '1',
                            backgroundColor: 'white',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4">
                            {book.bookName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            by {book.author}
                        </Typography>
                        <Box sx={{ ...starRatingStyle, mt: 1 }}>
                            {renderStars(Math.round(averageRating))}
                        </Box>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Description:</strong> {book.description}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            <strong>Genre:</strong> {book.genre}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            <strong>Type:</strong> {book.type}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            <strong>Edition:</strong> {book.edition}
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            {hasAccess ? (
                                <Button variant="contained" color="primary" onClick={handleClick}>
                                    Read
                                </Button>
                            ) : (
                                <BorrowButton bookId={book.bookId} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default BookDetails;
