

// import React, { useEffect, useState } from 'react';
// import axios from '../setupAxios';
// import { useParams } from 'react-router-dom';
// import Appbar from '../components/Appbar';
// import BorrowButton from '../components/BorrowButton';
// import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';

// const BookDetails = () => {
//     const { id } = useParams();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchBook = async () => {
//             try {
//                 console.log(`Fetching book with ID: ${id}`);
//                 const response = await axios.get(`/book/${id}`);
//                 setBook(response.data);
//             } catch (error) {
//                 console.error("Error fetching book data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchBook();
//         } else {
//             console.error("Invalid book ID");
//             setLoading(false);
//         }
//     }, [id]);

//     if (loading) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//             <CircularProgress />
//         </Box>
//     );
//     if (!book) return <p>Book not found</p>;

//     return (
//         <div>
//             <Appbar />
//             <Container sx={{ mt: 10 }}>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         borderRadius: '15px',
//                         overflow: 'hidden',
//                         boxShadow: 3,
//                         height: '650px', // Adjust height as needed
//                         position: 'relative',
//                         border: '1px solid #ccc',
//                         backgroundColor: 'transparent',
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             flex: '1',
//                             backgroundColor: 'white',
//                             position: 'relative',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <CardMedia
//                             component="img"
//                             image={book.image}
//                             alt={book.bookName}
//                             sx={{
//                                 position: 'absolute',
//                                 width: '70%',
//                                 height: 'auto',
//                                 left: '15%',
//                                 top: '50%',
//                                 transform: 'translateY(-50%)',
//                                 objectFit: 'cover',
//                             }}
//                         />
//                     </Box>
//                     <Box
//                         sx={{
//                             flex: '1',
//                             backgroundColor: 'white',
//                             p: 2,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <Typography variant="h4">
//                             {book.bookName}
//                         </Typography>
//                         <Typography variant="subtitle1" color="text.secondary">
//                             by {book.author}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mt: 2 }}>
//                             <strong>Description:</strong> {book.description}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>
//                             <strong>Genre:</strong> {book.genre}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>
//                             <strong>Type:</strong> {book.type}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>
//                             <strong>Edition:</strong> {book.edition}
//                         </Typography>
//                         <Box sx={{ mt: 3 }}>
//                             <BorrowButton />
//                             <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
//                                 To Be Read
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Container>
//         </div>
//     );
// };

// export default BookDetails;
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import BorrowButton from '../components/BorrowButton';
import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false); // State to track access

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
                const response = await axios.get(`/borrow/check-access/${id}`);
                setHasAccess(response.data.hasAccess);
            } catch (error) {
                console.error("Error checking access:", error);
            }
        };

        if (id) {
            checkAccess();
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
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: 3,
                        height: '650px', // Adjust height as needed
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
                                <Button variant="contained" color="primary">
                                    Read
                                </Button>
                            ) : (
                                <BorrowButton bookId={book.bookId}/>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default BookDetails;

