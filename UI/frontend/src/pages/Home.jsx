import React from 'react'
import NavBar from '../components/NavBar'
import Slides from '../components/Slides'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <NavBar />
      <Banner/>

      <div style={{ marginTop: '10px', textAlign: 'center', padding: '20px' }}>
  <h1 style={{
    background: 'linear-gradient(45deg, #392467, #5D3587)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontSize: '40px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  padding: '0 16px',
  }}>
    RECOMMENDED BOOKS
  </h1>
  </div>
      <Slides/>

    </div>
  );
}

export default Home;

// npm install swiper
