import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister';
import Genre from './pages/Genre';
import Profile from './pages/Profile';
import Addbook from './pages/Addbook';
import Managebook from './pages/Managebook';
import Requests from './pages/Requests';
import Favorites from './pages/Favorites';
import Dashboard from './pages/Dashboard';
import Genrebooks from './pages/Genrebooks';
import BookDetails from './pages/BookDetails';
import Deletedbooks from './pages/deletedbooks';
import ReadBook from './pages/Readbook';
import Allbooks from './pages/Allbooks';
import History  from './pages/History';
import Suggestion from './pages/Suggestion';
import ToBeRead from './components/ToBeRead';
import { ToastContainer } from 'react-toastify';

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
                <Route path="/requests" element={<Requests />} />
                <Route path="/genre/:genre" element={<Genrebooks />} />    
                <Route path="/book/:id" element={<BookDetails/>} />
                <Route path="/deletedBooks" element={<Deletedbooks/>} />
                <Route path="/read/:id" element={<ReadBook/>} /> 
                <Route path="/all" element={<Allbooks/>} /> 
                <Route path="/history" element={<History/>} /> 
                <Route path="/suggestion" element={<Suggestion/>} /> 
                <Route path="/to-be-read" element={<ToBeRead />} />


            </Routes>
            <ToastContainer/>
        </Router>
  )
}

export default App
