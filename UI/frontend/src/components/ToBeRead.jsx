import React, { useState } from 'react';
import axios from '../setupAxios'; 
import { toast } from 'react-toastify'; 

const ToBeRead = ({ bookName }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToBeRead = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        toast.error('User not authenticated.');
        setLoading(false);
        return;
      }

      const userId = JSON.parse(atob(token.split('.')[1])).userId; 

      const response = await axios.post('/todo/addtodo', {
        userId,
        bookName
      });

      if (response.status === 200) {
        toast.success('Book added to To Be Read list!');
      } else {
        toast.error('Failed to add book to list.');
      }
    } catch (error) {
      console.error('Error adding book to To Be Read list:', error);
      toast.error('An error occurred while adding the book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAddToBeRead} disabled={loading}>
        {loading ? 'Adding...' : 'Add to To Be Read'}
      </button>
    </div>
  );
};

export default ToBeRead;
