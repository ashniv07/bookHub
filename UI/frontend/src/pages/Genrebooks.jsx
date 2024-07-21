import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GenreBooks = () => {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/genre/${genre}`);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <h1>{genre} Books</h1>
            <div className="row">
                {books.map((book) => (
                    <div className="col-md-3" key={book.bookId}>
                        <div 
                            className="card" 
                            style={{ width: "18rem", cursor: 'pointer' }} 
                            onClick={() => handleCardClick(book.bookId)}
                          
                        >
                            <img 
                                className="card-img-top" 
                                src={book.image} 
                                alt={book.bookName} 
                                style={{ height: "17rem" }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.bookName}</h5>
                                <p className="card-text">{book.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreBooks;
