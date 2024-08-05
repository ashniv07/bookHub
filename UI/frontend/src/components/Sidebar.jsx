import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";;
import { FaBookOpenReader } from "react-icons/fa6";
import {FaSignOutAlt} from "react-icons/fa"
import { IoPeople } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { MdDelete } from "react-icons/md";

 
const Sidebar = () => {
  return (
    <div className="text-white vh-100 d-flex flex-column p-3" style={{ width: '200px',backgroundColor:'#261709',height:'100vh',position: 'fixed',overflowY: 'auto'}}>
      <h2 className="text-center mt-3 mb-5">BookHub</h2>
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
          <a href="#" className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
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