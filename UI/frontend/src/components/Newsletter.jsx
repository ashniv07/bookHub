import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'react-lottie';
import animationData from '../assets/owl.json'; // Ensure the path is correct

const Newsletter = () => {
  const [open, setOpen] = useState(false);

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
      <button onClick={handleClickOpen} style={{ position: 'fixed', top: '100px', right: '40px', background: '#4c3228', color: 'white', padding: '10px', borderRadius: '50%', zIndex: 1000,fontWeight:"bold" }}>
        Newsletter
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Lottie options={defaultOptions} height={200} width={200} />
            <div style={{
              background: 'url(../assets/bookImage.png) no-repeat center center/cover', // Ensure the path is correct
              padding: '20px',
              borderRadius: '15px',
              marginTop: '20px',
              width: '100%',
              maxWidth: '500px',
              textAlign: 'center',
            }}>
              <h2>Latest News</h2>
              <p>Here is the latest news of the website...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Newsletter;
