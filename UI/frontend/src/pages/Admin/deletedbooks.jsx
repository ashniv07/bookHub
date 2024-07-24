import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const BooksTable = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books-deleted');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const restoreBook = async (id) => {
    console.log('Restoring book with ID:', id); 
    try {
      await axios.put(`http://localhost:8080/restore/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error restoring book:', error);
    }
  };

  return (
    <Container>
    <h1 className='mt-4 text-center'>Books to Restore</h1>
    {books.length === 0 ? (
      <p className='mt-4 text-center'>No books available</p>
    ) : (
      <table className="table table-striped table-bordered table-hover column-spacing mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Image</th>
            <th>Restore</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookName}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td><img src={book.image} alt={book.bookName} width="50" height="50" /></td>
              <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => restoreBook(book.bookId)}>
                    Restore
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Container>
);
};

export default BooksTable;
