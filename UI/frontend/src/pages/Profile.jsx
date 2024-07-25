import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import NavBar from '../components/NavBar';
import Box from '@mui/material/Box';
import profile1 from '../assets/profile1.jpeg';

const Profile = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/userinfo', {
          params: { userName: 'ashley' } // Replace 'ashley' with the actual username you want to fetch
        });
        setUserName(response.data.userName);
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user info.');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
          height={500}
          width={500}
          my={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: '2px solid grey',
            textAlign: 'center',
            backgroundColor: 'grey',
            boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.5)',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'absolute',
              bottom: '70%',
              left: '50%',
              border: '2px solid white',
              transform: 'translateX(-50%)',
            }}
          >
            <img
              src={profile1}
              alt="profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <div>
            <h2>{userName}</h2>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
