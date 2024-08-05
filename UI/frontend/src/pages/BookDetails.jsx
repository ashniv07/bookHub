
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import { useParams, useNavigate } from 'react-router-dom';
import BorrowButton from '../components/BorrowButton';
import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';
import Appbar from '../components/Appbar';
import ToBeRead from '../components/ToBeRead';
import AddReview from '../components/AddReview';

// Inline CSS for Star Rating
const starRatingStyle = {
    display: 'flex',
    fontSize: '2rem',
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
    const [userId, setUserId] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);

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
                        background: 'linear-gradient(91.7deg, #fdfcfb 0%, #e2d1c3 100%)',
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
                    <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#1f1e2c', fontSize: '60px' }}>
                        {book.bookName}
                    </Typography>
                    <Typography variant="h6" fontStyle="italic" color="text.secondary" sx={{ fontSize: '30px', marginLeft: '10px' }}>
                        by {book.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, marginLeft: '10px' }}>
                        <Box sx={{ ...starRatingStyle }}>
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
                                <BorrowButton bookId={book.bookId} />
                            )}
                        </Box>
                        <div style={{ marginTop: '32px', marginLeft: '20px' }}>
                            <ToBeRead bookName={book.bookName} />
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default BookDetails;


// import React, { useEffect, useState } from 'react';
// import axios from '../setupAxios';
// import { useParams, useNavigate } from 'react-router-dom';
// import BorrowButton from '../components/BorrowButton';
// import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';
// import Appbar from '../components/Appbar';
// import ToBeRead from '../components/ToBeRead';
// import AddReview from '../components/AddReview';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Lottie from 'react-lottie';
// import * as owlAnimation from '../assets/owl.json'; // Replace with the path to your Lottie file

// const starRatingStyle = {
//     display: 'flex',
//     fontSize: '2rem',
//     color: 'gold',
// };

// const starStyle = {
//     marginRight: '0.2rem',
// };

// const filledStarStyle = {
//     color: 'gold',
// };

// const emptyStarStyle = {
//     color: 'lightgray',
// };

// const BookDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [hasAccess, setHasAccess] = useState(false);
//     const [userId, setUserId] = useState(null);
//     const [averageRating, setAverageRating] = useState(0);
//     const [showFullDescription, setShowFullDescription] = useState(false);
//     const [buttonText, setButtonText] = useState('Borrow');
//     const [hasRequested, setHasRequested] = useState(false);
//     const [accessCutDate, setAccessCutDate] = useState('');

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
        
            

//         const getUserIdFromToken = () => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 try {
//                     const payload = JSON.parse(atob(token.split('.')[1]));
//                     return payload.userId;
//                 } catch (error) {
//                     console.error('Failed to decode token:', error);
//                 }
//             }
//             return null;
//         };

//         const userIdFromToken = getUserIdFromToken();
//         setUserId(userIdFromToken);

//         if (id) {
//             fetchBook();
//         } else {
//             console.error("Invalid book ID");
//             setLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         const checkAccess = async () => {
//             try {
//                 if (userId) {
//                     const response = await axios.get(`/borrow/check-access/${userId}/${id}`);
//                     setHasAccess(response.data.hasAccess);
//                 }
//             } catch (error) {
//                 console.error("Error checking access:", error);
//             }
//         };

//         if (id && userId) {
//             checkAccess();
//         }
//     }, [id, userId]);

//     useEffect(() => {
//         const fetchRating = async () => {
//             try {
//                 const response = await axios.get(`/review/average/${id}`);
//                 setAverageRating(response.data);
//             } catch (error) {
//                 console.error("Error fetching rating:", error);
//             }
//         };

//         if (id) {
//             fetchRating();
//         }
//     }, [id]);

//     const handleClick = () => {
//                     if (book && book.url) {
//                         navigate(`/read/${book.bookId}`);
//                     } else {
//                         console.error("Book URL not available");
//                     }
//                 };

//     useEffect(() => {
//         const fetchBorrowStatus = async () => {
//             try {
//                 const response = await axios.get(`/borrow/status/${userId}/${id}`);
//                 if (response.data.status === 'requested') {
//                     setButtonText('Requested');
//                     setHasRequested(true);
//                 } else if (response.data.status === 'approved') {
//                     setButtonText('Read');
//                     setAccessCutDate(response.data.accessCutDate);
//                 }
//             } catch (error) {
//                 console.error('Error fetching borrow status:', error);
//             }
//         };

//         if (userId && id) {
//             fetchBorrowStatus();
//         }
//     }, [userId, id]);

//     useEffect(() => {
//         const interval = setInterval(async () => {
//             if (hasRequested) {
//                 try {
//                     const response = await axios.get(`/borrow/status/${userId}/${id}`);
//                     if (response.data.status === 'approved') {
//                         setButtonText('Read');
//                         setAccessCutDate(response.data.accessCutDate);
//                         toast.update('borrow-request', {
//                             render: `Enjoy reading, your access will be removed on ${response.data.accessCutDate}`,
//                             type: toast.TYPE.SUCCESS,
//                             autoClose: 5000,
//                         });
//                         clearInterval(interval);
//                     }
//                 } catch (error) {
//                     console.error('Error checking borrow status:', error);
//                 }
//             }
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [hasRequested, userId, id]);

