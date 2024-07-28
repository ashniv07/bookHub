
// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// const NavButton = styled(Button)(({ theme }) => ({
//   color: '#000',
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
//     backgroundColor: '#000',
//     transition: 'width 0.3s ease-in-out',
//   },
// }));

// const LoginButton = styled(Button)(({ theme }) => ({
//   color: '#392467',
//   borderColor: '#392467',
//   borderWidth: '2px',
//   borderStyle: 'solid',
//   borderRadius: '15px',
//   marginLeft: '15px',
//   backgroundColor: 'transparent',
//   '&:hover': {
//     backgroundColor: '#392467',
//     color: '#fff',
//   },
// }));

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/logandreg');
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#ffffff', padding: '10px' }}>
//         <Toolbar variant="dense">
//           <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, color: '#000' }}>
//             BookHub
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <NavButton onClick={() => navigate('/about')} style={{color:"#392467"}}>About</NavButton>
//             <NavButton onClick={() => navigate('/explore')} style={{color:"#392467"}}>Explore</NavButton>
//             <NavButton onClick={() => navigate('/suggest')} style={{color:"#392467"}}>Suggest</NavButton>
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
import { styled } from '@mui/system';

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  position: 'relative',
  '&:hover::after': {
    width: '100%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    transition: 'width 0.3s ease-in-out',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderColor: '#fff',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '15px',
  marginLeft: '15px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#392467',
  },
}));

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/logandreg');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%', background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)', padding: '10px' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
            BookHub
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavButton onClick={() => navigate('/about')}>About</NavButton>
            <NavButton onClick={() => navigate('/explore')}>Explore</NavButton>
            <NavButton onClick={() => navigate('/suggest')}>Suggest</NavButton>
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box> 
  );
}
