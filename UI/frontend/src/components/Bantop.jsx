import React from 'react';
// import { TypeAnimation } from 'react-type-animation';
import ImageMasonry from './ImageMasonry';

const Bantop = () => {
  // const containerStyle = {
  //   minHeight: '50vh', 
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: '0 2rem',
  //   position: 'relative',
  //   paddingTop: '1rem', 
  //   background: '#f1eef2',
  //   marginBottom: '50px', 
  // };
  const containerStyle = {
    minHeight: '30vh', // Reduced from 50vh to 30vh
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem', // Reduced from 2rem to 1rem
    position: 'relative',
    paddingTop: '0.5rem',   
     background: '#ffff', // Reduced from 1rem to 0.5rem

    marginBottom: '25px', // Reduced from 50px to 25px
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
    background: 'linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)',
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

  // const typeAnimationContainerStyle = {
  //   marginTop: '1rem',
  //   marginLeft: '3rem',
  //   height: '2em', // Fixed height to prevent content shifting
  //   overflow: 'hidden', // Ensures the animation text doesn't push other content
  // };

  const typeAnimationStyle = {
    fontSize: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={headingStyle}>Borrow. Read. Repeat.</h1>
        <h2 style={taglineStyle}>Your Gateway to Infinite Stories <b>Online.</b></h2>
        <p style={{ marginLeft: '3rem' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Molestias eos, nobis nesciunt dolorum excepturi consectetur eveniet sed quaerat esse.
          Rerum libero dolores dignissimos labore voluptatem magnam adipisci nihil harum aspernatur.
        </p>
       
        {/* <div style={typeAnimationContainerStyle}>
          <TypeAnimation
            sequence={[
              'There is more treasure in books than in all the pirates loot on Treasure Island. ― Walt Disney',
              3000,
              'Read the best books first, or you may not have a chance to read them at all. ― Henry David Thoreau',
              3000,
              'Either write something worth reading or do something worth writing. ― Benjamin Franklin',
              3000,
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            style={typeAnimationStyle}
          />
        </div> */}
      </div>
      <ImageMasonry />
    </div>
  );
};

export default Bantop;
