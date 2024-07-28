// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import NavBar from '../components/NavBar';
// import '../styles/genre.css'
// import axios from '../setupAxios';
// const GenreBooks = () => {
//     const { genre } = useParams();
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get(`/genre/${genre}`);
//                 setBooks(response.data);
//             } catch (error) {
//                 console.error('Error fetching books:', error);
//                 setError('Error fetching books. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, [genre]);

//     const handleCardClick = (id) => {
//         console.log('Clicked book ID:', id); 
//         navigate(`/book/${id}`);
//     }; 

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredBooks = books.filter(book =>
//         book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="container" style={{ marginTop: '100px' }}>
//         <NavBar />
//         <div className="box-container my-4 p-4">
//           <h3 className="text-left">Explore {genre} Books</h3>
//           <p className="text-left mt-2">Find your next favorite book from our collection of {genre} books.</p>
//           <input
//             type="text"
//             className="form-control mt-2 search-bar"
//             placeholder="Search for books..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             style={{ maxWidth: '300px' }}
//           />
//         </div>
//         <div className="row mt-4">
//           {filteredBooks.map((book) => (
//             <div className="col-md-3 mb-4" key={book.bookId}>
//               <div
//                 className="card" style={{height:"15rem" ,width:"10rem"}}
//                 onClick={() => handleCardClick(book.bookId)}
//               >
//                 <img
//                   className="card-img-top"
//                   src={book.image}
//                   alt={book.bookName}
//                   style={{height:"15rem"}}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{book.bookName}</h5>
//                   <p className="card-text">{book.author}</p>
//                   </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>


//     );
//   };
  
//   export default GenreBooks;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import NavBar from '../components/NavBar';
import '../styles/genre.css';
import axios from '../setupAxios';

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
        <div className="container" style={{ marginTop: '100px' }}>
            <NavBar />
            <div className="box-container my-4 p-4">
                <h3 className="text-left">Explore {genre} Books</h3>
                <p className="text-left mt-2">Find your next favorite book from our collection of {genre} books.</p>
                <input
                    type="text"
                    className="form-control mt-2 search-bar"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ maxWidth: '300px' }}
                />
            </div>
            <div className="row mt-4">
                {filteredBooks.map((book) => (
                    <div className="col-md-4 mb-4" key={book.bookId}>
                        <Card sx={{ display: 'flex', cursor: 'pointer', backgroundColor: '#f5f5f5', boxShadow: 1 }} onClick={() => handleCardClick(book.bookId)}>
                            <CardMedia
                                component="img"
                                sx={{ width: 160 }}
                                image={book.image}
                                alt={book.bookName}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', padding: '10px', width: '60%' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h6" noWrap>
                                        {book.bookName}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        {book.author}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="p" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden' }}>
                                        {book.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="p" mt={2}>
                                        Reviews: {book.reviews}
                                    </Typography>
                                    {/* <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                        Explore
                                    </Button> */}
                                    <Button variant="contained" style={{ marginTop: '10px', backgroundColor: '#392467' }}>
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
