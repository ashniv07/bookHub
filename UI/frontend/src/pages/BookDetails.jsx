// // import React, { useEffect, useState } from 'react';
// // import axios from '../setupAxios';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import Appbar from '../components/Appbar';
// // import BorrowButton from '../components/BorrowButton';
// // import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';

// // // Inline CSS for Star Rating
// // const starRatingStyle = {
// //     display: 'flex',
// //     fontSize: '1.5rem',
// //     color: 'gold',
// // };

// // const starStyle = {
// //     marginRight: '0.2rem',
// // };

// // const filledStarStyle = {
// //     color: 'gold',
// // };

// // const emptyStarStyle = {
// //     color: 'lightgray',
// // };

// // const BookDetails = () => {
// //     const { id } = useParams();
// //     const navigate = useNavigate();
// //     const [book, setBook] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [hasAccess, setHasAccess] = useState(false); 
// //     const [userId, setUserId] = useState(1); 
// //     const [averageRating, setAverageRating] = useState(0); 

// //     useEffect(() => {
// //         const fetchBook = async () => {
// //             try {
// //                 const response = await axios.get(`/book/${id}`);
// //                 setBook(response.data);
// //             } catch (error) {
// //                 console.error("Error fetching book data:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         if (id) {
// //             fetchBook();
// //         } else {
// //             console.error("Invalid book ID");
// //             setLoading(false);
// //         }
// //     }, [id]);

// //     useEffect(() => {
// //         const checkAccess = async () => {
// //             try {
// //                 const response = await axios.get(`/borrow/check-access/${userId}/${id}`);
// //                 setHasAccess(response.data.hasAccess);
// //             } catch (error) {
// //                 console.error("Error checking access:", error);
// //             }
// //         };
// //         if (id && userId) {
// //             checkAccess();
// //         }
// //     }, [id, userId]);

// //     useEffect(() => {
// //         const fetchRating = async () => {
// //             try {
// //                 const response = await axios.get(`/review/average/${id}`);
// //                 setAverageRating(response.data);
// //             } catch (error) {
// //                 console.error("Error fetching rating:", error);
// //             }
// //         };
// //         if (id) {
// //             fetchRating();
// //         }
// //     }, [id]);

// //     const handleClick = () => {
// //         if (book && book.url) {
// //             navigate(`/read/${book.bookId}`);
// //         } else {
// //             console.error("Book URL not available");
// //         }
// //     };

// //     const renderStars = (rating) => {
// //         return Array(5).fill(false).map((_, index) => (
// //             <span
// //                 key={index}
// //                 style={{
// //                     ...starStyle,
// //                     ...(index < rating ? filledStarStyle : emptyStarStyle),
// //                 }}
// //             >
// //                 {index < rating ? '★' : '☆'}
// //             </span>
// //         ));
// //     };

// //     if (loading) return (
// //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
// //             <CircularProgress />
// //         </Box>
// //     );

// //     if (!book) return <p>Book not found</p>;

// //     return (
// //         <div>
// //             <Appbar />
// //             <Container sx={{ mt: 10 }}>
// //                 <Box
// //                     sx={{
// //                         display: 'flex',
// //                         borderRadius: '15px',
// //                         overflow: 'hidden',
// //                         boxShadow: 3,
// //                         height: '650px',
// //                         position: 'relative',
// //                         border: '1px solid #ccc',
// //                         backgroundColor: 'transparent',
// //                     }}
// //                 >
// //                     <Box
// //                         sx={{
// //                             flex: '1',
// //                             backgroundColor: 'white',
// //                             position: 'relative',
// //                             display: 'flex',
// //                             justifyContent: 'center',
// //                             alignItems: 'center',
// //                         }}
// //                     >
// //                         <CardMedia
// //                             component="img"
// //                             image={book.image}
// //                             alt={book.bookName}
// //                             sx={{
// //                                 position: 'absolute',
// //                                 width: '70%',
// //                                 height: 'auto',
// //                                 left: '15%',
// //                                 top: '50%',
// //                                 transform: 'translateY(-50%)',
// //                                 objectFit: 'cover',
// //                             }}
// //                         />
// //                     </Box>
// //                     <Box
// //                         sx={{
// //                             flex: '1',
// //                             backgroundColor: 'white',
// //                             p: 2,
// //                             display: 'flex',
// //                             flexDirection: 'column',
// //                             justifyContent: 'center',
// //                         }}
// //                     >
// //                         <Typography variant="h4">
// //                             {book.bookName}
// //                         </Typography>
// //                         <Typography variant="subtitle1" color="text.secondary">
// //                             by {book.author}
// //                         </Typography>
// //                         <Box sx={{ ...starRatingStyle, mt: 1 }}>
// //                             {renderStars(Math.round(averageRating))}
// //                         </Box>
// //                         <Typography variant="body1" sx={{ mt: 2 }}>
// //                             <strong>Description:</strong> {book.description}
// //                         </Typography>
// //                         <Typography variant="body1" sx={{ mt: 1 }}>
// //                             <strong>Genre:</strong> {book.genre}
// //                         </Typography>
// //                         <Typography variant="body1" sx={{ mt: 1 }}>
// //                             <strong>Type:</strong> {book.type}
// //                         </Typography>
// //                         <Typography variant="body1" sx={{ mt: 1 }}>
// //                             <strong>Edition:</strong> {book.edition}
// //                         </Typography>
// //                         <Box sx={{ mt: 3 }}>
// //                             {hasAccess ? (
// //                                 <Button variant="contained" color="primary" onClick={handleClick}>
// //                                     Read
// //                                 </Button>
// //                             ) : (
// //                                 <BorrowButton bookId={book.bookId} />
// //                             )}
// //                         </Box>
// //                     </Box>
// //                 </Box>
// //             </Container>
// //         </div>
// //     );
// // };

