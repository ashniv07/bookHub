// import React, { useState } from 'react';
// import suggest from '../assets/suggestion.png'

// const suggestBookContainerStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minHeight: '60vh',
//   padding: '2rem',
//   background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
//   marginTop: '2rem',
//   color: '#fff',
// };

// const contentContainerStyle = {
//   display: 'flex',
//   width: '100%',
//   maxWidth: '800px',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// };

// const formStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   width: '100%',
//   maxWidth: '400px',
// };

// const inputStyle = {
//   marginBottom: '1rem',
//   padding: '0.75rem',
//   fontSize: '1rem',
//   borderRadius: '5px',
//   border: '1px solid #ccc',
// };

// const buttonStyle = {
//   padding: '0.75rem',
//   fontSize: '1rem',
//   borderRadius: '5px',
//   border: 'none',
//   background: '#6200ea',
//   color: '#fff',
//   cursor: 'pointer',
// };

// const imageStyle = {
//   maxWidth: '100%',
//   height: 'auto',
//   borderRadius: '10px',
//   marginLeft: '5rem',
// };

// const SuggestBook = () => {
//   const [bookName, setBookName] = useState('');
//   const [authorName, setAuthorName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const suggestion = {
//       bookName,
//       authorName,
//     };

//     fetch('/api/suggest-book', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(suggestion),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         alert('Thank you for your suggestion!');
//         setBookName('');
//         setAuthorName('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div style={suggestBookContainerStyle}>
//       <div style={contentContainerStyle}>
//         <div>
//           <h1>Suggestion Box</h1>
//           <form onSubmit={handleSubmit} style={formStyle}>
//             <input
//               type="text"
//               placeholder="Book Name"
//               value={bookName}
//               onChange={(e) => setBookName(e.target.value)}
//               style={inputStyle}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Author Name"
//               value={authorName}
//               onChange={(e) => setAuthorName(e.target.value)}
//               style={inputStyle}
//               required
//             />
//             <button type="submit" style={buttonStyle}>Submit</button>
//           </form>
//         </div>
//         <img src={suggest} alt="Suggest a Book" style={imageStyle} />
//       </div>
//     </div>
//   );
// };

// export default SuggestBook
import React, { useState } from 'react';
import suggest from '../assets/suggestion.png';

const suggestBookContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '2rem',
  background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
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
  background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
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
      authorName,
    };

    fetch('/api/suggest-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(suggestion),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Thank you for your suggestion!');
        setBookName('');
        setAuthorName('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={suggestBookContainerStyle}>
      <div style={contentContainerStyle}>
        <div style={suggestionBoxStyle}>
          <h1 style={{ color: 'rgb(50, 25, 79)' }}>Suggestion Box</h1>
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
