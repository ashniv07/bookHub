import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
// import LoginRegister from './pages/LoginRegister';

function App() {


  return (
    
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/login&reg" element={<LoginRegister/>} /> */}
                </Routes>
        </Router>
  )
}

export default App
