

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/logo.png';


export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/logandreg');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#261709', padding: '10px' }}>
        <Toolbar variant="dense">
          
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
   
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            
            <Button
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#fff',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={()=>navigate('/logandreg')}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
