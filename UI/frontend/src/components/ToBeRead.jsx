// import React, { useState } from 'react';
// import axios from '../setupAxios'; 
// import { toast } from 'react-toastify'; 

// const ToBeRead = ({ bookName }) => {
//   const [loading, setLoading] = useState(false);

//   const handleAddToBeRead = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token'); 
//       if (!token) {
//         toast.error('User not authenticated.');
//         setLoading(false);
//         return;
//       }

//       const userId = JSON.parse(atob(token.split('.')[1])).userId; 

//       const response = await axios.post('/todo/addtodo', {
//         userId,
//         bookName
//       });

//       if (response.status === 200) {
//         toast.success('Book added to To Be Read list!');
//       } else {
//         toast.error('Failed to add book to list.');
//       }
//     } catch (error) {
//       console.error('Error adding book to To Be Read list:', error);
//       toast.error('An error occurred while adding the book.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const buttonStyle = {
//     backgroundColor: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)', 
//     color: 'black ', 
//     padding: '12px 10px', 
//     border: '2px solid #000', 
//     borderRadius: '5px', 
//     cursor: 'pointer', 
//     fontSize: '16px',
//     transition: 'background-color 0.3s',
//     marginTop: '2px',
//   };

//   const buttonHoverStyle = {
//     backgroundColor: '#f8f3ed',
//   };

//   return (
//     <div>
//       <button 
//         onClick={handleAddToBeRead} 
//         disabled={loading}
//         style={{
//           ...buttonStyle,
//           ...(loading && { backgroundColor: '#a5a5a5', cursor: 'not-allowed' })
//         }}
//         onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//         onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
//       >
//         {loading ? 'Adding...' : 'Add to CheckList'}
//       </button>
//     </div>
//   );
// };

// export default ToBeRead;

import React, { useState } from 'react';
import axios from '../setupAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import owlAnimationData from '../assets/owl.json'; // Replace with the actual path to your owl animation JSON file

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
        toast.success(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: owlAnimationData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              height={50}
              width={50}
              style={{ marginRight: '10px' }}
            />
            <span>Book added to To Be Read list!</span>
          </div>
        );
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

  const buttonStyle = {
    backgroundColor: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
    color: 'black',
    padding: '12px 10px',
    border: '2px solid #000',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginTop: '2px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#f8f3ed',
  };

  return (
    <div>
      <ToastContainer />
      <button
        onClick={handleAddToBeRead}
        disabled={loading}
        style={{
          ...buttonStyle,
          ...(loading && { backgroundColor: '#a5a5a5', cursor: 'not-allowed' })
        }}
        onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        {loading ? 'Adding...' : 'Add to CheckList'}
      </button>
    </div>
  );
};

export default ToBeRead;
