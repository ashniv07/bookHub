import React from 'react'
import NavBar from '../components/NavBar'
import Slides from '../components/Slides'

import Bantop from '../components/Bantop'
import About from '../components/About'
import SuggestBook from '../components/SuggestBook'
import Footer from '../components/Footer'
import Appbar from '../components/Appbar'

const Home = () => {
  return (
    <div>
      <Appbar />
      <Bantop/>
      <About/>
  

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
    Trending books
  </h1>
  </div>
      <Slides/>
      <SuggestBook/>
<Footer/>

    </div>
  );
}

export default Home;

// npm install swiper
