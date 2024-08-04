// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Import axios
// import '../setupAxios';
// import Sidebar from '../components/Sidebar';

// // Styles
// const adminContainerStyle = {
//   padding: '2rem',
//   background: '#f4f4f4',
//   marginLeft: '20rem', // Add margin to the left
// };

// const suggestionListStyle = {
//   listStyle: 'none',
//   padding: '0',
// };

// const suggestionItemStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   padding: '1rem',
//   borderBottom: '1px solid #ddd',
//   background: '#fff',
//   marginBottom: '0.5rem',
//   borderRadius: '5px',
// };

// const buttonStyle = {
//   padding: '0.5rem 1rem',
//   border: 'none',
//   borderRadius: '5px',
//   background: '#6200ea',
//   color: '#fff',
//   cursor: 'pointer',
// };

// const Suggestion = () => {
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/suggestions/get')
//       .then(response => response.data) // Use response.data instead of response.json()
//       .then(data => setSuggestions(data))
//       .catch(error => console.error('Error fetching suggestions:', error));
//   }, []);

//   // const handleDelete = (id) => {
//   //   fetch(`/suggestions/${id}`, {
//   //     method: 'DELETE',
//   //   })
//   //     .then(() => {
//   //       setSuggestions(suggestions.filter(suggestion => suggestion.suggestionId !== id));
//   //     })
//   //     .catch(error => console.error('Error deleting suggestion:', error));
//   // };

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={adminContainerStyle}>
//         <h1>Suggestions</h1>
//         <ul style={suggestionListStyle}>
//           {suggestions.map(suggestion => (
//             <li key={suggestion.suggestionId} style={suggestionItemStyle}>
//               <div>
//                 <strong>Book Name:</strong> {suggestion.bookName}<br />
//                 <strong>Author:</strong> {suggestion.author}
//               </div>
//               {/* <button
//                 style={buttonStyle}
//                 onClick={() => handleDelete(suggestion.suggestionId)}
//               >
//                 Delete
//               </button> */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Suggestion;


import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import '../setupAxios';
import Sidebar from '../components/Sidebar';
import { Button } from '@mui/material'; // Import MUI Button

// Styles
const adminContainerStyle = {
  padding: '2rem',
  background: '#f4f4f4',
  marginLeft: '20rem', // Add margin to the left
  minHeight: '100vh',
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

const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  borderRadius: '8px',
  overflow: 'hidden',
};

const tableHeaderStyle = {
  backgroundColor: 'black',
  color: 'white',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '2px solid #ddd',
};

const Suggestion = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/suggestions/get')
      .then(response => response.data) // Use response.data instead of response.json()
      .then(data => setSuggestions(data))
      .catch(error => console.error('Error fetching suggestions:', error));
  }, []);

  // Group suggestions by book
  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    const { bookName, author } = suggestion;
    const key = `${bookName}-${author}`;
    if (!acc[key]) {
      acc[key] = { bookName, author, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});

  // Convert grouped suggestions to array and sort by count
  const sortedSuggestions = Object.values(groupedSuggestions).sort((a, b) => b.count - a.count);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={adminContainerStyle}>
        <h1>Suggestions</h1>
        <p>Total Suggestions: {suggestions.length}</p>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>Book Name</th>
              <th style={tableCellStyle}>Author</th>
              <th style={tableCellStyle}>Number of Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {sortedSuggestions.map(({ bookName, author, count }) => (
              <tr key={`${bookName}-${author}`} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{bookName}</td>
                <td style={tableCellStyle}>{author}</td>
                <td style={tableCellStyle}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suggestion;
