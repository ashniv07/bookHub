import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GenreBooks = () => {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/genre/${genre}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [genre]);

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <h1>{genre} Books</h1>
            <div className="row">
                {books.map((book, index) => (
                    <div className="col-md-3" key={index}>
                        <div className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={book.image} alt={book.title} style={{ height: "17rem" }} />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
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
