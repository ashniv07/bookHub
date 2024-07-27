import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Sidebar from '../components/Sidebar';
import { Button } from '@mui/material';
import { AiFillDelete } from "react-icons/ai";

const BooksTable = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books-deleted');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const restoreBook = async (id) => {
    console.log('Restoring book with ID:', id);
    try {
      await axios.put(`/restore/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error restoring book:', error);
    }
  };

  return (
    <div className='request' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '50px' }}>
          <AiFillDelete style={{ fontSize: '2rem', marginRight: '15px' }} />
          <h1 style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '30px' }}>Books to Restore</h1>
        </div>
        {books.length === 0 ? (
          <p className='text-center'>No books available</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', paddingRight: '120px', paddingLeft: '120px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
              <table className="table table-striped table-bordered table-hover column-spacing mt-4" style={{ margin: '0 auto', border: '2px solid black', borderCollapse: 'collapse' }}>
                <thead className="thead-dark">
                  <tr>
                    <th style={{ border: '2px solid black' }}>Book Name</th>
                    <th style={{ border: '2px solid black' }}>Author</th>
                    <th style={{ border: '2px solid black' }}>Genre</th>
                    <th style={{ border: '2px solid black' }}>Image</th>
                    <th style={{ border: '2px solid black' }}>Restore</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.bookId}>
                      <td style={{ border: '2px solid black' }}>{book.bookName}</td>
                      <td style={{ border: '2px solid black' }}>{book.author}</td>
                      <td style={{ border: '2px solid black' }}>{book.genre}</td>
                      <td style={{ border: '2px solid black' }}>
                        <img src={book.image} alt={book.bookName} width="50" height="50" />
                      </td>
                      <td style={{ border: '2px solid black' }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => restoreBook(book.bookId)}
                        >
                          Restore
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksTable;
