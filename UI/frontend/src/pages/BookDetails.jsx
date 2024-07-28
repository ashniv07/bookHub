import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import { useParams, useNavigate } from 'react-router-dom';

import BorrowButton from '../components/BorrowButton';
import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';
import Navbar from '../components/NavBar';
const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false); 
    const [userId, setUserId] = useState(1); 
    useEffect(() => {
        const fetchBook = async () => {
            try {
                console.log(`Fetching book with ID: ${id}`);
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
    const handleClick = () => {
        if (book && book.url) {
            navigate(`/read/${book.bookId}`);
        } else {
            console.error("Book URL not available");
        }
    };
    if (loading)
      
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );
    if (!book) return <p>Book not found</p>;
    return (
      <div>
     <Navbar/>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Container to position the sections */}
      <Box
        sx={{
          flex: '0 0 25%',
          background: 'linear-gradient(89.7deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%)',
          position: 'relative'
        }}>
        <CardMedia
          component="img"
          image={book.image}
          alt={book.bookName}
          sx={{
            position: 'absolute',
            top: '55%',
            right:"-20%", // Positioning the image so it overlaps into the white section
            width: '70%', // Ensure the image spans into both sections
            height: 'auto',
            transform: 'translateY(-50%)',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content Section (70%) */}
      <Box
        sx={{
          flex: '1',
          backgroundColor: 'white',
          p: 22,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >

<Typography variant="h3" fontWeight="bold" gutterBottom>
          {book.bookName}
        </Typography>
        <Typography variant="h6" fontStyle="italic" color="text.secondary">
          by {book.author}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong> {book.genre}</strong>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
         {book.description}
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

    </div>
    );
};
export default BookDetails