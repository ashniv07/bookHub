import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';

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

    if (loading) return <p>Loading...</p>;
    if (!book) return <p>Book not found</p>;

    return (
        <div>
            <Appbar/>
        <div className="container" style={{ marginTop: '100px' }}>
    <div className="row">
        <div className="col-md-4">
            <img src={book.image} alt={book.bookName} className="img-fluid mb-3" />
        </div>
        <div className="col-md-8">
            <div className="d-flex align-items-center mb-3">
                <h1 className="me-3">{book.bookName}</h1>
                <span className="text-muted">{book.author}</span>
            </div>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Type:</strong> {book.type}</p>
            <p><strong>Edition:</strong> {book.edition}</p>
            <div className="mt-3">
                <button className="btn btn-primary me-2">Borrow</button>
                <button className="btn btn-secondary">To Be Read</button>
            </div>
        </div>
    </div>
</div>
</div>

    
    );
};

export default BookDetails;
