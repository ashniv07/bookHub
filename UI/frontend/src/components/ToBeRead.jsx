import React, { useState } from 'react';
import axios from '../setupAxios'; // Import axios for API requests
import { toast } from 'react-toastify'; // Import toastify for popups

const ToBeRead = ({ bookId }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToBeRead = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        toast.error('User not authenticated.');
        setLoading(false);
        return;
      }
      const response = await axios.post(
        'http://localhost:8080/todo/addtodo',
        { bookId }, 
        { headers: { Authorization: `Bearer ${token}` } } // Include token in request headers
      );
      toast.success('Book added to "To Be Read" list!'); // Show success popup
    } catch (error) {
      console.error('Error adding book:', error); // Log the error
      toast.error('Error adding book to "To Be Read" list.'); // Show error popup
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn"
      style={{
        borderColor: 'rgb(50, 25, 79)',
        color: 'rgb(50, 25, 79)',
        backgroundColor: 'white',
        borderWidth: '2px',
        padding: '14px 25px',
        fontSize: '15px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
      }}
      onClick={handleAddToBeRead}
      disabled={loading}
    >
      {loading ? 'Adding...' : 'To Be Read'}
    </button>
  );
};

export default ToBeRead;
