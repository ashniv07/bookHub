import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Appbar from '../components/Appbar';
import axios from '../setupAxios';
import fantasy from '../assets/fantasy_banner.png';
import { Opacity } from '@mui/icons-material';

// Updated container style
const containerStyle = {
    marginTop: '60px',
    backgroundColor: '#f8f3ed', 
    minHeight: '100vh', 
    padding: '40px',
};

const boxContainerStyle = {
    boxShadow: '0 4px 8px #1f1e2c',
    background: 'linear-gradient(to top, #704C2A 0%, #261709 50%)',
    
    borderRadius: '9px',
    height: '250px',
    display: 'flex',
    alignItems: 'center', 
    padding: '20px',
    color: '#000', 
    marginBottom:'60px'
};

const imageStyle = {
    width: '250px', // Adjust size as needed
    height: 'auto',
    borderRadius: '8px',
    marginLeft: '20px', // Space between text and image
};

const cardStyle = {
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    boxShadow: 3,
    borderRadius: '8px',
};

const cardMediaStyle = {
    width: 160,
};

const GenreBooks = () => {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`/genre/${genre}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Error fetching books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [genre]);

    const handleCardClick = (id) => {
        navigate(`/book/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={containerStyle}>
            <Appbar />
            <div style={boxContainerStyle}>
                <div style={{ flex: 1 }}>
                    <h3 className="text-left" style={{color:'white', fontWeight: 'bold', marginTop: '10px', marginBottom: "30px",marginLeft:'70px' }}>
                        Explore <strong>{genre}</strong> Books
                    </h3>
                    <p className="text-left mt-2" style={{ color:'white',marginBottom: '30px', fontSize: '25px',marginLeft:'40px' }}>
                        <i>- Explore a wide range of books in this genre -</i>
                    </p>
                    <input
                        type="text"
                        className="form-control mt-2 search-bar"
                        placeholder="Search for books..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{color:'#1f1e2c', maxWidth: '300px', padding: '10px', borderRadius: '10px', border: '2px solid #1f1e2c',marginLeft:'70px' }}
                    />
                </div>
                <img
                    src={fantasy} // Replace with your image URL
                    alt="Genre"
                    style={imageStyle}
                />
            </div>
            <div className="row mt-4" >
                {filteredBooks.map((book) => (
                    <div className="col-md-4 mb-4"  key={book.bookId}>
                        <Card sx={cardStyle} onClick={() => handleCardClick(book.bookId)}>
                            <CardMedia
                                component="img"
                                sx={cardMediaStyle}
                                image={book.image}
                                alt={book.bookName}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', padding: '10px', width: '60%',background:'white'}}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h6" noWrap style={{fontSize:'30px',fontWeight:'bold'}}>
                                        {book.bookName}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div" style={{marginBottom:'10px'}}>
                                        {book.author}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="p" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden',color:'black' }}>
                                        {book.description}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary" component="p" mt={2}>
                                        Reviews: {book.reviews}
                                    </Typography> */}
                                    <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#4c3228' }}>
                                        Explore
                                    </Button>
                                </CardContent>
                            </Box>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreBooks;
