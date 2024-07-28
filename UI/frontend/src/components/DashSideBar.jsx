import React from 'react';
import { CgProfile } from "react-icons/cg";
import { IoPeople } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

// Function to decode JWT and get the username
const decodeToken = (token) => {
    try {
        // Split the token into parts and decode the payload
        const payload = token.split('.')[1];
        if (!payload) throw new Error('No payload found in token');

        // Decode and parse the payload
        const decoded = JSON.parse(atob(payload));
        console.log('Decoded token:', decoded); // Log the decoded token for debugging

        // Return the username or 'Guest' if not present
        return decoded.userName || 'Guest';
    } catch (error) {
        console.error('Failed to decode token:', error);
        return 'Guest'; // Default to 'Guest' if any error occurs
    }
};

const profileImage = 'https://via.placeholder.com/80'; 

const DashSideBar = () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // Decode the token to get the username
    const userName = token ? decodeToken(token) : 'Guest';

    return (
        <div className="text-white vh-100 d-flex flex-column p-3" style={{ width: '250px', backgroundColor: '#392467', height: '100vh', position: 'fixed', overflowY: 'auto' }}>
            {/* Profile Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', marginBottom: '40px', borderBottom: '1px solid #fff', marginTop: '80px' }}>
                <img src={profileImage} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }} />
                <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>{userName}</h2>
            </div>

            <ul className="nav flex-column">
                <li className="nav-item mb-3">
                    <a href="/profile" className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent',fontSize:'25px',marginLeft:'35px' }}
                        onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
                        <CgProfile className="me-2" /> Profile
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a href="/genre" className="nav-link text-white" style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent',fontSize:'25px',marginLeft:'35px' }}
                        onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}>
                        <GiBookshelf className="me-2" /> Genre
                    </a>
                </li>
            
            </ul>
        </div>
    );
};

export default DashSideBar;