// // export default BookDetails;
// import React, { useEffect, useState } from 'react';
// import axios from '../setupAxios';
// import { useParams, useNavigate } from 'react-router-dom';

// import BorrowButton from '../components/BorrowButton';
// import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';
// import Navbar from '../components/NavBar';
// const BookDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [hasAccess, setHasAccess] = useState(false); 
//     const [userId, setUserId] = useState(1); 
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
//     useEffect(() => {
//         const checkAccess = async () => {
//             try {
//                 const response = await axios.get(`/borrow/check-access/${userId}/${id}`);
//                 setHasAccess(response.data.hasAccess);
//             } catch (error) {
//                 console.error("Error checking access:", error);
//             }
//         };
//         if (id && userId) {
//             checkAccess();
//         }
//     }, [id, userId]);
//     const handleClick = () => {
//         if (book && book.url) {
//             navigate(`/read/${book.bookId}`);
//         } else {
//             console.error("Book URL not available");
//         }
//     };
//     if (loading)
      
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//             <CircularProgress />
//         </Box>
//     );
//     if (!book) return <p>Book not found</p>;
//     return (
//       <div>
//      <Navbar/>
//       <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       {/* Container to position the sections */}
//       <Box
//         sx={{
//           flex: '0 0 25%',
//           background: 'linear-gradient(89.7deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%)',
//           position: 'relative'
//         }}>
//         <CardMedia
//           component="img"
//           image={book.image}
//           alt={book.bookName}
//           sx={{
//             position: 'absolute',
//             top: '55%',
//             right:"-20%", // Positioning the image so it overlaps into the white section
//             width: '70%', // Ensure the image spans into both sections
//             height: 'auto',
//             transform: 'translateY(-50%)',
//             objectFit: 'cover',
//           }}
//         />
//       </Box>

//       {/* Content Section (70%) */}
//       <Box
//         sx={{
//           flex: '1',
//           backgroundColor: 'white',
//           p: 22,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           overflow: 'auto',
//         }}
//       >

// <Typography variant="h3" fontWeight="bold" gutterBottom>
//           {book.bookName}
//         </Typography>
//         <Typography variant="h6" fontStyle="italic" color="text.secondary">
//           by {book.author}
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 1 }}>
//           <strong> {book.genre}</strong>
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 2 }}>
//          {book.description}
//         </Typography>
    
    
//         <Box sx={{ mt: 3 }}>
//                             {hasAccess ? (
//                                 <Button variant="contained" color="primary" onClick={handleClick}>
//                                     Read
//                                 </Button>
//                             ) : (
//                                 <BorrowButton bookId={book.bookId} />
//                             )}
//                         </Box>
//                     </Box>
//       </Box>

//     </div>
//     );
// };
// export default BookDetails


import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import BorrowButton from '../components/BorrowButton';
import { Container, Box, Typography, Button, CircularProgress, CardMedia } from '@mui/material';
import Appbar from '../components/Appbar';
import ToBeRead from '../components/ToBeRead';
import AddReview from '../components/AddReview';

// Inline CSS for Star Rating
const starRatingStyle = {
    display: 'flex',
    fontSize: '3rem',
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
                console.error("Error checking access:", console.log(`/borrow/check-access/${userId}/${id}`));
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
          {/* Container to position the sections */}
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
                right: '-20%', // Positioning the image so it overlaps into the white section
                width: '70%', // Ensure the image spans into both sections
                height: 'auto',
                transform: 'translateY(-50%)',
                objectFit: 'cover',
                borderRadius:'10px',
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
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#1f1e2c',fontSize:'60px' }}>
              {book.bookName}
            </Typography>
            <Typography variant="h6" fontStyle="italic" color="text.secondary" sx={{ fontSize:'30px',marginLeft:'10px' }}>
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
            <Typography variant="body1" sx={{ mt: 1 ,marginLeft:'10px',marginBottom:'30px'}}>
              <span style={{ textDecoration: 'underline' }}>#{book.genre}</span>
            </Typography>
            <Typography variant="h6" fontStyle="italic" color="text.secondary" sx={{ mt: 1}} style={{fontSize:'20px',marginLeft:'10px'}}>
        
              {showFullDescription ? book.description : `${book.description.slice(0, 250)}...`}
              {book.description.length > 250 && (
                <Button variant="text" color="primary" onClick={handleReadMore}>
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </Typography>
          
           <div style={{display:'flex'}}>
            <Box sx={{ mt: 4,marginLeft:'10px' }}>
              {hasAccess ? (
                <Button variant="contained" color="primary" onClick={handleClick} style={{ background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)'}} >
                  Read
                </Button>
              ) : (
                <BorrowButton bookId={book.bookId} />
              )}
            </Box>
            <div style={{marginTop:'32px', marginLeft:'20px'}}>   <ToBeRead/></div>
              
            </div>
          </Box>
        </Box>
      </div>
  
    );
};

export default BookDetails;

