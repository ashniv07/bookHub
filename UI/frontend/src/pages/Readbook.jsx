
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../setupAxios';
import { Box, CircularProgress } from '@mui/material';
const ReadBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
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
    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );
    if (!book) return <p>Book not found</p>;
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <iframe
                src={book.url}
                title={book.bookName}
                style={{
                    width: '100%',
                    height: '100vh',
                    border: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999
                }}
            />
        </Box>
    );
};
export default ReadBook;
