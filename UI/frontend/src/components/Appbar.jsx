import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/logo.png'

// Ensure this font is imported in your main HTML or CSS
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap">

export default function Appbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/logandreg');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#261709', padding: '10px' }}>
        <Toolbar variant="dense">
          {/* Left Side "BookHub" */}
          {/* <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: '#1f1e2c',
              fontFamily: "'Playfair Display', serif", 
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: '2rem' 
            }}
          >
            BookHub
          </Typography> */}
           <img 
        src={logo}
        alt="BookHub Logo" 
        style={{ width: '50px', height: '50px', marginRight: '10px' }} 
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'left',
          fontSize: '1.5rem'
        }}
      >
        BookHub
      </Typography>

          {/* Right Side Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Button
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={() => navigate('/all')}
            >
              Home
            </Button>
            <Button
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={() => navigate('/genre')}
            >
              Genre
            </Button>
            <Button
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={() => navigate('/history')}
            >
              History
            </Button>
            
            <Button
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
