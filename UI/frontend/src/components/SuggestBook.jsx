
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import suggest from '../assets/suggestion.png';
import owlAnimationData from '../assets/owl.json'; 
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

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: owlAnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const SuggestBook = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const predefinedAuthors = [
    'J.K. Rowling',
    'George R.R. Martin',
    'J.R.R. Tolkien',
    'Agatha Christie',
    'Stephen King',
    'Isaac Asimov',
    'Jane Austen',
    'Mark Twain',
    'Charles Dickens',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const suggestion = {
      bookName,
      author: authorName,
    };

    axios.post('http://localhost:8080/suggestions/add', suggestion)
      .then(response => {
        toast.success(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Lottie 
              options={defaultOptions}
              height={50}
              width={50}
              style={{ marginRight: '10px' }}
            />
            <span>Thank you for your suggestion!</span>
          </div>
        );
        setBookName('');
        setAuthorName('');
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Failed to process suggestion.');
      });
  };

  return (
    <div style={suggestBookContainerStyle}>
      <ToastContainer />
      <div style={contentContainerStyle}>
        <div style={suggestionBoxStyle}>
          <h1 style={{ color: '#4c3228', fontSize: '35px', marginBottom: '20px' }}>Suggestion Box</h1>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              style={inputStyle}
              required
            />
            <select
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="" disabled>Select Author</option>
              {predefinedAuthors.map((author) => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>
        <img src={suggest} alt="Suggest a Book" style={imageStyle} />
      </div>
    </div>
  );
};

export default SuggestBook;
