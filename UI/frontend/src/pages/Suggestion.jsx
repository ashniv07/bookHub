import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import '../setupAxios';
import Sidebar from '../components/Sidebar';

// Styles
const adminContainerStyle = {
  padding: '2rem',
  background: '#f4f4f4',
  marginLeft: '20rem', // Add margin to the left
};

const suggestionListStyle = {
  listStyle: 'none',
  padding: '0',
};

const suggestionItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  borderBottom: '1px solid #ddd',
  background: '#fff',
  marginBottom: '0.5rem',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '5px',
  background: '#6200ea',
  color: '#fff',
  cursor: 'pointer',
};

const Suggestion = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/suggestions/get')
      .then(response => response.data) // Use response.data instead of response.json()
      .then(data => setSuggestions(data))
      .catch(error => console.error('Error fetching suggestions:', error));
  }, []);

  // const handleDelete = (id) => {
  //   fetch(`/suggestions/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(() => {
  //       setSuggestions(suggestions.filter(suggestion => suggestion.suggestionId !== id));
  //     })
  //     .catch(error => console.error('Error deleting suggestion:', error));
  // };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={adminContainerStyle}>
        <h1>Suggestions</h1>
        <ul style={suggestionListStyle}>
          {suggestions.map(suggestion => (
            <li key={suggestion.suggestionId} style={suggestionItemStyle}>
              <div>
                <strong>Book Name:</strong> {suggestion.bookName}<br />
                <strong>Author:</strong> {suggestion.author}
              </div>
              {/* <button
                style={buttonStyle}
                onClick={() => handleDelete(suggestion.suggestionId)}
              >
                Delete
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Suggestion;
