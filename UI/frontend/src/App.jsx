import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister';
import Genre from './pages/Genre';
import Profile from './pages/Profile';

function App() {


  return (
    
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logandreg" element={<LoginRegister/>} />
                <Route path="/genre" element={<Genre/>} />
                <Route path="/profile" element={<Profile/>} />
                </Routes>
        </Router>
  )
}

export default App
