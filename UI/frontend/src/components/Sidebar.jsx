import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";;
import { FaBookOpenReader } from "react-icons/fa6";
import {FaSignOutAlt} from "react-icons/fa"
import { IoPeople } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
 
const Sidebar = () => {
  return (
    <div className="text-white vh-100 d-flex flex-column p-3" style={{ width: '200px',backgroundColor:'#392467'}}>
      <h2 className="text-center mb-4">BookHub</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/addbook" className="nav-link text-white">
            <IoIosAddCircleOutline className="me-2" /> Add books
          </a>
        </li>
        <li className="nav-item">
          <a href="/manage" className="nav-link text-white">
            <GiBookshelf className="me-2" /> Manage books
          </a>
        </li>
        <li className="nav-item">
          <a href="/requests" className="nav-link text-white">
            <FaBookOpenReader className="me-2" /> Requests
          </a>
        </li>
        <li className="nav-item mt-auto">
          <a href="#" className="nav-link text-white">
            <IoPeople className="me-2" /> Add Admin
          </a>
        </li> 
        <li className="nav-item mt-auto">
          <a href="#" className="nav-link text-white">
            <FaSignOutAlt className="me-2" /> Logout
          </a>
        </li> 
      </ul>
    </div>
  );
};
 
export default Sidebar;