import React from 'react';
import ImageMasonry from './ImageMasonry';

const Bantop = () => {

  const containerStyle = {
    minHeight: '30vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    position: 'relative',
    paddingTop: '0.5rem',   
     background: '#ffff', 

    marginBottom: '25px', 
  };
  

  const textContainerStyle = {
    flex: '1',
    maxWidth: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '3rem', 
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to top, #261709 0%, #537895 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    marginLeft: '3rem',
  };

  const taglineStyle = {
    fontSize: '1rem',
    color: 'black',
    marginBottom: '1rem',
    marginLeft: '3rem',
  };


  const typeAnimationStyle = {
    fontSize: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={headingStyle}>Borrow. Read. Repeat.</h1>
        <h2 style={taglineStyle}>Your Gateway to Infinite Stories <b>Online.</b></h2>
        <p style={{ marginLeft: '3rem' }}>
        Discover a world of endless stories and adventures with our extensive collection of books. 
        From thrilling mysteries to inspiring biographies, we have something for every reader. 
        Enjoy the convenience of borrowing books online and dive into your next great read from the comfort of your home. 
        Explore our E library, find your next favorite book, and let the journey begin.

        </p>
      </div>
      <ImageMasonry />
    </div>
  );
};

export default Bantop;
