import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'react-lottie';
import animationData from '../assets/owl.json'; 
import axios from '../setupAxios'; 

const Newsletter = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/book/latest'); // Adjust this endpoint if you return multiple notifications
        setNotifications([response.data]); // Wrap the single response in an array for now
      } catch (error) {
        console.error('Error fetching latest notifications:', error);
      }
    };

    fetchNotifications();
  }, []); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <button onClick={handleClickOpen} style={{ position: 'fixed', top: '100px', right: '40px', background: '#4c3228', color: 'white', padding: '10px', borderRadius: '50%', zIndex: 1000, fontWeight: 'bold' }}>
        Newsletter
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ background: '#261709' }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ background: '#261709' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8f3ed' }}>
            <Lottie options={defaultOptions} height={150} width={200} />
            <div style={{
              background: '#f8f3ed',
              padding: '20px',
              borderRadius: '15px',
              width: '100%',
              maxWidth: '500px',
              textAlign: 'center',
            }}>
              <Typography variant="h6" gutterBottom>Latest News</Typography>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: '#fff',
                      padding: '15px',
                      marginBottom: '10px',
                      borderRadius: '10px',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Typography variant="h6">{notification.bookName}</Typography>
                    <Typography variant="body1">by {notification.author} has been added! Check it out.</Typography>
                  </Box>
                ))
              ) : (
                <p>Loading latest notifications...</p>
              )}
             
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Newsletter;
