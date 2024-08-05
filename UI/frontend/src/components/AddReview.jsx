import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from '../setupAxios';

const AddReview = ({ bookId }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === '') {
      setError('Please provide a rating and a review .');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Replace this with your actual method of getting the token
      const response = await axios.post(
        '/review/add',
        { bookId, rating, comment: review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOpen(false);
        setRating(0);
        setReview('');
        setError(null);
      }
    } catch (err) {
      console.error('Error adding review:', err);
      setError('Failed to add review. Please try again later.');
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ backgroundColor: '#261709', marginTop: '10px' }}>
        Add Review
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#f8f3ed',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Give us your review :)
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Review"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ mt: 2 }}
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" style={{background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)'}} onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddReview;
