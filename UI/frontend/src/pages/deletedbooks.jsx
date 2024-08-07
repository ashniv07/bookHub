


import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import Sidebar from '../components/Sidebar';
import { Button } from '@mui/material';
import { AiFillDelete } from "react-icons/ai";

const Deletedbooks = () => {
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
      <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '50px' }}>
          <AiFillDelete style={{ fontSize: '2rem', marginRight: '15px' }} />
          <h1 style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '30px' }}>Books to Restore</h1>
        </div>
        {books.length === 0 ? (
          <p className='text-center'>No books available</p>
        ) : (
          <div style={{ overflowX: 'auto', padding: '0 20px' }}>
            <table className="table" style={{ width: '100%', borderRadius: '8px', borderCollapse: 'separate', borderSpacing: '0', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Book Name</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Author</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Genre</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Image</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Restore</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.bookId} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{book.bookName}</td>
                    <td style={{ padding: '10px' }}>{book.author}</td>
                    <td style={{ padding: '10px' }}>{book.genre}</td>
                    <td style={{ padding: '10px' }}>
                      <img src={book.image} alt={book.bookName} width="50" height="50" style={{ borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
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
        )}
      </div>
    </div>
  );
}

export default Deletedbooks;
