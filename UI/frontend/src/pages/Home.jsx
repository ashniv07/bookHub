import React from 'react'
import Slides from '../components/Slides'

import Bantop from '../components/Bantop'
import About from '../components/About'
import LoginBox from '../components/LoginBox'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <div>
      <NavBar />
      <Bantop/>
      <About/>
  

      <div style={{ marginTop: '10px', textAlign: 'center', padding: '20px' }}>
  <h1 style={{
    background: 'linear-gradient(to top, #261709 0%, #537895 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontSize: '40px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  padding: '0 16px',
  }}>
    Trending books
  </h1>
  </div>
      <Slides/>
      <LoginBox/>
<Footer/>

    </div>
  );
}

export default Home;

// npm install swiper
