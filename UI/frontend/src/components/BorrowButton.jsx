import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const BorrowButton = () => {
    const [userId, setUserId] = useState(''); 
    const [bookId, setBookId] = useState(''); 

    const handleBorrowClick = async () => {
      console.log("clicked");
        try {
          const response = await axios.post('http://localhost:8080/borrow/request', {
            bookId,
            userId,
          });
          console.log('Borrow request successful:', response.data);
         
        } catch (error) {
          console.error('Error sending borrow request:', error);

        }
      };
  return (
    <div><button className="btn btn-primary me-2" onClick={handleBorrowClick} >Borrow</button></div>
  )
}

export default BorrowButton