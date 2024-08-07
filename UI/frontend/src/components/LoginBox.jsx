

import React, { useState } from 'react';
import axios from 'axios';
import suggest from '../assets/suggestion.png';
import '../setupAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const suggestBookContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '2rem',
  background: 'linear-gradient(to top, #4c3228 0%, #f8f3ed 100%)',
  marginTop: '2rem',
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
  background: '#fff',
  padding: '2rem',
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
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  background: '#4c3228',
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
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const login = {
      userEmail,
      password,
    };

    axios.post('http://localhost:8080/login', login)
      .then(response => {
        const token = response.data;
        localStorage.setItem('token', token);

        // Decode token to get role
        const role = JSON.parse(atob(token.split(".")[1])).roleId;

        // Navigate based on role
        switch (role) {
          case 0:
            navigate('/addbook');
            break;
          case 1:
            navigate('/all');
            break;
          default:
            navigate('/');
            break;
        }

        // toast.success('Login successful!');
        // setUserEmail('');
        // setPassword('');
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Failed to login.');
      });
  };

  return (
    <div style={suggestBookContainerStyle}>
      <div style={contentContainerStyle}>
        <div style={suggestionBoxStyle}>
          <h1 style={{ color: 'rgb(50, 25, 79)' }}>Login</h1>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>Login</button>
          </form>
        </div>
        <img src={suggest} style={imageStyle} alt="Suggestion" />
      </div>
    </div>
  );
};

export default SuggestBook;
