import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import suggest from '../assets/suggestion.png';
import '../setupAxios';

const suggestBookContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '2rem',
  background: 'linear-gradient(to top, #4c3228 0%, #f8f3ed 100%)',
  marginTop: '4rem',
  color: '#fff',
};

const contentContainerStyle = {
  display: 'flex',
  width: '100%',
  maxWidth: '800px',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const suggestionBoxStyle = {
  background: '#f8f3ed',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  marginBottom: '1rem',
  padding: '0.75rem',
  fontSize: '20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  background: 'linear-gradient(to top, #4c3228 0%, black 100%)',
  color: '#fff',
  cursor: 'pointer',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '10px',
  marginLeft: '5rem',
};

const SuggestBook = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const suggestion = {
      bookName,
      author: authorName, 
    };

    axios.post('http://localhost:8080/suggestions/add', suggestion)
      .then(response => {
        alert('Thank you for your suggestion!');
        setBookName('');
        setAuthorName('');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to process suggestion.');
      });
  };

  return (
    <div style={suggestBookContainerStyle}>
      <div style={contentContainerStyle}>
        <div style={suggestionBoxStyle}>
          <h1 style={{ color: '#4c3228',fontSize:'35px',marginBottom:'20px' }}>Suggestion Box</h1>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>
        <img src={suggest} alt="Suggest a Book" style={imageStyle} />
      </div>
    </div>
  );
};

export default SuggestBook;
