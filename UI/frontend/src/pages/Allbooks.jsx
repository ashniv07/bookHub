// // style={{background:'#f8f3ed'}}

import React from 'react';
import Appbar from '../components/Appbar';
import Author from '../components/Author';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/genre.css';
import axios from '../setupAxios';
import SuggestBook from '../components/SuggestBook';
import { Link } from 'react-router-dom';
const Allbooks = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`/books-not-del`);
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
    console.log('Clicked book ID:', id);
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
    <div style={{ minHeight: '200vh', marginBottom: '20px', background: '#f8f3ed' }}>
  <Appbar />
  <div className="header-content text-center">
  <h1 style={{ marginTop: '250px' }}>The world's destination for e-books</h1>
<h5 style={{ marginTop: '50px' }}>
    Discover a curated selection of top-rated e-books and get inspired by exceptional designs from around the globe.
</h5>
<Link to="/genre" style={{ textDecoration: 'none' }}>
    <button className="btn btn-primary" style={{ marginTop: '50px', background: '#1f1e2c', padding: '10px', borderRadius: '20px' }}>
        Explore Genre
    </button>
</Link>
  </div>
  <div style={{ marginTop: '100px' }}>
    <h1 style={{ marginLeft: '620px' }}>Famous Authors</h1>
    <br />
    <Author />
  </div>
  <div className="container mt-5">
    <div className="search-section text-center">
      <h3><b>Explore Books</b></h3>
      <p>Find your next favorite book from our collection of books.</p>
      <input
        type="text"
        className="form-control mt-2 search-bar mx-auto"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ maxWidth: '300px' }}
      />
    </div>
    <div className="row mt-4">
      {filteredBooks.map((book) => (
        <div className="col-md-2 mb-4" key={book.bookId}>
          <div
            className="card"
            style={{ height: "15rem", width: "10rem", cursor: 'pointer' }}
            onClick={() => handleCardClick(book.bookId)}
          >
            <img
              className="card-img-top"
              src={book.image}
              alt={book.bookName}
              style={{ height: "15rem", width: "10rem", objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{book.bookName}</h5>
              <p className="card-text">{book.author}</p>
              <button className="btn btn-primary">Explore</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  <SuggestBook/>
</div>

  );
};
export default Allbooks;
