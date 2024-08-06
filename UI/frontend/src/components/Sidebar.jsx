import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";;
import { FaBookOpenReader } from "react-icons/fa6";
import {FaSignOutAlt} from "react-icons/fa"
import { IoPeople } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/logandreg');
  };

  return (
    <div className="text-white vh-100 d-flex flex-column p-3" style={{ width: '200px',backgroundColor:'#261709',height:'100vh',position: 'fixed',overflowY: 'auto'}}>
     <div className='logo' style={{display:'flex'}}>
      <img 
        src={logo}
        alt="BookHub Logo" 
        style={{ width: '50px', height: '50px', marginRight: '10px' }} 
      />
       <h2 className="text-center mt-3 mb-5" style={{fontSize:'20px'}}>BookHub</h2>
       </div>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <a href="/addbook" className="nav-link text-white"  style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
            <IoIosAddCircleOutline className="me-2" /> Add books
          </a>
        </li>
        <li className="nav-item mb-3">
          <a href="/manage" className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
            <GiBookshelf className="me-2" /> Manage books
          </a>
        </li>
        <li className="nav-item mb-3 ">
          <a href="/requests" className="nav-link text-white " style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}> 
            <FaBookOpenReader className="me-2" /> Requests
          </a>
        </li>
        <li className="nav-item mt-auto mb-3">
          <a href="/deletedBooks" className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
            <MdDelete className="me-2" /> Deleted Books
          </a>
        </li> 
        <li className="nav-item mt-auto mb-3">
          <a href="/suggestion" className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent'  }}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
            <IoPeople className="me-2" /> Suggestions
          </a>
        </li> 
        <li className="nav-item mt-auto">
          <a onClick={handleLogout} className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
            <FaSignOutAlt className="me-2" /> Logout
          </a>
        </li> 
      </ul>
    </div>
  );
};
 
export default Sidebar;