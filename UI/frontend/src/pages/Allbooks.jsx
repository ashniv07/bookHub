// import React from 'react'
// import Appbar from '../components/Appbar'
// import Slides from '../components/Slides'
// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import '../styles/genre.css'
// import axios from '../setupAxios';
//     const { genre } = useParams();
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get(`/findbooks`);
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


// const Allbooks = () => {
//   return (
//     <div>
//         <Appbar/>
//         <h1 style={{marginTop:'100px'}}>The world's destination for e-books</h1>
//         <h5>Get inspired by the work of millions of top-rated designers & agencies around the world.</h5>
//         <button>Get Started</button>
//         <Slides/>

//         <h1>All books</h1>

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

//     </div>
//   )
// }

// export default Allbooks


// // style={{background:'#f8f3ed'}}

import React from 'react';
import Appbar from '../components/Appbar';
import Slides from '../components/Slides';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/genre.css';
import axios from '../setupAxios';
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
        const response = await axios.get(`/findbooks`);
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
    //  background: '#f8f3ed'
    <div style={{minHeight: '200vh' ,marginBottom:'20px'}}>
      <Appbar />
      <div className="header-content text-center">
        <h1 style={{ marginTop: '250px' }}>The world's destination for e-books</h1>
        <h5>Get inspired by the work of millions of top-rated designers & agencies around the world.</h5>
        <button className="btn btn-primary " style={{marginTop:'50px',background:'#1f1e2c', padding:'10px',borderRadius:'30px'}}>Get Started</button>
      </div>
      <Slides />
      <div className="container mt-5">
        <div className="search-section text-center">
          <h1>All books</h1>
          <h3>Explore Books</h3>
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
            <div className="col-md-3 mb-4" key={book.bookId}>
              <div
                className="card"
                style={{ height: "15rem", width: "10rem", cursor: 'pointer' }}
                onClick={() => handleCardClick(book.bookId)}
              >
                <img
                  className="card-img-top"
                  src={book.image}
                  alt={book.bookName}
                  style={{ height: "15rem", objectFit: 'cover' }}
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
    </div>
  );
};
export default Allbooks;
