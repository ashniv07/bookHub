import React from 'react'
import NavBar from '../components/NavBar'
import Slides from '../components/Slides'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '100px', textAlign: 'center', padding: '20px' }}>
  <h1 style={{
    background: 'linear-gradient(45deg, #392467, #5D3587)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontSize: '3rem'
  }}>
    WELCOME TO BOOKHUB
  </h1>
  <p style={{
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#A367B1'
  }}>
    Your go-to solution for accessing your e-book.<br />
    Organize, search, and enjoy your collection seamlessly with BookHub. 
    <span style={{ color: '#392467', fontWeight: 'bold' }}> Explore our catalog </span> 
    and find your next great read today!
  </p>
</div>


      <Slides/>
      <Banner/>

    </div>
  );
}

export default Home;

// npm install swiper
