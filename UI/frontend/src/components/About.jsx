import React from 'react';

const aboutUsContainerStyle = {
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
//   background: '#f9f9f9',
//   color: '#333',
};

const headingStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const paragraphStyle = {
  fontSize: '1.2rem',
  lineHeight: '1.6',
  maxWidth: '800px',
  textAlign: 'center',
};

const aboutUsImageStyle = {
  width: '100%',
  maxWidth: '200px',
  height: 'auto',
  marginBottom: '1.5rem',
};

const About = () => {
  return (
    <div style={aboutUsContainerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <img
        src="https://via.placeholder.com/400"
        alt="About Us"
        style={aboutUsImageStyle}
      />
      <p style={paragraphStyle}>
        Welcome to our e-library! We are dedicated to providing a wide range of
        books for you to borrow and read online. Our mission is to make
        literature accessible to everyone, everywhere. Whether you’re looking
        for the latest bestsellers, timeless classics, or educational materials,
        we have something for every reader. Join us on our journey to promote
        literacy and foster a love for reading in our community.
      </p>
    </div>
  );
};

export default About;
