// import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import BorrowButton from '../components/BorrowButton';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                console.log(`Fetching book with ID: ${id}`);
                const response = await axios.get(`http://localhost:8080/book/${id}`);
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
        <div>
            <Appbar />
            <Container sx={{ mt: 10 }}>
                <Card sx={{ display: 'flex', boxShadow: 3 }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <CardMedia
                                component="img"
                                image={book.image}
                                alt={book.bookName}
                                sx={{ height: '100%', width: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardContent>
                                <Typography component="div" variant="h4">
                                    {book.bookName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    by {book.author}
                                </Typography>
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
                                    <BorrowButton />
                                    <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
                                        To Be Read
                                    </Button>
                                </Box>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </div>
    );
};

export default BookDetails;
