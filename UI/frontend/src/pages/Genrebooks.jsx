import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/genre.css'

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
        // <div className="container" style={{ marginTop: '100px' }}>
        //     <NavBar />
        //     <div className="box-container my-4 p-4">
        //         <h1 className="text-left">Explore {genre} Books</h1>
        //         <p className="text-left mt-2">Find your next favorite book from our collection of {genre} books.</p>
        //         <input
        //             type="text"
        //             className="form-control mt-2 search-bar"
        //             placeholder="Search for books..."
        //             value={searchTerm}
        //             onChange={handleSearchChange}
        //             style={{ maxWidth: '300px' }}
        //         />
        //     </div>
        //     <div className="row mt-4">
        //         {filteredBooks.map((book) => (
        //             <div className="col-md-3 mb-4" key={book.bookId}>
        //                 <div 
        //                     className="card" 
        //                     style={{ width: "18rem", cursor: 'pointer' }} 
        //                     onClick={() => handleCardClick(book.bookId)}
        //                 >
        //                     <img 
        //                         className="card-img-top" 
        //                         src={book.image} 
        //                         alt={book.bookName} 
        //                         style={{ height: "17rem" }} 
        //                     />
        //                     <div className="card-body">
        //                         <h5 className="card-title">{book.bookName}</h5>
        //                         <p className="card-text">{book.author}</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
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
            <div className="col-md-3 mb-4" key={book.bookId}>
              <div
                className="card"
                style={{ cursor: 'pointer' , height:"15rem",width:"10rem"}}
                onClick={() => handleCardClick(book.bookId)}
              >
                <img
                  className="card-img-top"
                  src={book.image}
                  alt={book.bookName}
                  style={{ height: "15rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{fontWeight:"bold"}}>{book.bookName}</h5>
                  <p className="card-text">{book.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    
      </div>
    );
  };
  
  export default GenreBooks;

  
 