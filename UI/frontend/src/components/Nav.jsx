import React from "react";
import '../styles/Navbar.css'
 
const Navbar = () => {
    return(
        <header className="header">
            <a href="/" className="logo">Logo</a>
 
            <nav className="navbar">
            <a href="/">About</a>
            <a href="/">Services</a>
            <a href="/">Contact</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>  
            </nav>
        </header>
 
    )
}
export default Navbar;