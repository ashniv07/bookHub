import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister';
import Genre from './pages/Genre';
import Profile from './pages/Profile';
import Addbook from './pages/Admin/Addbook';
import Managebook from './pages/Admin/Managebook';
import Requests from './pages/Admin/Requests';
import Favorites from './pages/Favorites';
import Dashboard from './pages/Dashboard';
import Genrebooks from './pages/Genrebooks';

function App() {


  return (
    
    <Router>
       
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logandreg" element={<LoginRegister />} />
                <Route path="/genre" element={<Genre />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addbook" element={<Addbook />} />
                <Route path="/manage" element={<Managebook />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/genre/:genre" element={<Genrebooks />} />
                <Route path="/requests" element={<Requests />} />
            </Routes>
        </Router>
  )
}

export default App