//     const handleBorrowClick = async () => {
//         if (!userId) {
//             console.error('User ID is missing');
//             return;
//         }

//         if (!id) {
//             console.error('Book ID is missing');
//             return;
//         }

//         try {
//             const response = await axios.post('/borrow/request', {
//                 bookId: id,
//                 userId,
//             });
//             setButtonText('Requested');
//             setHasRequested(true);
//             toast.info(
//                 <div>
//                     <Lottie
//                         options={{
//                             loop: true,
//                             autoplay: true,
//                             animationData: owlAnimation.default,
//                             rendererSettings: {
//                                 preserveAspectRatio: 'xMidYMid slice',
//                             },
//                         }}
//                         height={50}
//                         width={50}
//                     />
//                     Your borrow request has been sent! Your access to read will be granted upon approval.
//                 </div>,
//                 {
//                     position: "top-right",
//                     autoClose: false,
//                     hideProgressBar: true,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     toastId: 'borrow-request'
//                 }
//             );
//         } catch (error) {
//             console.error('Error sending borrow request:', error);
//         }
//     };

//     const renderStars = (rating) => {
//         return Array(5).fill(false).map((_, index) => (
//             <span
//                 key={index}
//                 style={{
//                     ...starStyle,
//                     ...(index < rating ? filledStarStyle : emptyStarStyle),
//                 }}
//             >
//                 {index < rating ? '★' : '☆'}
//             </span>
//         ));
//     };

//     const handleReadMore = () => {
//         setShowFullDescription(!showFullDescription);
//     };

//     if (loading) return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//             <CircularProgress />
//         </Box>
//     );

//     if (!book) return <p>Book not found</p>;

//     const buttonStyle = {
//         background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
//         color: 'white',
//         border: 'none',
//         padding: '14px 29px',
//         fontSize: '16px',
//         cursor: 'pointer',
//     };

//     return (
//         <div>
//             <Appbar />
//             <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//                 <Box
//                     sx={{
//                         flex: '0 0 30%',
//                         background: 'linear-gradient(91.7deg, #fdfcfb 0%, #e2d1c3 100%)',
//                         position: 'relative'
//                     }}
//                 >
//                     <CardMedia
//                         component="img"
//                         image={book.image}
//                         alt={book.bookName}
//                         sx={{
//                             position: 'absolute',
//                             top: '55%',
//                             right: '-20%',
//                             width: '70%',
//                             height: 'auto',
//                             transform: 'translateY(-50%)',
//                             objectFit: 'cover',
//                             borderRadius: '10px',
//                             boxShadow: '0px 4px 10px rgba(0, 0.2, 0, 1)'
//                         }}
//                     />
//                 </Box>
//                 <Box
//                     sx={{
//                         flex: '1',
//                         background: 'white',
//                         p: 22,
//                         pt: 30,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         overflow: 'auto',
//                     }}
//                 >
//                     <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#1f1e2c', fontSize: '60px' }}>
//                         {book.bookName}
//                     </Typography>
//                     <Typography variant="h6" fontStyle="italic" color="text.secondary" sx={{ fontSize: '30px', marginLeft: '10px' }}>
//                         by {book.author}
//                     </Typography>
//                     <Box sx={starRatingStyle}>
//                         {renderStars(Math.round(averageRating))}
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="body1"
//                             color="text.primary"
//                             sx={{
//                                 fontSize: '20px',
//                                 lineHeight: '1.6',
//                                 textAlign: 'justify',
//                                 marginTop: '20px'
//                             }}
//                         >
//                             {showFullDescription || book.description.length <= 500
//                                 ? book.description
//                                 : `${book.description.substring(0, 500)}...`}
//                         </Typography>
//                         {book.description.length > 500 && (
//                             <Button onClick={handleReadMore} variant="text" color="primary" sx={{ marginTop: '10px' }}>
//                                 {showFullDescription ? 'Read Less' : 'Read More'}
//                             </Button>
//                         )}
//                     </Box>
//                     <Box display="flex" justifyContent="flex-start" marginTop="20px">
//                         <Button
//                             variant="contained"
//                             onClick={handleBorrowClick}
//                             style={buttonStyle}
//                             disabled={buttonText === 'Requested'}
//                         >
//                             {buttonText}
//                         </Button>
//                         <Box sx={{ mt: 4, marginLeft: '10px' }}>
//                             {hasAccess ? (
//                                 <Button variant="contained" color="primary" onClick={handleClick} style={{ background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)' }}>
//                                     Read
//                                 </Button>
//                             ) : (
//                                 <BorrowButton bookId={book.bookId} />
//                             )}
//                         </Box>
                        
//                         <ToBeRead bookName={book.bookName} />
//                     </Box>
//                     <Box marginTop="30px">
//                         <AddReview bookId={id} />
//                     </Box>
//                 </Box>
//             </Box>
//             <ToastContainer />
//         </div>
//     );
// };

// export default BookDetails;
