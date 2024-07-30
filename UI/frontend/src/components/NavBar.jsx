

// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// const NavButton = styled(Button)(({ theme }) => ({
//   color: '#fff',
//   position: 'relative',
//   '&:hover::after': {
//     width: '100%',
//   },
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     width: '0',
//     height: '2px',
//     bottom: '0',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     backgroundColor: '#fff',
//     transition: 'width 0.3s ease-in-out',
//   },
// }));

// const LoginButton = styled(Button)(({ theme }) => ({
//   color: '#fff',
//   borderColor: '#fff',
//   borderWidth: '2px',
//   borderStyle: 'solid',
//   borderRadius: '15px',
//   marginLeft: '15px',
//   backgroundColor: 'transparent',
//   '&:hover': {
//     backgroundColor: '#fff',
//     color: '#09203f',
//   },
// }));

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/logandreg');
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed" sx={{ width: '100%', background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)', padding: '10px' }}>
//         <Toolbar variant="dense">
//           <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
//             BookHub
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <NavButton onClick={() => navigate('/about')}>About</NavButton>
//             <NavButton onClick={() => navigate('/explore')}>Explore</NavButton>
//             <NavButton onClick={() => navigate('/suggest')}>Suggest</NavButton>
//             <LoginButton onClick={handleLogin}>Login</LoginButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </Box> 
//   );
// }


import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/logo.png';

// Ensure this font is imported in your main HTML or CSS
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap">

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/logandreg');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#09203f', padding: '10px' }}>
        <Toolbar variant="dense">
          {/* Left Side "BookHub" */}
          {/* <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: '#fff',
              fontFamily: "'Playfair Display', serif", 
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: '2rem' 
            }}
          >
            BookHub
          </Typography> */}

    {/* <Box display="flex" alignItems="center"> */}
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
    {/* </Box> */}

          {/* Right Side Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {/* <Button
              sx={{
                color: '#1f1e2c',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
            <Button
              sx={{
                color: '#1f1e2c',
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
                color: '#1f1e2c',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationColor: '#ffeb3b',
                  textDecorationThickness: '2px'
                }
              }}
              onClick={() => navigate('/notifications')}
            >
              Notifications
            </Button>
            
            <Button
              sx={{
                color: '#1f1e2c',
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
            </Button> */}
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
