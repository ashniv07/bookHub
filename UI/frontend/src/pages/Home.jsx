import React from 'react'
import NavBar from '../components/NavBar'
import Slides from '../components/Slides'

const Home = () => {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '56px', textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to BookHub</h1>
        <p>Your go-to solution for managing and accessing your e-book library.<br/>
         Organize, search, and enjoy your collection seamlessly with BookHub. Explore our extensive catalog and find your next great read today!</p>
      </div>
      <Slides/>

    </div>
  );
}

export default Home;

// npm install swiper