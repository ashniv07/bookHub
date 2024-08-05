

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Appbar from '../components/Appbar';
import Author from '../components/Author';
import axios from '../setupAxios';
import SuggestBook from '../components/SuggestBook';
import Newsletter from '../components/Newsletter';
import '../styles/genre.css';

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
        <h1 style={{ marginTop: '200px',fontSize:'75px',fontFamily:'revert' }}>The world's destination <br/> for e-books</h1>
        <h5 style={{ marginTop: '50px' ,fontSize:'25px',fontFamily:'sans-serif'}}>
          Discover a curated selection of top-rated e-books and get inspired by exceptional designs.
        </h5>
        <Link to="/genre" style={{ textDecoration: 'none' }}>
          <button className="btn btn-primary" style={{ marginTop: '50px', background: '#4c3228', padding: '10px', borderRadius: '18px',fontWeight:'bold' }}>
            Explore Genre
          </button>
        </Link>
      </div>
      <div style={{ marginTop: '70px' }}>
        {/* <h1 style={{ marginLeft: '600px',fontFamily:'revert' }}>Famous Authors</h1> */}
        <br />
        <Author />
      </div>
      <div><Newsletter /></div>
      <div className="container" style={{marginTop:'120px'}}>
        <div className="search-section text-center">
          <h3 style={{fontSize:'40px',marginBottom:'40px'}}><b>Explore  your next Favorite book</b></h3>
          {/* <p>Find your next favorite book from our collection of books.</p> */}

          <input
            type="text"
            className="form-control mt-2 search-bar mx-auto"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ maxWidth: '300px',borderRadius:'10px' }}
          />
        </div>
        <div className="row mt-5">
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
      <SuggestBook />
    </div>
  );
};

export default Allbooks;
